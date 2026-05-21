import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function escapeHtml(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Payload from `forms/ContactModal`, `/contact` page, or other clients */
type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  company?: string;
  budget?: string;
  budgetLessThan10k?: boolean;
  services?: string[];
  interest?: string;
  projectDescription?: string;
  message?: string;
  website?: string;
  timeline?: string;
  readyToStart?: boolean;
  ready?: boolean;
  selectedDate?: string;
  selectedTime?: string;
  source?: string;
  /** Spam honeypot — must stay empty */
  _honeypot?: string;
  website_url?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;

    if ((body._honeypot && String(body._honeypot).trim()) || (body.website_url && String(body.website_url).trim())) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const phone = (body.phone ?? "").trim();

    if (!name || !email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "This form is not configured yet. Please email contact@aelio.dev directly." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const companyName = (body.companyName ?? body.company ?? "").trim() || "N/A";
    const budgetLine =
      (body.budget?.trim() || (body.budgetLessThan10k ? "Less than $10K" : "")) || "N/A";
    const servicesLine = body.services?.length
      ? body.services.join(", ")
      : (body.interest ?? "").trim() || "N/A";
    const projectDescription = (body.projectDescription ?? body.message ?? "").trim() || "N/A";
    const website = (body.website ?? "").trim() || "N/A";
    const timeline = (body.timeline ?? "").trim() || "N/A";
    const readyFlag =
      body.readyToStart !== undefined ? body.readyToStart : body.ready !== undefined ? body.ready : undefined;
    const readyLine = readyFlag === undefined ? "N/A" : readyFlag ? "Yes" : "No";
    const selectedDate = (body.selectedDate ?? "").trim() || "N/A";
    const selectedTime = (body.selectedTime ?? "").trim() || "N/A";
    const source = (body.source ?? "website").trim() || "website";

    const phoneDisplay = phone || "N/A";

    const toRaw = process.env.CONTACT_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
    const toList = toRaw?.length ? toRaw : ["info@aelio.dev"];
    const fromAddress =
      process.env.RESEND_FROM?.trim() || "Aelio Contact <onboarding@resend.dev>";

    const notificationHtml = `
        <h2>New contact (${escapeHtml(source)})</h2>
        <h3>Contact</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneDisplay)}</p>
        <h3>Project</h3>
        <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(website)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budgetLine)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
        <p><strong>Services / interest:</strong> ${escapeHtml(servicesLine)}</p>
        <p><strong>Budget ready:</strong> ${escapeHtml(readyLine)}</p>
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(projectDescription).replace(/\n/g, "<br/>")}</p>
        <h3>Scheduling</h3>
        <p><strong>Preferred date:</strong> ${escapeHtml(selectedDate)}</p>
        <p><strong>Preferred time:</strong> ${escapeHtml(selectedTime)}</p>
      `;

    const { error: notifyError } = await resend.emails.send({
      from: fromAddress,
      to: toList,
      replyTo: email,
      subject: `New inquiry from ${name.replace(/[\r\n]+/g, " ")}`,
      html: notificationHtml,
    });

    if (notifyError) {
      console.error("Resend error (notification):", notifyError);
      const detail = notifyError.message?.trim();
      const hint =
        detail?.toLowerCase().includes("only send testing") || detail?.toLowerCase().includes("verify a domain")
          ? "Until your domain is verified in Resend, set CONTACT_TO_EMAIL in .env.local to the same email you use for your Resend account (or verify aelio.dev and use RESEND_FROM)."
          : undefined;
      return NextResponse.json(
        {
          error:
            detail ||
            "Could not send your message. Please try again or email us directly.",
          hint,
        },
        { status: 500 }
      );
    }

    const { error: confirmError } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "We received your message — Aelio",
      html: `
        <h2>Thank you for reaching out</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We received your message and will reply as soon as we can (typically within one business day).</p>
        ${
          selectedDate !== "N/A" && selectedTime !== "N/A"
            ? `<p><strong>Note:</strong> You indicated ${escapeHtml(selectedDate)} at ${escapeHtml(selectedTime)}. If you booked via Cal.com, you will also get a calendar confirmation.</p>`
            : ""
        }
        <p>— The Aelio team</p>
      `,
    });
    if (confirmError) {
      console.error("Resend confirmation to visitor failed (notification was sent):", confirmError);
    }

    return NextResponse.json({ success: true, message: "Sent" }, { status: 200 });
  } catch (error) {
    console.error("API /contact error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
