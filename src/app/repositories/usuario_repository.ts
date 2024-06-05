import { User, getUserSession } from "../../../lib/session";



async function usuarioAutentico() {
    try {
        const userSession = await getUserSession()
        console.log(userSession)
        const usuario = userSession;
        const accessToken = userSession.accessToken;
        localStorage.setItem('usuario_logado', JSON.stringify(userSession));
        localStorage.setItem('accessToken', userSession.accessToken!);
        return {
            accessToken,
            usuario
        };
    } catch (error) {
        throw new Error(String(error));
    }
}
export { usuarioAutentico }
