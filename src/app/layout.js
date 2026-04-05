"use client";
import { useState } from "react";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { RoleProvider } from "@/context/RoleContext";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [role, setRole] = useState("admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-950 transition-colors duration-300"> 
        <RoleProvider>
         
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex min-h-screen w-full relative">
            
           
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} role={role} />

            <main className="flex-1 flex flex-col min-w-0 md:ml-20">
              
             
              <Navbar 
                onMenuToggle={() => setIsOpen(true)} 
                currentRole={role} 
                setRole={setRole} 
              />
              
              <div className="flex-1 px-4 sm:px-6 md:px-8 py-4 max-w-[1600px] mx-auto w-full">
              
                {children}
              </div>
              
              <Footer />
            </main>
          </div>
        </ThemeProvider>
        </RoleProvider>
      </body>
    </html>
  );
}