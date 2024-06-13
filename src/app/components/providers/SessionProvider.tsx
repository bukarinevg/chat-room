"use client";

import { UserSesionInterface } from "@/lib/types";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import React from "react";

export default function SessionProvider({ session,children }: {
  session: UserSesionInterface,
  children: React.ReactNode}) {
  return (
    <NextAuthProvider session={session}>
      {children}
    </NextAuthProvider>
  );
}