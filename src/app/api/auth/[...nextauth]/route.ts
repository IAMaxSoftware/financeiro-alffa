import { prisma } from '../../../../../lib/prisma'
import { session } from '../../../../../lib/session'
import { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

type profileType = {
  name?: string
  email?: string
  picture?: string
}

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
            const usuario = profile as profileType;
            if (!usuario) {
                return true;
            }
            if (!usuario?.email) {
                throw new Error('No profile')
            }
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