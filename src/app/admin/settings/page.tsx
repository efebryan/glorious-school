"use client";

import { useState } from "react";

const SETTINGS_SECTIONS = [
  {
    title: "School Profile",
    icon: "🏫",
    desc: "Update school name, motto, logo, and core contact details",
    fields: [
      { label: "School Name", value: "Glorious Group of Schools", type: "text" },
      { label: "Motto", value: "Knowledge is Power", type: "text" },
      { label: "Official Email", value: "admin@gloriousschools.edu.ng", type: "email" },
      { label: "Phone Number", value: "+234 800 123 4567", type: "text" },
      { label: "Address Line 1", value: "20 Daniel umukoro Street", type: "text" },
      { label: "City & State", value: "Ughelli, Delta State", type: "text" },
    ]
  },
  {
    title: "Academic Configurations",
    icon: "🎓",
    desc: "Set grading scales, attendance thresholds, and report card formats",
    fields: [
      { label: "Default Grading System", value: "WAEC Standard (A1-F9)", type: "select", options: ["WAEC Standard (A1-F9)", "Letter Grades (A-F)", "Percentage (0-100)"] },
      { label: "Minimum Attendance %", value: "75", type: "number" },
      { label: "Term", value: "3", type: "number" },
    ]
  },
  {
    title: "Portal Access & Maintenance",
    icon: "🌐",
    desc: "Enable or disable access to specific portals",
    toggles: [
      { label: "Student Portal Status", active: true },
      { label: "Parent Portal Status", active: true },
      { label: "Staff Portal Status", active: true },
      { label: "Public Website Maintenance Mode", active: false },
    ]
  },
  {
    title: "Notifications & SMS",
    icon: "📱",
    desc: "Configure API keys for SMS gateway and automated email triggers",
    fields: [
      { label: "SMS Provider API Key", value: "sk_live_xxxxxxxxx", type: "password" },
      { label: "Sender ID", value: "GLORIOUS", type: "text" },
    ],
    toggles: [
      { label: "Auto-SMS on Fee Payment", active: true },
      { label: "Auto-Email Weekly Progress Reports", active: false },
    ]
  },
  {
    title: "Database Backup",
    icon: "💾",
    desc: "Manage automated backups and data retention policies",
    fields: [
      { label: "Backup Frequency", value: "Daily", type: "select", options: ["Daily", "Weekly", "Monthly"] },
      { label: "Retention Period (Days)", value: "30", type: "number" },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000px] mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Super Admin Only</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900">System Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure core system parameters and operations</p>
      </div>

      <div className="space-y-6">
        {SETTINGS_SECTIONS.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="text-sm font-bold text-slate-800">{section.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{section.desc}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm self-start sm:self-auto shrink-0">
                Save Section
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Text Fields */}
              {section.fields && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.fields.map((f, i) => (
                    <div key={i}>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">{f.label}</label>
                      {f.type === "select" ? (
                        <select defaultValue={f.value} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:outline-none">
                          {f.options?.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type={f.type} defaultValue={f.value} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:outline-none" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Toggles */}
              {section.toggles && (
                <div className="space-y-3 pt-2">
                  {section.toggles.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{t.label}</span>
                      <button className={`w-11 h-6 rounded-full relative transition-colors ${t.active ? "bg-indigo-600" : "bg-slate-300"}`}>
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${t.active ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
