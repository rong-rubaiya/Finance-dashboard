"use client";
import { useState } from "react";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"> 
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen w-full relative">
            
            {/* Sidebar receives the state */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1 flex flex-col min-w-0 md:ml-20">
              {/* Navbar receives the toggle function */}
              <Navbar onMenuToggle={() => setIsOpen(true)} />
              
              <div className="flex-1 px-4 sm:px-6 md:px-8 py-4">
                {children}
              </div>
              <Footer/>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}