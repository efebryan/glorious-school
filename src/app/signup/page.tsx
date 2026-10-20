"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { signUp, type AuthState } from "@/lib/actions/auth";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState<AuthState | null, FormData>(
    signUp,
    null
  );

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
            {state?.success ? (
              <div className="bg-brand-green-50 border border-brand-green-200 text-brand-green-800 p-6 rounded-xl text-center space-y-4">
                <div className="text-4xl">✉️</div>
                <h3 className="text-xl font-bold">Account Created!</h3>
                <p className="text-sm text-slate-600">
                  Your registration with Glorious Group of Schools is successful. If email confirmation is enabled, please verify your email address to log in.
                </p>
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="inline-block px-6 py-2.5 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-700 transition-colors shadow-sm text-sm"
                  >
                    Proceed to Login →
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-5" action={formAction}>
                {state?.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{state.error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input 
                    label="First Name" 
                    name="firstName"
                    placeholder="e.g. John"
                    required 
                  />
                  <Input 
                    label="Last Name" 
                    name="lastName"
                    placeholder="e.g. Doe"
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input 
                    type="email"
                    label="Email Address" 
                    name="email"
                    placeholder="parent@example.com"
                    required 
                  />
                  <Input 
                    type="tel"
                    label="Phone Number" 
                    name="phone"
                    placeholder="0800 000 0000"
                  />
                </div>

                <Select 
                  label="I am registering as a..." 
                  name="accountType"
                  defaultValue="parent"
                  options={[
                    { value: "parent", label: "Parent/Guardian" },
                    { value: "student", label: "Student" },
                    { value: "teacher", label: "Teacher / Staff Member" },
                  ]}
                  required
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <Input 
                    type="password"
                    label="Password" 
                    name="password"
                    placeholder="At least 6 characters"
                    required 
                  />
                  <Input 
                    type="password"
                    label="Confirm Password" 
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    required 
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full font-bold text-base h-12" 
                    size="lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Creating account...
                      </span>
                    ) : 'Create Account'}
                  </Button>
                </div>
              </form>
            )}

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
