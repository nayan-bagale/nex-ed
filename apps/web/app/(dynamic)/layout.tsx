import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/Layout/ThemeToggle/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Session from "@/components/Providers/Session";
import dynamic from "next/dynamic";

const LiveClassContext = dynamic(() => import('../../components/Liveclass/ContextAPI/LiveClassContext'), {
  ssr: false
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Session>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LiveClassContext>
              {children}
            </LiveClassContext>
            <Toaster />
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
