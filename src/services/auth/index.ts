import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'adb3dcb3830f8ab0ee5d3176e356f3aa'

type profileType = {
    name?: string
    email?: string
    picture?: string
}

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: '/auth',
        signOut: '/',
        error: '/auth',
        verifyRequest: '/auth',
        newUser: '/app',
    },
    adapter: PrismaAdapter(prisma),
    secret: NEXTAUTH_SECRET, // To be added
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: 'offline',
                    prompt: 'consent',
                    scope: [
                        'openid',
                        'https://www.googleapis.com/auth/userinfo.email',
                        'https://www.googleapis.com/auth/userinfo.profile',
                        'https://www.googleapis.com/auth/calendar',
                    ].join(' '),
                    response: 'code'
                },
            },
        }),
    ],
    basePath: '/api/auth',
    callbacks: {
        authorized({ auth }) {
            return !!auth;
        },
        jwt({ token }) {
            return token
        },
        async signIn({ user, profile }) {
            console.log(profile)
            if (!user) {
                return true;
            }
            if (!user?.email) {
                throw new Error('No profile')
            }
            const listaUsuarios = await prisma.usuarios.findMany();
            if (listaUsuarios.length === 0) {
                await prisma.usuarios.upsert({
                    where: {
                        email: user.email,
                    },
                    create: {
                        email: user.email,
                        nome: user.name,
                        avatar: user.image,
                        admin: true,
                    },
                    update: {
                        nome: user.name,
                        avatar: user.image,
                    },
                })
                return true
            } else {
                //validação para aceitar apenas o primeiro usuario que logou pelo login social
                const usuario = await prisma.usuarios.findUnique({
                    where: {
                        email: user.email
                    }
                });
                if (usuario) {
                    await prisma.usuarios.upsert({
                        where: {
                            email: user.email,
                        },
                        create: {
                            email: user.email,
                            nome: user.name,
                            avatar: user.image,
                            admin: true,
                        },
                        update: {
                            nome: user.name,
                            avatar: user.image,
                        },
                    })
                    return true
                }
                return false;
            }
        },
    },
    events: {
        // createUser: async (message) => {
        //   await createStripeCustomer({
        //     name: message.user.name as string,
        //     email: message.user.email as string,
        //   })
        // },
    },
})
