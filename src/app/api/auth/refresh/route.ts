import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { users, refreshTokens } from "@/lib/db/schema";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  getUserPermissions,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get("refresh_token")?.value;

    if (!cookieToken) {
      return NextResponse.json(
        { success: false, error: "Refresh token mancante" },
        { status: 401 }
      );
    }

    // Verifica firma JWT del refresh token
    const payload = await verifyRefreshToken(cookieToken);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Refresh token non valido" },
        { status: 401 }
      );
    }

    // Verifica che il token esista nel DB e non sia revocato
    const tokenHash = createHash("sha256").update(cookieToken).digest("hex");
    const [storedToken] = await db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          isNull(refreshTokens.revokedAt)
        )
      )
      .limit(1);

    if (!storedToken) {
      return NextResponse.json(
        { success: false, error: "Refresh token revocato" },
        { status: 401 }
      );
    }

    // Verifica scadenza
    if (new Date(storedToken.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: "Refresh token scaduto" },
        { status: 401 }
      );
    }

    // Revoca il vecchio refresh token (rotation)
    await db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.id, storedToken.id));

    // Verifica che l'utente esista ancora e sia attivo
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.id, payload.sub),
          eq(users.isActive, true),
          isNull(users.deletedAt)
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Utente non trovato o disattivato" },
        { status: 401 }
      );
    }

    // Genera nuovi token
    const { roles, permissions } = await getUserPermissions(user.id);

    const newAccessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      roles,
      permissions,
    });

    const newRefreshToken = await signRefreshToken(user.id);
    const newTokenHash = createHash("sha256").update(newRefreshToken).digest("hex");

    // Salva nuovo refresh token
    const ipAddress = request.headers.get("x-forwarded-for") ?? "unknown";
    const userAgent = request.headers.get("user-agent") ?? "";

    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash: newTokenHash,
      deviceInfo: { userAgent },
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const response = NextResponse.json({
      success: true,
      data: { accessToken: newAccessToken },
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { success: false, error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
