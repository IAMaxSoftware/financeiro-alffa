"use client"

import { Toaster } from "@/components/ui/toaster";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

export default function Login() {
  const handleSingInGoole = async () => signIn('google', { callbackUrl: '/app' });

  return (
    <div className="flex h-screen w-full bg-gray-900 bg-cover bg-no-repeat bg-[url('../../src/assets/financeiro.png')]">
      <Toaster />
      <div id="backgroundLogin" className=" h-full w-full sm:w-1/2 md:w-1/2 lg:w-1/2 ">
        <div className="rounded-xl mt-40 self-start mx-auto">
          <div className='flex flex-col items-center'>
            <Card className="w-80 h-100 opacity-100 bg-neutral-200 text-orange-600">
              <CardHeader>
                <CardTitle className="text-center">FINANCEIRO</CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-col justify-center">
                <Button onClick={handleSingInGoole}>Login com Google</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
