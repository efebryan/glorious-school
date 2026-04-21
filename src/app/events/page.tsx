import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Events | Glorious Group of Schools",
  description: "Stay up to date with the latest events and activities at Glorious Group of Schools.",
};

const events = [
  { id: 1, date: '15 MAY', fullDate: '15 May 2026', title: 'Inter-House Sports Competition', time: '09:00 AM', loc: 'Main Field', desc: 'Annual sports festival featuring track and field events.', img: '/images/sports-event.png' },
  { id: 2, date: '28 MAY', fullDate: '28 May 2026', title: 'PTA General Meeting', time: '10:00 AM', loc: 'School Auditorium', desc: 'Open discussion with parents and teachers regarding student progress.', img: '/images/school-building.png' },
  { id: 3, date: '05 JUN', fullDate: '5 June 2026', title: 'Science & Arts Exhibition', time: '11:00 AM', loc: 'Exhibition Hall', desc: 'Students showcase their innovative projects and artistic creations.', img: '/images/science-lab.png' },
  { id: 4, date: '20 JUN', fullDate: '20 June 2026', title: 'Mid-Term Break Begins', time: '02:00 PM', loc: 'School Wide', desc: 'Commencement of the academic mid-term holiday for all students.', img: '/images/school-building.png' },
  { id: 5, date: '01 JUL', fullDate: '1 July 2026', title: 'Cultural Day', time: '09:00 AM', loc: 'School Auditorium', desc: 'Celebrating diversity with traditional attire, food, and performances.', img: '/images/cultural-day.png' },
  { id: 6, date: '22 JUL', fullDate: '22 July 2026', title: 'Graduation & Prize Giving', time: '10:00 AM', loc: 'School Auditorium', desc: 'Ceremony honoring our graduating classes and outstanding students.', img: '/images/graduation.png' },
];

export default function EventsPage() {
  return (
    <>
      {/* Page Hero - Consistent green */}
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">School Events</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Discover what&apos;s happening on campus. Stay engaged with our vibrant school community.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 stagger-children">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
              <div className="h-44 sm:h-48 relative overflow-hidden">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1.5 rounded-lg text-center shadow-md">
                  <div className="text-brand-green font-bold text-base leading-none">{event.date.split(' ')[0]}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5">{event.date.split(' ')[1]}</div>
                </div>
              </div>
              <CardContent className="flex flex-col flex-grow py-5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">{event.desc}</p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-500 mb-4">
                  <div className="flex items-center"><span className="mr-2 text-brand-green">⏰</span> {event.time}</div>
                  <div className="flex items-center"><span className="mr-2 text-brand-green">📍</span> {event.loc}</div>
                </div>
                <Link href={`/events/${event.id}`} className="mt-auto block">
                  <Button variant="outline" className="w-full text-sm">View Details →</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
