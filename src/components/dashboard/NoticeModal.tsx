"use client";

import { useState, useEffect } from "react";

interface NoticeModalProps {
  title: string;
  body: string;
  category: string;
  date: string;
  onClose: () => void;
}

export function NoticeModal({ title, body, category, date, onClose }: NoticeModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />

        {/* Content */}
        <div className="p-6 sm:p-7">
          {/* Icon + Category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">
                {category}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">{date}</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2">
            {title}
          </h2>

          {/* Body */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {body}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-7 pb-6 flex items-center gap-3">
          <button
            onClick={handleClose}
            className="flex-1 h-10 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            Got it
          </button>
          <button
            onClick={handleClose}
            className="h-10 px-4 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
