import { prisma } from '@/lib/prisma'
import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'adb3dcb3830f8ab0ee5d3176e356f3aa'

type profileType = {
    name?: string
    email?: string
    picture?: string
}

const auth: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                },
            },
        }),
    ],
    secret: NEXTAUTH_SECRET, // To be added
    theme: {
        colorScheme: "dark",
    },
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async signIn({ account, profile }) {
            const usuario = profile as profileType;
            if (!usuario) {
                return true;
            }
            if (!usuario?.email) {
                throw new Error('No profile')
            }
            console.log(usuario)
            const listaUsuarios = await prisma.usuarios.findMany();
            if (listaUsuarios.length === 0) {
                await prisma.usuarios.upsert({
                    where: {
                        email: usuario.email,
                    },
                    create: {
                        email: usuario.email,
                        nome: usuario.name,
                        avatar: usuario.picture,
                        admin: true,
                    },
                    update: {
                        nome: usuario.name,
                        avatar: usuario.picture,
                    },
                })
                return true
            } else {
                //validação para aceitar apenas o primeiro usuario que logou pelo login social
                const user = await prisma.usuarios.findUnique({
                    where: {
                        email: usuario.email
                    }
                });
                if (user) {
                    console.log(profile)
                    await prisma.usuarios.upsert({
                        where: {
                            email: usuario.email,
                        },
                        create: {
                            email: usuario.email,
                            nome: usuario.name,
                            avatar: usuario.picture,
                            admin: true,
                        },
                        update: {
                            nome: usuario.name,
                            avatar: usuario.picture,
                        },
                    })
                    return true
                }
                return false;
            }
        },
        async jwt({ token, user, account, profile }) {
            // if (profile) {
            //     const user = await prisma.usuarios.findUnique({
            //         where: {
            //             email: profile.email,
            //         },
            //     })
            //     if (!user) {
            //         throw new Error('No user found')
            //     }
            //     token.id = user.id
            // }
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
    },
}

const handler = NextAuth(auth)
export { handler as GET, handler as POST, handler as auth }