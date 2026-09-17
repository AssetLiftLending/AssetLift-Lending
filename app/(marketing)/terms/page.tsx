import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';
// A carrier compares the consent checkbox, this page and the campaign
// submission, and rejects the campaign if they disagree. These sentences are
// read from the same module the checkbox uses so the two cannot drift apart.
import {
  SMS_CONSENT_NOT_A_CONDITION,
  MESSAGE_AND_DATA_RATES,
  SMS_SUPPORT_PHONE,
  SMS_SUPPORT_PHONE_TEL,
} from '@/lib/sms-consent';

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for AssetLift Lending. Review our website terms, loan disclaimers, SMS terms, and conditions of use.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Last updated: March 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Agreement to Terms</h2>
              <p>
                By accessing or using the AssetLift Lending website, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you do not agree with
                any of these terms, you should not use this website. These terms apply to all
                visitors, users, and others who access or use the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Use of Website</h2>
              <p>
                This website is provided for informational purposes only. The content on this site,
                including loan program descriptions, rate ranges, leverage parameters, calculators,
                and other materials, is intended to give prospective borrowers a general overview of
                the products and services offered by AssetLift Lending. Nothing on this website
                constitutes a loan offer, loan commitment, or binding agreement of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Loan Disclaimers</h2>
              <p className="mb-4">
                No content on this website constitutes a loan offer, commitment to lend, or
                guarantee of terms. All information presented regarding loan programs, rates, fees,
                and leverage is subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  All loans are subject to underwriting approval, property valuation, and title
                  review.
                </li>
                <li>
                  Rates, terms, fees, and leverage are subject to change without notice.
                </li>
                <li>
                  Loan programs may be funded directly, brokered, or placed with third-party
                  lending partners depending on the transaction.
                </li>
                <li>
                  Past performance of funded loans does not guarantee future results.
                </li>
              </ul>
              <p className="mt-4">
                AssetLift Lending reserves the right to modify, suspend, or discontinue any loan
                program at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Execution and Funding Channels</h2>
              <p className="mb-4">
                Website references to lending products, rates, timelines, or program availability
                do not mean that every transaction is funded directly by AssetLift Lending. Depending
                on the transaction, AssetLift may act in a lending, brokering, referral, or
                capital-partner placement capacity to help move the file toward closing.
              </p>
              <p>
                Borrowers should review all transaction-specific disclosures, lender documents,
                compensation disclosures where applicable, and state-specific notices provided in
                connection with the actual loan structure.
              </p>
            </section>

            <section id="sms-terms">
              <h2 className="text-2xl font-bold text-foreground mb-3">SMS Program Terms</h2>
              <p className="mb-3">
                These SMS Program Terms apply to the AssetLift Lending text messaging programme.
              </p>
              <p className="mb-3">
                By opting in, you agree to receive text messages from AssetLift Lending about your
                loan inquiry, including application updates, document requests and appointment
                reminders. Message frequency varies. {MESSAGE_AND_DATA_RATES}{' '}
                {SMS_CONSENT_NOT_A_CONDITION}
              </p>
              <p className="mb-3">
                You can opt out at any time by replying STOP. For help, reply HELP or contact
                info@assetliftlending.com / {SMS_SUPPORT_PHONE}.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Programme description</h3>
              <p>
                AssetLift Lending sends text messages to people who have asked us about financing.
                Messages relate to your own loan inquiry: replies to what you asked us, updates on
                your loan application, requests for documents your file needs, and appointment
                reminders. We do not send promotional or marketing text messages to this programme.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">How you opt in</h3>
              <p>
                You opt in by ticking the consent box above the submit button on the quote form
                on our home page or on our{' '}
                <Link href="/apply" className="underline hover:text-primary transition-colors">
                  loan inquiry form
                </Link>
                , by telling one of our staff on a phone call that you agree to be texted, or by
                texting us first. The box is never ticked for you.{' '}
                <strong className="text-foreground">
                  Consent to receive text messages is not a condition of any loan or service.
                </strong>
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Message frequency and cost</h3>
              <p>
                Message frequency varies and depends on where your loan inquiry stands.{' '}
                <strong className="text-foreground">Message and data rates may apply.</strong>{' '}
                AssetLift Lending does not charge you for the messages themselves; any charge comes
                from your mobile carrier under your own plan.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">How to stop messages</h3>
              <p>
                Reply <strong className="text-foreground">STOP</strong> to any message from us at any
                time. You may also reply STOPALL, UNSUBSCRIBE, CANCEL, END or QUIT. We will send one
                confirmation that you have been unsubscribed and then stop messaging you. To start
                again, reply <strong className="text-foreground">START</strong>.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">How to get help</h3>
              <p>
                Reply <strong className="text-foreground">HELP</strong> to any message, call{' '}
                <a
                  href={`tel:${SMS_SUPPORT_PHONE_TEL}`}
                  className="underline hover:text-primary transition-colors"
                >
                  {SMS_SUPPORT_PHONE}
                </a>
                , or email{' '}
                <a href="mailto:info@assetliftlending.com" className="underline hover:text-primary transition-colors">
                  info@assetliftlending.com
                </a>
                .
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Carriers and delivery</h3>
              <p>
                Carriers are not liable for delayed or undelivered messages. Delivery depends on your
                carrier and your handset, and we cannot guarantee every message will arrive.
                Supported carriers may change without notice.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Your privacy</h3>
              <p>
                We do not sell or share your SMS opt-in data or personal information with third
                parties for marketing purposes. See our{' '}
                <Link href="/privacy" className="underline hover:text-primary transition-colors">
                  Privacy Policy
                </Link>{' '}
                for the full detail.
              </p>

              <h3 id="verbal-consent" className="text-lg font-semibold text-foreground mt-5 mb-2">
                Verbal consent script
              </h3>
              <p className="mb-3">
                When consent is taken on a phone call, our staff read the following and record your
                answer:
              </p>
              <blockquote className="border-l-4 border-primary/60 bg-secondary/20 px-4 py-3 italic">
                &ldquo;Is it alright if I text you at this number about your loan inquiry?
                We&apos;ll send application updates, document requests and appointment reminders.
                Message frequency varies and message and data rates may apply. You can reply STOP at
                any time to stop the messages, or HELP for help. Saying yes isn&apos;t a condition of
                getting a loan from us.&rdquo;
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos,
                images, page layouts, calculators, tools, and software, is the property of AssetLift
                Lending and is protected by applicable intellectual property laws. You may not
                reproduce, distribute, modify, or create derivative works from any content on this
                site without prior written consent from AssetLift Lending.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites or services that are not
                owned or controlled by AssetLift Lending. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices of any third-party
                websites or services. You acknowledge and agree that AssetLift Lending shall not be
                liable for any damage or loss caused by or in connection with the use of any
                third-party content, goods, or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, AssetLift Lending and its
                officers, directors, employees, agents, and affiliates shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including but not
                limited to loss of profits, data, business opportunities, or goodwill, arising out
                of or related to your use of or inability to use this website or any content,
                products, or services obtained through this website, whether based on warranty,
                contract, tort, or any other legal theory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the
                laws of the State of New York, without regard to its conflict of law provisions. Any
                disputes arising from or relating to these terms or your use of this website shall
                be subject to the exclusive jurisdiction of the courts located in the State of New
                York.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Changes to Terms</h2>
              <p>
                AssetLift Lending reserves the right to update or modify these Terms of Service at
                any time without prior notice. Changes will be effective immediately upon posting to
                this website. Your continued use of the site following any changes constitutes your
                acceptance of the revised terms. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
              <p>
                If you have questions about these Terms of Service, contact AssetLift Lending at
                {' '}
                <a href="mailto:info@assetliftlending.com" className="underline hover:text-primary transition-colors">
                  info@assetliftlending.com
                </a>{' '}
                or{' '}
                <a href="tel:+19296392284" className="underline hover:text-primary transition-colors">
                  +1 (929) 639-2284
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
