"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function SecondaryPage() {
  return (
    <>
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Secondary Section</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Preparing students for global excellence and higher education success.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Excellence in Academics & Character</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              The Secondary Section at Glorious Schools (JSS 1 – SS 3) is a rigorous, modern academic program that prepares students for outstanding performance in WAEC, NECO, and international examinations.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We offer comprehensive pathways in Sciences, Arts, and Commercial subjects, allowing students to tailor their education toward their career aspirations under the guidance of expert educators and career counselors.
            </p>
            <Link href="/admissions/apply">
               <Button className="font-semibold shadow-md inline-flex items-center">
                 Apply for Secondary <span className="ml-2">→</span>
               </Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] relative">
                <Image src="/images/science-lab.png" alt="Secondary students in lab" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 sm:p-8 pt-20">
                <blockquote className="text-white italic text-lg sm:text-xl border-l-4 border-brand-yellow pl-4">
                  "Our state-of-the-art science laboratories ensure our students don't just learn theory, they practice it."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-2">Curriculum Pathways</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Senior Secondary Departments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-blue-500 overflow-hidden shadow-md">
              <div className="h-32 bg-blue-50 flex items-center justify-center text-4xl">🔭</div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">Science Department</h3>
                <p className="text-slate-600 text-sm mb-4">Focusing on Physics, Chemistry, Biology, Further Mathematics, and Technical Drawing. Perfect for future engineers, doctors, and technologists.</p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• Fully equipped Physics Lab</li>
                  <li>• Modern standardized Chemistry Lab</li>
                  <li>• Annual Science Fair Participation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-purple-500 overflow-hidden shadow-md">
              <div className="h-32 bg-purple-50 flex items-center justify-center text-4xl">📚</div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">Arts Department</h3>
                <p className="text-slate-600 text-sm mb-4">Focusing on Literature, History, Government, CRK/IRK, and Languages. Designed for future lawyers, writers, and public administrators.</p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• Rich Library Resources</li>
                  <li>• Debate and Literary Societies</li>
                  <li>• Drama and Theatre Arts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-brand-green overflow-hidden shadow-md">
              <div className="h-32 bg-brand-green-50 flex items-center justify-center text-4xl">📊</div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3">Commercial Department</h3>
                <p className="text-slate-600 text-sm mb-4">Focusing on Financial Accounting, Commerce, Economics, and Office Practice. Preparing future economists, bankers, and entrepreneurs.</p>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• Practical Accounting Sessions</li>
                  <li>• Business & Entrepreneurship Club</li>
                  <li>• Economics Seminars</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
