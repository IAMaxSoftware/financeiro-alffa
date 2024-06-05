import { getUserSession } from "../../../lib/session";

export default async function UsuarioLogado() {
    const userSession = await getUserSession()
    return (
        <h1>{userSession.name}</h1>
    );
}