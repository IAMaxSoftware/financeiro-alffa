"use client"
import Lottie from "lottie-react";
import animacao from "@/assets/loadingMoney.json";
export default function Loading() {
    return (
        <div className="flex flex-row size-2/4 text-center">
            <h1 className="text-orange-600 font-bold text-2xl">Carregando...</h1>
            <Lottie animationData={animacao} loop={true} />
        </div>

    )

}