import { prisma } from '../../../../../lib/prisma'
import { session } from '../../../../../lib/session'
import { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile) {
                return true;
            }
            if (!profile?.email) {
                throw new Error('No profile')
            }
            const listaUsuarios = await prisma.usuarios.findMany();
            if (listaUsuarios.length === 0) {
                await prisma.usuarios.upsert({
                    where: {
                        email: profile.email,
                    },
                    create: {
                        email: profile.email,
                        nome: profile.name,
                        admin: true,
                    },
                    update: {
                        nome: profile.name,
                    },
                })
                return true
            } else {
                //validação para aceitar apenas o primeiro usuario que logou pelo login social
                const user = await prisma.usuarios.findUnique({
                    where: {
                        email: profile.email
                    }
                });
                if (user) {
                    return true
                }
                return false;
            }
        },
        session,
        async jwt({ token, user, account, profile }) {
            if (profile) {
                const user = await prisma.usuarios.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                if (!user) {
                    throw new Error('No user found')
                }
                token.id = user.id
            }
            return token
        },
    },
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }