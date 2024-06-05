-- AlterTable
ALTER TABLE "Despesas" ADD COLUMN     "empresaId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Receitas" ADD COLUMN     "empresaId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Despesas" ADD CONSTRAINT "Despesas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receitas" ADD CONSTRAINT "Receitas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
