import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../database'

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
    signOut: '/auth',
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
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar openid"
        },
      },
    }),
  ],
  events: {
    // createUser: async (message) => {
    //   await createStripeCustomer({
    //     name: message.user.name as string,
    //     email: message.user.email as string,
    //   })
    // },
  },
})
