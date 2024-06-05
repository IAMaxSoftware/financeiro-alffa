-- CreateTable
CREATE TABLE "Empresas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "salario" DECIMAL(65,30) NOT NULL,
    "temValeTransporte" BOOLEAN NOT NULL,
    "chavePix" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valorEstimado" DECIMAL(65,30) NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCriou" INTEGER NOT NULL,
    "dataPrevisao" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receitas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valorEstimado" DECIMAL(65,30) NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCriou" INTEGER NOT NULL,
    "dataPrevisao" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Receitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lancamentos_receita_despesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estimado" DECIMAL(65,30) NOT NULL,
    "real" DECIMAL(65,30) NOT NULL,
    "diferenca" DECIMAL(65,30) NOT NULL,
    "obs" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuId" INTEGER NOT NULL,
    "recDesId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL DEFAULT 1,
    "tipo" TEXT NOT NULL,
    "movId" INTEGER NOT NULL,

    CONSTRAINT "Lancamentos_receita_despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacoes" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "credito" DECIMAL(65,30) NOT NULL,
    "debito" DECIMAL(65,30) NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "empresaId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Movimentacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lancamentos_receita_despesa" ADD CONSTRAINT "Lancamentos_receita_despesa_usuId_fkey" FOREIGN KEY ("usuId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos_receita_despesa" ADD CONSTRAINT "Lancamentos_receita_despesa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos_receita_despesa" ADD CONSTRAINT "Lancamentos_receita_despesa_movId_fkey" FOREIGN KEY ("movId") REFERENCES "Movimentacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacoes" ADD CONSTRAINT "Movimentacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
