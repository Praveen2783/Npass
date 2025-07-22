import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
// import { metadata1 } from "./contact/page";
import { siteConfig, generateMetadata as genMeta } from "@/util/metadata.js"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// import Logo from "@/components/Logo";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = genMeta({
  title: "Npass - Secure Password Manager & Digital Vault",
  description:
    "Protect your digital life with SecureVault - the most trusted password manager featuring military-grade encryption, secure password generation, and seamless sync across all devices.",
  keywords: ["password manager", "secure vault", "digital security", "password protection"],
 
})


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
          <head>
        <link rel="icon"  href="logo1.png" sizes="any" />
        <link rel="icon" href="logo.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
