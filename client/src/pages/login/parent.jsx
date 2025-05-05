import React from 'react';
import  Button  from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Logo } from "../../components/logo";
import { Link } from 'react-router-dom'; 

export default function ParentLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Parent Sign In</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-gray-950 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full h-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full h-10"
                  />
                </div>
              </div>
              <div>
                <Link to="/parent/dashboard">
                  <Button type="button" className="w-full">
                    Sign in
                  </Button>
                </Link>
              </div>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white dark:bg-gray-950 px-6 text-gray-500 dark:text-gray-400">
                    New to Piggy AI?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/register/parent">
                  <Button variant="outline" className="w-full">
                    Create an account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
