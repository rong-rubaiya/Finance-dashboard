export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-accentPurple rounded-md flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">D</span>
        </div>
        <p className="text-xs text-gray-500 font-medium">© 2026 DevStone Finance. All rights reserved.</p>
      </div>

      <div className="flex items-center gap-6">
        <a href="#" className="text-xs text-gray-500 hover:text-accentPurple transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs text-gray-500 hover:text-accentPurple transition-colors">Terms of Service</a>
        <a href="#" className="text-xs text-gray-500 hover:text-accentPurple transition-colors">Help Center</a>
      </div>
    </footer>
  );
}