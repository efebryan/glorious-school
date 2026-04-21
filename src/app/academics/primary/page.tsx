"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function PrimaryPage() {
  return (
    <>
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Primary Section</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Igniting curiosity and fostering a lifelong love for learning in young minds.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Developing Core Competencies</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our Primary curriculum is robust, engaging, and designed to meet global standards while retaining strong national educational values. From Primary 1 through 6, we focus on building essential skills in literature, mathematics, sciences, and the arts.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We employ a blended learning approach, utilizing modern educational technology and practical demonstrations to ensure that abstract concepts become completely understandable.
            </p>
            <Link href="/admissions/apply">
               <Button className="font-semibold shadow-md">Apply for Primary →</Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image src="/images/hero-students.png" alt="Primary students in class" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="bg-brand-green text-white p-4 sm:p-6 rounded-xl text-center shadow-md">
                 <span className="block text-3xl font-bold mb-1">100%</span>
                 <span className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Pass Rate in Common Entrance</span>
               </div>
               <div className="bg-brand-yellow text-slate-900 p-4 sm:p-6 rounded-xl text-center shadow-md">
                 <span className="block text-3xl font-bold mb-1">30+</span>
                 <span className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Dedicated Primary Teachers</span>
               </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-2">Academic Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">Our Primary Focus Areas</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-blue-500">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">STEM Education</h3>
                <p className="text-slate-600 text-sm">Early exposure to Science, Technology, Engineering and Mathematics through practical projects and standard laboratory activities.</p>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-purple-500">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Literacy & Literacy</h3>
                <p className="text-slate-600 text-sm">Comprehensive language arts covering literature, creative writing, comprehension, and public speaking.</p>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-green-500">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Civic Values</h3>
                <p className="text-slate-600 text-sm">Teaching citizenship, morality, national history, and ethical behavior to build responsible future leaders.</p>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-1 transition-transform border-t-4 border-t-brand-yellow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Information Technology</h3>
                <p className="text-slate-600 text-sm">Practical computing skills including basic coding, word processing, and internet safety in our dedicated ICT labs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
