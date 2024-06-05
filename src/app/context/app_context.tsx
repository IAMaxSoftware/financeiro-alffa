"use client"
import React, { ReactNode, useState, useContext, createContext, SetStateAction } from "react";
import { EmpresaModel } from "../models/empresa_model";
import { User } from "../../../lib/session";


interface AppDataContextType {
    ultRota: string;
    usuarioLogado: User;
    empresaSelecionada: EmpresaModel;
    accessToken: string;
    controleUniversal: boolean;
    setAccessToken: React.Dispatch<SetStateAction<string>>;
    setUltRota: React.Dispatch<SetStateAction<string>>;
    setUsuarioLogado: React.Dispatch<SetStateAction<User>>;
    setEmpresaSelecionada: React.Dispatch<SetStateAction<EmpresaModel | null>>;
    setControleUniversal: React.Dispatch<SetStateAction<boolean>>;
}

const AppDataContext = createContext({});

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    const [ultRota, setUltRota] = useState<string>('home');
    const [usuarioLogado, setUsuarioLogado] = useState<User | null>(JSON.parse(localStorage.getItem('usuario_logado') ?? '{}'));
    const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaModel | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [controleUniversal, setControleUniversal] = useState(false);
    return (
        <AppDataContext.Provider value={{
            ultRota,
            setUltRota,
            usuarioLogado,
            accessToken,
            setAccessToken,
            setUsuarioLogado,
            empresaSelecionada,
            setEmpresaSelecionada,
            controleUniversal,
            setControleUniversal
        }}>
            {children}
        </AppDataContext.Provider>
    );
}

function useAppData(): AppDataContextType {
    const context = useContext(AppDataContext);
    if (context === null) {
        throw new Error('O contexto ainda não foi criado')
    }
    const { ultRota, setUltRota, usuarioLogado, setUsuarioLogado, accessToken, setAccessToken, empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal } = context as AppDataContextType;
    return { ultRota, setUltRota, usuarioLogado, setUsuarioLogado, accessToken, setAccessToken, empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal };
}
export { AppProvider, useAppData }
