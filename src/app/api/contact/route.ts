import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contactRequests } from "@/lib/db/schema";
import { Resend } from "resend";
import { z } from "zod";

// ── Validazione input ──
const contactSchema = z.object({
  nome: z.string().min(2, "Nome obbligatorio").max(255),
  comune: z.string().min(2, "Comune obbligatorio").max(255),
  ruolo: z.string().max(255).optional().default(""),
  email: z.string().email("Email non valida").max(255),
  telefono: z.string().max(30).optional().default(""),
  servizio: z.string().max(100).optional().default(""),
  messaggio: z.string().max(5000).optional().default(""),
});

// ── Rate limiting semplice in-memory ──
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max richieste
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── Servizio label mapping ──
const SERVIZI: Record<string, string> = {
  comunicazione: "Comunicazione integrata",
  eventi: "Eventi istituzionali",
  sito: "Sito web istituzionale",
  social: "Social media",
  bandi: "Bandi e rendicontazione",
  tutto: "Pacchetto completo",
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Troppe richieste. Riprova più tardi." },
        { status: 429 }
      );
    }

    // Parse e validazione
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dati non validi", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const userAgent = request.headers.get("user-agent") || "";

    // Salva nel database
    const [inserted] = await db
      .insert(contactRequests)
      .values({
        nome: data.nome,
        comune: data.comune,
        ruolo: data.ruolo || null,
        email: data.email,
        telefono: data.telefono || null,
        servizio: data.servizio || null,
        messaggio: data.messaggio || null,
        ipAddress: ip,
        userAgent,
      })
      .returning({ id: contactRequests.id });

    // Invio email di notifica
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const servizioLabel = data.servizio
          ? SERVIZI[data.servizio] || data.servizio
          : "Non specificato";

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Civika <noreply@civika.it>",
          to: ["civikasrl@gmail.com"],
          subject: `Nuova richiesta da ${data.nome} — ${data.comune}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #0F1F33, #1B3A5C); padding: 32px; border-radius: 16px 16px 0 0;">
                <h1 style="color: #E8C06A; margin: 0; font-size: 22px;">Nuova richiesta di contatto</h1>
                <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">
                  Ricevuta il ${new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 16px 16px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px; width: 130px;">Nome</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #0F1F33;">${data.nome}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Comune</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #0F1F33;">${data.comune}</td>
                  </tr>
                  ${data.ruolo ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Ruolo</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #0F1F33;">${data.ruolo}</td></tr>` : ""}
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${data.email}" style="color: #1B3A5C; font-weight: 600;">${data.email}</a></td>
                  </tr>
                  ${data.telefono ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Telefono</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;"><a href="tel:${data.telefono}" style="color: #1B3A5C; font-weight: 600;">${data.telefono}</a></td></tr>` : ""}
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Servizio</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #0F1F33;">${servizioLabel}</td>
                  </tr>
                </table>
                ${data.messaggio ? `
                  <div style="margin-top: 24px; padding: 20px; background: #F7F5F0; border-radius: 12px;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #888;">Messaggio</p>
                    <p style="margin: 0; color: #0F1F33; line-height: 1.6;">${data.messaggio.replace(/\n/g, "<br>")}</p>
                  </div>
                ` : ""}
                <div style="margin-top: 24px; text-align: center;">
                  <a href="mailto:${data.email}?subject=Re: Richiesta informazioni Civika" style="display: inline-block; background: linear-gradient(135deg, #D4A03C, #E8C06A); color: #0F1F33; padding: 12px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">
                    Rispondi a ${data.nome.split(" ")[0]}
                  </a>
                </div>
              </div>
            </div>
          `,
        });

        emailSent = true;

        // Aggiorna il record con timestamp email
        await db
          .update(contactRequests)
          .set({ emailSentAt: new Date() })
          .where(eq(contactRequests.id, inserted.id));
      } catch (emailError) {
        // Log errore ma non bloccare la risposta — il dato è già salvato nel DB
        console.error("Errore invio email notifica:", emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Richiesta ricevuta. Vi ricontatteremo entro 24 ore.",
        id: inserted.id,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore API contatto:", error);
    return NextResponse.json(
      { error: "Si è verificato un errore. Riprova più tardi." },
      { status: 500 }
    );
  }
}
