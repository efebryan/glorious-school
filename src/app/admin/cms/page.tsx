"use client";

import { useState } from "react";

const PAGES = [
  { name: "Homepage", route: "/", sections: "Hero, Stats, Features, Events, CTA", status: "Published", lastEdited: "Feb 15, 2026" },
  { name: "About Us", route: "/about", sections: "History, Mission/Vision, Values, Leadership", status: "Published", lastEdited: "Jan 20, 2026" },
  { name: "Admissions", route: "/admissions", sections: "Process Steps, Requirements, Contact", status: "Published", lastEdited: "Feb 1, 2026" },
  { name: "Contact", route: "/contact", sections: "Form, Contact Info, Map", status: "Published", lastEdited: "Feb 10, 2026" },
  { name: "Academics — Nursery", route: "/academics/nursery", sections: "Curriculum, Features", status: "Published", lastEdited: "Dec 5, 2025" },
  { name: "Academics — Primary", route: "/academics/primary", sections: "Curriculum, Features", status: "Published", lastEdited: "Dec 5, 2025" },
  { name: "Academics — Secondary", route: "/academics/secondary", sections: "Curriculum, Features", status: "Published", lastEdited: "Dec 5, 2025" },
];

const GLOBAL_SETTINGS_SECTIONS = [
  {
    title: "Homepage Hero",
    fields: [
      { label: "Headline", value: "Nurturing Excellence in Every Child", type: "text" },
      { label: "Description", value: "Glorious Group of Schools provides a holistic educational environment designed to empower the next generation of global leaders.", type: "textarea" },
      { label: "CTA Text", value: "Apply Now →", type: "text" },
      { label: "Admission Banner", value: "📚 Admissions Open for 2026/2027", type: "text" },
    ],
  },
  {
    title: "Stats Banner",
    fields: [
      { label: "Students Enrolled", value: "1000+", type: "text" },
      { label: "Expert Teachers", value: "25+", type: "text" },
      { label: "WAEC Pass Rate", value: "100%", type: "text" },
      { label: "Years of Excellence", value: "18+", type: "text" },
    ],
  },
  {
    title: "Footer Content",
    fields: [
      { label: "Footer Description", value: "Providing holistic and exceptional education for the next generation of leaders since 2005.", type: "textarea" },
      { label: "Facebook URL", value: "#", type: "text" },
      { label: "Instagram URL", value: "#", type: "text" },
      { label: "WhatsApp URL", value: "#", type: "text" },
    ],
  },
];

export default function CMSPage() {
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Website Content Manager</h1>
        <p className="text-sm text-slate-500 mt-0.5">Edit public-facing page content and global settings</p>
      </div>

      {/* Page Cards */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PAGES.map((p) => (
            <button
              key={p.name}
              onClick={() => setExpandedPage(expandedPage === p.name ? null : p.name)}
              className={`text-left bg-white rounded-xl border p-4 hover:shadow-md transition-all ${expandedPage === p.name ? "border-brand-green-200 ring-2 ring-brand-green-100" : "border-slate-200/60"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">{p.name}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{p.status}</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1.5">{p.sections}</p>
              <p className="text-[10px] text-slate-400">Last edited: {p.lastEdited}</p>
              <p className="text-[10px] text-brand-green font-medium mt-2">Route: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">{p.route}</code></p>
            </button>
          ))}
        </div>
      </div>

      {/* Global Content Editor */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800">Global Content Settings</h2>
        {GLOBAL_SETTINGS_SECTIONS.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-slate-200/60 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-yellow rounded-full" />
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.fields.map((f, i) => (
                <div key={i}>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea defaultValue={f.value} rows={2} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none resize-none" />
                  ) : (
                    <input defaultValue={f.value} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-green-500/30 focus:outline-none" />
                  )}
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-brand-green hover:bg-brand-green-700 text-white text-xs font-semibold rounded-lg transition-colors">Save Changes</button>
          </div>
        ))}
      </div>
    </div>
  );
}
