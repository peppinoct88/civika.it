import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { refreshTokens } from "@/lib/db/schema";
import { verifyAccessToken } from "@/lib/auth";
import { logAudit } from "@/lib/auth/audit";

export async function POST(request: NextRequest) {
  try {
    // Revoca refresh token dal cookie
    const cookieToken = request.cookies.get("refresh_token")?.value;
    if (cookieToken) {
      const tokenHash = createHash("sha256").update(cookieToken).digest("hex");
      await db
        .update(refreshTokens)
        .set({ revokedAt: new Date() })
        .where(
          and(
            eq(refreshTokens.tokenHash, tokenHash),
            isNull(refreshTokens.revokedAt)
          )
        );
    }

    // Log audit
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const payload = await verifyAccessToken(authHeader.slice(7));
      if (payload) {
        await logAudit({
          userId: payload.sub,
          action: "user.logout",
          resource: "users",
          resourceId: payload.sub,
          ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
          userAgent: request.headers.get("user-agent") ?? undefined,
        });
      }
    }

    // Cancella cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.delete("refresh_token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
