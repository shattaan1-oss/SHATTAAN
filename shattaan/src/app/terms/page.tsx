import { Metadata } from 'next';
import { LegalView } from '@/components/views/LegalView';

export const metadata: Metadata = {
  title: 'Terms of Service & Commercial Conditions | SHATTAAN',
  description:
    'Terms of service, intellectual property, digital licensing parameters, and conditions for shattaan.com.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return <LegalView initialTab="terms" />;
}
