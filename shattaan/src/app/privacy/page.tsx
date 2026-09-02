import { Metadata } from 'next';
import { LegalView } from '@/components/views/LegalView';

export const metadata: Metadata = {
  title: 'Privacy & Data Governance | SHATTAAN',
  description:
    'Our commitment to client privacy, data encryption, GDPR compliance, and confidential client transactions.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return <LegalView initialTab="privacy" />;
}
