"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function ResultCheckerPage() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [pin, setPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("This is a demo. Backend integration pending.");
    }, 1500);
  };

  return (
    <>
      {/* Page Hero - Consistent green */}
      <div className="relative bg-brand-green-700 py-16 sm:py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Result Checker</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Access your academic performance securely using your admission number and PIN.
          </p>
        </div>
      </div>

      <Section className="bg-slate-50">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-t-4 border-t-brand-green">
            <CardHeader className="text-center pb-2 pt-8 border-none">
               <div className="w-16 h-16 bg-brand-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm border border-brand-yellow-100">
                 🎓
               </div>
               <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Student Portal</h2>
               <p className="text-slate-500 text-xs sm:text-sm">Enter your details below to view your result</p>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-5 sm:px-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input 
                  label="Admission Number" 
                  placeholder="e.g. GGS/2026/001" 
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                  required
                />
                
                <Input 
                  type="password"
                  label="Result Access PIN" 
                  placeholder="Enter 12-digit PIN" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  maxLength={12}
                />
                
                <Button 
                  type="submit" 
                  className="w-full font-bold text-base" 
                  size="lg"
                  disabled={isSubmitting || !admissionNo || !pin}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Verifying...
                    </span>
                  ) : 'Check Result'}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-5">
                <p>PINs are uniquely generated per term.</p>
                <p>Lost your PIN? <a href="/contact" className="text-brand-green font-medium hover:underline">Contact the Admin office</a></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
