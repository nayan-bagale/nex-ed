import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/Layout/Header/NavBar";
import Sidebar from "@/components/Layout/Sidebar/SideBar";
import Session from "@/components/Providers/Session";
import RecoilProvider from "@/components/Providers/RecoilProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

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
      <body className={inter.className + ' '}>
        <RecoilProvider>
          
          <Session>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
              <EdgeStoreProvider>
              <header>
                <NavBar />
              </header>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="w-full h-screen mt-12 p-2">{children}</main>
              </div>
              <Toaster />
              </EdgeStoreProvider>
            </ThemeProvider>
          </Session>
          
        </RecoilProvider>
      </body>
    </html>
  );
}
