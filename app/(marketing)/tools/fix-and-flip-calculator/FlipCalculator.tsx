'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { gtagEvent } from '@/lib/gtag';

export default function FlipCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rehabCost, setRehabCost] = useState('');
  const [arv, setArv] = useState('');
  const [holdingMonths, setHoldingMonths] = useState('6');
  const [interestRate, setInterestRate] = useState('10');
  const [closingCostPercent, setClosingCostPercent] = useState('3');
  const [sellingCostPercent, setSellingCostPercent] = useState('6');
  const [purchaseFinancingPercent, setPurchaseFinancingPercent] = useState('95');
  const trackedUse = useRef(false);
  const trackedBand = useRef('');

  const purchase = parseFloat(purchasePrice) || 0;
  const rehab = parseFloat(rehabCost) || 0;
  const afterRepair = parseFloat(arv) || 0;
  const months = Number.isFinite(Number.parseFloat(holdingMonths)) ? Math.max(0, Number.parseFloat(holdingMonths)) : 6;
  const rate = Number.isFinite(Number.parseFloat(interestRate)) ? Math.max(0, Number.parseFloat(interestRate)) : 10;
  const closingPct = Number.isFinite(Number.parseFloat(closingCostPercent)) ? Math.max(0, Number.parseFloat(closingCostPercent)) : 3;
  const sellingPct = Number.isFinite(Number.parseFloat(sellingCostPercent)) ? Math.max(0, Number.parseFloat(sellingCostPercent)) : 6;
  const financingPct = Number.isFinite(Number.parseFloat(purchaseFinancingPercent)) ? Math.min(100, Math.max(0, Number.parseFloat(purchaseFinancingPercent))) : 95;

  const totalInvestment = purchase + rehab;
  const loanAmount = purchase * financingPct / 100;
  const closingCosts = purchase * (closingPct / 100);
  const holdingCosts = loanAmount * (rate / 100 / 12) * months;
  const sellingCosts = afterRepair * (sellingPct / 100);
  const totalCosts = totalInvestment + closingCosts + holdingCosts + sellingCosts;
  const grossProfit = afterRepair - totalCosts;
  const estimatedCashNeeded = purchase - loanAmount + rehab + closingCosts;
  const roi = estimatedCashNeeded > 0 ? (grossProfit / estimatedCashNeeded) * 100 : 0;

  const hasValues = purchase > 0 && afterRepair > 0;
  const marginBand = roi >= 20 ? '20% plus' : roi >= 10 ? '10% to 19.9%' : roi >= 0 ? '0% to 9.9%' : 'negative';

  useEffect(() => {
    if (hasValues && !trackedUse.current) {
      trackedUse.current = true;
      gtagEvent('calculator_started', { calculator: 'fix_and_flip', query: 'fix and flip loan calculator' });
    }
  }, [hasValues]);

  useEffect(() => {
    if (!hasValues) return;
    gtagEvent('calculator_completed', { calculator: 'fix_and_flip', margin_band: marginBand });
    if (trackedBand.current !== marginBand) { trackedBand.current = marginBand; gtagEvent('calculator_margin_band', { calculator: 'fix_and_flip', margin_band: marginBand }); }
  }, [hasValues, marginBand]);

  const applyParams = new URLSearchParams({ loanPurpose: 'fix-and-flip', source: 'fix-and-flip-calculator', strategy: 'fix-flip', purchasePrice, rehabAmount: rehabCost, arv, holdingMonths, interestRate, closingCostPercent, sellingCostPercent, purchaseFinancingPercent }).toString();

  const currency = (value: number) => `$${Math.round(value).toLocaleString()}`;
  const inputClass = 'h-11 w-full rounded-md border border-input bg-background px-3 text-base font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  const tipClass = 'ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-muted-foreground/50 text-muted-foreground';
  const fields: { id: string; label: string; hint: string; value: string; change: (value: string) => void; placeholder: string; suffix?: string }[] = [
    { id: 'purchase', label: 'Purchase price', hint: 'Contract purchase price, before purchase closing costs.', value: purchasePrice, change: setPurchasePrice, placeholder: '280,000' },
    { id: 'rehab', label: 'Rehab budget', hint: 'Current estimated construction budget; add contingency elsewhere because it is not included.', value: rehabCost, change: setRehabCost, placeholder: '55,000' },
    { id: 'arv', label: 'After-repair value (ARV)', hint: 'Supported expected resale value after work is complete.', value: arv, change: setArv, placeholder: '420,000' },
    { id: 'months', label: 'Hold period', suffix: 'mo', hint: 'Estimated months from purchase through sale. Interest is modeled as simple monthly interest.', value: holdingMonths, change: setHoldingMonths, placeholder: '6' },
    { id: 'rate', label: 'Annual interest rate', suffix: '%', hint: 'Illustrative annual interest rate applied to 95% of purchase price; actual loan structure and fees may differ.', value: interestRate, change: setInterestRate, placeholder: '10' },
    { id: 'closing', label: 'Purchase closing costs', suffix: '%', hint: 'Estimated percentage of purchase price. Does not include every possible lender, title, tax, or escrow charge.', value: closingCostPercent, change: setClosingCostPercent, placeholder: '3' },
    { id: 'selling', label: 'Selling costs', suffix: '%', hint: 'Estimated percentage of ARV for sale costs; actual commissions, transfer taxes, concessions, and fees vary.', value: sellingCostPercent, change: setSellingCostPercent, placeholder: '6' },
    { id: 'financing', label: 'Purchase financing (default 95%)', suffix: '%', hint: 'Editable assumed share of purchase price financed. The default matches the previous calculator assumption; actual leverage varies by lender and deal.', value: purchaseFinancingPercent, change: setPurchaseFinancingPercent, placeholder: '95' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="container px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-10">
        <div className="mb-5 text-xs text-muted-foreground">Tools / Property renovation</div>
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">Free investor tool</p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-charcoal md:text-4xl">Free fix and flip calculator</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">Pressure-test the purchase, rehab, carry, and sale assumptions in your deal. Estimates recalculate as you edit.</p>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
          <section className="order-2 rounded-xl border border-border bg-card p-4 shadow-sm md:p-6 lg:order-1" aria-labelledby="flip-input-title">
            <h2 id="flip-input-title" className="text-lg font-bold text-charcoal">Deal assumptions</h2>
            <p className="mb-5 mt-1 text-xs text-muted-foreground">Use property-specific estimates; defaults are illustrative.</p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="mb-1.5 flex min-h-8 items-start text-xs font-semibold leading-4 text-foreground">{field.label}<span className={tipClass} tabIndex={0} role="img" aria-label={`Help: ${field.hint}`} title={field.hint}><Info className="h-2.5 w-2.5" /></span></label>
                  <div className="relative"><input id={field.id} className={`${inputClass} ${field.suffix ? 'pr-10' : ''}`} type="number" inputMode="decimal" min="0" step="any" placeholder={field.placeholder} value={field.value} onChange={(event) => field.change(event.target.value)} />{field.suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">{field.suffix}</span>}</div>
                </div>
              ))}
            </div>
          </section>
          <aside className="order-1 rounded-2xl bg-charcoal p-5 text-white shadow-lg md:p-6 lg:sticky lg:top-5 lg:order-2" aria-live="polite" aria-label="Live fix and flip estimate">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gold">Estimated project profit</p>
            <div className={`mt-1 text-4xl font-extrabold tracking-tight md:text-5xl ${grossProfit >= 0 ? 'text-white' : 'text-rose-300'}`}>{hasValues ? currency(grossProfit) : '—'}</div>
            <p className="mt-2 text-xs text-white/70">After modeled purchase, rehab, carry, and selling costs</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Estimated cash needed</span><strong className="mt-1 block text-base">{hasValues ? currency(estimatedCashNeeded) : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Estimated ROI on modeled cash</span><strong className="mt-1 block text-base">{hasValues ? `${roi.toFixed(1)}%` : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">All-in modeled costs</span><strong className="mt-1 block text-base">{hasValues ? currency(totalCosts) : '—'}</strong></div>
              <div className="rounded-lg border border-white/15 p-3"><span className="block text-[10px] text-white/65">Hold period</span><strong className="mt-1 block text-base">{months} months</strong></div>
            </div>
            <div className="mt-4 rounded-lg bg-white/5 p-3 text-xs leading-relaxed text-white/75">Cash estimate = purchase-price equity from the financing assumption + full rehab budget + modeled purchase closing costs. Excludes interest/carry reserves, lender and draw fees, taxes, insurance, utilities, contingency, and other costs.</div>
            <Link href={`/apply?${applyParams}`} onClick={() => gtagEvent('calculator_cta_clicked', { calculator: 'fix_and_flip', margin_band: marginBand })} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-center text-sm font-bold text-charcoal transition-colors hover:bg-gold-dark">Review my flip scenario <ArrowRight className="h-4 w-4" /></Link>
            <p className="mt-3 text-[10px] leading-relaxed text-white/70">Planning estimate only, not a loan quote, approval, or full cash-to-close estimate. Financing and actual costs depend on lender, property, market, and project details.</p>
          </aside>
        </div>
        <div className="mt-4 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground md:mt-6 md:p-5"><span className="mr-2 inline-block rounded bg-gold/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold-dark">Model assumptions</span>Purchase financing defaults to the previous 95% assumption and is editable; interest is simple interest on that modeled loan amount for the hold period. Total costs include purchase + rehab, purchase closing costs, modeled interest, and selling costs. Profit excludes costs not entered or described here; independently verify every deal expense.</div>
      </section>

      <section className="container px-4 pb-10 md:px-6">
        <div className="max-w-4xl mx-auto mt-8 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How to Underwrite a Flip More Realistically
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A fix and flip calculator is most useful when it helps you pressure-test the deal
                  instead of confirming the number you want to see. Build enough spread to test whether
                  the project can absorb a rehab change, longer hold, or weaker resale without wiping
                  out the margin.
                </p>
                <p>
                  Start with the purchase, rehab budget, and after-repair value. Then be harder on
                  the assumptions that investors most often understate: carry time, financing cost,
                  and selling friction. If the deal only works under optimistic timelines, it
                  probably does not have enough room.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Support the ARV',
                  text: 'Use closed comparable sales from the exact neighborhood and avoid stretching into the highest comp unless the finish level truly supports it.',
                },
                {
                  title: 'Stress-test the hold',
                  text: 'Permits, contractor delays, inspection lag, and resale timing can extend carrying costs. Compare the base case with a longer hold.'
                },
                {
                  title: 'Model cash reserves',
                  text: 'Gross profit can look strong while the actual cash required is still too high. Compare projected margin against the cash you need to control the project.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Fix and Flip Calculator FAQ</h2>
              <div className="space-y-6">
                {[
                  {
                    question: 'What profit margin should a house flip target?',
                    answer:
                      'There is no universal profit target. The right cushion depends on the property, scope, market, leverage, hold time, and reserves. Stress-test higher costs and lower sale proceeds; this tool does not judge whether the deal fits your risk tolerance.',
                  },
                  {
                    question: 'Should I judge a flip by gross profit or ROI?',
                    answer:
                      'Use both, but read the formula. Gross profit is estimated sale proceeds less this model’s included costs; ROI divides that figure by the model’s assumed cash investment. Neither includes every cash need or substitutes for a deal-level cash-flow analysis.',
                  },
                  {
                    question: 'What numbers do investors most often miss?',
                    answer:
                      'Potential omissions include taxes, insurance, utilities, permits, title, lender and draw fees, contingency, concessions, and carrying costs after rehab while listed. Add local estimates and confirm costs with the relevant provider.',
                  },
                ].map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}
