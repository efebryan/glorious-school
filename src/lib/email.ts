import { Resend } from "resend";

// Initialize Resend client lazily to avoid throwing during builds if the key is empty
const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Default sender address. Resend free/test tier allows onboarding@resend.dev out-of-the-box
export const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Glorious Group of Schools <onboarding@resend.dev>";

// Recipient for contact form and admin notifications
export const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "info@gloriousschools.edu.ng";

/**
 * Common HTML wrapper with Glorious Schools branding
 */
export function formatSchoolEmailHtml({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; opacity: 0;">${preheader}</div>` : ""}
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #155e37; padding: 28px 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">
                Glorious Group of Schools
              </h1>
              <p style="color: #fde047; margin: 0; font-size: 13px; font-weight: 500;">
                Knowledge • Character • Vision — Ughelli, Delta State
              </p>
            </td>
          </tr>

          <!-- Title Banner -->
          <tr>
            <td style="padding: 24px 28px 12px 28px; border-bottom: 1px solid #f1f5f9;">
              <h2 style="margin: 0; color: #0f172a; font-size: 18px; font-weight: 600;">
                ${title}
              </h2>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 20px 28px 32px 28px; font-size: 15px; line-height: 1.6; color: #334155;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #475569;">
                Glorious Group of Schools
              </p>
              <p style="margin: 0 0 8px 0;">
                20 Daniel Umukoro Street, Ughelli, Delta State, Nigeria
              </p>
              <p style="margin: 0;">
                Phone: +234 800 123 4567 | Email: info@gloriousschools.edu.ng
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
