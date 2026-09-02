import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Store Settings | SHATTAAN Admin',
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminDashboard initialTab="settings" />;
}
