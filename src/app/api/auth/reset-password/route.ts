import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull, gt } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { hash } from "bcryptjs";
import { createHash } from "crypto";
import { logAudit } from "@/lib/auth/audit";

const resetSchema = z.object({
  token: z.string().min(1, "Token richiesto"),
  password: z
    .string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
    .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
    .regex(/[0-9]/, "La password deve contenere almeno un numero"),
});

// Rate limiting per prevenire brute force sul token
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Troppi tentativi. Riprova tra qualche minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { token, password } = resetSchema.parse(body);

    // Hash del token per confronto con DB
    const tokenHash = createHash("sha256").update(token).digest("hex");

    // Cerca token valido (non usato, non scaduto)
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.tokenHash, tokenHash),
          isNull(passwordResetTokens.usedAt),
          gt(passwordResetTokens.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!resetToken) {
      return NextResponse.json(
        { success: false, error: "Il link è scaduto o non valido. Richiedi un nuovo reset." },
        { status: 400 }
      );
    }

    // Hash nuova password
    const passwordHash = await hash(password, 12);

    // Aggiorna password utente
    await db
      .update(users)
      .set({
        passwordHash,
        failedLoginAttempts: 0,
        lockedUntil: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, resetToken.userId));

    // Segna token come usato
    await db
      .update(passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokens.id, resetToken.id));

    // Audit log
    const ipAddress = ip;
    const userAgent = request.headers.get("user-agent") ?? "";

    await logAudit({
      userId: resetToken.userId,
      action: "user.password_reset",
      resource: "users",
      resourceId: resetToken.userId,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: "Password reimpostata con successo. Puoi effettuare il login.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues ?? [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message ?? "Dati non validi" },
        { status: 400 }
      );
    }
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
