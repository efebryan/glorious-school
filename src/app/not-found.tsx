import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Glorious Group of Schools",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-brand-green-100 text-brand-green-700 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
        Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the link is incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="px-6 py-3 bg-brand-green hover:bg-brand-green-700 text-white font-semibold rounded-xl shadow-sm transition-colors text-center"
        >
          Return to Home
        </Link>

      </div>
    </div>
  );
}
