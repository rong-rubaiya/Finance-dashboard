"use client";
import React from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  ShieldCheck, 
  TrendingUp,
  MoreHorizontal
} from "lucide-react";

// Mock Admin Data for the Dashboard
const adminData = {
  name: "Jarif",
  role: "System Admin",
  totalBalance: 128450.00,
  monthlyInflow: 45200,
  monthlyOutflow: 12300,
  cardNumber: "**** **** **** 8829",
  cardExpiry: "12/28",
  recentNodes: [
    { id: 1, label: "Server Maintenance", cost: "-$450", status: "Completed" },
    { id: 2, label: "Client Payment", cost: "+$2,200", status: "Pending" }
  ]
};

export default function WalletSection() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Wallet Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-500">Financial Node</h2>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">
            My_Wallet<span className="text-purple-600">.</span>
          </h1>
        </div>
        <button className="p-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20">
          <Plus size={20} />
        </button>
      </div>

      {/* Main Wallet Card - Glassmorphism Effect */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-indigo-900 p-8 text-white shadow-2xl shadow-purple-900/20 transition-transform hover:scale-[1.01]">
        {/* Background Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col h-full justify-between gap-12">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Total Available Liquidity</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-1">
                ${adminData.totalBalance.toLocaleString()}
              </h2>
            </div>
            <CreditCard size={32} className="opacity-50" />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Node Identifier</p>
              <p className="font-mono text-lg tracking-widest">{adminData.cardNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Expiry</p>
              <p className="font-bold">{adminData.cardExpiry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inflow Card */}
        <div className="p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-black group hover:border-emerald-500/50 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase">+12.5%</span>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Inflow</p>
          <p className="text-2xl font-black tracking-tighter mt-1 dark:text-white">
            ${adminData.monthlyInflow.toLocaleString()}
          </p>
        </div>

        {/* Outflow Card */}
        <div className="p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-black group hover:border-rose-500/50 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
              <ArrowDownLeft size={20} />
            </div>
            <span className="text-[10px] font-black text-rose-500 uppercase">-4.2%</span>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Outflow</p>
          <p className="text-2xl font-black tracking-tighter mt-1 dark:text-white">
            ${adminData.monthlyOutflow.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Admin Specific Insights (Visible only to Admin) */}
      <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/[0.03] border border-dashed border-gray-300 dark:border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck size={18} className="text-purple-600" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Admin Control Panel</h3>
        </div>
        
        <div className="space-y-4">
          {adminData.recentNodes.map(node => (
            <div key={node.id} className="flex justify-between items-center p-4 bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                <p className="text-sm font-bold dark:text-white">{node.label}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className={`text-sm font-black ${node.cost.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {node.cost}
                </p>
                <button className="text-slate-400 hover:text-purple-600 transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}