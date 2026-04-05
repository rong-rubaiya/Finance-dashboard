"use client";
import { Search, Bell, Command, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar({ onMenuToggle }) { 
  const [role, setRole] = useState("admin");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-40 w-full py-4 px-4 md:px-8 mb-8 flex items-center justify-between transition-colors duration-300 
      bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-white/10">
      
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={onMenuToggle}
        className="md:hidden p-2 mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
      >
        <Menu size={22} />
      </button>
      
      {/* Left: Search Bar */}
      <div className="relative group hidden sm:block w-40 md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-black dark:text-white focus:outline-none"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 bg-gray-200 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-300 dark:border-white/10">
          <Command size={10} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 font-medium">K</span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto sm:ml-0">
        <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl border border-gray-200 dark:border-white/10">
          <button onClick={() => setRole("viewer")} className={`px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-[11px] font-semibold transition-all ${role === "viewer" ? "bg-white text-black shadow-md" : "text-gray-500"}`}>Viewer</button>
          <button onClick={() => setRole("admin")} className={`px-2 md:px-3 py-1 rounded-lg text-[10px] md:text-[11px] font-semibold transition-all ${role === "admin" ? "bg-white text-black shadow-md" : "text-gray-500"}`}>Admin</button>
        </div>

        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative p-2 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer">
          <Bell size={18} className="text-gray-500 dark:text-gray-400" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3 ml-1 md:ml-2 pl-2 md:pl-4 border-l border-gray-200 dark:border-white/10">
          <div className="text-right hidden md:block leading-tight">
            <p className="text-sm font-semibold text-black dark:text-white">Rubaiya</p>
            <p className="text-[10px] text-gray-500 uppercase">Project Lead</p>
          </div>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center font-bold text-xs text-purple-500 dark:text-white">R</div>
          </div>
        </div>
      </div>
    </nav>
  );
}