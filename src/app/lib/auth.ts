import type { NextAuthOptions } from "next-auth";
import { PrismaClient  } from '@prisma/client'
import bcrypt from "bcryptjs";
import { redirect } from 'next/navigation'

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const prisma = new PrismaClient();

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  pages: {
    signIn: "/", // Redirect users to "/login" when signing in
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // added secret key
  secret: process.env.NEXT_PUBLIC_SECRET,
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "email@email.com"
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(!credentials || !credentials.email || !credentials.password) return null;

        const dbUser = await prisma.user.findFirst({
          where:{
            email: credentials.email
          }
        });

        if(!dbUser) return null;
        const result =  await bcrypt.compare(credentials.password, dbUser?.password as string);

        if(result){
          return {
            id: dbUser.id.toString(),
            email: dbUser.email.toString(),
            name: dbUser.name.toString(),
          }
        }
        return null;

      }
    }), 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // GitHubProvider({
    //   // Configure GitHub authentication provider with environment variables
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // CredentialsProvider({}), // Include a Credentials provider (username/password)
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account?.provider =='google' && user.email ){
        const userModel = await prisma.user.findUnique({
          where:{
            email: user.email
          }
        });

        if(userModel){
          return true;
        }

        console.log('new user');
        const newUser = await prisma.user.create({
          data:{
            email: user.email,
            name: user.name ?? 'John Doe'
          }
        });        
        return true;
      }
      return true;
    },
    // async redirect({ url, baseUrl }) {
      
    //   return `${baseUrl}/${url}`;
    // }
  },
};



