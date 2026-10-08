'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gtagEvent } from '@/lib/gtag';

type NumericControlProps = {
  id: string; label: string; value: string; onChange: (value: string) => void;
  min: number; max: number; step: number; display: (n: number) => string;
  helper?: string;
};

function NumericControl({ id, label, value, onChange, min, max, step, display, helper }: NumericControlProps) {
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
          <input id={id} aria-label={`${label}, enter a number`} className="w-[108px] bg-transparent py-2 text-right text-sm font-bold tabular-nums text-white outline-none" type="number" inputMode="decimal" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} />
        </div>
      </div>
      <input aria-label={`${label} slider`} className="mt-2 h-1.5 w-full cursor-pointer accent-gold" type="range" min={rangeMin} max={rangeMax} step={rangeStep} value={n} onChange={(event) => onChange(event.target.value)} />
      <div className="flex justify-between text-[9px] tabular-nums text-white/40"><span>{display(rangeMin)}</span><span>{display(rangeMax)}</span></div>
      {helper && <p className="mt-1 text-[10px] leading-relaxed text-white/45">{helper}</p>}
    </div>
  );
}

const usd = (value: number) => `$${Math.round(value).toLocaleString('en-US')}`;
const usdAxis = (value: number) => value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}m` : `$${Math.round(value / 1000)}k`;

export default function FlipCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('280000');
  const [rehabCost, setRehabCost] = useState('55000');
  const [arv, setArv] = useState('430000');
  const [holdingMonths, setHoldingMonths] = useState('6');
  const [interestRate, setInterestRate] = useState('10');
  const [closingCostPercent, setClosingCostPercent] = useState('3');
  const [sellingCostPercent, setSellingCostPercent] = useState('6');
  const [purchaseFinancingPercent, setPurchaseFinancingPercent] = useState('95');
  const trackedUse = useRef(false);
  const trackedBand = useRef('');

  const purchase = Math.max(0, Number.parseFloat(purchasePrice) || 0);
  const rehab = Math.max(0, Number.parseFloat(rehabCost) || 0);
  const afterRepair = Math.max(0, Number.parseFloat(arv) || 0);
  const months = Math.max(0, Number.parseFloat(holdingMonths) || 0);
  const rate = Math.max(0, Number.parseFloat(interestRate) || 0);
  const closingPct = Math.max(0, Number.parseFloat(closingCostPercent) || 0);
  const sellingPct = Math.max(0, Number.parseFloat(sellingCostPercent) || 0);
  const financingPct = Math.min(100, Math.max(0, Number.parseFloat(purchaseFinancingPercent) || 0));
  const loanAmount = purchase * financingPct / 100;
  const closingCosts = purchase * closingPct / 100;
  const holdingCosts = loanAmount * rate / 100 / 12 * months;
  const sellingCosts = afterRepair * sellingPct / 100;
  const totalCosts = purchase + rehab + closingCosts + holdingCosts + sellingCosts;
  const grossProfit = afterRepair - totalCosts;
  const estimatedCashNeeded = purchase - loanAmount + rehab + closingCosts;
  const roi = estimatedCashNeeded > 0 ? grossProfit / estimatedCashNeeded * 100 : 0;
  const grossMargin = afterRepair > 0 ? grossProfit / afterRepair * 100 : 0;
  const hasValues = purchase > 0 && afterRepair > 0;
  const marginBand = roi >= 20 ? '20% plus' : roi >= 10 ? '10% to 19.9%' : roi >= 0 ? '0% to 9.9%' : 'negative';

  useEffect(() => {
    if (!hasValues) return;
    if (!trackedUse.current) {
      trackedUse.current = true;
      gtagEvent('calculator_started', { calculator: 'fix_and_flip', query: 'fix and flip loan calculator' });
    }
    gtagEvent('calculator_completed', { calculator: 'fix_and_flip', margin_band: marginBand });
    if (trackedBand.current !== marginBand) {
      trackedBand.current = marginBand;
      gtagEvent('calculator_margin_band', { calculator: 'fix_and_flip', margin_band: marginBand });
    }
  }, [hasValues, marginBand]);

  const applyParams = new URLSearchParams({
    loanPurpose: 'purchase', source: 'fix-and-flip-calculator', strategy: 'fix-flip',
    purchasePrice, rehabAmount: rehabCost, arv, holdingMonths, interestRate,
    closingCostPercent, sellingCostPercent, purchaseFinancingPercent,
    loanAmount: String(Math.round(loanAmount)), cashNeeded: String(Math.round(estimatedCashNeeded)), grossProfit: String(Math.round(grossProfit)), roi: roi.toFixed(1), totalCosts: String(Math.round(totalCosts)), holdingCosts: String(Math.round(holdingCosts)), sellingCosts: String(Math.round(sellingCosts)),
  }).toString();

  const fields = [
    { id: 'purchase-price', label: 'Purchase price', value: purchasePrice, onChange: setPurchasePrice, min: 50000, max: 1500000, step: 1000, display: usdAxis, helper: 'Contract price before purchase closing costs.' },
    { id: 'rehab-budget', label: 'Rehab budget', value: rehabCost, onChange: setRehabCost, min: 0, max: 500000, step: 1000, display: usdAxis, helper: 'Current estimated construction budget; contingency is not added automatically.' },
    { id: 'arv', label: 'After-repair value (ARV)', value: arv, onChange: setArv, min: 50000, max: 2000000, step: 1000, display: usdAxis, helper: 'Use nearby closed sales that support the finished value.' },
    { id: 'purchase-financing', label: 'Purchase financing', value: purchaseFinancingPercent, onChange: setPurchaseFinancingPercent, min: 0, max: 100, step: 1, display: (n: number) => `${n}%`, helper: 'Editable illustrative share of purchase price financed; not an offer or assumed program approval.' },
    { id: 'holding-period', label: 'Hold period', value: holdingMonths, onChange: setHoldingMonths, min: 0, max: 24, step: 0.5, display: (n: number) => `${n} mo`, helper: 'Interest is modeled as simple monthly interest on the derived purchase loan.' },
    { id: 'interest-rate', label: 'Annual interest rate', value: interestRate, onChange: setInterestRate, min: 0, max: 24, step: 0.1, display: (n: number) => `${n}%`, helper: 'Illustrative rate only; actual financing cost and structure may differ.' },
    { id: 'closing-costs', label: 'Purchase closing costs', value: closingCostPercent, onChange: setClosingCostPercent, min: 0, max: 10, step: 0.1, display: (n: number) => `${n}%`, helper: 'Modeled as a share of purchase price; actual costs vary.' },
    { id: 'selling-costs', label: 'Selling costs', value: sellingCostPercent, onChange: setSellingCostPercent, min: 0, max: 15, step: 0.1, display: (n: number) => `${n}%`, helper: 'Modeled as a share of ARV; actual commissions, transfer taxes, concessions, and fees vary.' },
  ];
  const scaleValue = Math.max(0, Math.min(100, grossMargin / 30 * 100));

  return (
    <div className="min-h-screen bg-[#0b1321] text-white">
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-6 md:px-6 md:pt-10">
        <div className="mb-4 text-[10px] font-medium text-white/45">Tools / Property renovation</div>
        <header className="mb-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Free investor tool</p>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">Free fix and flip calculator</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">Pressure-test your purchase, rehab, hold, and sale assumptions. Adjust the example values to explore a scenario.</p>
        </header>

        <section className="rounded-2xl bg-[#172941] p-5" aria-live="polite" aria-label="Live fix and flip estimate">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">Modeled project profit</div>
          <div className="mt-1 flex items-end justify-between gap-3"><div className={`text-[54px] font-black leading-none tracking-[-0.07em] tabular-nums ${grossProfit < 0 ? 'text-rose-200' : 'text-white'}`}>{usd(grossProfit)}</div><span className="mb-2 rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-bold text-white/70">LIVE</span></div>
          <p className="mt-2 text-[11px] text-white/55">After modeled purchase, rehab, carry, and selling costs</p>
          <div className="relative mt-4 h-[5px] rounded-full bg-white/15"><div className="h-full rounded-full bg-gold transition-[width]" style={{ width: `${scaleValue}%` }} /><div className="absolute -top-[4px] h-[13px] w-[13px] -translate-x-1/2 rounded-full border-[3px] border-gold bg-white" style={{ left: `${scaleValue}%` }} /></div>
          <div className="mt-1 flex justify-between text-[9px] text-white/40"><span>0% margin</span><span>15%</span><span>30%+ of ARV</span></div>
          <p className="mt-2 text-[10px] text-white/55">Modeled profit {usd(grossProfit)} ÷ ARV {usd(afterRepair)} = {grossMargin.toFixed(1)}% of ARV</p>
        </section>

        <section className="mt-3 grid grid-cols-2 gap-3" aria-label="Cash and loan estimates">
          <div className="border-b border-white/15 pb-3"><p className="text-[10px] text-white/50">Estimated cash needed</p><strong className="mt-1 block text-xl font-extrabold tabular-nums">{usd(estimatedCashNeeded)}</strong><p className="mt-1 text-[9px] leading-relaxed text-white/40">Purchase equity + full rehab + modeled purchase costs.</p></div>
          <div className="border-b border-white/15 pb-3"><p className="text-[10px] text-white/50">Loan amount · derived</p><strong className="mt-1 block text-xl font-extrabold tabular-nums">{usd(loanAmount)}</strong><p className="mt-1 text-[9px] text-white/40">{usd(purchase)} price × {financingPct}% financed</p></div>
        </section>

        <section className="mt-6" aria-labelledby="flip-scenario-heading">
          <div className="mb-3 flex items-center justify-between"><h2 id="flip-scenario-heading" className="text-sm font-bold">Set your scenario</h2><span className="rounded-full border border-white/15 px-2 py-1 text-[8px] font-bold tracking-wide text-white/50">EDITABLE EXAMPLES</span></div>
          {fields.map((field) => <NumericControl key={field.id} {...field} />)}
        </section>

        <div className="mt-5 rounded-xl border-l-2 border-gold bg-white/[0.04] px-3 py-3 text-[10px] leading-relaxed text-white/55">
          Profit = ARV − purchase price − rehab − modeled purchase closing costs − simple interest carry − modeled selling costs. Estimated cash needed = purchase-price equity + full rehab + purchase closing-cost assumption. Cash needed excludes interest/carry reserves, lender and draw fees, taxes, insurance, utilities, contingency, and other costs. ROI is modeled profit divided by modeled cash needed. Defaults are illustrative, not a quote, approval, or full project budget.
        </div>

        <Link href={`/apply?${applyParams}`} onClick={() => gtagEvent('calculator_cta_clicked', { calculator: 'fix_and_flip', margin_band: marginBand })} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-center text-sm font-extrabold text-[#152137] transition-colors hover:bg-[#f5cd71]">
          Review my flip scenario <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-[9px] leading-relaxed text-white/40">The next step carries these figures into the review form. Contact and property-address details are still needed.</p>
      </section>
    </div>
  );
}
