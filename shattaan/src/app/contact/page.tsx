import { Metadata } from 'next';
import { ContactView } from '@/components/views/ContactView';

export const metadata: Metadata = {
  title: 'Client Concierge & Private Inquiries | SHATTAAN',
  description:
    'Contact the SHATTAAN bespoke concierge team for product inquiries, sizing consultations, order tracking, and private appointments.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactView />;
}
