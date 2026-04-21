"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const classOptions = [
  // Nursery
  { value: "creche", label: "Creche" },
  { value: "nursery_1", label: "Nursery 1" },
  { value: "nursery_2", label: "Nursery 2" },
  { value: "nursery_3", label: "Nursery 3" },
  
  // Primary
  { value: "primary_1", label: "Primary 1" },
  { value: "primary_2", label: "Primary 2" },
  { value: "primary_3", label: "Primary 3" },
  { value: "primary_4", label: "Primary 4" },
  { value: "primary_5", label: "Primary 5" },
  { value: "primary_6", label: "Primary 6" },
  
  // Secondary
  { value: "jss_1", label: "JSS 1" },
  { value: "jss_2", label: "JSS 2" },
  { value: "jss_3", label: "JSS 3" },
  { value: "ss_1", label: "SS 1" },
  { value: "ss_2", label: "SS 2" },
  { value: "ss_3", label: "SS 3" },
];

export default function AdmissionFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    classToAdmit: "",
    previousSchool: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  
  const [passportFile, setPassportFile] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // UI mock for form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <>
      <div className="relative bg-brand-green-700 py-12 sm:py-16 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link href="/admissions" className="inline-flex items-center text-brand-yellow hover:text-brand-yellow-200 mb-4 sm:mb-6 transition-colors text-sm font-medium">
            <span className="mr-2">←</span> Back to Admissions info
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Application Form</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Fill out the form below to begin the enrollment process for your child.
          </p>
        </div>
      </div>

      <Section className="bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <Card className="shadow-xl border-t-8 border-brand-green animate-fade-in-up">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 bg-brand-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✅</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                  Thank you for applying to Glorious Group of Schools. We have received your application for <strong className="text-slate-900">{formData.firstName} {formData.lastName}</strong>. Our admissions team will review your details and contact you shortly with the next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: "", middleName: "", lastName: "", dateOfBirth: "", gender: "", classToAdmit: "", previousSchool: "", parentName: "", parentPhone: "", parentEmail: "", address: "", emergencyContactName: "", emergencyContactPhone: ""
                      });
                      setPassportFile(null);
                    }}
                  >
                    Submit Another Application
                  </Button>
                  <Link href="/">
                    <Button>Return to Home</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-none overflow-hidden">
              <div className="bg-white p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Student Details</h2>
                  <p className="text-sm text-slate-500 mt-1">Please provide accurate information</p>
                </div>
                <span className="text-3xl hidden sm:block">📝</span>
              </div>
              
              <CardContent className="p-6 sm:p-8 bg-slate-50/50">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Phase 1: Child Details */}
                  <div className="space-y-5">
                    <h3 className="font-semibold text-brand-green uppercase tracking-wider text-xs flex items-center gap-2">
                      <span className="w-5 h-px bg-brand-green block"></span> Section 1: Child Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <Input 
                        label="First Name" 
                        name="firstName"
                        placeholder="Emeka" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                      <Input 
                        label="Middle Name" 
                        name="middleName"
                        placeholder="Chukwudi" 
                        value={formData.middleName}
                        onChange={handleChange}
                      />
                      <Input 
                        label="Last Name" 
                        name="lastName"
                        placeholder="Okonkwo" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <Input 
                        type="date"
                        label="Date of Birth" 
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                      <Select 
                        label="Gender" 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        required
                      />
                      <Select 
                        label="Class to Admit" 
                        name="classToAdmit"
                        value={formData.classToAdmit}
                        onChange={handleChange}
                        options={classOptions}
                        required
                        className="sm:col-span-2 lg:col-span-1"
                      />
                    </div>
                  </div>

                  {/* Phase 2: Academic History */}
                  <div className="space-y-5 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-brand-green uppercase tracking-wider text-xs flex items-center gap-2">
                      <span className="w-5 h-px bg-brand-green block"></span> Section 2: Academic History & Documents
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input 
                        label="School Attended in the Past" 
                        name="previousSchool"
                        placeholder="Name of previous school (if any)" 
                        value={formData.previousSchool}
                        onChange={handleChange}
                      />
                      <div className="w-full flex flex-col gap-1.5">
                        <label htmlFor="passportUpload" className="text-sm font-medium text-slate-700">
                          Passport Photograph
                        </label>
                        <input
                          id="passportUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green-50 file:text-brand-green hover:file:bg-brand-green-100 transition-all text-sm text-slate-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase 3: Parent/Guardian Details */}
                  <div className="space-y-5 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-brand-green uppercase tracking-wider text-xs flex items-center gap-2">
                      <span className="w-5 h-px bg-brand-green block"></span> Section 3: Parent/Guardian Information
                    </h3>
                    <Input 
                      label="Full Name (Parent/Guardian)" 
                      name="parentName"
                      placeholder="Mr. & Mrs. Okonkwo" 
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input 
                        type="tel"
                        label="Phone Number" 
                        name="parentPhone"
                        placeholder="0801 234 5678" 
                        value={formData.parentPhone}
                        onChange={handleChange}
                        required
                      />
                      <Input 
                        type="email"
                        label="Email Address" 
                        name="parentEmail"
                        placeholder="parent@example.com" 
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="address" className="text-sm font-medium text-slate-700">Residential Address</label>
                      <textarea 
                        id="address"
                        name="address"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/50 focus:border-brand-green transition-all resize-none text-sm sm:text-base"
                        placeholder="Enter full home address in Ughelli"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Phase 4: Emergency Contact */}
                  <div className="space-y-5 pt-4 border-t border-slate-200">
                    <h3 className="font-semibold text-brand-green uppercase tracking-wider text-xs flex items-center gap-2">
                      <span className="w-5 h-px bg-brand-green block"></span> Section 4: Emergency Contact
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input 
                        label="Emergency Contact Name" 
                        name="emergencyContactName"
                        placeholder="Relative or friend's name" 
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                      <Input 
                        type="tel"
                        label="Emergency Contact Phone" 
                        name="emergencyContactPhone"
                        placeholder="0801 000 0000" 
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Area */}
                  <div className="pt-8 border-t border-slate-200">
                    <div className="bg-brand-yellow-50 p-4 rounded-xl border border-brand-yellow-100 mb-6 font-medium text-sm text-slate-700 flex gap-3">
                      <span className="text-brand-yellow-600 text-lg">⚠️</span>
                      <p>By submitting this application, you agree to the terms and conditions of Glorious Group of Schools. A non-refundable application fee will be required upon physical document submission.</p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting} 
                      className="w-full font-bold text-lg h-14"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Processing Application...
                        </span>
                      ) : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}
