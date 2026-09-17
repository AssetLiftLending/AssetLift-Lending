import nodemailer from 'nodemailer';

export interface MailAttachment {
  filename: string;
  content: Buffer;
}

export interface SendMailArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export class MissingSmtpCredentialsError extends Error {
  constructor() {
    super('SMTP credentials missing. Check Vercel environment variables.');
    this.name = 'MissingSmtpCredentialsError';
  }
}

/**
 * Build a transport from the SMTP_* environment variables.
 * Throws MissingSmtpCredentialsError when the credentials are absent so the
 * caller can report that distinctly from an authentication failure.
 */
export function createTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('Missing SMTP credentials. SMTP_USER:', !!SMTP_USER, 'SMTP_PASS:', !!SMTP_PASS);
    throw new MissingSmtpCredentialsError();
  }

  return nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendMail({ to, subject, html, replyTo, attachments }: SendMailArgs) {
  const transporter = createTransport();
  const from = process.env.SMTP_USER as string;

  await transporter.sendMail({
    from: `"AssetLift Lending" <${from}>`,
    to,
    replyTo: replyTo || from,
    subject,
    html,
    attachments,
  });
}

/**
 * Operations alert for a lead that reached us by email but failed to reach a
 * downstream system. Sent to the broker inbox so a sync failure is never silent;
 * the body carries the full lead so the record can be re-entered by hand.
 */
export async function sendSyncFailureAlert(args: {
  subject: string;
  system: string;
  error: string;
  lead: Record<string, unknown>;
}) {
  const rows = Object.entries(args.lead)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top;">${k}</td><td style="padding:4px 0;">${String(v)}</td></tr>`,
    )
    .join('');

  await sendMail({
    to: 'info@assetliftlending.com',
    subject: args.subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color:#b91c1c;margin-bottom:4px;">${args.system} sync failed</h2>
        <p style="margin-top:0;">This lead was captured by email but did <strong>not</strong> reach ${args.system}. Enter it by hand, or re-run the sync once the cause below is fixed.</p>
        <p style="background:#fef2f2;border-left:4px solid #b91c1c;padding:12px;font-family:monospace;white-space:pre-wrap;">${args.error}</p>
        <h3 style="margin-bottom:4px;">Lead</h3>
        <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
      </div>
    `,
  });
}
