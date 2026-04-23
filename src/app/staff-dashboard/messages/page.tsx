"use client";

import { useState } from "react";

const MOCK_MESSAGES = [
  { id: 1, from: "Mr. Richard Doe", subject: "Regarding John's performance", preview: "Good afternoon, I wanted to follow up on John's midterm results...", time: "10 min ago", read: false, tab: "inbox" },
  { id: 2, from: "Mrs. Ada Eze", subject: "Blessing's fee receipt", preview: "Please confirm receipt of the school fees payment for this term.", time: "2 hrs ago", read: false, tab: "inbox" },
  { id: 3, from: "VP - Mr. Chukwu", subject: "Attendance follow-up", preview: "Please submit remaining attendance records for JSS classes.", time: "5 hrs ago", read: true, tab: "inbox" },
  { id: 4, from: "Principal", subject: "Staff meeting agenda", preview: "Attached is the agenda for Friday's staff meeting. Please review.", time: "Yesterday", read: true, tab: "inbox" },
  { id: 5, from: "System", subject: "Timetable update notice", preview: "The SS 2 timetable has been recently updated by the administrator.", time: "2 days ago", read: true, tab: "inbox" },
];

const SENT_MESSAGES = [
  { id: 101, to: "Mr. Richard Doe", subject: "Re: John's performance", preview: "Thank you for your concern. I've attached his detailed report...", time: "Yesterday", tab: "sent" },
  { id: 102, to: "All SS 2 Parents", subject: "Upcoming exam schedule", preview: "Dear parents, please note that the second term exams will begin on...", time: "3 days ago", tab: "sent" },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const messages = activeTab === "inbox" ? MOCK_MESSAGES : SENT_MESSAGES;
  const selected = [...MOCK_MESSAGES, ...SENT_MESSAGES].find(m => m.id === selectedMessage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Messages</h1>
          <p className="text-sm text-slate-500 mt-0.5">Staff and parent communication</p>
        </div>
        <button
          onClick={() => { setShowCompose(true); setSelectedMessage(null); }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Compose
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => { setActiveTab("inbox"); setSelectedMessage(null); }}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "inbox" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Inbox ({MOCK_MESSAGES.filter(m => !m.read).length} new)
        </button>
        <button
          onClick={() => { setActiveTab("sent"); setSelectedMessage(null); }}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
            activeTab === "sent" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Sent
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Message list */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 divide-y divide-slate-100 overflow-hidden">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMessage(m.id)}
              className={`w-full text-left px-4 py-3.5 hover:bg-slate-50 transition-colors ${
                selectedMessage === m.id ? "bg-brand-green-50/30 border-l-[3px] border-l-brand-green" : ""
              } ${activeTab === "inbox" && "read" in m && !m.read ? "bg-blue-50/30" : ""}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${activeTab === "inbox" && "read" in m && !m.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                  {activeTab === "inbox" ? ("from" in m ? m.from : "") : ("to" in m ? m.to : "")}
                </p>
                <span className="text-[10px] text-slate-400 shrink-0">{m.time}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5 truncate">{m.subject}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{m.preview}</p>
            </button>
          ))}
          {messages.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-slate-400">No messages.</div>
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/60 min-h-[300px]">
          {selected ? (
            <div>
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">{selected.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold flex items-center justify-center">
                    {("from" in selected ? selected.from : "to" in selected ? selected.to : "").charAt(0)}
                  </div>
                  <span className="text-xs text-slate-500">
                    {activeTab === "inbox" ? `From: ${"from" in selected ? selected.from : ""}` : `To: ${"to" in selected ? selected.to : ""}`}
                  </span>
                  <span className="text-[10px] text-slate-400">{selected.time}</span>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed">{selected.preview}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  This is a mock message body. In the production version, this will contain the full message content from the database.
                </p>
              </div>
              {activeTab === "inbox" && (
                <div className="px-5 py-3 border-t border-slate-100">
                  <button className="px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-xs font-semibold rounded-lg transition-colors">
                    Reply
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-sm text-slate-400">
              <div className="text-center">
                <p className="text-3xl mb-2">💬</p>
                <p>Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowCompose(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
            <div className="h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green" />
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Compose Message</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">To</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="Search parent or staff..." /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Subject</label><input className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none" placeholder="Message subject" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Message</label><textarea className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-green/30 focus:outline-none h-32 resize-none" placeholder="Write your message..." /></div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors">Send Message</button>
                <button onClick={() => setShowCompose(false)} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
