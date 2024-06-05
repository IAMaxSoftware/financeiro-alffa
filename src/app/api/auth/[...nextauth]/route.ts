import { prisma } from '../../../../../lib/prisma'
import { session } from '../../../../../lib/session'
import { NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthService } from '../auth.service'

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
        CredentialsProvider({
            name: "Logar",
            credentials: {
                email: {
                    label: "E-mail",
                    type: "e-mail",
                    placeholder: "exemple@exemple.com",
                },
                password: {
                    label: "Senha",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;
                const authService = new AuthService();
                const usuario = await authService.login(credentials.email, credentials.password)
                if (usuario) {
                    const user = {
                        email: usuario.email,
                        name: usuario.nome,
                        id: usuario.id.toString(),
                    };
                    return user;
                }

                return null;
            }
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