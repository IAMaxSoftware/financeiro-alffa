"use client"

import { ReactNode, useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SelecionaEmpresa from '@/components/selecionaEmpresa';
import { Button } from '../../components/ui/button';
import { ChevronDown, ChevronUp, CircleUserRound, LogOut, User, UserRoundPlus } from 'lucide-react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { NameRoutes } from './functions/utils';
import { useAppData } from './context/app_context';
import { redirect, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface homeLayoutProps {
    children: ReactNode;
}

export default function HomeLayout({ children }: homeLayoutProps) {
    const { data: session } = useSession();
    const classPadrao = 'text-slate-600  w-full rounded-full';
    const classSelecionado = 'text-orange-600	bg-orange-200 w-full rounded-full'
    const [avatarAberto, setAvatarAberto] = useState(false);
    const { setUltRota, empresaSelecionada, ultRota } = useAppData();
    const [classListarDespesas, setClassListarDespesa] = useState(classPadrao);
    const [classRealizarLancamento, setclassRealizarLancamento] = useState(classPadrao);
    const [classListarReceita, setClassListarReceita] = useState(classPadrao);
    const [classListarLancamento, setClassListarLancamento] = useState(classPadrao);
    const [classDashBoard, setClassDashBoard] = useState(classSelecionado);
    const navigate = useRouter();

    useEffect(() => {
    }, [empresaSelecionada]);

    useEffect(() => {
        personalizaClasse();
        console.log(session)
    }, []);


    function personalizaClasse() {
        switch (ultRota) {
            case NameRoutes.home:
                resetaClasses();
                break;
            case NameRoutes.listarDespesa:
                setClassListarDespesa(classSelecionado);
                break;
            case NameRoutes.listarReceita:
                setClassListarReceita(classSelecionado);
                break;
            case NameRoutes.listarLancamento:
                setClassListarLancamento(classSelecionado);
                break;
        }
    }


    function resetaClasses() {
        setClassDashBoard(classPadrao);
        setClassListarDespesa(classPadrao);
        setClassListarReceita(classPadrao);
        setclassRealizarLancamento(classPadrao);
        setClassListarLancamento(classPadrao);
    }

    const Home = () => {
        resetaClasses();
        setUltRota(NameRoutes.home);
        navigate.push(NameRoutes.home);
        setClassDashBoard(classSelecionado);
    }

    const cadastraLacamento = () => {
        resetaClasses();
        setUltRota(NameRoutes.cadastrarLancamento);
        navigate.push(NameRoutes.cadastrarLancamento);
        setclassRealizarLancamento(classSelecionado);
    }

    const ListarDespesa = () => {
        resetaClasses();
        setUltRota(NameRoutes.listarDespesa);
        navigate.push(NameRoutes.listarDespesa);
        setClassListarDespesa(classSelecionado);
    }

    const ListarReceita = () => {
        resetaClasses();
        setUltRota(NameRoutes.listarReceita);
        navigate.push(NameRoutes.listarReceita);
        setClassListarReceita(classSelecionado);
    }

    const ListarLancamento = () => {
        resetaClasses();
        setUltRota(NameRoutes.listarLancamento);
        navigate.push(NameRoutes.listarLancamento);
        setClassListarLancamento(classSelecionado);
    }

    const clickAvatar = () => {
        setAvatarAberto(!avatarAberto);

    }

    function nomeEmpresa(): String {
        if (empresaSelecionada == null) {
            return 'Financeiro';
        }
        return empresaSelecionada.nome;


    }

    const logout = () => {
        resetaClasses();
        setUltRota("");
        navigate.push("/");
    }

    return (
        <div className='flex h-full'>
            <aside className='inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-inherit h-full bg-background sm:flex'>
                <nav className="flex flex-col h-full items-center gap-4 px-2 sm:py-5 w-64">
                    <SelecionaEmpresa />
                    <Button className={classDashBoard} variant="ghost" onClick={Home}>
                        Dashboard
                    </Button>
                    <Accordion type='multiple' className="w-full">
                        <AccordionItem value='1'>
                            <AccordionTrigger >Finanças</AccordionTrigger>
                            <AccordionContent>
                                <Button variant="ghost" className={classListarDespesas} onClick={ListarDespesa}>Despesas</Button>
                            </AccordionContent>
                            <AccordionContent>
                                <Button variant="ghost" className={classListarReceita} onClick={ListarReceita}>Receitas</Button>
                            </AccordionContent>
                            <AccordionContent>
                                <Button variant="ghost" className={classListarLancamento} onClick={ListarLancamento}>Lançamentos</Button>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value='3'>
                            <AccordionTrigger>Lançamentos</AccordionTrigger>
                            <AccordionContent>
                                <Button variant="ghost" className={classRealizarLancamento} onClick={cadastraLacamento}>Realizar Lançamento</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </nav>
            </aside>
            <div className='h-full w-full'>
                <nav className='grid grid-cols-2 justify-items-end w-full bg-white shadow-md py-4'>
                    <p className='pt-2 text-orange-600 font-sans font-bold text-2xl' >{nomeEmpresa()}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='hover:bg-slate-300'
                                onClick={clickAvatar}
                                size="sm" variant="ghost">
                                <div className='grid grid-cols-2 justify-items-end'>
                                    <Avatar>
                                        {session?.user?.image && (<AvatarImage src={session?.user?.image} alt="@shadcn" />)}
                                        <AvatarFallback> <CircleUserRound size={24} /></AvatarFallback>
                                    </Avatar>
                                    {avatarAberto ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{session?.user?.name}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <UserRoundPlus className="mr-2 h-4 w-4" />
                                    <span>Cadastrar Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
                <div className='p-2'>
                    {children}
                </div>
            </div>
        </div>
    )

}