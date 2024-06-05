import { getServerSession } from 'next-auth'

export interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string | null
}

export const session = async ({ session, token }: any) => {
    session.user.id = token.id
    session.accessToken = token.accessToken
    return session
}

export const getUserSession = async (): Promise<User> => {
    const authUserSession = await getServerSession({
        callbacks: {
            session,
        },
    })
    // if (!authUserSession) throw new Error('unauthorized')
    return authUserSession?.user
}