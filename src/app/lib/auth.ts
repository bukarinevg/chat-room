import type { NextAuthOptions } from "next-auth";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import { PrismaClient  } from '@prisma/client'
import bcrypt from "bcryptjs";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const prisma = new PrismaClient();

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  // Customize authentication pages
  // pages: {
  //   signIn: "/", // Redirect users to "/login" when signing in
  // },
  // Configure session management
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
      // Configure Google authentication provider with environment variables
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
};

