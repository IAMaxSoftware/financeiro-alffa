"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppData } from "./context/app_context";
import { keyBoardInputEvent } from "./functions/utils";
import { usuarioAutentico } from "./repositories/usuario_repository";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useRouter();
  const { setUsuarioLogado, setEmpresaSelecionada } = useAppData();

  const passPress = async (e: keyBoardInputEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSingInGoole = async () => signIn('google', { callbackUrl: 'http://localhost:3000/home' });

  const handleSubmit = async () => {
    const siginResponse = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (siginResponse && !siginResponse.error) {
      const { usuario } = await usuarioAutentico();
      setEmpresaSelecionada(null);
      setUsuarioLogado(usuario);
      navigate.push("/home");
    }
    else {
      setPassword('');
      toast({
        variant: "destructive",
        title: "Dados Incorretos.",
        description: "E-mail ou senha incorretas!"
      })
    }
  }

  return (
    <div className="flex h-screen w-full bg-gray-900 bg-cover bg-no-repeat bg-[url('../../src/assets/financeiro.png')]">
      <Toaster />
      <div id="backgroundLogin" className=" h-full w-full sm:w-1/2 md:w-1/2 lg:w-1/2 ">
        <div className="rounded-xl mt-40 self-start mx-auto">
          <div className='flex flex-col items-center'>
            <Card className="w-80 h-100 opacity-100 bg-neutral-200 text-orange-600">
              <CardHeader>
                <CardTitle>FINANCEIRO</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="e-mail">Email</Label>
                      <Input value={email} type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Senha</Label>
                      <Input id="pass" value={password} type='password' placeholder="Digite a sua senha" onKeyDown={(e: keyBoardInputEvent) => passPress(e)} onChange={e => setPassword(e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col justify-center">
                <Button onClick={handleSubmit}>Login</Button><p>ou</p>
                <Button onClick={handleSingInGoole}>Login com Google</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
