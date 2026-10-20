"use client";

import { useState } from "react";

interface MessageItem {
  id: number;
  from?: string;
  to?: string;
  senderRole?: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  read: boolean;
  tab: "inbox" | "sent";
}

const INITIAL_INBOX: MessageItem[] = [
  {
    id: 1,
    from: "Mr. Richard Doe",
    senderRole: "Parent (John Doe — SS 2A)",
    subject: "Regarding John's performance",
    preview: "Good afternoon, I wanted to follow up on John's midterm results...",
    body: "Good afternoon Mrs. Adaeze,\n\nI wanted to follow up on John's midterm physics results. We noticed a slight drop compared to his first term scores and would appreciate your guidance on specific areas he needs to focus on ahead of the final examinations.\n\nCould we arrange a brief telephone consultation this Thursday afternoon?\n\nWarm regards,\nMr. Richard Doe",
    time: "10 min ago",
    read: false,
    tab: "inbox",
  },
  {
    id: 2,
    from: "Mrs. Ada Eze",
    senderRole: "Parent (Blessing Eze — SS 1B)",
    subject: "Blessing's fee receipt",
    preview: "Please confirm receipt of the school fees payment for this term...",
    body: "Dear Mrs. Okonkwo,\n\nPlease confirm receipt of the school fees payment for Blessing this term. The bank transaction slip was submitted to the Bursary yesterday morning.\n\nThank you very much,\nMrs. Ada Eze",
    time: "2 hrs ago",
    read: false,
    tab: "inbox",
  },
  {
    id: 3,
    from: "VP - Mr. Chukwu",
    senderRole: "Vice Principal (Academic)",
    subject: "Attendance follow-up",
    preview: "Please submit remaining attendance records for JSS classes...",
    body: "Good day Adaeze,\n\nPlease submit the remaining roll call and attendance records for the secondary science arms before close of business today for the term review dossier.\n\nRegards,\nMr. Chukwu",
    time: "5 hrs ago",
    read: true,
    tab: "inbox",
  },
  {
    id: 4,
    from: "Principal",
    senderRole: "Office of the Principal",
    subject: "Staff meeting agenda",
    preview: "Attached is the agenda for Friday's staff meeting. Please review...",
    body: "Dear Faculty Members,\n\nAttached is the agenda for Friday's general staff meeting scheduled for 10:00 AM in the Main Auditorium. Please ensure prompt attendance.\n\nPrincipal's Office",
    time: "Yesterday",
    read: true,
    tab: "inbox",
  },
  {
    id: 5,
    from: "System",
    senderRole: "Portal Notification",
    subject: "Timetable update notice",
    preview: "The SS 2 timetable has been recently updated by the administrator...",
    body: "Automated Notice:\n\nThe Senior Secondary 2 teaching schedule has been modified for laboratory practical sessions starting Monday. Please review your updated periods under the Timetable module.",
    time: "2 days ago",
    read: true,
    tab: "inbox",
  },
];

const INITIAL_SENT: MessageItem[] = [
  {
    id: 101,
    to: "Mr. Richard Doe",
    subject: "Re: Regarding John's performance",
    preview: "Thank you for reaching out Mr. Doe. John is doing well overall, especially in mechanics...",
    body: "Dear Mr. Doe,\n\nThank you for reaching out. John is doing well overall, especially in mechanics and thermodynamics. He needs slight reinforcement in electricity calculations.\n\nThursday at 3:30 PM works well for a phone call.\n\nBest regards,\nMrs. Adaeze Okonkwo",
    time: "Yesterday",
    read: true,
    tab: "sent",
  },
  {
    id: 102,
    to: "All SS 2 Parents",
    subject: "Physics Laboratory Guidelines",
    preview: "Dear Parents, please ensure students have their lab coats for practical sessions...",
    body: "Dear Parents,\n\nKindly ensure students are equipped with standard white lab coats and safety goggles for their practical sessions next week.\n\nScience Faculty",
    time: "3 days ago",
    read: true,
    tab: "sent",
  },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [inboxList, setInboxList] = useState<MessageItem[]>(INITIAL_INBOX);
  const [sentList, setSentList] = useState<MessageItem[]>(INITIAL_SENT);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  // New message form states
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [replyText, setReplyText] = useState("");

  const currentList = activeTab === "inbox" ? inboxList : sentList;
  const selectedMessage = currentList.find((m) => m.id === selectedId);

  const handleSelect = (msg: MessageItem) => {
    setSelectedId(msg.id);
    if (!msg.read && activeTab === "inbox") {
      setInboxList((prev) =>
        prev.map((item) => (item.id === msg.id ? { ...item, read: true } : item))
      );
    }
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject || !content) return;

    const newMsg: MessageItem = {
      id: Date.now(),
      to: recipient,
      subject,
      preview: content.slice(0, 60) + "...",
      body: content,
      time: "Just now",
      read: true,
      tab: "sent",
    };

    setSentList([newMsg, ...sentList]);
    setRecipient("");
    setSubject("");
    setContent("");
    setShowCompose(false);
    setActiveTab("sent");
    setSelectedId(newMsg.id);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    const newMsg: MessageItem = {
      id: Date.now(),
      to: selectedMessage.from ?? "Recipient",
      subject: selectedMessage.subject.startsWith("Re:")
        ? selectedMessage.subject
        : `Re: ${selectedMessage.subject}`,
      preview: replyText.slice(0, 60) + "...",
      body: replyText,
      time: "Just now",
      read: true,
      tab: "sent",
    };

    setSentList([newMsg, ...sentList]);
    setReplyText("");
  };

  const unreadCount = inboxList.filter((m) => !m.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1360px] mx-auto space-y-6">
      {/* =========================================================================
          1. HEADER ROW: Title, Subtitle, and Compose Button
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Staff and parent communication</p>
        </div>

        <button
          onClick={() => {
            setShowCompose(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#06331c] hover:bg-[#094326] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Compose</span>
        </button>
      </div>

      {/* =========================================================================
          2. PILL TABS: Inbox (2 new) / Sent
         ========================================================================= */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setActiveTab("inbox");
            setSelectedId(null);
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
            activeTab === "inbox"
              ? "bg-white text-slate-900 border-slate-300 shadow-2xs"
              : "bg-slate-100/80 text-slate-500 border-transparent hover:text-slate-800"
          }`}
        >
          Inbox ({unreadCount} new)
        </button>

        <button
          onClick={() => {
            setActiveTab("sent");
            setSelectedId(null);
          }}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
            activeTab === "sent"
              ? "bg-white text-slate-900 border-slate-300 shadow-2xs"
              : "bg-slate-100/80 text-slate-500 border-transparent hover:text-slate-800"
          }`}
        >
          Sent
        </button>
      </div>

      {/* =========================================================================
          3. MAIN 2-COLUMN MESSAGES CONTAINER
          Left: List of message cards with green active indicator line
          Right: Reading pane with empty state or full message detail
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Message List Cards (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-2.5">
          {currentList.map((m) => {
            const isSelected = selectedId === m.id;
            const displayName = activeTab === "inbox" ? m.from : m.to;

            return (
              <div
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`group relative cursor-pointer rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "bg-white border-emerald-500/80 shadow-sm"
                    : !m.read && activeTab === "inbox"
                    ? "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300"
                    : "bg-white border-slate-200/70 hover:border-slate-300"
                }`}
              >
                {/* Active Left Green Indicator Bar */}
                {isSelected && (
                  <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#10b981]" />
                )}

                <div className="p-4 pl-5 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <p
                        className={`text-xs truncate ${
                          !m.read && activeTab === "inbox"
                            ? "font-black text-slate-900"
                            : "font-bold text-slate-800"
                        }`}
                      >
                        {displayName}
                      </p>
                      {!m.read && activeTab === "inbox" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {m.time}
                    </span>
                  </div>

                  <p
                    className={`text-xs truncate ${
                      !m.read && activeTab === "inbox"
                        ? "font-bold text-slate-800"
                        : "font-semibold text-slate-600"
                    }`}
                  >
                    {m.subject}
                  </p>

                  <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                    {m.preview}
                  </p>
                </div>
              </div>
            );
          })}

          {currentList.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/70 p-8 text-center text-xs text-slate-400">
              No messages in this folder.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Reading Pane (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs min-h-[520px] flex flex-col justify-between overflow-hidden">
          {selectedMessage ? (
            <div className="flex-1 flex flex-col justify-between">
              {/* Message Header */}
              <div className="p-6 border-b border-slate-100 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-slate-800">
                        {activeTab === "inbox"
                          ? selectedMessage.from
                          : `To: ${selectedMessage.to}`}
                      </span>
                      {selectedMessage.senderRole && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400">
                            {selectedMessage.senderRole}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium shrink-0">
                    {selectedMessage.time}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
                {selectedMessage.body}
              </div>

              {/* Reply Box if in Inbox */}
              {activeTab === "inbox" && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                  <form onSubmit={handleSendReply} className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Reply to {selectedMessage.from}</span>
                    </div>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full p-3 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none h-24"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#06331c] hover:bg-[#094326] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Send Reply
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            /* Empty State matching screenshot */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 my-auto">
              {/* Rounded Speech Bubble Icon */}
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-500">Select a message to read</p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          4. COMPOSE MESSAGE MODAL
         ========================================================================= */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setShowCompose(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up border border-slate-100">
            {/* Modal Header */}
            <div className="bg-[#06331c] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-400 text-[#06331c] font-black text-xs flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold">New Message</h2>
              </div>
              <button
                onClick={() => setShowCompose(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendCompose} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">To</label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Mr. Richard Doe (Parent) or VP - Academic"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject title..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 mb-1 block">Message</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 h-32 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#06331c] hover:bg-[#094326] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
