'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { gtagEvent } from '@/lib/gtag';

export default function DSCRCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [purchaseClosingPct, setPurchaseClosingPct] = useState('3');
  const [monthlyMortgage, setMonthlyMortgage] = useState('');
  const [monthlyTaxes, setMonthlyTaxes] = useState('');
  const [monthlyInsurance, setMonthlyInsurance] = useState('');
  const [monthlyHoa, setMonthlyHoa] = useState('');
  const [vacancy, setVacancy] = useState('5');
  const trackedUse = useRef(false);
  const trackedBand = useRef('');

  const rent = parseFloat(monthlyRent) || 0;
  const purchase = parseFloat(purchasePrice) || 0;
  const loan = parseFloat(loanAmount) || 0;
  const closingPct = Number.isFinite(Number.parseFloat(purchaseClosingPct)) ? Math.max(0, Number.parseFloat(purchaseClosingPct)) : 3;
  const closingCosts = purchase * closingPct / 100;
  const estimatedCashToClose = purchase - loan + closingCosts;
  const hasCashInputs = purchase > 0 && loanAmount.trim() !== '' && loan >= 0 && loan <= purchase;
  const mortgage = parseFloat(monthlyMortgage) || 0;
  const taxes = parseFloat(monthlyTaxes) || 0;
  const insurance = parseFloat(monthlyInsurance) || 0;
  const hoa = parseFloat(monthlyHoa) || 0;
  const parsedVacancy = Number.parseFloat(vacancy);
  const vacancyPct = Number.isFinite(parsedVacancy) ? Math.min(100, Math.max(0, parsedVacancy)) : 5;

  const effectiveRent = rent * (1 - vacancyPct / 100);
  const totalDebt = mortgage + taxes + insurance + hoa;
  const dscr = totalDebt > 0 ? effectiveRent / totalDebt : 0;
  const annualDebt = totalDebt * 12;
  const monthlyCashFlow = effectiveRent - totalDebt;

  const hasValues = rent > 0 && totalDebt > 0;

  useEffect(() => {
    if (hasValues && !trackedUse.current) {
      trackedUse.current = true;
      gtagEvent('calculator_started', { calculator: 'dscr', query: 'dscr loan calculator' });
    }
  }, [hasValues]);

  const getDSCRStatus = (ratio: number) => {
    if (ratio >= 1.25) return { label: '1.25x or higher' };
    if (ratio >= 1.0) return { label: '1.00x to 1.24x' };
    return { label: 'Below 1.00x' };
  };

  const status = getDSCRStatus(dscr);

  useEffect(() => {
    if (!hasValues) return;
    gtagEvent('calculator_completed', { calculator: 'dscr', result_band: status.label });
    if (trackedBand.current !== status.label) {
      trackedBand.current = status.label;
      gtagEvent('calculator_result_band', { calculator: 'dscr', result_band: status.label });
    }
  }, [hasValues, status.label]);

  const applyParams = new URLSearchParams({ loanPurpose: 'dscr', source: 'dscr-calculator', strategy: 'rental', rent: monthlyRent, mortgage: monthlyMortgage, taxes: monthlyTaxes, insurance: monthlyInsurance, hoa: monthlyHoa, vacancy, purchasePrice, loanAmount, purchaseClosingPct }).toString();

  const currency = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const inputClass = 'h-11 w-full rounded-md border border-input bg-background px-3 text-base font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  const tipClass = 'ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-muted-foreground/50 text-muted-foreground';
  const fields: { id: string; label: string; hint: string; value: string; change: (value: string) => void; placeholder: string; suffix?: string }[] = [
    { id: 'purchasePrice', label: 'Purchase price', hint: 'Enter the property purchase price. This is only used for the planning cash-to-close estimate.', value: purchasePrice, change: setPurchasePrice, placeholder: '485,000' },
    { id: 'loanAmount', label: 'Loan amount', hint: 'Enter the proposed loan amount. No loan-to-value or leverage is assumed by the calculator.', value: loanAmount, change: setLoanAmount, placeholder: '0 if no loan' },
    { id: 'purchaseClosingPct', label: 'Purchase closing costs (default 3%)', hint: 'The 3% starting value is a planning assumption applied to purchase price. Replace it with a property-specific estimate; actual costs vary.', value: purchaseClosingPct, change: setPurchaseClosingPct, placeholder: '3', suffix: '%' },
    { id: 'rent', label: 'Monthly gross rent', hint: 'Enter current contract rent or a supported market-rent estimate before vacancy.', value: monthlyRent, change: setMonthlyRent, placeholder: '3,200' },
    { id: 'mortgage', label: 'Monthly principal & interest', hint: 'Enter P&I only. Add property taxes and insurance in their separate fields.', value: monthlyMortgage, change: setMonthlyMortgage, placeholder: '2,050' },
    { id: 'taxes', label: 'Property taxes / month', hint: 'Use the actual property tax bill divided by 12 when available.', value: monthlyTaxes, change: setMonthlyTaxes, placeholder: '350' },
    { id: 'insurance', label: 'Insurance / month', hint: 'Use a current, property-specific insurance quote.', value: monthlyInsurance, change: setMonthlyInsurance, placeholder: '150' },
    { id: 'hoa', label: 'HOA dues / month', hint: 'Include required association dues. Enter 0 if there are none.', value: monthlyHoa, change: setMonthlyHoa, placeholder: '100' },
    { id: 'vacancy', label: 'Vacancy allowance', hint: 'A planning assumption only; the lender may use a different rent source or adjustment.', value: vacancy, change: setVacancy, placeholder: '5', suffix: '%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="container px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-10">
        <div className="mb-5 text-xs text-muted-foreground">Tools / Rental property</div>
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">Free investor tool</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal md:text-4xl">Free DSCR calculator</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">See how rent compares with the property's monthly housing payment. Change an assumption and the estimate updates instantly.</p>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
          <section className="order-2 rounded-xl border border-border bg-card p-4 shadow-sm md:p-6 lg:order-1" aria-labelledby="dscr-input-title">
            <h2 id="dscr-input-title" className="text-lg font-bold text-charcoal">Rental property inputs</h2>
            <p className="mb-5 mt-1 text-xs text-muted-foreground">Start with current rent and the complete monthly housing payment.</p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="mb-1.5 flex min-h-8 items-start text-xs font-semibold leading-4 text-foreground">
                    {field.label}
                    <span className={tipClass} tabIndex={0} role="img" aria-label={`Help: ${field.hint}`} title={field.hint}><Info className="h-2.5 w-2.5" /></span>
                  </label>
                  <div className="relative">
                    <input id={field.id} className={`${inputClass} ${field.suffix ? 'pr-8' : ''}`} type="number" inputMode="decimal" min="0" max={field.id === 'vacancy' || field.id === 'purchaseClosingPct' ? '100' : field.id === 'loanAmount' && purchase > 0 ? String(purchase) : undefined} step="any" placeholder={field.placeholder} value={field.value} onChange={(event) => field.change(event.target.value)} />
                    {field.suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">{field.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="order-1 rounded-2xl bg-charcoal p-5 text-white shadow-lg md:p-6 lg:sticky lg:top-5 lg:order-2" aria-live="polite" aria-label="Live DSCR estimate">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gold">Illustrative coverage estimate</p>
            {hasValues ? <div className="mt-1 text-5xl font-extrabold tracking-tight md:text-6xl">{dscr.toFixed(2)}x</div> : <div className="mt-1 text-5xl font-extrabold tracking-tight md:text-6xl">--</div>}
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
              <span className={`h-2 w-2 rounded-full ${dscr >= 1 ? 'bg-emerald-300' : 'bg-amber-300'}`} />
              {hasValues ? (dscr >= 1 ? 'Rent covers modeled payment' : 'Rent below modeled payment') : 'Add rent and payment'}
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gold transition-[width]" style={{ width: `${Math.max(0, Math.min(100, dscr / 1.5 * 100))}%` }} /></div>
            <div className="mt-1 flex justify-between text-[10px] text-white/65"><span>Below 1.00x</span><span>1.25x+</span></div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-4 text-xs"><span className="text-white/70">Effective rent ÷ monthly PITIA</span><strong className="text-base">{hasValues ? `${currency(effectiveRent)} ÷ ${currency(totalDebt)}` : '—'}</strong></div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Effective monthly rent</span><strong className="mt-1 block text-base">{hasValues ? currency(effectiveRent) : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Annual debt service</span><strong className="mt-1 block text-base">{hasValues ? currency(annualDebt) : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Monthly PITIA</span><strong className="mt-1 block text-base">{hasValues ? currency(totalDebt) : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Vacancy assumption</span><strong className="mt-1 block text-base">{vacancyPct}%</strong></div>
            </div>
            <div className="mt-3 rounded-lg border border-gold/50 bg-gold/10 p-3">
              <div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold text-white/85">Estimated cash to close</span><strong className="text-lg">{hasCashInputs ? currency(estimatedCashToClose) : 'Enter valid price + loan'}</strong></div>
              <p className="mt-1 text-[10px] leading-relaxed text-white/70">Planning estimate: purchase price − entered loan amount + the editable {closingPct}% closing-cost assumption. Not a quote. Excludes lender fees, prepaid/escrow items, rehab, and other costs.</p>
            </div>
            <Link href={`/apply?${applyParams}`} onClick={() => gtagEvent('calculator_cta_clicked', { calculator: 'dscr', result_band: status.label })} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-center text-sm font-bold text-charcoal transition-colors hover:bg-gold-dark">
              Review my rental scenario <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-[10px] leading-relaxed text-white/70">Planning estimate only, not a loan quote or approval. Program formulas and accepted rent sources vary. Lenders also review value, credit, reserves, condition, and the complete file.</p>
          </aside>
        </div>
        <div className="mt-4 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground md:mt-6 md:p-5">
          <span className="mr-2 inline-block rounded bg-gold/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold-dark">How to read it</span>
          Here, modeled rent is reduced by the vacancy assumption, then divided by principal, interest, taxes, insurance, and HOA dues. DSCR is not the same as net operating income or profit. Enter each cost once and compare the result with the lender's current method.
        </div>
      </section>
    </div>
  );
}
