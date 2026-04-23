"use client";

import { useState } from "react";
import { MOCK_STUDENT } from "@/lib/dashboard-config";

const RESULTS = [
  { subject: "Mathematics", ca1: 10, ca2: 10, ca3: 10, exam: 58, total: 88, grade: "A", remark: "Excellent" },
  { subject: "English Language", ca1: 8, ca2: 9, ca3: 9, exam: 50, total: 76, grade: "B", remark: "Very Good" },
  { subject: "Physics", ca1: 10, ca2: 10, ca3: 15, exam: 57, total: 92, grade: "A", remark: "Outstanding" },
  { subject: "Chemistry", ca1: 9, ca2: 10, ca3: 9, exam: 57, total: 85, grade: "A", remark: "Excellent" },
  { subject: "Biology", ca1: 8, ca2: 8, ca3: 9, exam: 45, total: 70, grade: "B", remark: "Good" },
  { subject: "Further Mathematics", ca1: 7, ca2: 6, ca3: 7, exam: 48, total: 68, grade: "C", remark: "Credit" },
  { subject: "Economics", ca1: 8, ca2: 7, ca3: 7, exam: 55, total: 77, grade: "B", remark: "Very Good" },
  { subject: "Data Processing", ca1: 10, ca2: 10, ca3: 18, exam: 55, total: 93, grade: "A", remark: "Outstanding" },
];

const GRADE_KEY = [
  { range: "75 – 100", grade: "A", meaning: "Excellent" },
  { range: "65 – 74", grade: "B", meaning: "Very Good" },
  { range: "55 – 64", grade: "C", meaning: "Credit" },
  { range: "45 – 54", grade: "D", meaning: "Pass" },
  { range: "0 – 44", grade: "F", meaning: "Fail" },
];

export default function PrintResultPage() {
  const [term, setTerm] = useState("2026/2027-2");

  const totalObtained = RESULTS.reduce((s, r) => s + r.total, 0);
  const totalObtainable = RESULTS.length * 100;
  const average = (totalObtained / RESULTS.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[900px] mx-auto space-y-6">
      {/* Header Controls (hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Print Result</h1>
          <p className="text-slate-500 text-sm mt-0.5">Preview and print your terminal report.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full sm:w-64 h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition"
          >
            <option value="2026/2027-2">2026/2027 — 2nd Term</option>
            <option value="2026/2027-1">2026/2027 — 1st Term</option>
            <option value="2025/2026-3">2025/2026 — 3rd Term</option>
          </select>
          <button
            onClick={() => window.print()}
            className="h-10 px-5 bg-brand-green hover:bg-brand-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>
      </div>

      {/* ===== PRINTABLE REPORT CARD ===== */}
      <div
        id="report-card"
        className="bg-white border-[6px] border-double border-brand-green/70 rounded-sm shadow-lg print:shadow-none print:border-brand-green print:rounded-none"
        style={{ fontFamily: "'Times New Roman', 'Georgia', serif" }}
      >
        {/* Inner border */}
        <div className="border-2 border-brand-green/30 m-2">

          {/* ---- School Header ---- */}
          <div className="text-center pt-6 px-6">
            {/* School Crest placeholder */}
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center text-3xl font-bold text-brand-green">
              G
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-green uppercase tracking-[0.08em]">
              Glorious Group of Schools
            </h1>
            <p className="text-xs text-slate-500 mt-1 tracking-wide">
              20 Daniel umukoro Street, Ughelli, Delta State.
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5">
              Motto: &ldquo;Ensuring Excellence in Education&rdquo;
            </p>

            <div className="mt-4 mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 uppercase tracking-widest border-b-2 border-brand-green/40 inline-block pb-1 px-4">
                Student Terminal Report
              </h2>
            </div>
          </div>

          {/* ---- Student Info + Passport ---- */}
          <div className="px-6 sm:px-8 py-4">
            <div className="flex gap-6">
              {/* Student Details */}
              <div className="flex-1 text-sm space-y-1.5 text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  <p>
                    <span className="italic text-slate-500">Name: </span>
                    <span className="font-bold uppercase border-b border-dotted border-slate-400 pb-0.5">
                      {MOCK_STUDENT.lastName} {MOCK_STUDENT.firstName}
                    </span>
                  </p>
                  <p>
                    <span className="italic text-slate-500">Admission No: </span>
                    <span className="font-bold border-b border-dotted border-slate-400 pb-0.5">
                      {MOCK_STUDENT.admissionNo}
                    </span>
                  </p>
                  <p>
                    <span className="italic text-slate-500">Class: </span>
                    <span className="font-bold border-b border-dotted border-slate-400 pb-0.5">
                      {MOCK_STUDENT.class} ({MOCK_STUDENT.department})
                    </span>
                  </p>
                  <p>
                    <span className="italic text-slate-500">Sex: </span>
                    <span className="font-bold border-b border-dotted border-slate-400 pb-0.5">Male</span>
                  </p>
                  <p>
                    <span className="italic text-slate-500">Session: </span>
                    <span className="font-bold border-b border-dotted border-slate-400 pb-0.5">
                      {MOCK_STUDENT.session}
                    </span>
                  </p>
                  <p>
                    <span className="italic text-slate-500">Term: </span>
                    <span className="font-bold border-b border-dotted border-slate-400 pb-0.5">
                      {MOCK_STUDENT.term}
                    </span>
                  </p>
                </div>
              </div>

              {/* Passport Photo */}
              <div className="shrink-0">
                <div className="w-[100px] h-[120px] border-2 border-slate-300 rounded-sm bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                  <svg className="w-10 h-10 mb-1 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-wider font-semibold">Passport</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Results Table ---- */}
          <div className="px-6 sm:px-8 pb-4">
            <table className="w-full text-sm border-collapse border border-slate-400">
              <thead>
                <tr className="bg-brand-green/10 text-slate-800">
                  <th className="border border-slate-400 px-3 py-2 text-left font-bold text-xs uppercase tracking-wider">Subject</th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">CA1<br /><span className="text-[9px] font-normal text-slate-500">(10)</span></th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">CA2<br /><span className="text-[9px] font-normal text-slate-500">(10)</span></th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">CA3<br /><span className="text-[9px] font-normal text-slate-500">(20)</span></th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">Exam<br /><span className="text-[9px] font-normal text-slate-500">(60)</span></th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">Total<br /><span className="text-[9px] font-normal text-slate-500">(100)</span></th>
                  <th className="border border-slate-400 px-2 py-2 text-center font-bold text-xs uppercase tracking-wider w-14">Grade</th>
                  <th className="border border-slate-400 px-3 py-2 text-left font-bold text-xs uppercase tracking-wider">Remark</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="border border-slate-400 px-3 py-2 font-semibold text-slate-800">{r.subject}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center text-slate-700">{r.ca1}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center text-slate-700">{r.ca2}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center text-slate-700">{r.ca3}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center text-slate-700">{r.exam}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center font-bold text-slate-900">{r.total}</td>
                    <td className="border border-slate-400 px-2 py-2 text-center font-bold text-brand-green">{r.grade}</td>
                    <td className="border border-slate-400 px-3 py-2 text-slate-600 text-xs">{r.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---- Summary Row ---- */}
          <div className="px-6 sm:px-8 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="border border-slate-300 rounded px-3 py-2 text-center bg-slate-50/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Subjects</p>
                <p className="font-bold text-slate-900 text-lg">{RESULTS.length}</p>
              </div>
              <div className="border border-slate-300 rounded px-3 py-2 text-center bg-slate-50/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Total Obtained</p>
                <p className="font-bold text-slate-900 text-lg">{totalObtained} / {totalObtainable}</p>
              </div>
              <div className="border border-slate-300 rounded px-3 py-2 text-center bg-slate-50/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Average</p>
                <p className="font-bold text-brand-green text-lg">{average}%</p>
              </div>
              <div className="border border-slate-300 rounded px-3 py-2 text-center bg-slate-50/50">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Position</p>
                <p className="font-bold text-slate-900 text-lg">4th <span className="text-xs font-normal text-slate-500">out of 45</span></p>
              </div>
            </div>
          </div>

          {/* ---- Grade Key + Affective Domain ---- */}
          <div className="px-6 sm:px-8 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Grade Key */}
            <div>
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 border-b border-slate-200 pb-1">Grading Key</h3>
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 px-2 py-1 text-left">Score Range</th>
                    <th className="border border-slate-300 px-2 py-1 text-center">Grade</th>
                    <th className="border border-slate-300 px-2 py-1 text-left">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADE_KEY.map((g, i) => (
                    <tr key={i}>
                      <td className="border border-slate-300 px-2 py-1 text-slate-700">{g.range}</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">{g.grade}</td>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">{g.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Affective Domain */}
            <div>
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 border-b border-slate-200 pb-1">Affective Domain</h3>
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 px-2 py-1 text-left">Trait</th>
                    <th className="border border-slate-300 px-2 py-1 text-center">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { trait: "Punctuality", rating: 5 },
                    { trait: "Neatness", rating: 4 },
                    { trait: "Attentiveness", rating: 5 },
                    { trait: "Politeness", rating: 5 },
                    { trait: "Honesty", rating: 4 },
                    { trait: "Team Work", rating: 4 },
                  ].map((a, i) => (
                    <tr key={i}>
                      <td className="border border-slate-300 px-2 py-1 text-slate-700">{a.trait}</td>
                      <td className="border border-slate-300 px-2 py-1 text-center text-slate-800 font-semibold">{a.rating} / 5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---- Teacher's Comment ---- */}
          <div className="px-6 sm:px-8 pb-3 text-sm">
            <p className="italic text-slate-500 text-xs mb-1">Teacher&apos;s Comment:</p>
            <div className="border-b-2 border-dotted border-slate-400 pb-2 text-slate-800 font-medium min-h-[24px]">
              An excellent performance. Keep up the good work and maintain consistency.
            </div>
          </div>

          {/* ---- Principal's Comment ---- */}
          <div className="px-6 sm:px-8 pb-4 text-sm">
            <p className="italic text-slate-500 text-xs mb-1">Principal&apos;s Comment:</p>
            <div className="border-b-2 border-dotted border-slate-400 pb-2 text-slate-800 font-medium min-h-[24px]">
              A commendable result. Continue to strive for excellence.
            </div>
          </div>

          {/* ---- Signatures ---- */}
          <div className="px-6 sm:px-8 pb-6 pt-4 text-xs">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="border-b-2 border-slate-400 mb-1 h-10"></div>
                <p className="font-bold text-slate-700 uppercase tracking-wider">Class Teacher</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-400 mb-1 h-10 flex items-end justify-center">
                  {/* Stamp placeholder */}
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-brand-green/30 flex items-center justify-center text-[8px] text-brand-green/40 uppercase -mb-1">
                    Stamp
                  </div>
                </div>
                <p className="font-bold text-slate-700 uppercase tracking-wider">School Stamp</p>
              </div>
              <div>
                <div className="border-b-2 border-slate-400 mb-1 h-10"></div>
                <p className="font-bold text-slate-700 uppercase tracking-wider">Principal</p>
              </div>
            </div>
          </div>

          {/* ---- Footer ---- */}
          <div className="text-center pb-4 px-6">
            <p className="text-[10px] text-slate-400 italic">
              Any alteration, erasure, or absence of school stamp renders this report invalid.
            </p>
          </div>

        </div>
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #report-card, #report-card * {
            visibility: visible;
          }
          #report-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border-width: 4px !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
