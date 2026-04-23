"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // UI mock for form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("This is a demo. Authentication will be connected in the backend phase.");
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
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to access the parent/student portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg border-none py-8 px-4 sm:px-10 bg-white">
          <CardContent className="p-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input 
                type="email"
                label="Email address" 
                name="email"
                placeholder="parent@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              
              <div>
                <Input 
                  type="password"
                  label="Password" 
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <div className="flex items-center justify-end mt-2">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-brand-green hover:text-brand-green-700">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full font-bold text-base" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-600">Don't have an account? </span>
              <Link href="/signup" className="font-semibold text-brand-green hover:text-brand-green-700">
                Sign up
              </Link>
            </div>
            
            <div className="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-500 space-y-2">
              <p>For Result Checking, please use the <Link href="/result-checker" className="text-brand-yellow-600 font-medium hover:underline">Result Checker Portal</Link>.</p>
              <div className="flex items-center justify-center gap-3">
                <p>Staff members? Access the <Link href="/staff-dashboard/overview" className="text-brand-green font-medium hover:underline">Staff Portal</Link>.</p>
                <span className="text-slate-300">|</span>
                <Link href="/admin/overview" className="text-brand-green font-medium hover:underline">Admin Panel</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
