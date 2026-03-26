import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users, passwordResetTokens } from "@/lib/db/schema";
import { Resend } from "resend";
import { createHash, randomBytes } from "crypto";

const forgotSchema = z.object({
  email: z.string().email("Email non valida"),
});

// Rate limiting semplice in-memory
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minuti

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

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
        { success: true, message: "Se l'email è registrata, riceverai un link per reimpostare la password." },
        { status: 200 }
      );
    }

    const body = await request.json();
    const { email } = forgotSchema.parse(body);

    // Risposta sempre uguale per non rivelare se l'email esiste
    const successResponse = NextResponse.json({
      success: true,
      message: "Se l'email è registrata, riceverai un link per reimpostare la password.",
    });

    // Cerca utente
    const [user] = await db
      .select({ id: users.id, email: users.email, firstName: users.firstName })
      .from(users)
      .where(
        and(
          eq(users.email, email.toLowerCase()),
          isNull(users.deletedAt)
        )
      )
      .limit(1);

    if (!user) {
      return successResponse;
    }

    // Genera token
    const rawToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");

    // Salva token nel DB (scade in 1 ora)
    await db.insert(passwordResetTokens).values({
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Invia email
    const resendApiKey = process.env.RESEND_API_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.civika.it";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const resetUrl = `${appUrl}/dashboard/reset-password?token=${rawToken}`;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Civika <noreply@civika.it>",
          to: [user.email],
          subject: "Reimposta la tua password — CIVIKA",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #0F1F33, #1B3A5C); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
                <h1 style="color: #E8C06A; margin: 0; font-size: 22px;">Reimposta Password</h1>
                <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">
                  CIVIKA — Dashboard Gestionale
                </p>
              </div>
              <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 16px 16px;">
                <p style="color: #333; font-size: 15px; line-height: 1.6;">
                  Ciao <strong>${user.firstName}</strong>,
                </p>
                <p style="color: #333; font-size: 15px; line-height: 1.6;">
                  Abbiamo ricevuto una richiesta per reimpostare la password del tuo account CIVIKA.
                  Clicca il pulsante qui sotto per procedere:
                </p>
                <div style="margin: 32px 0; text-align: center;">
                  <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4A03C, #E8C06A); color: #0F1F33; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px;">
                    Reimposta Password
                  </a>
                </div>
                <p style="color: #888; font-size: 13px; line-height: 1.6;">
                  Questo link scadrà tra <strong>1 ora</strong>. Se non hai richiesto tu il reset, puoi ignorare questa email.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                <p style="color: #aaa; font-size: 12px; line-height: 1.5;">
                  Se il pulsante non funziona, copia e incolla questo link nel browser:<br>
                  <a href="${resetUrl}" style="color: #1B3A5C; word-break: break-all;">${resetUrl}</a>
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Errore invio email reset password:", emailError);
      }
    }

    return successResponse;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Email non valida" },
        { status: 400 }
      );
    }
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
