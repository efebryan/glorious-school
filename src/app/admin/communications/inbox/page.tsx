"use client";

import { useState } from "react";

type Tab = "queries" | "messages" | "complaints";

const MOCK_QUERIES = [
  { id: 1, from: "John Doe", email: "john@example.com", subject: "Admission Inquiry", date: "Feb 20, 2026", status: "Unread", preview: "I would like to know the application deadline for the 2026/2027 session." },
  { id: 2, from: "Mary Eze", email: "mary@example.com", subject: "Fee Payment Question", date: "Feb 18, 2026", status: "Read", preview: "Can school fees be paid in installments? What are the terms?" },
  { id: 3, from: "Peter Okafor", email: "peter@example.com", subject: "Transfer Student", date: "Feb 15, 2026", status: "Replied", preview: "My son is transferring from another school. What documents are needed?" },
  { id: 4, from: "Amina Hassan", email: "amina@example.com", subject: "Scholarship Info", date: "Feb 12, 2026", status: "Unread", preview: "Does the school offer scholarships for exceptional students?" },
];

const MOCK_MESSAGES = [
  { id: 1, from: "Mrs. Okonkwo", subject: "Lab Equipment Request", date: "Feb 19, 2026", status: "Unread", preview: "We need additional microscopes for the SS2 biology practical sessions." },
  { id: 2, from: "Mr. Richard Doe", subject: "Concern About Child", date: "Feb 17, 2026", status: "Read", preview: "I wanted to discuss John's recent performance drop in Mathematics." },
];

const MOCK_COMPLAINTS = [
  { id: 1, from: "Mrs. Akpan", subject: "Bus Service Delay", date: "Feb 16, 2026", status: "Pending", preview: "The school bus has been arriving 30 minutes late consistently." },
];

const STATUS_COLORS: Record<string, string> = {
  Unread: "bg-red-100 text-red-700",
  Read: "bg-slate-100 text-slate-600",
  Replied: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function InboxPage() {
  const [tab, setTab] = useState<Tab>("queries");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const data = tab === "queries" ? MOCK_QUERIES : tab === "messages" ? MOCK_MESSAGES : MOCK_COMPLAINTS;
  const selected = data.find((d) => d.id === selectedId);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Inbox & Queries</h1>
        <p className="text-sm text-slate-500 mt-0.5">Contact form submissions, staff messages, and complaints</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {([
          { id: "queries", label: "Contact Queries", count: MOCK_QUERIES.length },
          { id: "messages", label: "Messages", count: MOCK_MESSAGES.length },
          { id: "complaints", label: "Complaints", count: MOCK_COMPLAINTS.length },
        ] as const).map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedId(null); }} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${tab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Message List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100 overflow-hidden">
          {data.map((item) => (
            <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full text-left px-5 py-4 hover:bg-slate-50/80 transition-colors ${selectedId === item.id ? "bg-brand-green-50 border-l-2 border-l-brand-green-500" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm ${item.status === "Unread" ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{item.from}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[item.status]}`}>{item.status}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 mb-0.5">{item.subject}</p>
              <p className="text-[11px] text-slate-400 line-clamp-1">{item.preview}</p>
              <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/60 p-6 min-h-[300px]">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selected.subject}</h2>
                  <p className="text-sm text-slate-500">From: {selected.from} {"email" in selected ? `(${selected.email})` : ""}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.date}</p>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">{selected.preview}</p>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Reply</label>
                <textarea rows={3} placeholder="Type your reply..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none resize-none mb-3" />
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Send Reply</button>
                  <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-600 rounded-lg transition-colors">Archive</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-4xl mb-3">💬</span>
              <p className="text-sm text-slate-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
