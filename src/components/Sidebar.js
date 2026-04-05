"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Wallet, ArrowLeftRight, PieChart, 
  Users, Settings, LogOut,
  X, 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => { 
  const [isExpanded, setIsExpanded] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' },
    { icon: Wallet, label: 'Accounts', href: '/accounts' },
    { icon: Users, label: 'Team', href: '/team' },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[58] md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* MAIN SIDEBAR */}
      <aside 
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-[59]
          bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-white/5 flex flex-col py-8
          ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
          ${isExpanded ? 'md:w-64' : 'md:w-20'}
        `}
      >
        {/* Mobile-only Close Button - Fixed position and z-index */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute right-4 top-4 py-6 text-gray-400 hover:text-purple-500 transition-colors z-[60]"
        >
          <X size={24} />
        </button>

        {/* Logo Area */}
        <div className={`px-5 mb-10 hidden md:flex items-center gap-3 ${!isExpanded && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          {isExpanded && <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">Finance</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all relative
                  ${isActive ? 'bg-purple-500/10 text-purple-500' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500'}
                  ${!isExpanded && 'md:justify-center'}
                `}
              >
                <item.icon size={22} className={isActive ? 'text-purple-500' : 'group-hover:text-purple-500'} />
                {(isExpanded || isOpen) && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                
                {!isExpanded && !isOpen && (
                  <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-[10px] px-2 py-1 rounded md:block hidden whitespace-nowrap z-[100]">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto flex flex-col gap-2 px-3 border-t border-gray-100 dark:border-white/5 pt-4">
          <button className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 ${!isExpanded && 'md:justify-center'}`}>
            <Settings size={22} />
            {(isExpanded || isOpen) && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className={`flex items-center gap-4 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-red-500/70 ${!isExpanded && 'md:justify-center'}`}>
            <LogOut size={22} />
            {(isExpanded || isOpen) && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;