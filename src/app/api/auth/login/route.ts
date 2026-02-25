import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import { signAccessToken, signRefreshToken, getUserPermissions } from "@/lib/auth";
import { logAudit } from "@/lib/auth/audit";
import { createHash } from "crypto";

const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Password richiesta"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Trova utente attivo
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email.toLowerCase()),
          isNull(users.deletedAt)
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    // Controlla blocco account
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      return NextResponse.json(
        { success: false, error: "Account temporaneamente bloccato. Riprova più tardi." },
        { status: 423 }
      );
    }

    // Controlla se attivo
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Account disattivato" },
        { status: 403 }
      );
    }

    // Verifica password
    const validPassword = await compare(password, user.passwordHash);
    if (!validPassword) {
      // Incrementa tentativi falliti
      const attempts = (user.failedLoginAttempts ?? 0) + 1;
      const lockUntil = attempts >= 5
        ? new Date(Date.now() + 15 * 60 * 1000) // blocco 15 minuti
        : null;

      await db
        .update(users)
        .set({
          failedLoginAttempts: attempts,
          lockedUntil: lockUntil,
        })
        .where(eq(users.id, user.id));

      return NextResponse.json(
        { success: false, error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    // Login riuscito: reset tentativi falliti
    const ipAddress = request.headers.get("x-forwarded-for") ?? "unknown";
    const userAgent = request.headers.get("user-agent") ?? "";

    await db
      .update(users)
      .set({
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
        lastLoginIp: ipAddress,
      })
      .where(eq(users.id, user.id));

    // Carica ruoli e permessi
    const { roles, permissions } = await getUserPermissions(user.id);

    // Genera token
    const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      roles,
      permissions,
    });

    const refreshTokenValue = await signRefreshToken(user.id);
    const tokenHash = createHash("sha256").update(refreshTokenValue).digest("hex");

    // Salva refresh token nel DB
    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash,
      deviceInfo: { userAgent },
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 giorni
    });

    // Audit log
    await logAudit({
      userId: user.id,
      action: "user.login",
      resource: "users",
      resourceId: user.id,
      ipAddress,
      userAgent,
    });

    // Response con refresh token in httpOnly cookie
    const response = NextResponse.json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          roles,
          permissions,
        },
      },
    });

    response.cookies.set("refresh_token", refreshTokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60, // 7 giorni
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues ?? [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message ?? "Dati non validi" },
        { status: 400 }
      );
    }
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
