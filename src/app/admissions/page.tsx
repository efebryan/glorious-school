import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Admissions | Glorious Group of Schools",
  description: "Learn about our admission process, requirements, and how to apply to Glorious Group of Schools.",
};

export default function AdmissionsPage() {
  return (
    <>
      {/* Page Hero - Consistent green */}
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Become a part of the Glorious family. Detailed information on our application process and requirements.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Process Steps */}
          <div className="lg:w-2/3">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-3">How To Apply</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Step-by-Step Process</h2>
            
            <div className="space-y-4 sm:space-y-6">
              {[
                { step: "1", title: "Obtain Application Form", desc: "Purchase the admission form from the school's bursary or fill it out online via our upcoming portal. A non-refundable fee applies." },
                { step: "2", title: "Submit Documents", desc: "Return the completed form along with all required documentation (birth certificate, past results, passport photographs) to the admissions office." },
                { step: "3", title: "Entrance Examination", desc: "Eligible candidates will be invited for a written entrance examination covering Mathematics, English, and General Aptitude." },
                { step: "4", title: "Interview", desc: "Successful candidates from the written exam, accompanied by parents/guardians, will attend a brief oral interview." },
                { step: "5", title: "Offer of Admission", desc: "An official letter of admission will be issued to candidates who pass all stages, detailing fee payment procedures." }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-green text-white font-bold flex items-center justify-center shadow-md text-sm sm:text-base group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    {index < 4 && <div className="w-0.5 flex-1 bg-brand-green-100 mt-2"></div>}
                  </div>
                  <div className="pb-6 sm:pb-8 flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1.5">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Admission Image */}
            <div className="rounded-2xl overflow-hidden shadow-md relative aspect-video lg:aspect-[4/3]">
              <Image
                src="/images/hero-students.png"
                alt="Students at Glorious Schools"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-700/60 to-transparent flex items-end p-4 sm:p-6">
                <p className="text-white font-bold text-sm sm:text-base">Join 1000+ students excelling at Glorious Schools</p>
              </div>
            </div>

            <Card className="border-t-4 border-t-brand-yellow shadow-md">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 flex items-center">
                  <span className="w-8 h-1 bg-brand-yellow rounded-full mr-3 inline-block"></span>
                  Requirements
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-slate-600 text-sm">
                  {[
                    'Completed Application Form',
                    '2 Recent Passport Photographs',
                    'Photocopy of Birth Certificate',
                    "Last Term's Academic Result (for transfer students)",
                    'Transfer Certificate (if applicable)',
                  ].map((req, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand-green mr-2 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card noBg className="bg-brand-green-50 border-none shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Have Questions?</h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-5">Our admissions team is available Monday through Friday, 8:00 AM to 4:00 PM.</p>
                <div className="space-y-2.5 text-sm text-slate-900 font-medium">
                  <p className="flex items-center"><span className="text-brand-green mr-2">📞</span> +234 800 123 4567</p>
                  <p className="flex items-center"><span className="text-brand-green mr-2">✉️</span> admissions@gloriousschools.edu.ng</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
      
      {/* Bottom CTA */}
      <Section className="bg-brand-green-700 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Application</h2>
          <p className="text-white/80 mb-8 text-sm sm:text-base">Currently, applications are submitted at the school premises. The online application portal is coming soon.</p>
          <Link href="/admissions/apply">
            <Button size="lg" className="bg-brand-yellow text-slate-900 hover:bg-brand-yellow-600 font-bold border-none text-base sm:text-lg shadow-lg">
              Start Enrollment Process →
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
