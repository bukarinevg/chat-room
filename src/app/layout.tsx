"use client";

import "@styles/globals.scss";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import Loading from "@components/loading";
import { LoadingProvider } from "@components/providers/LoadingProvider";

import { Inter } from "next/font/google";
import Head from 'next/head';


config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <LoadingProvider>
          {children}
          <Loading />
        </LoadingProvider>
      </body>
    </html>
  );
}
