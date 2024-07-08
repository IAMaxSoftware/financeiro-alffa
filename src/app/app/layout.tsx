"use client"

import { ReactNode, useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SelecionaEmpresa from '@/components/selecionaEmpresa';
import { Button } from '../../components/ui/button';
import { NameRoutes } from './functions/utils';
import { useAppData } from './context/app_context';
import { useRouter } from 'next/navigation';
import UserDropdown from './_componentes/user_dropdown';

interface homeLayoutProps {
    children: ReactNode;
}

export default function HomeLayout({ children }: homeLayoutProps) {
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
    }, []);


    function personalizaClasse() {
        switch (ultRota) {
            case NameRoutes.app:
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
        setUltRota(NameRoutes.app);
        navigate.push(NameRoutes.app);
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
        console.log('aqui')
        setAvatarAberto(!avatarAberto);
    }

    function nomeEmpresa(): String {
        if (empresaSelecionada == null) {
            return 'Financeiro';
        }
        return empresaSelecionada.nome;
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
                            <AccordionTrigger>Funcionários</AccordionTrigger>
                            <AccordionContent>
                                <Button variant="ghost" className={classRealizarLancamento} >Folha de Pagamentos</Button>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </nav>
            </aside>
            <div className='h-full w-full'>
                <nav className='grid grid-cols-2 justify-items-end w-full bg-white shadow-md py-4'>
                    <p className='pt-2 text-orange-600 font-sans font-bold text-2xl' >{nomeEmpresa()}</p>
                    <UserDropdown avatarAberto clickAvatar={clickAvatar} />
                </nav>
                <div className='p-2'>
                    {children}
                </div>
            </div>
        </div>
    )

}