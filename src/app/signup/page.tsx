"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    phone: "",
    accountType: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    // UI mock for form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("This is a demo. Registration logic will be implemented in the backend phase.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            G
          </div>
        </Link>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join the Glorious Group of Schools portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <Card className="shadow-lg border-none py-8 px-4 sm:px-10 bg-white">
          <CardContent className="p-0">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input 
                  label="First Name" 
                  name="firstName"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required 
                />
                <Input 
                  label="Last Name" 
                  name="lastName"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input 
                  type="email"
                  label="Email Address" 
                  name="email"
                  placeholder="parent@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
                <Input 
                  type="tel"
                  label="Phone Number" 
                  name="phone"
                  placeholder="0800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <Select 
                label="I am registering as a..." 
                name="accountType"
                value={formData.accountType}
                onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                options={[
                  { value: "parent", label: "Parent/Guardian" },
                  { value: "student", label: "Student" },
                  { value: "staff", label: "Staff Member" },
                ]}
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <Input 
                  type="password"
                  label="Password" 
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <Input 
                  type="password"
                  label="Confirm Password" 
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required 
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full font-bold text-base h-12" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-600">Already have an account? </span>
              <Link href="/login" className="font-semibold text-brand-green hover:text-brand-green-700">
                Sign in
              </Link>
            </div>
            
            <div className="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-500">
              <p>By registering, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
