import React from 'react';
import  Button  from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Logo } from "../../components/logo";
import { Link } from 'react-router-dom'; 

export default function ChildLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo variant="child" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Kid Sign In</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-gray-950 px-6 py-12 shadow sm:rounded-lg sm:px-12 border-2 border-secondary">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Label htmlFor="email">Username or Email</Label>
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
                    autoComplete="current-password"
                    required
                    className="block w-full h-10"
                  />
                </div>
              </div>


              <div>
                <Link to="/child/dashboard">
                  <Button type="button" variant="secondary" className="w-full ">
                    Sign in
                  </Button>
                </Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
