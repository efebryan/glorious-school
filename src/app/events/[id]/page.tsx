import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const eventsData = [
  { id: 1, date: '15 MAY', fullDate: '15 May 2026', title: 'Inter-House Sports Competition', time: '09:00 AM', loc: 'Main Field', desc: 'Annual sports festival featuring track and field events, relay races, long jump, and high jump competitions. Students represent their respective houses and compete for the overall trophy.', img: '/images/sports-event.png' },
  { id: 2, date: '28 MAY', fullDate: '28 May 2026', title: 'PTA General Meeting', time: '10:00 AM', loc: 'School Auditorium', desc: 'Open discussion with parents and teachers regarding student progress, upcoming school programmes, and academic planning for the remaining term.', img: '/images/school-building.png' },
  { id: 3, date: '05 JUN', fullDate: '5 June 2026', title: 'Science & Arts Exhibition', time: '11:00 AM', loc: 'Exhibition Hall', desc: 'Students showcase their innovative science projects, art pieces, and creative writing entries. A panel of judges evaluates entries across categories.', img: '/images/science-lab.png' },
  { id: 4, date: '20 JUN', fullDate: '20 June 2026', title: 'Mid-Term Break Begins', time: '02:00 PM', loc: 'School Wide', desc: 'Commencement of the academic mid-term holiday for all students. School resumes the following Monday.', img: '/images/school-building.png' },
  { id: 5, date: '01 JUL', fullDate: '1 July 2026', title: 'Cultural Day', time: '09:00 AM', loc: 'School Auditorium', desc: 'Celebrating Nigeria\'s rich cultural diversity with traditional attire, food, dances, and performances from various ethnic groups.', img: '/images/cultural-day.png' },
  { id: 6, date: '22 JUL', fullDate: '22 July 2026', title: 'Graduation & Prize Giving', time: '10:00 AM', loc: 'School Auditorium', desc: 'A grand ceremony honoring our graduating classes and recognizing outstanding students for academic and extracurricular achievements.', img: '/images/graduation.png' },
];

export function generateStaticParams() {
  return eventsData.map((event) => ({
    id: event.id.toString(),
  }));
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = eventsData.find(e => e.id.toString() === resolvedParams.id) || eventsData[0];

  return (
    <>
      {/* Page Hero - Green consistent */}
      <div className="relative bg-brand-green-700 py-12 sm:py-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link href="/events" className="inline-flex items-center text-brand-yellow hover:text-brand-yellow-200 mb-4 sm:mb-6 transition-colors text-sm font-medium">
            <span className="mr-2">←</span> Back to Events
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">{event.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base text-white/80">
            <div className="flex items-center"><span className="mr-2 text-brand-yellow">📅</span> {event.fullDate}</div>
            <div className="flex items-center"><span className="mr-2 text-brand-yellow">⏰</span> {event.time}</div>
            <div className="flex items-center"><span className="mr-2 text-brand-yellow">📍</span> {event.loc}</div>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl mb-8 sm:mb-12 relative overflow-hidden shadow-lg">
            <Image
              src={event.img}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          <div className="max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
              {event.desc}
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
              Join us for an exciting gathering that highlights the commitment and talent of our students. We look forward to welcoming parents, staff, and friends to this wonderful occasion. The event is open to the entire school community.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              Please note that attendance is highly encouraged as this event forms a key part of our community calendar. Further instructions regarding parking and seating will be provided closer to the event date via the school notice board and parent WhatsApp groups.
            </p>
            
            <div className="bg-brand-green-50 p-5 sm:p-6 rounded-xl border border-brand-green-100 mt-8 text-center max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Want to set a reminder?</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">Add this event to your personal calendar.</p>
              <Button size="sm" className="bg-brand-green text-white hover:bg-brand-green-600">
                Add to Calendar
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
