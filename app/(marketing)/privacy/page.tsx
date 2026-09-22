import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Read the AssetLift Lending privacy policy to understand how we collect, use, and protect information submitted through our website and loan inquiry forms.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 md:pt-40">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Last updated September 17, 2026.
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
              <p>
                AssetLift Lending may collect information you provide directly through our
                application forms, contact forms, calculators, phone calls, email communications,
                and chatbot interactions. This can include your name, email address, phone number,
                company or entity information, property information, investment details, and any
                documents you choose to submit in connection with a lending inquiry.
              </p>
              <p className="mt-3">
                Our quote and loan inquiry forms specifically collect your{' '}
                <strong className="text-foreground">name, email address, phone number</strong>, and{' '}
                <strong className="text-foreground">property details</strong> such as the property
                state or address, loan type, purchase price or value, rehab budget, credit range,
                and number of completed projects. We use your phone number to contact you about the
                inquiry you submitted &mdash; by call, and{' '}
                <strong className="text-foreground">
                  by SMS text message only if you tick the optional consent box on the form
                </strong>{' '}
                or otherwise agree to be texted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Information</h2>
              <p>
                We use submitted information to evaluate loan opportunities, respond to inquiries,
                communicate with prospective borrowers, improve our website experience, and analyze
                how visitors interact with our pages and forms. We may also use information to
                maintain internal records, support compliance obligations, and protect against
                fraud, misuse, or unauthorized activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Analytics and Tracking</h2>
              <p>
                Our website uses analytics and advertising technologies, including Google tools, to
                understand traffic sources, page usage, and conversion activity. These tools may
                use cookies or similar technologies to measure visits, page views, and form
                interactions. This information helps us improve the site and better understand
                which content and channels are generating lending inquiries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Text Messaging and SMS Opt-In Data</h2>
              <p className="mb-3">
                <strong className="text-foreground">
                  We do not sell or share your SMS opt-in data or personal information with third
                  parties for marketing purposes.
                </strong>{' '}
                Your mobile number and your agreement to be texted are used solely so that AssetLift
                Lending can communicate with you about your loan inquiry. They are never sold,
                rented, or passed to any third party for that party&apos;s own marketing, and they
                are not shared with lead buyers or affiliates for marketing purposes.
              </p>
              <p>
                Text messages are optional and are never a condition of any loan or service. You can
                stop them at any time by replying STOP to any message from us, or reply HELP for
                help. You may also get help by emailing info@assetliftlending.com or calling
                +1 (929) 639-2284. Full details are in the
                SMS Program Terms
                section of our{' '}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">How We Share Information</h2>
              <p>
                We do not sell your personal information. We may share information with service
                providers, technology vendors, title partners, underwriting partners, legal or
                compliance advisors, and other parties involved in evaluating or servicing a
                lending request when necessary for business operations, compliance, or transaction
                execution.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Mobile information:</strong> No mobile
                information will be shared with third parties or affiliates for marketing or
                promotional purposes. All the above categories exclude text messaging originator
                opt-in data and consent; this information will not be shared with any third
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Data Security</h2>
              <p>
                We use reasonable administrative, technical, and organizational safeguards designed
                to protect submitted information. No website, transmission method, or storage
                system is completely secure, so we cannot guarantee absolute security, but we take
                commercially reasonable steps to protect the information we receive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Your Choices</h2>
              <p>
                You may contact us to update your information, request that we stop communicating
                with you about a lending inquiry, or ask questions about how your information is
                handled. Browser settings may also allow you to manage cookies and similar
                technologies used on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact</h2>
              <p>
                If you have questions about this Privacy Policy, contact AssetLift Lending at
                info@assetliftlending.com or +1 (929) 639-2284, or write to us at 215-03 Jamaica
                Ave #1021, Queens Village, NY 11428.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
