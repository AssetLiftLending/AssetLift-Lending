import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const DOCUMENT_LABELS: Record<string, string> = {
  llcDocumentsFile: 'LLC Documents',
  purchaseContractFile: 'Purchase Contract',
  governmentIdFile: 'Government-Issued ID',
  scopeOfWorkFile: 'Scope of Work',
  recentExperienceFile: 'Recent Experience / Track Record',
  bankStatementFile: 'Bank Statement',
};

const ONLINE_WORKSHEET_COLUMNS: Record<string, string[]> = {
  rehabRows: [
    'Unit / Area',
    'Room',
    'Category',
    'Work Description',
    'Estimated Cost',
    'Contractor',
    'Notes',
  ],
  reoRows: [
    'Property Address',
    'Purchase Date',
    'Purchase Price',
    'Rehab Budget',
    'Sale / Refi Value',
    'Exit Date',
    'Lender',
    'Notes',
  ],
};

const ONLINE_WORKSHEET_KEYS: Record<string, string[]> = {
  rehabRows: ['unit', 'room', 'category', 'description', 'estimatedCost', 'contractor', 'notes'],
  reoRows: ['propertyAddress', 'purchaseDate', 'purchasePrice', 'rehabBudget', 'saleOrValue', 'exitDate', 'lender', 'notes'],
};

function escapeXml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function worksheetXml(name: string, columns: string[], keys: string[], rows: Array<Record<string, unknown>>) {
  const header = columns
    .map((column) => `<Cell><Data ss:Type="String">${escapeXml(column)}</Data></Cell>`)
    .join('');
  const body = rows
    .map((row) => {
      const cells = keys
        .map((key) => `<Cell><Data ss:Type="String">${escapeXml(row[key])}</Data></Cell>`)
        .join('');
      return `<Row>${cells}</Row>`;
    })
    .join('');

  return `
    <Worksheet ss:Name="${escapeXml(name)}">
      <Table>
        <Row>${header}</Row>
        ${body}
      </Table>
    </Worksheet>
  `;
}

function buildOnlineWorkbook(payload: Record<string, any>) {
  if (!payload.onlineWorksheetsJson) return null;

  try {
    const parsed = JSON.parse(String(payload.onlineWorksheetsJson));
    const rehabRows = Array.isArray(parsed.rehabRows) ? parsed.rehabRows : [];
    const reoRows = Array.isArray(parsed.reoRows) ? parsed.reoRows : [];

    const hasRows = [...rehabRows, ...reoRows].some((row) =>
      Object.values(row || {}).some((value) => String(value ?? '').trim()),
    );
    if (!hasRows) return null;

    const sheets = [
      worksheetXml('Rehab List', ONLINE_WORKSHEET_COLUMNS.rehabRows, ONLINE_WORKSHEET_KEYS.rehabRows, rehabRows),
      worksheetXml('REO Track Record', ONLINE_WORKSHEET_COLUMNS.reoRows, ONLINE_WORKSHEET_KEYS.reoRows, reoRows),
    ].join('');

    const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Top" ss:WrapText="1"/>
    </Style>
  </Styles>
  ${sheets}
</Workbook>`;

    return Buffer.from(workbook, 'utf8');
  } catch (error) {
    console.error('Online worksheet parsing failed:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let type = 'form';
    let payload: Record<string, any> = {};
    let attachments: Array<{ filename: string; content: Buffer }> = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      type = String(formData.get('type') || 'form');

      for (const [key, value] of formData.entries()) {
        if (!(value instanceof File)) {
          payload[key] = typeof value === 'string' ? value : '';
        }
      }

      const uploadedDocuments: string[] = [];

      for (const [fieldName, label] of Object.entries(DOCUMENT_LABELS)) {
        const values = formData.getAll(fieldName);
        const uploadedForField = values.filter(
          (value): value is File => value instanceof File && value.size > 0,
        );

        for (const value of uploadedForField) {
          attachments.push({
            filename: value.name,
            content: Buffer.from(await value.arrayBuffer()),
          });
        }

        if (uploadedForField.length > 0) {
          uploadedDocuments.push(
            uploadedForField.length === 1 ? label : `${label} (${uploadedForField.length} files)`,
          );
        }
      }

      const workbook = buildOnlineWorkbook(payload);
      if (workbook) {
        attachments.push({
          filename: 'assetlift-online-borrower-package.xls',
          content: workbook,
        });
        uploadedDocuments.push('Online Rehab / REO workbook');
      }

      payload.uploadedDocuments = uploadedDocuments;
    } else {
      const json = await req.json();
      type = json.type;
      payload = json.payload || {};
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP credentials. SMTP_USER:", !!SMTP_USER, "SMTP_PASS:", !!SMTP_PASS);
      return Response.json({ error: 'SMTP credentials missing. Check Vercel environment variables.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port: Number(SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Verify SMTP connection before sending
    await transporter.verify();

    const brokerSubject = type === 'form'
      ? `New Website Inquiry: ${payload.name || 'General'}`
      : `AI Deal Analysis Log - AssetLift`;

    const brokerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Inquiry Received</h2>
        <p><strong>Name:</strong> ${payload.name || 'Not Provided'}</p>
        <p><strong>Email:</strong> ${payload.email || 'Not Provided'}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'Not Provided'}</p>
        <p><strong>Program:</strong> ${payload.program || 'General Inquiry'}</p>
        <p><strong>Loan Purpose:</strong> ${payload.loanPurpose || 'N/A'}</p>
        <p><strong>Preferred Contact:</strong> ${payload.contactMethod || 'N/A'}</p>
        <p><strong>Text message consent:</strong> ${
          payload.smsConsent
            ? `GRANTED ${payload.smsConsentAt || ''} — this lead may be texted`
            : 'NOT granted — do not text this lead, call or email only'
        }</p>
        <p><strong>Purchase Price / Refi:</strong> $${payload.loanAmount || 'N/A'}</p>
        <p><strong>Projected ARV:</strong> $${payload.arv || 'N/A'}</p>
        <p><strong>Rehab Amount:</strong> $${payload.rehabAmount || 'N/A'}</p>
        <p><strong>Est. Credit Score:</strong> ${payload.creditScore || 'N/A'}</p>
        <p><strong>Property:</strong> ${payload.propertyAddress || 'N/A'}</p>
        <p><strong>Title Contact:</strong> ${payload.titleContact || 'N/A'}</p>
        <p><strong>Insurance Contact:</strong> ${payload.insuranceContact || 'N/A'}</p>
        <p><strong>SSN Last 4:</strong> ${payload.ssnLast4 || 'Not provided'}</p>
        <p><strong>Appraisal Payment Status:</strong> ${payload.appraisalPaymentStatus || 'N/A'}</p>
        <p><strong>Uploaded Documents:</strong> ${
          Array.isArray(payload.uploadedDocuments) && payload.uploadedDocuments.length > 0
            ? payload.uploadedDocuments.join(', ')
            : 'No files uploaded'
        }</p>
        <p><strong>Message:</strong><br/>${payload.message || 'No message provided.'}</p>
        ${payload.analysis_result ? `
          <div style="margin-top: 20px; padding: 15px; background: #f4f7fa; border-left: 4px solid #2563eb;">
            <strong>AI Chatbot Analysis:</strong>
            <pre style="white-space: pre-wrap; font-family: inherit;">${payload.analysis_result}</pre>
          </div>
        ` : ''}
      </div>
    `;

    await transporter.sendMail({
      from: `"AssetLift Lending" <${SMTP_USER}>`,
      to: "info@assetliftlending.com",
      replyTo: payload.email || SMTP_USER,
      subject: brokerSubject,
      html: brokerHtml,
      attachments,
    });

    if (type === 'form' && payload.email) {
      const userHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e7eb; border-top: 8px solid #2563eb;">
          <h1 style="color: #000; font-style: italic; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">AssetLift Lending</h1>
          <p style="font-size: 18px; font-weight: bold; color: #2563eb;">Application Received Successfully.</p>
          <p>Hi ${payload.name},</p>
          <p>Thank you for reaching out to AssetLift Lending. We have received your inquiry regarding <strong>${payload.program || 'financing'}</strong> and are currently reviewing your deal specifics.</p>

          <div style="background: #f9fafb; padding: 25px; border-radius: 4px; margin: 25px 0;">
            <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">What happens next?</p>
            <p style="margin: 10px 0 0 0; font-weight: bold; font-size: 16px;">One of our loan specialists will contact you within 24 hours, usually within a few hours, with a soft-quote or a request for additional items.</p>
          </div>

          ${
            Array.isArray(payload.uploadedDocuments) && payload.uploadedDocuments.length > 0
              ? `<p>We also received the following uploaded items: <strong>${payload.uploadedDocuments.join(', ')}</strong>.</p>`
              : ''
          }

          <p>If you have immediate questions, feel free to reply to this email or call us at +1 929-639-2284.</p>

          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />

          <p style="font-size: 11px; color: #9ca3af; line-height: 1.5;">
            <strong>AssetLift Lending</strong><br/>
            Private Lending for Real Estate Investors
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"AssetLift Lending" <${SMTP_USER}>`,
        to: payload.email,
        subject: "Confirmation: Your funding inquiry has been received",
        html: userHtml,
      });
    }

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Notification Error:", error?.code, error?.message, error?.response);
    const msg = error?.code === 'EAUTH'
      ? 'SMTP authentication failed. Check SMTP_USER and SMTP_PASS (use a Gmail App Password, not your account password).'
      : error?.code === 'ESOCKET' || error?.code === 'ECONNECTION'
      ? 'Cannot connect to SMTP server. Check SMTP_HOST and SMTP_PORT.'
      : error?.message || 'Internal Server Error';
    return Response.json({ error: msg }, { status: 500 });
  }
}
