import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "About Us | Glorious Group of Schools",
  description: "Learn about the history, mission, vision, and leadership of Glorious Group of Schools, Ughelli.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Glorious Schools</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            A legacy of excellence since 2005. Get to know our history, mission, and the leadership team driving our vision forward.
          </p>
        </div>
      </div>

      {/* History */}
      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 animate-fade-in-up">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-3">Since 2005</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Our History</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Founded in 2005 in Ughelli, Delta State, Glorious Group of Schools began with a simple vision: to provide world-class education that is accessible to the local community while meeting global standards.
              </p>
              <p>
                What started as a small primary school with just 50 students has now grown into a comprehensive educational institution comprising Nursery, Primary, and Secondary sections, serving over 1,000 students annually.
              </p>
              <p>
                Over the years, our students have consistently ranked among the top in state and national examinations, bringing numerous academic and sporting laurels to the school. We remain committed to our founding principles of diligence, integrity, and excellence.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/school-building.png"
                alt="Glorious Group of Schools campus building"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-slate-50">
        <SectionHeader 
          title="Mission & Vision" 
          subtitle="The guiding principles that shape our daily operations and long-term goals."
        />
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Card className="border-t-4 border-t-brand-green shadow-md">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-brand-green-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                🎯
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To nurture responsible, intelligent, and well-rounded individuals through qualitative education, sound moral grounding, and the deployment of modern learning tools in a safe, conducive environment.
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-brand-yellow shadow-md">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 bg-brand-yellow-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                👁️
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To be the premier educational institution in Nigeria, recognized globally for academic excellence, moral integrity, and the holistic development of future leaders.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeader 
          title="Our Core Values" 
          subtitle="The principles that define our culture and guide our community every day."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { icon: '⭐', value: 'Excellence', desc: 'Striving for the best in everything we do' },
            { icon: '🤝', value: 'Integrity', desc: 'Honesty and strong moral principles' },
            { icon: '📖', value: 'Diligence', desc: 'Persistent effort in learning and growth' },
            { icon: '💡', value: 'Innovation', desc: 'Embracing creative and modern approaches' },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 sm:p-6 rounded-2xl bg-brand-green-50/50 hover:bg-brand-green-50 transition-colors">
              <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{item.value}</h3>
              <p className="text-xs sm:text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-slate-50">
        <SectionHeader 
          title="School Leadership" 
          subtitle="Meet the experienced and dedicated professionals leading Glorious Schools."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { name: "Dr. O. Emmanuel", role: "Proprietor / Founder", bio: "Over 30 years of experience in educational administration and child psychology. A visionary leader committed to building future-ready citizens." },
            { name: "Mrs. Sarah Johnson", role: "Principal (Secondary)", bio: "A passionate educator with a track record of academic turnarounds and holistic student development across leading institutions." },
            { name: "Mr. David Okon", role: "Head Teacher (Primary)", bio: "Dedicated to laying the strongest foundation for early childhood education with over 15 years of experience in primary pedagogy." }
          ].map((leader, idx) => (
            <Card key={idx} className="text-center shadow-md border-none hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 pb-8">
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-brand-green-50 rounded-full mx-auto mb-6 overflow-hidden relative shadow-sm border-4 border-brand-green/10 group-hover:border-brand-green/30 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center text-brand-green text-4xl">
                    {leader.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{leader.name}</h3>
                <p className="text-brand-green font-semibold text-xs sm:text-sm mb-3">{leader.role}</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
