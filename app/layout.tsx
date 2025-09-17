import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { CookieBanner } from "@/components/layout/cookie-banner"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ParaFrase - Descubra e Compartilhe Frases Inspiradoras",
  description:
    "Descubra e compartilhe frases inspiradoras dos maiores pensadores da humanidade. Conecte-se com uma comunidade apaixonada por sabedoria e reflexão.",
  keywords: "frases, citações, pensadores, filosofia, inspiração, sabedoria",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SidebarProvider>{children}</SidebarProvider>
          <CookieBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
