"use client";
import { Search, Bell, Command, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [role, setRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(true);

  // Sync dark mode with the HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-darkBg/80 backdrop-blur-md border-b border-white/5 py-4 px-8 mb-8 flex items-center justify-between transition-colors duration-300 dark:bg-darkBg/80 light:bg-white/80">
      
      {/* Left: Search Bar */}
      <div className="relative group w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-darkCard border border-white/10 rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none focus:border-accentPurple/50"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
          <Command size={10} className="text-gray-400" />
          <span className="text-[10px] text-gray-400 font-medium">K</span>
        </div>
      </div>

      {/* Right: Controls, Theme, & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Role Toggle */}
        <div className="flex bg-darkCard p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setRole("viewer")}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${role === "viewer" ? "bg-white text-black shadow-md" : "text-gray-500"}`}
          >
            Viewer
          </button>
          <button 
            onClick={() => setRole("admin")}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${role === "admin" ? "bg-white text-black shadow-md" : "text-gray-500"}`}
          >
            Admin
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-darkCard border border-white/10 rounded-xl hover:bg-white/5 transition-all text-gray-400 hover:text-accentPurple"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative p-2 bg-darkCard border border-white/10 rounded-xl cursor-pointer hover:bg-white/5">
          <Bell size={18} className="text-gray-400" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-accentPink rounded-full"></span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10">
          <div className="text-right hidden lg:block leading-tight">
            <p className="text-sm font-semibold text-white">Jarif</p>
            <p className="text-[10px] text-gray-500">Project Lead</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accentPurple to-accentPink p-[1px]">
            <div className="w-full h-full rounded-full bg-darkBg flex items-center justify-center font-bold text-xs text-white">
              J
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}