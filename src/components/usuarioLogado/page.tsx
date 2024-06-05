"use client"
import { useEffect, useState } from "react";
import { User, getUserSession } from "../../../lib/session";

export default function UsuarioLogado() {
    const [userSession, setUserSession] = useState<User>();

    useEffect(() => {
        getSession();
    }, [])
    const getSession = async () => {
        const session = await getUserSession()
        console.log(session)
        setUserSession(session);
    }

    return (
        <h1>{userSession?.name}</h1>
    );
}