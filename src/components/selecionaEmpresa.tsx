"use client"


import { useAppData } from "@/app/app/context/app_context";
import { EmpresaModel } from "@/app/app/models/empresa_model";
import { getAllEmpresas } from "@/app/app/repositories/empresa_repository";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

export default function SelecionaEmpresa() {
  const [position, setPosition] = useState("bottom");
  const [carregando, setCarregando] = useState(true);
  const [empresas, setEmpresas] = useState<EmpresaModel[]>([]);
  const { setEmpresaSelecionada } = useAppData();

  useEffect(() => {
    getEmpresas();
  }, []);

  async function getEmpresas() {
    setCarregando(true);
    let empresas: EmpresaModel[] = [];
    empresas = await getAllEmpresas();
    setEmpresas(empresas);
    setCarregando(false);

  }

  return (
    <div>
      {carregando ?
        <></> :
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="default">Escolha uma empresa</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Selecione uma empresa </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="todas" onClick={() => setEmpresaSelecionada(null)}>Todas</DropdownMenuRadioItem>
              {empresas.length > 0 ?
                empresas.map(empresa => <DropdownMenuRadioItem key={empresa.id} onClick={() => setEmpresaSelecionada(empresa)} value={empresa.id.toString()}>{empresa.nome} </DropdownMenuRadioItem>)
                : <></>}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  )
}