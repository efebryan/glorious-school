import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-brand-green-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-green-500 rounded-full opacity-20 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-4 sm:py-6 md:py-8 lg:py-9">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left content */}
            <div className="w-full lg:w-3/5 text-center lg:text-left animate-fade-in-up">
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-yellow/20 text-brand-yellow font-semibold text-xs sm:text-sm mb-5 border border-brand-yellow/30 tracking-wide uppercase">
                📚 Admissions Open for 2026/2027
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 sm:mb-6 leading-[1.15]">
                Nurturing <span className="text-brand-yellow">Excellence</span>{" "}
                <br className="hidden md:block"/>in Every Child
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Glorious Group of Schools provides a holistic educational environment designed to empower the next generation of global leaders with knowledge, character, and vision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link href="/admissions" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-brand-yellow text-slate-900 border-none hover:bg-brand-yellow-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold">
                    Apply Now →
                  </Button>
                </Link>
                <Link href="/result-checker" className="w-full sm:w-auto">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/30 hover:border-white/50">
                    Check Results
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 relative mt-4 lg:mt-0">
              <div className="aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative">
                <Image
                  src="/images/hero-students.png"
                  alt="Students of Glorious Group of Schools in a modern classroom"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-800/40 to-transparent"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-4 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-yellow rounded-full flex items-center justify-center text-xl sm:text-2xl shrink-0">🏆</div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Recognized for</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Academic Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: '1000+', label: 'Students Enrolled' },
              { value: '25+', label: 'Expert Teachers' },
              { value: '100%', label: 'WAEC Pass Rate' },
              { value: '18+', label: 'Years of Excellence' },
            ].map((stat, i) => (
              <div key={i} className="py-6 sm:py-8 px-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-green">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <Section className="bg-slate-50">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/hero-students.png"
                    alt="Students learning in class"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </div>
                <div className="aspect-[4/3] bg-brand-yellow/15 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-2xl sm:text-3xl font-bold text-brand-green mb-1">100%</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Pass Rate</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="aspect-[4/3] bg-brand-green-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-2xl sm:text-3xl font-bold text-brand-green mb-1">25+</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-600">Expert Teachers</p>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/science-lab.png"
                    alt="Modern science laboratory"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Welcome to Glorious</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-5 sm:mb-6 leading-tight">Inspiring Purpose, Igniting Passion</h2>
            <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Located in the heart of Ughelli, Delta State, Glorious Group of Schools provides a rich, diverse, and stimulating academic environment. We believe that every student has unique potential waiting to be unlocked.
            </p>
            <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Our dedicated staff, modern facilities, and comprehensive curriculum ensure that our students are well-prepared for the challenges of the future, growing not just academically, but socially and morally.
            </p>
            <Link href="/about">
              <Button variant="outline" className="group">
                Discover Our Story 
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <SectionHeader 
          title="Why Choose Glorious Schools?" 
          subtitle="We exist to provide an environment where children thrive and discover their true capabilities."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children">
          {[
            { icon: '📚', title: 'Comprehensive Curriculum', desc: 'A rigorous academic program aligned with international and national standards across all sections.' },
            { icon: '🔬', title: 'Modern Facilities', desc: 'State-of-the-art science labs, computer rooms, and well-stocked libraries for hands-on learning.' },
            { icon: '🌱', title: 'Holistic Development', desc: 'Focus on character building, sports, arts, and extracurricular activities for complete growth.' },
            { icon: '👨‍🏫', title: 'Expert Educators', desc: 'Highly qualified, passionate teachers dedicated to individual student success and mentorship.' },
            { icon: '🛡️', title: 'Safe Environment', desc: 'Secure, nurturing campus with CCTV monitoring ensuring peace of mind for parents.' },
            { icon: '💻', title: 'Digital Integration', desc: 'Technology-driven learning tools and smart classrooms to prepare students for the digital age.' },
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-brand-green-50 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:scale-110 transition-transform">{feature.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured Events */}
      <Section className="bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-2">What&apos;s Happening</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">Upcoming Events</h2>
            <p className="text-slate-600 text-sm sm:text-base">Stay updated with our school calendar.</p>
          </div>
          <Link href="/events" className="hidden sm:inline-flex items-center text-brand-green font-semibold hover:text-brand-green-700 transition-colors text-sm group">
            View All Events <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            { date: '15 MAY', title: 'Inter-House Sports Competition', time: '09:00 AM', loc: 'Main Field', img: '/images/sports-event.png' },
            { date: '28 MAY', title: 'PTA General Meeting', time: '10:00 AM', loc: 'School Auditorium', img: '/images/school-building.png' },
            { date: '05 JUN', title: 'Science & Arts Exhibition', time: '11:00 AM', loc: 'Exhibition Hall', img: '/images/science-lab.png' },
          ].map((event, i) => (
            <Card key={i} className="hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:shadow-lg">
              <div className="h-44 sm:h-48 relative overflow-hidden">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1.5 rounded-lg text-center shadow-md">
                  <div className="text-brand-green font-bold text-base leading-none">{event.date.split(' ')[0]}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5">{event.date.split(' ')[1]}</div>
                </div>
              </div>
              <CardContent className="py-5">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center"><span className="mr-2 text-brand-green">⏰</span> {event.time}</div>
                  <div className="flex items-center"><span className="mr-2 text-brand-green">📍</span> {event.loc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/events">
             <Button variant="outline" className="w-full">View All Events →</Button>
          </Link>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="bg-brand-green rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-yellow rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-yellow rounded-full opacity-15 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to Join Our Family?</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 sm:mb-10 leading-relaxed">
              We are currently accepting applications for Nursery, Primary, and Secondary sections for the upcoming academic session.
            </p>
            <Link href="/admissions/apply">
              <Button size="lg" className="bg-brand-yellow text-slate-900 hover:bg-brand-yellow-600 shadow-lg font-semibold border-none text-base sm:text-lg hover:-translate-y-0.5 transition-all">
                Start Enrollment Process →
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
