'use client'

import React, { ReactNode, useState, useContext, createContext, SetStateAction } from "react";
import { EmpresaModel } from "../models/empresa_model";


interface AppDataContextType {
    ultRota: string;
    empresaSelecionada: EmpresaModel;
    controleUniversal: boolean;
    setUltRota: React.Dispatch<SetStateAction<string>>;
    setEmpresaSelecionada: React.Dispatch<SetStateAction<EmpresaModel | null>>;
    setControleUniversal: React.Dispatch<SetStateAction<boolean>>;
}

const AppDataContext = createContext({});

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    const [ultRota, setUltRota] = useState<string>('home');
    const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaModel | null>(null);
    const [controleUniversal, setControleUniversal] = useState(false);
    return (
        <AppDataContext.Provider value={{
            ultRota,
            setUltRota,
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
    const { ultRota, setUltRota, empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal } = context as AppDataContextType;
    return { ultRota, setUltRota, empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal };
}
export { AppProvider, useAppData }
