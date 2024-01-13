import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/Layout/ThemeToggle/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/Layout/Header/NavBar";
import Sidebar from "@/components/Layout/Sidebar/SideBar";
import Session from "@/components/Providers/Session";

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
              {children}
            <Toaster />
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
