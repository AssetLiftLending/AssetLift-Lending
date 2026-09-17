'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { usePortalDeals } from '@/lib/portal-store';
import { Deal, LoanType, DealStatus, LOAN_TYPE_LABELS, STATUS_CONFIG } from '@/lib/portal-types';
import { pushToGHL } from '@/services/ghlService';

const LOAN_TYPES: LoanType[] = ['fix-flip', 'dscr-rental', 'bridge', 'ground-up', 'commercial'];
const STATUSES: DealStatus[] = ['submitted', 'under_review', 'term_sheet_issued', 'docs_required', 'closing', 'funded', 'declined'];
const CREDIT_SCORES = ['760+', '720-759', '680-719', '640-679', '600-640', 'Below 600'];
const FLIP_OPTIONS = ['0', '1-3', '4-10', '11-25', '25+'];

function fmtCurrency(v: string) {
  const n = v.replace(/\D/g, '');
  return n ? Number(n).toLocaleString('en-US') : '';
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors';
const selectCls = 'w-full h-10 rounded-xl bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors';

export default function NewDealPage() {
  const router = useRouter();
  const { addDeal } = usePortalDeals();

  const [form, setForm] = useState({
    brokerName: '', brokerCompany: '', brokerEmail: '', brokerPhone: '',
    borrowerName: '', borrowerEmail: '', borrowerPhone: '',
    loanType: '' as LoanType | '',
    status: 'submitted' as DealStatus,
    propertyAddress: '',
    purchasePrice: '', arv: '', rehabAmount: '', loanAmount: '',
    creditScore: '', flipsCompleted: '', notes: '',
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const valid = form.borrowerName && form.borrowerEmail && form.borrowerPhone &&
    form.loanType && form.propertyAddress && form.purchasePrice && form.creditScore;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || !form.loanType) return;

    const deal: Deal = {
      id: `deal-${Date.now()}`,
      brokerName: form.brokerName || undefined,
      brokerCompany: form.brokerCompany || undefined,
      brokerEmail: form.brokerEmail || undefined,
      brokerPhone: form.brokerPhone || undefined,
      borrowerName: form.borrowerName,
      borrowerEmail: form.borrowerEmail,
      borrowerPhone: form.borrowerPhone,
      loanType: form.loanType,
      status: form.status,
      propertyAddress: form.propertyAddress,
      purchasePrice: Number(form.purchasePrice.replace(/\D/g, '')),
      arv: form.arv ? Number(form.arv.replace(/\D/g, '')) : undefined,
      rehabAmount: form.rehabAmount ? Number(form.rehabAmount.replace(/\D/g, '')) : undefined,
      loanAmount: form.loanAmount ? Number(form.loanAmount.replace(/\D/g, '')) : undefined,
      creditScore: form.creditScore,
      flipsCompleted: form.flipsCompleted || undefined,
      notes: form.notes || undefined,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addDeal(deal);
    // Awaited before navigating: router.push tears down this page, which would
    // cancel an in-flight unawaited request and drop the deal silently.
    await pushToGHL({
      name: form.borrowerName,
      email: form.borrowerEmail,
      phone: form.borrowerPhone,
      loanType: form.loanType,
      propertyAddress: form.propertyAddress,
      purchasePrice: form.purchasePrice,
      loanAmount: form.loanAmount || undefined,
      arv: form.arv || undefined,
      rehabAmount: form.rehabAmount || undefined,
      creditScore: form.creditScore,
      flipsCompleted: form.flipsCompleted || undefined,
      notes: form.notes || undefined,
      source: 'portal',
    });
    router.push(`/portal/deals/${deal.id}`);
  };

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/portal/deals" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Deals
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Add New Deal</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Broker Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-5">Broker Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Broker Name">
              <input className={inputCls} placeholder="Jane Broker" value={form.brokerName} onChange={e => set('brokerName', e.target.value)} />
            </Field>
            <Field label="Broker Company">
              <input className={inputCls} placeholder="Brokerage name" value={form.brokerCompany} onChange={e => set('brokerCompany', e.target.value)} />
            </Field>
            <Field label="Broker Email">
              <input className={inputCls} type="email" placeholder="broker@example.com" value={form.brokerEmail} onChange={e => set('brokerEmail', e.target.value)} />
            </Field>
            <Field label="Broker Phone">
              <input className={inputCls} placeholder="(555) 123-4567" value={form.brokerPhone} onChange={e => set('brokerPhone', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Borrower Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-5">Borrower Information</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Full Name" required>
              <input className={inputCls} placeholder="John Smith" value={form.borrowerName} onChange={e => set('borrowerName', e.target.value)} />
            </Field>
            <Field label="Email" required>
              <input className={inputCls} type="email" placeholder="john@example.com" value={form.borrowerEmail} onChange={e => set('borrowerEmail', e.target.value)} />
            </Field>
            <Field label="Phone" required>
              <input className={inputCls} placeholder="(555) 123-4567" value={form.borrowerPhone} onChange={e => set('borrowerPhone', e.target.value)} />
            </Field>
            <Field label="Credit Score" required>
              <select className={selectCls} value={form.creditScore} onChange={e => set('creditScore', e.target.value)}>
                <option value="">Select...</option>
                {CREDIT_SCORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Completed Flips">
              <select className={selectCls} value={form.flipsCompleted} onChange={e => set('flipsCompleted', e.target.value)}>
                <option value="">Select...</option>
                {FLIP_OPTIONS.map(s => <option key={s} value={s}>{s === '0' ? '0 — First time' : `${s} flips`}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Deal Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-5">Deal Details</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Field label="Loan Type" required>
              <select className={selectCls} value={form.loanType} onChange={e => set('loanType', e.target.value)}>
                <option value="">Select...</option>
                {LOAN_TYPES.map(t => <option key={t} value={t}>{LOAN_TYPE_LABELS[t]}</option>)}
              </select>
            </Field>
            <Field label="Deal Status">
              <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value as DealStatus)}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
              </select>
            </Field>
          </div>
          <div className="mb-4">
            <Field label="Property Address" required>
              <input className={inputCls} placeholder="123 Main St, City, State 00000" value={form.propertyAddress} onChange={e => set('propertyAddress', e.target.value)} />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Purchase Price" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                <input className={inputCls + ' pl-6'} placeholder="300,000" inputMode="numeric" value={form.purchasePrice} onChange={e => set('purchasePrice', fmtCurrency(e.target.value))} />
              </div>
            </Field>
            <Field label="Loan Amount">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                <input className={inputCls + ' pl-6'} placeholder="255,000" inputMode="numeric" value={form.loanAmount} onChange={e => set('loanAmount', fmtCurrency(e.target.value))} />
              </div>
            </Field>
            <Field label="ARV">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                <input className={inputCls + ' pl-6'} placeholder="450,000" inputMode="numeric" value={form.arv} onChange={e => set('arv', fmtCurrency(e.target.value))} />
              </div>
            </Field>
            <Field label="Rehab Budget">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
                <input className={inputCls + ' pl-6'} placeholder="60,000" inputMode="numeric" value={form.rehabAmount} onChange={e => set('rehabAmount', fmtCurrency(e.target.value))} />
              </div>
            </Field>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-5">Internal Notes</h2>
          <textarea
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none"
            rows={4}
            placeholder="Notes on the borrower, deal structure, timeline, concerns..."
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="flex items-center gap-2 bg-primary text-zinc-900 font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" /> Save Deal
        </button>
      </form>
    </div>
  );
}
