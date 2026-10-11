import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import BorrowerPackageForm from './BorrowerPackageForm';

export const metadata: Metadata = createMetadata({
  title: 'Fix & Flip Borrower Package | AssetLift Lending',
  description:
    'Upload the borrower package for a fix and flip loan, including entity docs, purchase contract, scope of work, track record, and banking support.',
  path: '/resources/fix-and-flip-borrower-package',
});

export default function FixAndFlipBorrowerPackagePage() {
  return <BorrowerPackageForm />;
}
