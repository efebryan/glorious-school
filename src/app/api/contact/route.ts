import { NextResponse } from "next/server";
import { resend, DEFAULT_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL, formatSchoolEmailHtml } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // If Resend is not configured yet, simulate success for local development
    if (!resend || !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("your-key")) {
      console.warn(
        "[Resend] RESEND_API_KEY is not set or is a placeholder. Simulating email dispatch."
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message received in development mode. Set RESEND_API_KEY in .env.local to send live emails.",
      });
    }

    // 1. Send notification to the school administration
    const adminEmailHtml = formatSchoolEmailHtml({
      title: "New Website Contact Inquiry",
      preheader: `Inquiry from ${name}: ${subject || "General Inquiry"}`,
      contentHtml: `
        <p style="margin-top: 0;">You have received a new message through the <strong>Glorious Group of Schools</strong> website contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569; width: 130px;">Sender Name:</td>
            <td style="padding: 10px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Email Address:</td>
            <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #155e37;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 0; font-weight: 600; color: #475569;">Subject:</td>
            <td style="padding: 10px 0; color: #0f172a;">${subject || "General Inquiry"}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border-left: 4px solid #155e37; padding: 16px; border-radius: 4px; margin: 16px 0;">
          <p style="margin: 0 0 6px 0; font-weight: 600; color: #334155; font-size: 13px; text-transform: uppercase;">Message Content:</p>
          <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${message}</p>
        </div>

        <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
          You can reply directly to this email to respond to <strong>${name}</strong> (${email}).
        </p>
      `,
    });

    const adminEmailResult = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: ADMIN_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${subject || "New Inquiry"} - ${name}`,
      html: adminEmailHtml,
    });

    if (adminEmailResult.error) {
      console.error("[Resend Error]", adminEmailResult.error);
      return NextResponse.json(
        { error: adminEmailResult.error.message || "Failed to deliver email through Resend." },
        { status: 500 }
      );
    }

    // 2. Send confirmation receipt to the user (non-blocking)
    try {
      const confirmationHtml = formatSchoolEmailHtml({
        title: "We Received Your Message",
        preheader: "Thank you for contacting Glorious Group of Schools",
        contentHtml: `
          <p style="margin-top: 0;">Dear <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to <strong>Glorious Group of Schools</strong>. We have received your inquiry regarding <em>"${subject || "General Inquiry"}"</em>.</p>
          <p>Our administrative office is reviewing your message and will respond to you within 24 to 48 working hours.</p>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: 600; color: #166534; font-size: 14px;">Urgent inquiries?</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #15803d;">
              Feel free to call our admissions desk at <strong>+234 800 123 4567</strong> (Mon-Fri 8am - 4pm).
            </p>
          </div>

          <p style="margin-bottom: 0;">Warm regards,<br><strong>Administrative Team</strong><br>Glorious Group of Schools</p>
        `,
      });

      await resend.emails.send({
        from: DEFAULT_FROM_EMAIL,
        to: email,
        subject: `Thank you for contacting Glorious Group of Schools`,
        html: confirmationHtml,
      });
    } catch (confError) {
      // Don't fail the primary request if the auto-responder fails
      console.warn("[Resend] Could not send confirmation receipt to user:", confError);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: adminEmailResult.data?.id,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown server error";
    console.error("[API Contact Route Error]", errorMessage);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
