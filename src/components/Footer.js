export default function Footer() {
  return (
    <footer className="mt-20 w-full border-t border-gray-200 dark:border-white/5 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                 <span className="text-purple-500">Finance</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium max-w-[200px] text-center md:text-left leading-relaxed">
              Empowering your financial future with AI-driven insights.
            </p>
          </div>

          {/* Center/Right: Navigation Links */}
          <div className="flex flex-wrap justify-center  items-center gap-x-8 gap-y-4">
            {["Privacy Policy", "Terms of Service", "Help Center", "Status"].map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-sm font-medium text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-white transition-all relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright & Social Placeholder */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-zinc-500 tracking-wide uppercase font-semibold">
            © 2026  Finance. Crafted with precision.
          </p>
          
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-widest">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}