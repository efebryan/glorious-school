"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function ExtraCurricularPage() {
  return (
    <>
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Extra-Curricular Activities</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Education beyond the classroom. Developing talents, teamwork, and leadership skills.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Developing The Whole Child</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              At Glorious Group of Schools, we believe that education is not limited to the four walls of a classroom. Our robust extra-curricular program is designed to unearth hidden talents, encourage physical fitness, and build essential social skills.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              From competitive sports to creative arts and academic clubs, every student is encouraged to participate in activities that align with their passions and interests.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute -inset-4 bg-brand-yellow/20 rounded-3xl -z-10 -translate-y-4 translate-x-4"></div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image src="/images/sports-event.png" alt="Sports Event" fill className="object-cover" />
              </div>
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/cultural-day.png" alt="Cultural Activities" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-2">Clubs & Societies</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Explore Our Activities</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-green-500">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">⚽</div>
                <h3 className="font-bold text-lg mb-2">Sports Academy</h3>
                <p className="text-slate-600 text-sm">Football, Basketball, Athletics, and Table Tennis with regular inter-school competitions.</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-blue-500">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">💻</div>
                <h3 className="font-bold text-lg mb-2">Jet/ICT Club</h3>
                <p className="text-slate-600 text-sm">Coding, robotics, and basic engineering design for our technically inclined students.</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-purple-500">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🎭</div>
                <h3 className="font-bold text-lg mb-2">Theatre & Arts</h3>
                <p className="text-slate-600 text-sm">Drama, dance, singing, and fine arts. Students showcase their talents during our annual school plays.</p>
              </CardContent>
            </Card>

            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-orange-500">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🗣️</div>
                <h3 className="font-bold text-lg mb-2">Literary & Debate</h3>
                <p className="text-slate-600 text-sm">Building confidence through public speaking, debates, and creative writing programs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
