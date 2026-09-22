'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, DollarSign, TrendingUp, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { gtagEvent } from '@/lib/gtag';

export default function DSCRCalculator() {
  const [monthlyRent, setMonthlyRent] = useState('');
  const [monthlyMortgage, setMonthlyMortgage] = useState('');
  const [monthlyTaxes, setMonthlyTaxes] = useState('');
  const [monthlyInsurance, setMonthlyInsurance] = useState('');
  const [monthlyHoa, setMonthlyHoa] = useState('');
  const [vacancy, setVacancy] = useState('5');
  const trackedUse = useRef(false);
  const trackedBand = useRef('');

  const rent = parseFloat(monthlyRent) || 0;
  const mortgage = parseFloat(monthlyMortgage) || 0;
  const taxes = parseFloat(monthlyTaxes) || 0;
  const insurance = parseFloat(monthlyInsurance) || 0;
  const hoa = parseFloat(monthlyHoa) || 0;
  const vacancyPct = parseFloat(vacancy) || 5;

  const effectiveRent = rent * (1 - vacancyPct / 100);
  const totalDebt = mortgage + taxes + insurance + hoa;
  const dscr = totalDebt > 0 ? effectiveRent / totalDebt : 0;
  const annualNOI = effectiveRent * 12;
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
    if (ratio >= 1.25) return { label: 'Strong', color: 'text-green-500', eligible: true };
    if (ratio >= 1.0) return { label: 'Qualifying', color: 'text-yellow-500', eligible: true };
    if (ratio >= 0.75) return { label: 'No-Ratio Available', color: 'text-orange-500', eligible: true };
    return { label: 'Below Minimum', color: 'text-red-500', eligible: false };
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

  const applyParams = new URLSearchParams({ loanPurpose: 'dscr', source: 'dscr-calculator', strategy: 'rental', rent: monthlyRent, mortgage: monthlyMortgage, taxes: monthlyTaxes, insurance: monthlyInsurance, hoa: monthlyHoa, vacancy }).toString();

  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                DSCR Loan Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-5">Calculate rental property payment coverage before requesting terms.</p>
              <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left leading-relaxed">A DSCR loan calculator divides a rental property's qualifying monthly income by its monthly debt obligation. Enter rent, principal and interest, property taxes, insurance, HOA dues, and any vacancy factor the program uses. A higher ratio shows more payment coverage, but lenders also review value, credit, reserves, property condition, lease support, and loan purpose.</div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Property Income & Expenses
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rent">Monthly Gross Rent ($)</Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="2500"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mortgage">Monthly Mortgage Payment ($)</Label>
                    <Input
                      id="mortgage"
                      type="number"
                      placeholder="1500"
                      value={monthlyMortgage}
                      onChange={(e) => setMonthlyMortgage(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Principal + interest only (P&I)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="taxes">Monthly Property Taxes ($)</Label>
                    <Input
                      id="taxes"
                      type="number"
                      placeholder="250"
                      value={monthlyTaxes}
                      onChange={(e) => setMonthlyTaxes(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance">Monthly Insurance ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      placeholder="150"
                      value={monthlyInsurance}
                      onChange={(e) => setMonthlyInsurance(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoa">Monthly HOA ($)</Label>
                    <Input
                      id="hoa"
                      type="number"
                      placeholder="0"
                      value={monthlyHoa}
                      onChange={(e) => setMonthlyHoa(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vacancy">Vacancy Factor (%)</Label>
                    <Input
                      id="vacancy"
                      type="number"
                      step="1"
                      value={vacancy}
                      onChange={(e) => setVacancy(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="font-semibold text-lg flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Your DSCR
                  </h2>

                  {hasValues ? (
                    <div className="space-y-6">
                      <div className="text-center py-6 bg-secondary/30 rounded-xl">
                        <div className={`text-5xl font-bold ${status.color}`}>
                          {dscr.toFixed(2)}x
                        </div>
                        <div className={`text-sm font-semibold mt-2 ${status.color}`}>
                          {status.label}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20">
                        {status.eligible ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                        <span className="text-sm">
                          {status.eligible
                            ? 'This property may fit a DSCR review, subject to full underwriting.'
                            : 'This DSCR may not meet minimum lender requirements. Consider increasing rent or reducing debt.'}
                        </span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Effective Monthly Rent</span>
                          <span className="font-semibold">${Math.round(effectiveRent).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Total Monthly PITIA</span>
                          <span className="font-semibold">${Math.round(totalDebt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Monthly Cash Flow</span>
                          <span className={`font-semibold ${monthlyCashFlow >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${Math.round(monthlyCashFlow).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Annual NOI</span>
                          <span className="font-semibold">${Math.round(annualNOI).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Annual Debt Service</span>
                          <span className="font-semibold">${Math.round(annualDebt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <AlertCircle className="w-5 h-5" />
                      <p>Enter monthly rent and mortgage details to calculate your DSCR.</p>
                    </div>
                  )}
                </div>

                {/* DSCR Ranges Guide */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">DSCR Ranges</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1.25x+</span>
                      <span className="text-green-500 font-medium">Strong - Best rates</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1.00x - 1.24x</span>
                      <span className="text-yellow-500 font-medium">Qualifying</span>
                    </div>
                    <div className="flex justify-between">
                      <span>0.75x - 0.99x</span>
                      <span className="text-orange-500 font-medium">No-Ratio programs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Below 0.75x</span>
                      <span className="text-red-500 font-medium">Below minimum</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                  <p className="font-semibold mb-2">Use your result to request terms</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Keep the rent, payment, taxes, insurance, HOA, purchase price or value, requested loan amount, and property address you entered. Send the scenario without retyping the numbers.
                  </p>
                  <Button asChild size="lg" className="glow-primary">
                    <Link href={`/apply?${applyParams}`} onClick={() => gtagEvent('calculator_cta_clicked', { calculator: 'dscr', result_band: status.label })}>
                      Request DSCR Terms <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-3"><Link href="/loans/dscr-rental">See DSCR Loan Options</Link></Button>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">Business-purpose, non-owner-occupied properties only.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What This DSCR Number Actually Tells You
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  DSCR is a shortcut for one lender question: does the property itself produce
                  enough income to support the proposed debt? A higher ratio usually means more
                  room for vacancy, maintenance pressure, or conservative underwriting.
                </p>
                <p>
                  This calculator uses monthly rent and debt-related housing costs to estimate that
                  ratio quickly. It is useful for screening deals before you apply, but the final
                  lender calculation may still depend on the appraisal rent schedule, reserve
                  requirements, leverage, and the specific program rules.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  title: '1.25x and above',
                  text: 'Usually signals a stronger rental file with more room for pricing flexibility and cleaner approval odds.',
                },
                {
                  title: '1.00x to 1.24x',
                  text: 'Often still workable, but the lender may rely more heavily on leverage, reserves, and overall file quality.',
                },
                {
                  title: 'Below 1.00x',
                  text: 'May require a no-ratio program or a different capital structure if the property cash flow does not support standard DSCR terms.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-secondary/20 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">DSCR Calculator FAQ</h2>
              <div className="space-y-6">
                {[
                  {
                    question: 'What is a good DSCR for a rental property?',
                    answer:
                      'A DSCR of 1.25x or better is typically viewed as strong because income exceeds debt service by a meaningful margin. Many files can still work below that level, but the deal usually becomes more sensitive to leverage and reserve requirements.',
                  },
                  {
                    question: 'Does DSCR use gross rent or adjusted rent?',
                    answer:
                      'That depends on the lender and program. Many lenders start with market rent and compare it against PITIA, but some adjust for vacancy or use a specific appraisal rent figure rather than the borrower’s estimate.',
                  },
                  {
                    question: 'Can a property qualify if DSCR is below 1.0x?',
                    answer:
                      'Sometimes. Some programs allow no-ratio or low-ratio scenarios, but pricing and structure are usually less favorable when the rent does not fully cover the proposed monthly debt service.',
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
        </div>
      </section>
    </div>
  );
}
