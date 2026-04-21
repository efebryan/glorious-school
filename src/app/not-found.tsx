import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Glorious Group of Schools",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-brand-green-100 text-brand-green-700 rounded-2xl flex items-center justify-center font-bold text-3xl mb-8 shadow-sm">
        🤔
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
