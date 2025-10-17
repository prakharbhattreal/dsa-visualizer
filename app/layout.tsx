import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/element/theme-provider";
const inter = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "DSA Visualizer",
  description: "DSA Visualizer helps students for visualizing data structures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                {/* <Navbar /> */}
                {children}
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
