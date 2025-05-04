import React from 'react';
import  Button  from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Logo } from "../../components/logo";
import { Link } from 'react-router-dom'; 

export default function RegisterParentPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight">Create a Parent Account</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login/parent" className="font-semibold text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Full name</Label>
                <div className="mt-2">
                  <Input id="name" name="name" type="text" autoComplete="name" required className="block w-full h-10" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2">
                  <Input id="email" name="email" type="email" autoComplete="email" required className="block w-full h-10" />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full h-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password-confirm">Confirm password</Label>
                <div className="mt-2">
                  <Input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full h-10"
                  />
                </div>
              </div>

             
              <div>
                <Link to="/parent/dashboard">
                  <Button type="button" className="w-full">
                    Create account
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary to-secondary opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Why Choose Piggy AI?</h2>
            <ul className="space-y-4">
              {[
                "Teach your children financial responsibility in a fun, engaging way",
                "Track allowances, spending, and savings goals in one place",
                "Age-appropriate financial education and tools",
                "Secure, family-friendly platform designed for parents and children",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
