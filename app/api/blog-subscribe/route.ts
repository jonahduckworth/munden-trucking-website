import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "kamloops.shop@mundengroup.ca";
const FROM_EMAIL = process.env.FROM_EMAIL || "jonah@jdbuilds.ca";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  return new Resend(process.env.RESEND_API_KEY);
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = readString(body.email);
    const name = readString(body.name);
    const company = readString(body.company);
    const honeypot = readString(body.website);

    if (honeypot) {
      return NextResponse.json({ message: "Subscribed successfully" });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    await getResend().emails.send({
      from: `Munden Website <${FROM_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `New Blog Subscriber: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7D3038; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Blog Subscriber</h2>
            <p style="margin: 4px 0 0; opacity: 0.9;">Add this contact to the Munden blog mailing list.</p>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 110px; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Name:</td>
                <td style="padding: 8px 0;">${escapeHtml(name || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Company:</td>
                <td style="padding: 8px 0;">${escapeHtml(company || "Not provided")}</td>
              </tr>
            </table>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">
            Sent from the Munden Truck & Equipment resources page.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Error processing blog subscription:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again." },
      { status: 500 },
    );
  }
}
