import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

import { getServerSession } from "next-auth";
import { authOptions } from "@/components/utils/options";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const session = await getServerSession(authOptions);

      if (session) redirect("/dashboard");
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
