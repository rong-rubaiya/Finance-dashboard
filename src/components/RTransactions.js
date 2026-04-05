"use client";
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Eye, Lock, Trash2, 
  ExternalLink, X, Calendar, Clock, Tag, User, Fingerprint
} from "lucide-react";
import { DASHBOARD_DATA } from "@/constants/dashboardData";
import { useRole } from "@/context/RoleContext";

export default function RecentTransactions() {
  const { role } = useRole(); 
  const isAdmin = role === "admin";

  const [transactions, setTransactions] = useState(DASHBOARD_DATA.transactions);
  const [modal, setModal] = useState({ isOpen: false, data: null });

  useEffect(() => {
    setTransactions(DASHBOARD_DATA.transactions);
  }, []);

  const openDetails = (data) => setModal({ isOpen: true, data });
  const closeModal = () => setModal({ isOpen: false, data: null });

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className={`relative bg-white dark:bg-gray-950 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 shadow-2xl transition-all duration-500 
      ${isAdmin ? "border-purple-500/20 shadow-purple-500/5" : "border-blue-500/20 shadow-blue-500/5"}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 pb-6 border-b border-gray-100 dark:border-white/5 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-950 dark:text-white">Recent Activity</h3>
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 ${
              isAdmin ? "bg-purple-500/5 text-purple-500 border-purple-500/20" : "bg-blue-500/5 text-blue-500 border-blue-500/20"
            }`}>
              {isAdmin ? <ShieldCheck size={12} /> : <Eye size={12} />}
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction List - Responsive Layout */}
      <div className="space-y-4">
        {transactions.slice(0, 5).map((t) => (
          <div 
            key={t.id} 
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] border-2 border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300 relative overflow-hidden gap-4 sm:gap-0"
          >
            {/* Type Indicator Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

            <div className="flex items-center gap-4 sm:gap-5 flex-1 pl-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm flex-shrink-0">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm text-gray-950 dark:text-gray-100 truncate">{t.name}</span>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{t.category}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-8 pl-2 sm:pl-0">
              <div className="text-left sm:text-right">
                <p className={`text-sm sm:text-base font-black tracking-tight ${t.type === 'income' ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                  {t.type === 'income' ? `+${t.amount}` : `-${t.amount}`}
                </p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">{t.time}</p>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={() => openDetails(t)} 
                  className={`p-2 sm:p-2.5 rounded-xl border-2 border-transparent hover:border-current transition-all ${isAdmin ? 'text-purple-500 bg-purple-500/5' : 'text-blue-500 bg-blue-500/5'}`}
                >
                  <ExternalLink size={16} />
                </button>
                
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(t.id)} 
                    className="p-2 sm:p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- RESPONSIVE UNIQUE MODAL --- */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-950/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="relative bg-white dark:bg-gray-950 w-full max-w-2xl sm:h-[500px] rounded-[2rem] sm:rounded-[2.5rem] border-2 border-white/10 shadow-2xl overflow-y-auto sm:overflow-hidden flex flex-col sm:flex-row animate-in zoom-in-95 duration-300">
            
            {/* Left Identity Panel - Stacks on mobile */}
            <div className={`w-full sm:w-1/3 p-6 sm:p-8 flex flex-col items-center justify-center border-b-2 sm:border-b-0 sm:border-r-2 border-white/5 relative ${isAdmin ? 'bg-purple-600/5' : 'bg-blue-600/5'}`}>
               <div className="relative mb-4">
                 <img src={modal.data.avatar} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl border-4 border-white dark:border-gray-900 shadow-2xl object-cover" />
                 <Fingerprint className="absolute -bottom-2 -right-2 p-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-900 text-white border-2 border-white/10" />
               </div>
               <h4 className="font-black text-center dark:text-white leading-tight">{modal.data.name}</h4>
               <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Verified Beneficiary</span>
            </div>

            {/* Right Data Panel */}
            <div className="flex-1 p-6 sm:p-10 relative flex flex-col justify-between">
              <button onClick={closeModal} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-rose-500 transition-colors">
                <X size={20} />
              </button>

              <div className="mb-6 sm:mb-0">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className={`w-1.5 h-5 sm:h-6 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-blue-500'}`} />
                  <h2 className="text-lg sm:text-xl font-black dark:text-white uppercase tracking-tighter">Transaction Protocol</h2>
                </div>

                <div className="grid grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4">
                  {[
                    { icon: Calendar, label: "Executed", value: modal.data.date },
                    { icon: Clock, label: "Time", value: modal.data.time },
                    { icon: Tag, label: "Category", value: modal.data.category },
                    { icon: User, label: "ID", value: `#${modal.data.id}` },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                        <item.icon size={10} />
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold dark:text-gray-100 truncate">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement Section */}
              <div className={`mt-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 flex items-center justify-between ${
                modal.data.type === 'income' 
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
              }`}>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Net Settlement</span>
                  <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none mt-1">
                    {modal.data.type === 'income' ? `+ ${modal.data.amount}` : `- ${modal.data.amount}`}
                  </span>
                </div>
                <div className="hidden xs:block p-2 sm:p-3 bg-white dark:bg-gray-900 rounded-xl border-2 border-current font-black text-[10px]">
                  {modal.data.status || "COMPLETED"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isAdmin && (
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-100 dark:border-white/5 flex items-center justify-center gap-2 text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-40">
          <Lock size={10} /> Secure Viewer Environment
        </div>
      )}
    </div>
  );
}