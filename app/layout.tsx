"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";

import client from "../apollo/client/client";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
