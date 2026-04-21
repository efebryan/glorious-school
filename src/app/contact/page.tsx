"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out with any questions, or just to say hello.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* Contact Form */}
          <div className="lg:w-3/5">
            <span className="text-brand-green font-bold tracking-wider uppercase text-xs block mb-3">Get in Touch</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-brand-green-50 border border-brand-green-200 text-brand-green-700 p-5 sm:p-6 rounded-xl flex items-start animate-fade-in-up">
                <span className="text-2xl mr-3 sm:mr-4 shrink-0 mt-0.5">✅</span>
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1">Message Sent!</h3>
                  <p className="text-sm">Thank you for reaching out to us. Our administrative team will get back to you within 24 hours.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setSubmitted(false)}
                    size="sm"
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input 
                    label="Full Name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input 
                    label="Email Address" 
                    type="email"
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <Input 
                  label="Subject" 
                  placeholder="e.g. Admission Inquiry" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <textarea 
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/50 focus:border-brand-green transition-all resize-none text-sm sm:text-base"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[180px] font-semibold">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Sending...
                    </span>
                  ) : 'Send Message →'}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="lg:w-2/5 space-y-6">
            <Card noBg className="bg-brand-green-700 text-white border-none shadow-lg overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center">
                  <span className="w-8 h-1 bg-brand-yellow rounded-full mr-3"></span>
                  Contact Information
                </h3>
                
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 mr-3 sm:mr-4 text-lg sm:text-xl">📍</div>
                    <div>
                      <h4 className="font-bold text-brand-yellow mb-1 text-xs uppercase tracking-wider">Address</h4>
                      <p className="text-white/80 leading-relaxed text-xs sm:text-sm">123 Glorious Avenue,<br/>Ughelli, Delta State,<br/>Nigeria.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 mr-3 sm:mr-4 text-lg sm:text-xl">📞</div>
                    <div>
                      <h4 className="font-bold text-brand-yellow mb-1 text-xs uppercase tracking-wider">Phone</h4>
                      <p className="text-white/80 leading-relaxed text-xs sm:text-sm">+234 800 123 4567<br/>+234 800 987 6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 mr-3 sm:mr-4 text-lg sm:text-xl">✉️</div>
                    <div>
                      <h4 className="font-bold text-brand-yellow mb-1 text-xs uppercase tracking-wider">Email</h4>
                      <p className="text-white/80 leading-relaxed text-xs sm:text-sm">info@gloriousschools.edu.ng<br/>admissions@gloriousschools.edu.ng</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 mr-3 sm:mr-4 text-lg sm:text-xl">🕐</div>
                    <div>
                      <h4 className="font-bold text-brand-yellow mb-1 text-xs uppercase tracking-wider">Office Hours</h4>
                      <p className="text-white/80 leading-relaxed text-xs sm:text-sm">Monday – Friday<br/>8:00 AM – 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md relative border border-slate-200">
              <Image
                src="/images/school-building.png"
                alt="Glorious Group of Schools location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-brand-green-700/70 flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-3xl sm:text-4xl mb-2">🗺️</span>
                <span className="font-bold text-sm sm:text-base mb-1">Find Us on the Map</span>
                <span className="text-xs text-white/70">123 Glorious Avenue, Ughelli, Delta State</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
