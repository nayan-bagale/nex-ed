import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Layout/ThemeToggle/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/Layout/Header/NavBar";
import Sidebar from "@/components/Layout/Sidebar/SideBar";

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <NavBar />
          </header>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="w-full pt-16">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
