import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider  from "next-auth/providers/google"

const globalForPrisma = global 

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


 export const authOptions: NextAuthOptions = {
  debug:true,
  pages: {
    signIn: '/Login', // Path to your custom login page
  //  signOut:'/'
    
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // Session expires in 1 day
    
  },
 
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
      
        if (!credentials?.email || !credentials.password) {
          console.log("Missing email or password");
          return null;
        }
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (!user) {
          console.log("User not found for email:", credentials.email);
          return null;
        }
      
        const isPasswordValid = await compare(credentials.password, user.password);
      
        if (!isPasswordValid) {
          console.log("Invalid password for user:", user.email);
          return null;
        }
      
        console.log("User authenticated successfully:", user);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
    
    })
  ,
GoogleProvider({
  clientId:process.env.GOOGLE_CLIENT_ID!,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET!
})
],
  callbacks: {
    session: ({ session, token }) => {
       console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
        },
        update: {
          name: profile.name,
        },
      })
      
      return true
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
   // secret: process.env.NEXTAUTH_SECRET,
  } 
}
  