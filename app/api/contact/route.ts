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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Map subject values to readable labels
    const subjectLabels: Record<string, string> = {
      service: "Service & Repairs",
      parts: "Parts Inquiry",
      cvip: "CVIP Inspection",
      equipment: "Equipment Sales",
      emergency: "🚨 Emergency Service",
      other: "General Inquiry",
    };
    const subjectLabel = subjectLabels[subject] || subject;

    // Send notification email to the shop
    await getResend().emails.send({
      from: `Munden Website <${FROM_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `New Contact Form: ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7D3038; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 4px 0 0; opacity: 0.9;">${subjectLabel}</p>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 100px; vertical-align: top;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Subject:</td>
                <td style="padding: 8px 0;">${subjectLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">
            Sent from the Munden Truck & Equipment website contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to the customer
    await getResend().emails.send({
      from: `Munden Truck & Equipment <${FROM_EMAIL}>`,
      to: [email],
      subject: `We received your message — Munden Truck & Equipment`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7D3038; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Thank You, ${name}!</h2>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p>We've received your message and will get back to you as soon as possible.</p>
            <p>If your matter is urgent, please don't hesitate to call us directly:</p>
            <p style="font-size: 18px; font-weight: bold;">
              <a href="tel:250-828-2268" style="color: #7D3038; text-decoration: none;">📞 250-828-2268</a>
            </p>
            <p style="color: #6b7280;">We're available 24/7 for emergency service.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #6b7280; font-size: 13px;">
              <strong>Your message:</strong><br/>
              ${message}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
