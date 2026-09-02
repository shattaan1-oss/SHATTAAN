import Link from 'next/link';
import { Compass, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xl">
        <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-amber-600 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-display">
            Piece Not Found
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            The archive, curation piece, or page you are attempting to view is unavailable or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
