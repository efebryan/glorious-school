"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function NurseryPage() {
  return (
    <>
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Nursery Section</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            A nurturing and stimulating environment for early childhood development.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Building the Foundation</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              At Glorious Schools Nursery, we believe that the first few years of a child&apos;s life are crucial for laying a strong foundation for future learning. Our nursery program is designed to be a home away from home, where young learners can explore, discover, and grow in a safe and loving environment.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-brand-green mr-3 text-lg">✓</span>
                <span className="text-slate-700"><strong>Play-Based Learning:</strong> Encouraging creativity and problem-solving through guided play.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mr-3 text-lg">✓</span>
                <span className="text-slate-700"><strong>Early Phonics & Numeracy:</strong> Gentle introduction to reading and numbers using modern visual aids.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mr-3 text-lg">✓</span>
                <span className="text-slate-700"><strong>Social Development:</strong> Teaching empathy, sharing, and communication skills.</span>
              </li>
            </ul>
            <Link href="/admissions/apply">
               <Button className="font-semibold shadow-md">Apply for Nursery →</Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute -inset-4 bg-brand-green/10 rounded-3xl -z-10 translate-y-4 translate-x-4"></div>
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image src="/images/hero-students.png" alt="Nursery students" fill className="object-cover" />
              </div>
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/cultural-day.png" alt="Nursery activities" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-2">Curriculum Focus</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">What Your Child Will Learn</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <Card className="hover:-translate-y-1 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">🎨</div>
                <h3 className="font-bold text-lg mb-2">Creative Arts</h3>
                <p className="text-slate-600 text-sm">Drawing, painting, and crafting to express imagination.</p>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-1 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-xl mb-4">🗣️</div>
                <h3 className="font-bold text-lg mb-2">Language</h3>
                <p className="text-slate-600 text-sm">Vocabulary building, storytelling, and early phonetics.</p>
              </CardContent>
            </Card>
            <Card className="hover:-translate-y-1 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 text-brand-green rounded-xl flex items-center justify-center text-xl mb-4">🧩</div>
                <h3 className="font-bold text-lg mb-2">Motor Skills</h3>
                <p className="text-slate-600 text-sm">Coordination activities, puzzles, and outdoor play.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
