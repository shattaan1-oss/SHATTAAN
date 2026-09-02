import { Metadata } from 'next';
import { WishlistView } from '@/components/views/WishlistView';

export const metadata: Metadata = {
  title: 'My Wishlist & Private Curation | SHATTAAN',
  description: 'Manage and review your saved luxury pieces and curated wishlist items at SHATTAAN.',
  alternates: {
    canonical: '/wishlist',
  },
};

export default function WishlistPage() {
  return <WishlistView />;
}
