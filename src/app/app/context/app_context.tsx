'use client'

import React, { ReactNode, useState, useContext, createContext, SetStateAction } from "react";
import { EmpresaModel } from "../models/empresa_model";
import { DespesaModel } from "../models/despesa_model";
import { ReceitaModel } from "../models/receita_model";


interface AppDataContextType {
    empresaSelecionada: EmpresaModel;
    controleUniversal: boolean;
    despesaSelecionada: DespesaModel | null;
    receitaSelecionada: ReceitaModel | null;
    setEmpresaSelecionada: React.Dispatch<SetStateAction<EmpresaModel | null>>;
    setControleUniversal: React.Dispatch<SetStateAction<boolean>>;
    setDespesaSelecionada: React.Dispatch<SetStateAction<DespesaModel | null>>;
    setReceitaSelecionada: React.Dispatch<SetStateAction<ReceitaModel | null>>;
}

const AppDataContext = createContext({});

interface AppProviderProps {
    children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
    const [empresaSelecionada, setEmpresaSelecionada] = useState<EmpresaModel | null>(null);
    const [controleUniversal, setControleUniversal] = useState(false);
    const [despesaSelecionada, setDespesaSelecionada] = useState<DespesaModel | null>(null);
    const [receitaSelecionada, setReceitaSelecionada] = useState<DespesaModel | null>(null);
    return (
        <AppDataContext.Provider value={{
            empresaSelecionada,
            setEmpresaSelecionada,
            controleUniversal,
            setControleUniversal,
            despesaSelecionada,
            setDespesaSelecionada,
            receitaSelecionada,
            setReceitaSelecionada
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
    const { empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal, despesaSelecionada, setDespesaSelecionada, receitaSelecionada, setReceitaSelecionada } = context as AppDataContextType;
    return { empresaSelecionada, setEmpresaSelecionada, controleUniversal, setControleUniversal, despesaSelecionada, setDespesaSelecionada, receitaSelecionada, setReceitaSelecionada };
}
export { AppProvider, useAppData }
