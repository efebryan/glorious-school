"use client";

import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function CalendarPage() {
  const terms = [
    {
      title: "First Term (Christmas Term)",
      duration: "September - December",
      events: [
        { date: "Sept 11", event: "School Resumes" },
        { date: "Oct 1", event: "Independence Day (Public Holiday)" },
        { date: "Oct 25 - 27", event: "Mid-Term Break" },
        { date: "Nov 15", event: "Inter-House Sports" },
        { date: "Dec 4 - 8", event: "End of Term Examinations" },
        { date: "Dec 13", event: "Christmas Carol & Party / Vacation" },
      ]
    },
    {
      title: "Second Term (Easter Term)",
      duration: "January - April",
      events: [
        { date: "Jan 8", event: "School Resumes" },
        { date: "Feb 14", event: "Cultural Day" },
        { date: "Feb 21 - 23", event: "Mid-Term Break" },
        { date: "Mar 15", event: "Open Day / PTA Meeting" },
        { date: "Mar 25 - 29", event: "End of Term Examinations" },
        { date: "Apr 5", event: "Vacation" },
      ]
    },
    {
      title: "Third Term (Summer Term)",
      duration: "April - July",
      events: [
        { date: "Apr 29", event: "School Resumes" },
        { date: "May 27", event: "Children's Day Celebration" },
        { date: "Jun 5 - 7", event: "Mid-Term Break" },
        { date: "Jul 1", event: "Valedictory Service" },
        { date: "Jul 8 - 12", event: "End of Session Examinations" },
        { date: "Jul 19", event: "Graduation Ceremony / Vacation" },
      ]
    }
  ];

  return (
    <>
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Academic Calendar</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with our schedule for the current academic session.
          </p>
        </div>
      </div>

      <Section className="bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-yellow-50 border border-brand-yellow-100 rounded-xl p-5 sm:p-6 mb-10 flex items-start gap-4 shadow-sm">
            <span className="text-2xl mt-0.5">📅</span>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Current Session: 2026/2027</h3>
              <p className="text-slate-600 text-sm">Please note that dates are subject to change due to unforeseen circumstances or government directives. Parents will be notified of any changes via email and SMS.</p>
            </div>
          </div>

          <div className="space-y-8">
            {terms.map((term, index) => (
              <Card key={index} className="shadow-md border-t-4 border-t-brand-green overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{term.title}</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-green-50 text-brand-green">
                      {term.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 w-1/3">Date</th>
                          <th className="px-6 py-4">Event Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {term.events.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-900">{item.date}</td>
                            <td className="px-6 py-4 text-slate-600">{item.event}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
