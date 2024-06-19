import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-xl">
            <h1>Bem vindo ao Sistema financeiro Alffa</h1>
            <p>Seu sistema financeiro completo em um só lugar.</p>
            <Link className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/auth">
                Entrar
            </Link>
        </main>
    );
}