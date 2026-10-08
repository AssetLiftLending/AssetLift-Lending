'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gtagEvent } from '@/lib/gtag';

type NumericControlProps = {
  id: string; label: string; value: string; onChange: (value: string) => void;
  min: number; max: number; step: number; display: (n: number) => string;
  helper?: string; ariaLabel?: string;
};

function NumericControl({ id, label, value, onChange, min, max, step, display, helper, ariaLabel }: NumericControlProps) {
  const parsed = Number.parseFloat(value);
  const n = Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min;
  const rangeStep = Math.min(step, (max - min) / 100 || step);
  const rangeMin = Math.min(min, n);
  const rangeMax = Math.max(max, n);
  const setNumericValue = (next: string) => {
    if (next === '') { onChange(''); return; }
    const parsedNext = Number.parseFloat(next);
    if (Number.isFinite(parsedNext)) onChange(String(Math.min(max, Math.max(min, parsedNext))));
  };
  const formattedValue = display(n);
  const currencyValue = formattedValue.startsWith('$');
  const percentValue = formattedValue.endsWith('%');
  return (
    <div className="border-b border-white/10 py-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="min-w-0 text-xs text-white/75">{label}</label>
        <div className="flex shrink-0 items-center rounded-lg border border-white/15 bg-white/[0.04] px-2 focus-within:border-gold/70 focus-within:ring-1 focus-within:ring-gold/40">
          {currencyValue && <span className="pr-0.5 text-xs font-semibold text-white/55">$</span>}
          <span className="sr-only">Edit {label}</span>
          <input id={id} aria-label={ariaLabel || `${label}, enter a number`} className={`${percentValue ? 'w-[72px]' : 'w-[88px]'} bg-transparent py-2 text-right text-sm font-bold tabular-nums text-white outline-none placeholder:text-white/35`} type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={(event) => setNumericValue(event.target.value)} />
          {percentValue && <span className="pl-0.5 text-xs font-semibold text-white/55">%</span>}
        </div>
      </div>
      <input id={`${id}-slider`} aria-label={`${label} slider`} className="mt-2 h-1.5 w-full cursor-pointer accent-gold" type="range" min={rangeMin} max={rangeMax} step={rangeStep} value={n} onChange={(event) => onChange(event.target.value)} />
      <div className="flex justify-between text-[9px] tabular-nums text-white/40"><span>{display(min)}</span><span>{display(max)}</span></div>
      {helper && <p className="mt-1 text-[10px] leading-relaxed text-white/45">{helper}</p>}
    </div>
  );
}

const usd = (value: number) => `$${Math.round(value).toLocaleString('en-US')}`;
const usdAxis = (value: number) => value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}m` : `$${Math.round(value / 1000)}k`;

export default function DSCRCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('3200');
  const [purchasePrice, setPurchasePrice] = useState('485000');
  const [loanPurpose, setLoanPurpose] = useState<'purchase' | 'refinance'>('purchase');
  const [leverage, setLeverage] = useState('80');
  const [refiPayoff, setRefiPayoff] = useState('0');
  const [closingPct, setClosingPct] = useState('3');
  const [monthlyMortgage, setMonthlyMortgage] = useState('2050');
  const [monthlyTaxes, setMonthlyTaxes] = useState('350');
  const [monthlyInsurance, setMonthlyInsurance] = useState('150');
  const [monthlyHoa, setMonthlyHoa] = useState('100');
  const [vacancy, setVacancy] = useState('5');
  const trackedUse = useRef(false);
  const trackedBand = useRef('');

  const purchase = Math.max(0, Number.parseFloat(purchasePrice) || 0);
  const parsedLeverage = Math.max(0, Number.parseFloat(leverage) || 0);
  const leverageCap = loanPurpose === 'purchase' ? 85 : 80;
  const effectiveLeverage = Math.min(parsedLeverage, leverageCap);
  const loanAmount = purchase * effectiveLeverage / 100;
  const payoff = Math.max(0, Number.parseFloat(refiPayoff) || 0);
  const costsPct = Math.max(0, Number.parseFloat(closingPct) || 0);
  const modeledClosingCosts = purchase * costsPct / 100;
  const purchaseCashToClose = purchase - loanAmount + modeledClosingCosts;
  const refiNetAtClose = loanAmount - payoff - modeledClosingCosts;
  const rent = Math.max(0, Number.parseFloat(monthlyRent) || 0);
  const mortgage = Math.max(0, Number.parseFloat(monthlyMortgage) || 0);
  const taxes = Math.max(0, Number.parseFloat(monthlyTaxes) || 0);
  const insurance = Math.max(0, Number.parseFloat(monthlyInsurance) || 0);
  const hoa = Math.max(0, Number.parseFloat(monthlyHoa) || 0);
  const vacancyPct = Math.min(100, Math.max(0, Number.parseFloat(vacancy) || 0));
  const effectiveRent = rent * (1 - vacancyPct / 100);
  const monthlyPayment = mortgage + taxes + insurance + hoa;
  const dscr = monthlyPayment > 0 ? effectiveRent / monthlyPayment : 0;
  const hasValues = rent > 0 && monthlyPayment > 0;
  const resultBand = dscr >= 1.25 ? '1.25x or higher' : dscr >= 1 ? '1.00x to 1.24x' : 'Below 1.00x';

  useEffect(() => {
    if (!hasValues) return;
    if (!trackedUse.current) {
      trackedUse.current = true;
      gtagEvent('calculator_started', { calculator: 'dscr', query: 'dscr loan calculator' });
    }
    gtagEvent('calculator_completed', { calculator: 'dscr', result_band: resultBand });
    if (trackedBand.current !== resultBand) {
      trackedBand.current = resultBand;
      gtagEvent('calculator_result_band', { calculator: 'dscr', result_band: resultBand });
    }
  }, [hasValues, resultBand]);

  const applyParams = new URLSearchParams({
    loanPurpose: loanPurpose === 'purchase' ? 'purchase' : 'refinance', source: 'dscr-calculator', strategy: 'rental', purchasePrice,
    loanAmount: String(Math.round(loanAmount)), leverage: String(effectiveLeverage),
    refiPayoff: String(Math.round(payoff)), dscr: dscr.toFixed(2), effectiveRent: String(Math.round(effectiveRent)), monthlyPayment: String(Math.round(monthlyPayment)), cashToClose: String(Math.round(purchaseCashToClose)), netAtClose: String(Math.round(refiNetAtClose)), rent: monthlyRent, mortgage: monthlyMortgage,
    taxes: monthlyTaxes, insurance: monthlyInsurance, hoa: monthlyHoa, vacancy,
    closingCostPercent: closingPct,
  }).toString();

  const resultRatio = Math.max(0, Math.min(100, dscr / 1.5 * 100));
  const fields = [
    { id: 'purchase-price', label: loanPurpose === 'purchase' ? 'Purchase price' : 'Current property value', value: purchasePrice, onChange: setPurchasePrice, min: 0, max: 1500000, step: 1000, display: usdAxis, helper: 'Illustrative default. Use the deal-specific price or current value.' },
    { id: 'leverage', label: 'Loan-to-value', value: String(effectiveLeverage), onChange: (v: string) => setLeverage(String(Math.min(leverageCap, Math.max(0, Number.parseFloat(v) || 0)))), min: 0, max: leverageCap, step: 1, display: (n: number) => `${n}%`, helper: `Editable planning input. Maximum shown: ${leverageCap}% for ${loanPurpose === 'purchase' ? 'purchase' : 'refinance'}; actual terms depend on program and underwriting.` },
    ...(loanPurpose === 'refinance' ? [{ id: 'refi-payoff', label: 'Existing loan payoff', value: refiPayoff, onChange: setRefiPayoff, min: 0, max: 1500000, step: 1000, display: usdAxis, helper: 'Use the current payoff amount for an illustrative net-at-close estimate.' }] : []),
    { id: 'rent', label: 'Monthly gross rent', value: monthlyRent, onChange: setMonthlyRent, min: 0, max: 15000, step: 50, display: (n: number) => usd(n), helper: 'Use current lease rent or a supported estimate, before vacancy.' },
    { id: 'mortgage', label: 'Principal & interest / month', value: monthlyMortgage, onChange: setMonthlyMortgage, min: 0, max: 10000, step: 25, display: (n: number) => usd(n), helper: 'Enter principal and interest only. Add taxes and insurance below.' },
    { id: 'taxes', label: 'Property taxes / month', value: monthlyTaxes, onChange: setMonthlyTaxes, min: 0, max: 3000, step: 25, display: (n: number) => usd(n), helper: 'Use the current annual tax bill divided by 12 when available.' },
    { id: 'insurance', label: 'Insurance / month', value: monthlyInsurance, onChange: setMonthlyInsurance, min: 0, max: 2000, step: 25, display: (n: number) => usd(n), helper: 'Use a current, property-specific insurance quote.' },
    { id: 'hoa', label: 'HOA dues / month', value: monthlyHoa, onChange: setMonthlyHoa, min: 0, max: 2000, step: 25, display: (n: number) => usd(n), helper: 'Include required association dues; enter zero if none.' },
    { id: 'vacancy', label: 'Vacancy allowance', value: vacancy, onChange: setVacancy, min: 0, max: 25, step: 0.5, display: (n: number) => `${n}%`, helper: 'Illustrative assumption; a lender may apply a different rent adjustment.' },
    { id: 'closing-costs', label: loanPurpose === 'purchase' ? 'Purchase closing costs' : 'Refinance closing costs', value: closingPct, onChange: setClosingPct, min: 0, max: 10, step: 0.1, display: (n: number) => `${n}%`, helper: 'Editable assumption applied to price or value; excludes costs not entered here.' },
  ];

  return (
    <div className="min-h-screen bg-[#0b1321] text-white">
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-6 md:px-6 md:pt-10">
        <div className="mb-4 text-[10px] font-medium text-white/45">Tools / Rental property</div>
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Free investor tool</p>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">Free DSCR calculator</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">See how rent compares with the property's monthly housing payment. Adjust the example values to explore a scenario.</p>
        </header>

        <section className="rounded-2xl bg-[#172941] p-5" aria-live="polite" aria-label="Live DSCR estimate">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">Your rent coverage</div>
          <div className="mt-1 flex items-end justify-between gap-4">
            <div className="text-[68px] font-black leading-none tracking-[-0.075em] tabular-nums">{dscr.toFixed(2)}<span className="text-3xl text-gold">×</span></div>
            <span className="mb-2 rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white/70">LIVE</span>
          </div>
          <div className="relative mt-4 h-[5px] rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gold transition-[width]" style={{ width: `${resultRatio}%` }} />
            <div className="absolute -top-[3px] h-[11px] w-[2px] -translate-x-1/2 bg-white/60" style={{ left: `${100 / 1.5 * 1}%` }} aria-hidden="true" />
            <div className="absolute -top-[4px] h-[13px] w-[13px] -translate-x-1/2 rounded-full border-[3px] border-gold bg-white" style={{ left: `${resultRatio}%` }} aria-hidden="true" />
          </div>
          <div className="mt-1 flex justify-between text-[9px] tabular-nums text-white/40"><span>0.00x</span><span>1.00x</span><span>1.50x</span></div>
          <p className="mt-3 text-[11px] text-white/60">{usd(effectiveRent)} rent after vacancy / {usd(monthlyPayment)} monthly PITIA + HOA</p>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-3" aria-label="Cash and loan estimates">
          <div className="border-b border-white/15 pb-3"><p className="text-[10px] text-white/50">{loanPurpose === 'purchase' ? 'Cash to close · purchase' : refiNetAtClose >= 0 ? 'Estimated net proceeds · refi' : 'Cash needed · refinance'}</p><strong className="mt-1 block text-xl font-extrabold tabular-nums">{usd(loanPurpose === 'purchase' ? purchaseCashToClose : Math.abs(refiNetAtClose))}</strong><p className="mt-1 text-[9px] leading-relaxed text-white/40">{loanPurpose === 'purchase' ? 'Price − modeled loan + estimated closing costs.' : refiNetAtClose >= 0 ? 'New loan − payoff − estimated closing costs; not a proceeds commitment.' : 'Estimated amount needed after modeled loan, payoff, and closing costs.'}</p></div>
          <div className="border-b border-white/15 pb-3"><p className="text-[10px] text-white/50">Loan amount · derived</p><strong className="mt-1 block text-lg font-extrabold tabular-nums">{usd(loanAmount)}</strong><p className="mt-1 text-[9px] text-white/40">{usd(purchase)} value × {effectiveLeverage}% LTV</p></div>
        </section>

        <section className="mt-6" aria-labelledby="dscr-scenario-heading">
          <div className="mb-3 flex items-center justify-between"><h2 id="dscr-scenario-heading" className="text-sm font-bold">Set your scenario</h2><span className="rounded-full border border-white/15 px-2 py-1 text-[8px] font-bold tracking-wide text-white/50">EDITABLE EXAMPLES</span></div>
          <div className="flex rounded-xl bg-[#1c2b42] p-1" role="group" aria-label="Loan purpose">
            {(['purchase', 'refinance'] as const).map((purpose) => <button key={purpose} type="button" onClick={() => { setLoanPurpose(purpose); setLeverage((v) => String(Math.min(Number.parseFloat(v) || 0, purpose === 'purchase' ? 85 : 80))); }} aria-pressed={loanPurpose === purpose} className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-bold capitalize transition-colors ${loanPurpose === purpose ? 'bg-gold text-[#152137]' : 'text-white/60 hover:text-white'}`}>{purpose === 'purchase' ? 'Purchase' : 'Refinance'}</button>)}
          </div>
          <p className="mt-2 text-[10px] text-white/45">Maximum leverage shown: 85% purchase · 80% refinance. Actual eligibility and terms depend on underwriting.</p>
          <div className="mt-2">
            {fields.map((field) => <NumericControl key={field.id} {...field} />)}
          </div>
        </section>

        <div className="mt-5 rounded-xl border-l-2 border-gold bg-white/[0.04] px-3 py-3 text-[10px] leading-relaxed text-white/55">
          DSCR here = gross rent after vacancy ÷ principal, interest, taxes, insurance, and HOA. It is not NOI or profit. Lenders may use different rent and payment methods. All starting figures and closing costs are editable planning assumptions. {loanPurpose === 'purchase' ? 'Cash-to-close estimate excludes lender fees, prepaid/escrow items, rehab, and other costs. The P&I figure is an editable input, not calculated from loan amount or an offered interest rate.' : 'Net-at-close estimate uses the entered payoff and closing-cost assumption; excludes other lender, title, prepaid, escrow, and transaction costs.'} This is not a loan quote, approval, or commitment to lend.
        </div>

        <Link href={`/apply?${applyParams}`} onClick={() => gtagEvent('calculator_cta_clicked', { calculator: 'dscr', result_band: resultBand })} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-center text-sm font-extrabold text-[#152137] transition-colors hover:bg-[#f5cd71]">
          Review my rental scenario <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-[9px] leading-relaxed text-white/40">The next step carries these figures into the review form. Contact and property-address details are still needed.</p>
      </section>
    </div>
  );
}
