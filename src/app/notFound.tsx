"use client"
import Lottie from "lottie-react";
import animacao from "@/assets/notFound.json";
export default function NotFound() {

    return (
        <div className="flex-column  size-3/4">
            <Lottie animationData={animacao} loop={true} />
        </div>

    )

}