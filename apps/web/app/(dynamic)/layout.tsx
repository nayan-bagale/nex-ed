import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/Layout/ThemeToggle/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Session from "@/components/Providers/Session";
import dynamic from "next/dynamic";
import ClassLoading from "@/components/Templates/Loading/ClassLoading";
import NavBarLiveClass from "@/components/Layout/Header/NavBarLiveClass";
// import LiveClassContext from "@/components/Liveclass/ContextAPI/_LiveClassContext";

const LiveClassContext = dynamic(() => import('@/components/Liveclass_V1/ContextAPI/_LiveClassContext'), {
  ssr: false,
  loading: () => <ClassLoading />,
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
              <NavBarLiveClass />
              {children}
            </LiveClassContext>
            <Toaster />
          </ThemeProvider>
        </Session>
      </body>
    </html>
  );
}
