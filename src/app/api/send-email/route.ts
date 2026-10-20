import { NextResponse } from "next/server";
import { resend, DEFAULT_FROM_EMAIL, formatSchoolEmailHtml } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, title, htmlContent, text } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Recipient ('to') and 'subject' are required." },
        { status: 400 }
      );
    }

    if (!resend || !process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Email dispatch simulated (development mode). Set RESEND_API_KEY to send live emails.",
      });
    }

    const emailHtml = htmlContent
      ? formatSchoolEmailHtml({
          title: title || subject,
          contentHtml: htmlContent,
        })
      : undefined;

    const data = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      ...(emailHtml ? { html: emailHtml } : { text: text || "" }),
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error sending email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
