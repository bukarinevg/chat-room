// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

import { UserSesionInterface } from "@/lib/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // Add other custom properties here
    } & DefaultSession["user"];
  }

    
}
