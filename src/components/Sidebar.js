import Link from 'next/link';
import { LayoutDashboard, Wallet, ArrowLeftRight, PieChart, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' },
    { icon: Wallet, label: 'Accounts', href: '/accounts' },
    { icon: Users, label: 'Team', href: '/team' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 bg-darkCard border-r border-white/5 z-50">
      {/* Logo Area */}
      <div className="mb-10">
        <div className="w-10 h-10 bg-gradient-to-tr from-accentPurple to-accentPink rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
          <span className="text-white font-bold text-xl">D</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-8">
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="group relative flex items-center justify-center"
          >
            <item.icon 
              className="text-gray-500 group-hover:text-white transition-colors cursor-pointer" 
              size={24} 
            />
            {/* Tooltip on Hover */}
            <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-accentPurple text-white text-[10px] px-2 py-1 rounded-md">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-6 mt-auto">
        <Settings className="text-gray-500 hover:text-white cursor-pointer" size={24} />
        <LogOut className="text-red-500/70 hover:text-red-500 cursor-pointer" size={24} />
      </div>
    </aside>
  );
};

export default Sidebar;