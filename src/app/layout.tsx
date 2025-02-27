import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs";
import { NavigationMenuMain } from "@/components/landing/navbar"; // Adjust the path as necessary
import Image from "next/image";
import Link from "next/link";
import app_logo from "../../public/app-logo.png";
import { SignedIn, UserButton } from "@clerk/nextjs";
import FooterSection from "@/components/landing/footer";

import Points from "@/components/global/points";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appify PWC",
  description: "A app that promote sustainable development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-11/12 overflow-x-hidden mx-auto `}
          suppressHydrationWarning
        >
          <div className=" p-2 flex  items-center w-full font-bold text-lg border-b text-gray-800 justify-between ">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image src={app_logo} alt="logo" width={70} height={70} />
                <h1 className="hidden md:block">Appify PWC</h1>
              </div>
            </Link>
            {user ? (
              <div className="flex gap-5">
                <Points />
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            ) : (
              <SignedOut>
                <SignInButton>
                  <Button className="bg-green-500">Sign In</Button>
                </SignInButton>
              </SignedOut>
            )}
          </div>

          <div className="p-4 flex items-center justify-center">
            <NavigationMenuMain />
          </div>
          {children}
          <FooterSection />
        </body>
      </html>
    </ClerkProvider>
  );
}
