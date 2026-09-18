'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Download,
  FileText,
  Mail,
  Plus,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sendFormNotification } from '@/services/notificationService';
import { pushToGHL } from '@/services/ghlService';

type UploadField =
  | 'llcDocumentsFile'
  | 'purchaseContractFile'
  | 'governmentIdFile'
  | 'scopeOfWorkFile'
  | 'recentExperienceFile'
  | 'bankStatementFile';

interface BorrowerPackageFormValues {
  name: string;
  email: string;
  phone: string;
  purchasePrice: string;
  arv: string;
  rehabAmount: string;
  propertyAddress: string;
  titleContact: string;
  insuranceContact: string;
  ssnLast4: string;
  appraisalPaymentStatus: string;
  notes: string;
}

type RehabRow = {
  unit: string;
  room: string;
  category: string;
  description: string;
  estimatedCost: string;
  contractor: string;
  notes: string;
};

type ReoRow = {
  propertyAddress: string;
  purchaseDate: string;
  purchasePrice: string;
  rehabBudget: string;
  saleOrValue: string;
  exitDate: string;
  lender: string;
  notes: string;
};

const DOWNLOADS = [
  { label: 'Rehab List Template', href: '/forms/rehab-list-template-multi-unit.xlsx' },
  { label: 'Track Record Example', href: '/forms/track-record-example.xlsx' },
];

const UPLOAD_FIELDS: Array<{ key: UploadField; label: string; description: string }> = [
  {
    key: 'llcDocumentsFile',
    label: 'LLC Documents',
    description: 'Operating agreement, entity docs, EIN letter, or your cleanest entity package.',
  },
  {
    key: 'purchaseContractFile',
    label: 'Purchase Contract',
    description: 'Executed contract or the cleanest purchase paperwork you have.',
  },
  {
    key: 'governmentIdFile',
    label: 'Government-Issued ID',
    description: 'Driver’s license or passport for the borrower or signer.',
  },
  {
    key: 'scopeOfWorkFile',
    label: 'Scope of Work',
    description: 'Upload your rehab scope, budget, or completed rehab list template.',
  },
  {
    key: 'recentExperienceFile',
    label: 'Recent Experience / REO',
    description: 'Track record, completed flip history, or recent project summary.',
  },
  {
    key: 'bankStatementFile',
    label: 'Bank Statement',
    description: 'Recent liquidity support for down payment, reserves, or capital support.',
  },
];

const EMPTY_FORM: BorrowerPackageFormValues = {
  name: '',
  email: '',
  phone: '',
  purchasePrice: '',
  arv: '',
  rehabAmount: '',
  propertyAddress: '',
  titleContact: '',
  insuranceContact: '',
  ssnLast4: '',
  appraisalPaymentStatus: '',
  notes: '',
};

const EMPTY_REHAB_ROW: RehabRow = {
  unit: '',
  room: '',
  category: '',
  description: '',
  estimatedCost: '',
  contractor: '',
  notes: '',
};

const EMPTY_REO_ROW: ReoRow = {
  propertyAddress: '',
  purchaseDate: '',
  purchasePrice: '',
  rehabBudget: '',
  saleOrValue: '',
  exitDate: '',
  lender: '',
  notes: '',
};

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, '');
  const char: Record<number, string> = { 0: '(', 3: ') ', 6: '-' };
  let formatted = '';
  for (let i = 0; i < numbers.length && i < 10; i++) {
    formatted += (char[i] || '') + numbers[i];
  }
  return formatted;
}

function formatCurrency(value: string) {
  const raw = value.replace(/\D/g, '');
  return raw ? Number(raw).toLocaleString('en-US') : '';
}

export default function BorrowerPackageForm() {
  const [form, setForm] = useState<BorrowerPackageFormValues>(EMPTY_FORM);
  const [files, setFiles] = useState<Record<UploadField, File[]>>({
    llcDocumentsFile: [],
    purchaseContractFile: [],
    governmentIdFile: [],
    scopeOfWorkFile: [],
    recentExperienceFile: [],
    bankStatementFile: [],
  });
  const [showOnlineRehab, setShowOnlineRehab] = useState(false);
  const [showOnlineReo, setShowOnlineReo] = useState(false);
  const [rehabRows, setRehabRows] = useState<RehabRow[]>([
    { ...EMPTY_REHAB_ROW },
    { ...EMPTY_REHAB_ROW },
    { ...EMPTY_REHAB_ROW },
  ]);
  const [reoRows, setReoRows] = useState<ReoRow[]>([
    { ...EMPTY_REO_ROW },
    { ...EMPTY_REO_ROW },
    { ...EMPTY_REO_ROW },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const maxUploadBytes = 10 * 1024 * 1024;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Fix & Flip Borrower Package',
    description:
      'A resource page where fix and flip borrowers can download templates and upload the main documents needed for deal review.',
    url: 'https://www.assetliftlending.com/resources/fix-and-flip-borrower-package',
    about: ['Fix and flip loans', 'Borrower package', 'Hard money lending documents'],
  };

  const handleChange = (key: keyof BorrowerPackageFormValues, value: string) => {
    let nextValue = value;
    if (key === 'phone') nextValue = formatPhone(value);
    if (key === 'purchasePrice' || key === 'arv' || key === 'rehabAmount') {
      nextValue = formatCurrency(value);
    }
    if (key === 'ssnLast4') nextValue = value.replace(/\D/g, '').slice(0, 4);
    setForm((prev) => ({ ...prev, [key]: nextValue }));
  };

  const handleFileChange = (field: UploadField, selectedFiles: FileList | null) => {
    const nextFiles = Array.from(selectedFiles || []);
    const oversized = nextFiles.find((file) => file.size > maxUploadBytes);

    if (oversized) {
      toast({
        title: 'File too large',
        description: `${oversized.name} is larger than 10MB. Please upload a smaller file or email it instead.`,
        variant: 'destructive',
      });
      return;
    }
    setFiles((prev) => ({ ...prev, [field]: nextFiles }));
  };

  const updateRehabRow = (index: number, key: keyof RehabRow, value: string) => {
    setRehabRows((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              [key]: key === 'estimatedCost' ? formatCurrency(value) : value,
            }
          : row,
      ),
    );
  };

  const updateReoRow = (index: number, key: keyof ReoRow, value: string) => {
    setReoRows((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              [key]:
                key === 'purchasePrice' || key === 'rehabBudget' || key === 'saleOrValue'
                  ? formatCurrency(value)
                  : value,
            }
          : row,
      ),
    );
  };

  const removeRehabRow = (index: number) => {
    setRehabRows((prev) => (prev.length === 1 ? prev : prev.filter((_, rowIndex) => rowIndex !== index)));
  };

  const removeReoRow = (index: number) => {
    setReoRows((prev) => (prev.length === 1 ? prev : prev.filter((_, rowIndex) => rowIndex !== index)));
  };

  const hasAnyWorksheetData = () => {
    const activeRehabRows = showOnlineRehab
      ? rehabRows.filter((row) => Object.values(row).some((value) => value.trim()))
      : [];
    const activeReoRows = showOnlineReo
      ? reoRows.filter((row) => Object.values(row).some((value) => value.trim()))
      : [];
    return {
      rehabRows: activeRehabRows,
      reoRows: activeReoRows,
      hasData: activeRehabRows.length > 0 || activeReoRows.length > 0,
    };
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.purchasePrice || !form.propertyAddress) {
      toast({
        title: 'Missing required fields',
        description: 'Please complete the required borrower and property information first.',
        variant: 'destructive',
      });
      return false;
    }
    if (!form.titleContact || !form.insuranceContact) {
      toast({
        title: 'Missing required contacts',
        description: 'Please include the title contact and insurance contact.',
        variant: 'destructive',
      });
      return false;
    }
    if (form.ssnLast4 && form.ssnLast4.length < 4) {
      toast({
        title: 'SSN last 4 incomplete',
        description: 'Enter the last 4 digits only, or leave it blank for follow-up.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const totalAttachmentSize = Object.values(files).reduce(
      (sum, fileList) => sum + fileList.reduce((fileSum, file) => fileSum + file.size, 0),
      0,
    );

    if (totalAttachmentSize > 20 * 1024 * 1024) {
      toast({
        title: 'Attachments too large',
        description: 'Please keep total uploads under 20MB or email the package instead.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = new FormData();
      submission.append('type', 'form');
      submission.append('name', form.name);
      submission.append('email', form.email);
      submission.append('phone', form.phone);
      submission.append('program', 'fix-flip-borrower-package');
      submission.append('loanPurpose', 'purchase');
      submission.append('contactMethod', 'email');
      submission.append('loanAmount', form.purchasePrice);
      submission.append('arv', form.arv);
      submission.append('rehabAmount', form.rehabAmount);
      submission.append('propertyAddress', form.propertyAddress);
      submission.append('titleContact', form.titleContact);
      submission.append('insuranceContact', form.insuranceContact);
      submission.append('ssnLast4', form.ssnLast4);
      submission.append('appraisalPaymentStatus', form.appraisalPaymentStatus);
      submission.append('message', form.notes);

      const onlineWorksheets = hasAnyWorksheetData();
      if (onlineWorksheets.hasData) {
        submission.append(
          'onlineWorksheetsJson',
          JSON.stringify({
            rehabRows: onlineWorksheets.rehabRows,
            reoRows: onlineWorksheets.reoRows,
          }),
        );
      }

      for (const [key, fileList] of Object.entries(files) as Array<[UploadField, File[]]>) {
        for (const file of fileList) {
          submission.append(key, file);
        }
      }

      const success = await sendFormNotification(submission);

      // Record in the CRM regardless of the email result. The uploaded files
      // only travel by email, but the borrower and their deal belong in the CRM
      // either way — that is what someone follows up from.
      await pushToGHL({
        name: form.name,
        email: form.email,
        phone: form.phone,
        loanType: 'fix-flip',
        propertyAddress: form.propertyAddress,
        purchasePrice: form.purchasePrice,
        arv: form.arv || undefined,
        rehabAmount: form.rehabAmount || undefined,
        notes: form.notes || undefined,
        source: 'borrower-package',
      });

      if (!success) {
        toast({
          title: 'Submission Error',
          description: 'Please try again or email info@assetliftlending.com directly.',
          variant: 'destructive',
        });
        return;
      }

      setIsSubmitted(true);
      toast({
        title: 'Borrower package submitted',
        description: 'We received the package and will review it shortly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="container px-4 md:px-6 pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources' },
            { label: 'Fix & Flip Borrower Package' },
          ]}
        />
      </div>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Fix &amp; Flip Resource
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                  Borrower Package Upload
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Use this page to send the main documents for a fix and flip review. If you do
                  not want to upload online, download the templates and email the package instead.
                </p>

                <div className="rounded-3xl border border-border bg-card p-6 md:p-8 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                    Download templates
                  </p>
                  <div className="space-y-3">
                    {DOWNLOADS.map((doc) => (
                      <a
                        key={doc.href}
                        href={doc.href}
                        download
                        className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                      >
                        <span>{doc.label}</span>
                        <Download className="h-4 w-4 text-primary" />
                      </a>
                    ))}
                    <a
                      href="mailto:info@assetliftlending.com?subject=Fix%20%26%20Flip%20Borrower%20Package"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/30"
                    >
                      <span>Email package instead</span>
                      <Mail className="h-4 w-4 text-primary" />
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-secondary/20 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <p className="font-semibold">Security note</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Do not submit a full SSN or full credit card details through this form. Use
                    the last 4 of SSN only. Appraisal payment is handled separately after review.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Borrower Package Received</h2>
                    <p className="text-muted-foreground mb-6">
                      We received your fix and flip borrower package and will review it shortly.
                    </p>
                    <Button asChild>
                      <Link href="/loans/fix-and-flip">Back to Fix &amp; Flip Loans</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Borrower Information</h2>
                      <p className="text-sm text-muted-foreground">
                        Fill out the basics, add the worksheet details online if you do not want
                        to download Excel, then upload the supporting files you already have.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyAddress">Property Address *</Label>
                        <Input id="propertyAddress" value={form.propertyAddress} onChange={(e) => handleChange('propertyAddress', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchasePrice">Purchase Price *</Label>
                        <Input id="purchasePrice" value={form.purchasePrice} onChange={(e) => handleChange('purchasePrice', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="arv">Projected ARV</Label>
                        <Input id="arv" value={form.arv} onChange={(e) => handleChange('arv', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rehabAmount">Rehab Amount</Label>
                        <Input id="rehabAmount" value={form.rehabAmount} onChange={(e) => handleChange('rehabAmount', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssnLast4">SSN Last 4</Label>
                        <Input id="ssnLast4" value={form.ssnLast4} onChange={(e) => handleChange('ssnLast4', e.target.value)} maxLength={4} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="titleContact">Title Contact *</Label>
                        <Input id="titleContact" value={form.titleContact} onChange={(e) => handleChange('titleContact', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceContact">Insurance Contact *</Label>
                        <Input id="insuranceContact" value={form.insuranceContact} onChange={(e) => handleChange('insuranceContact', e.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="appraisalPaymentStatus">Credit Card for Appraisal</Label>
                        <Select value={form.appraisalPaymentStatus} onValueChange={(value) => handleChange('appraisalPaymentStatus', value)}>
                          <SelectTrigger id="appraisalPaymentStatus">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ready-now">Ready to provide on request</SelectItem>
                            <SelectItem value="needs-follow-up">Need follow-up from AssetLift</SelectItem>
                            <SelectItem value="already-on-file">Already provided separately</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Excel Worksheets</h3>
                        <p className="text-sm text-muted-foreground">
                          You can download the Excel templates or fill them out here. Online entries
                          are emailed to AssetLift as an Excel-compatible workbook.
                        </p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold">Rehab List</p>
                              <p className="text-xs text-muted-foreground">
                                Add scope, budget, contractor, and notes directly on this page.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant={showOnlineRehab ? 'secondary' : 'outline'}
                              size="sm"
                              onClick={() => setShowOnlineRehab((value) => !value)}
                            >
                              {showOnlineRehab ? 'Hide' : 'Fill Online'}
                            </Button>
                          </div>
                          <a
                            href="/forms/rehab-list-template-multi-unit.xlsx"
                            download
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            Download Excel instead
                            <Download className="h-4 w-4" />
                          </a>
                        </div>

                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold">REO / Track Record</p>
                              <p className="text-xs text-muted-foreground">
                                Add recent experience, REO purchases, exits, and lender history.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant={showOnlineReo ? 'secondary' : 'outline'}
                              size="sm"
                              onClick={() => setShowOnlineReo((value) => !value)}
                            >
                              {showOnlineReo ? 'Hide' : 'Fill Online'}
                            </Button>
                          </div>
                          <a
                            href="/forms/track-record-example.xlsx"
                            download
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            Download Excel instead
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>

                      {showOnlineRehab && (
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold">Online Rehab List</p>
                              <p className="text-xs text-muted-foreground">
                                Add one line per scope item. Blank rows are ignored.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setRehabRows((prev) => [...prev, { ...EMPTY_REHAB_ROW }])}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Row
                            </Button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-[920px] w-full text-sm">
                              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                <tr>
                                  <th className="p-2">Unit / Area</th>
                                  <th className="p-2">Room</th>
                                  <th className="p-2">Category</th>
                                  <th className="p-2">Work Description</th>
                                  <th className="p-2">Est. Cost</th>
                                  <th className="p-2">Contractor</th>
                                  <th className="p-2">Notes</th>
                                  <th className="p-2">Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rehabRows.map((row, index) => (
                                  <tr key={`rehab-${index}`} className="border-t border-border">
                                    <td className="p-2">
                                      <Input value={row.unit} onChange={(e) => updateRehabRow(index, 'unit', e.target.value)} placeholder="Unit 1" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.room} onChange={(e) => updateRehabRow(index, 'room', e.target.value)} placeholder="Kitchen" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.category} onChange={(e) => updateRehabRow(index, 'category', e.target.value)} placeholder="Cabinets" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.description} onChange={(e) => updateRehabRow(index, 'description', e.target.value)} placeholder="Replace lowers" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.estimatedCost} onChange={(e) => updateRehabRow(index, 'estimatedCost', e.target.value)} placeholder="5,000" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.contractor} onChange={(e) => updateRehabRow(index, 'contractor', e.target.value)} placeholder="GC name" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.notes} onChange={(e) => updateRehabRow(index, 'notes', e.target.value)} placeholder="Draw 1" />
                                    </td>
                                    <td className="p-2">
                                      <Button type="button" variant="ghost" size="icon" onClick={() => removeRehabRow(index)} aria-label="Remove rehab row">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {showOnlineReo && (
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold">Online REO / Track Record</p>
                              <p className="text-xs text-muted-foreground">
                                Add recent projects or REO purchases. Blank rows are ignored.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setReoRows((prev) => [...prev, { ...EMPTY_REO_ROW }])}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Row
                            </Button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-[1020px] w-full text-sm">
                              <thead className="text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                <tr>
                                  <th className="p-2">Property Address</th>
                                  <th className="p-2">Purchase Date</th>
                                  <th className="p-2">Purchase Price</th>
                                  <th className="p-2">Rehab Budget</th>
                                  <th className="p-2">Sale / Refi Value</th>
                                  <th className="p-2">Exit Date</th>
                                  <th className="p-2">Lender</th>
                                  <th className="p-2">Notes</th>
                                  <th className="p-2">Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reoRows.map((row, index) => (
                                  <tr key={`reo-${index}`} className="border-t border-border">
                                    <td className="p-2">
                                      <Input value={row.propertyAddress} onChange={(e) => updateReoRow(index, 'propertyAddress', e.target.value)} placeholder="123 Main St" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.purchaseDate} onChange={(e) => updateReoRow(index, 'purchaseDate', e.target.value)} placeholder="MM/YYYY" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.purchasePrice} onChange={(e) => updateReoRow(index, 'purchasePrice', e.target.value)} placeholder="250,000" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.rehabBudget} onChange={(e) => updateReoRow(index, 'rehabBudget', e.target.value)} placeholder="50,000" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.saleOrValue} onChange={(e) => updateReoRow(index, 'saleOrValue', e.target.value)} placeholder="375,000" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.exitDate} onChange={(e) => updateReoRow(index, 'exitDate', e.target.value)} placeholder="MM/YYYY" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.lender} onChange={(e) => updateReoRow(index, 'lender', e.target.value)} placeholder="Prior lender" />
                                    </td>
                                    <td className="p-2">
                                      <Input value={row.notes} onChange={(e) => updateReoRow(index, 'notes', e.target.value)} placeholder="Sold / refi" />
                                    </td>
                                    <td className="p-2">
                                      <Button type="button" variant="ghost" size="icon" onClick={() => removeReoRow(index)} aria-label="Remove REO row">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        {UPLOAD_FIELDS.map((field) => (
                          <div key={field.key} className="rounded-2xl border border-border bg-background p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <Label htmlFor={field.key}>{field.label}</Label>
                            </div>
                            <Input
                              id={field.key}
                              type="file"
                              multiple
                              onChange={(e) => handleFileChange(field.key, e.target.files)}
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                            />
                            <p className="text-xs text-muted-foreground">{field.description}</p>
                            {files[field.key].length > 0 && (
                              <div className="space-y-1 text-xs text-primary">
                                <p>{files[field.key].length} file(s) attached:</p>
                                <ul className="list-disc pl-4">
                                  {files[field.key].map((file) => (
                                    <li key={`${field.key}-${file.name}`}>{file.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        rows={5}
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder="Anything we should know about the timeline, experience, exit strategy, title, or insurance."
                      />
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/15 p-5 text-sm text-muted-foreground">
                      This resource is for business-purpose investment property financing only.
                      Do not submit a full SSN or full credit card information through this form.
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full py-7 text-lg glow-primary" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : (
                        <>
                          Submit Borrower Package
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
