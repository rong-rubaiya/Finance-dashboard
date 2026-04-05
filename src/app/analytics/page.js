"use client";
import React, { useMemo } from 'react';
import { 
  TrendingUp, Activity, Zap, Target, ArrowUpRight, 
  PieChart, BarChart3, Fingerprint, Lock, 
  Layers, Wallet, ArrowDownRight, Globe, ShieldCheck, 
  Eye, BarChart, ZapOff, TrendingDown
} from "lucide-react";
import { DASHBOARD_DATA } from "@/constants/dashboardData"; 
import { useRole } from "@/context/RoleContext";

export default function AnalyticsSection() {
  const { role } = useRole();
  const isAdmin = role === "admin";
  const isViewer = role === "viewer";
  
  const transactions = DASHBOARD_DATA?.transactions || [];

  const analytics = useMemo(() => {
    if (!transactions.length) return null;

    const processed = transactions.map(t => ({
      ...t,
      val: parseFloat(String(t.amount).replace(/[^0-9.-]+/g, ""))
    }));

    const totalIncome = processed.filter(t => t.type === 'income').reduce((s, t) => s + t.val, 0);
    const totalExpense = processed.filter(t => t.type === 'expense').reduce((s, t) => s + t.val, 0);
    const netProfit = totalIncome - totalExpense;
    
    // Advanced Analytics
    const efficiency = (totalIncome / (totalExpense || 1));
    const avgTransaction = (totalIncome + totalExpense) / processed.length;
    const runRate = (netProfit * 12); // Annualized Projection
    
    // Categorization
    const cats = processed.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.val;
      return acc;
    }, {});
    const topCat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];

    // Volatility (Standard Deviation simplified for logic)
    const variance = processed.reduce((s, t) => s + Math.pow(t.val - avgTransaction, 2), 0) / processed.length;
    const volatility = Math.sqrt(variance);

    return {
      totalIncome,
      totalExpense,
      netProfit,
      topCat: { name: topCat[0], val: topCat[1] },
      avgTransaction,
      efficiency: efficiency.toFixed(2),
      volatility: (volatility / avgTransaction * 100).toFixed(1),
      runRate,
      status: efficiency > 1.2 ? "Optimal" : efficiency > 1 ? "Stable" : "Critical"
    };
  }, [transactions]);

  if (!analytics) return null;

  return (
    <div className="p-1 text-slate-900 dark:text-slate-100">
      {/* --- Header: Role-Based Branding --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-8 bg-purple-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
              {isAdmin ? "System Core / Full Audit" : "Executive Summary / Read-Only"}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
            {isAdmin ? "Financial Intelligence_" : "Growth Insights_"}
          </h2>
        </div>

        {/* Dynamic Metric Badge */}
        <div className="flex gap-3">
          {isAdmin && (
            <div className="px-5 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <p className="text-[9px] font-black text-rose-500 uppercase">System Volatility</p>
              <p className="text-lg font-black text-rose-600">{analytics.volatility}%</p>
            </div>
          )}
          <div className="px-5 py-2 bg-purple-600 shadow-[0_10px_20px_-5px_rgba(147,51,234,0.4)] rounded-xl">
            <p className="text-[9px] font-black text-purple-100 uppercase">Growth Status</p>
            <p className="text-lg font-black text-white uppercase italic">{analytics.status}</p>
          </div>
        </div>
      </div>

      {/* --- Main Metric Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Metric 1: Revenue (Everyone sees) */}
        <MetricCard 
          icon={<TrendingUp className="text-purple-500" />}
          label="Inflow Velocity"
          value={`$${analytics.totalIncome.toLocaleString()}`}
          subtext="Total Gross Revenue"
          trend="+12.4%"
        />

        {/* Metric 2: Contextual Role Card */}
        {isAdmin ? (
          <MetricCard 
            icon={<ZapOff className="text-rose-500" />}
            label="Capital Outflow"
            value={`$${analytics.totalExpense.toLocaleString()}`}
            subtext="Operational Burn Rate"
            trend="Attention Required"
            isNegative
          />
        ) : (
          <MetricCard 
            icon={<Target className="text-emerald-500" />}
            label="Annualized Projection"
            value={`$${analytics.runRate.toLocaleString()}`}
            subtext="Estimated 12-Month Yield"
            trend="Predictive"
          />
        )}

        {/* Metric 3: Profit/Health */}
        <MetricCard 
          icon={<ShieldCheck className="text-blue-500" />}
          label={isAdmin ? "Net Liquidity" : "Success Margin"}
          value={`$${analytics.netProfit.toLocaleString()}`}
          subtext={isAdmin ? "Post-Tax Adjusted" : "Healthy Surplus"}
          trend={`${analytics.efficiency}x Ratio`}
        />
      </div>

      {/* --- Detailed Analysis Area --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Deep Dive: Only Full details for Admin */}
        <div className="lg:col-span-8 p-8 rounded-[2rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black flex items-center gap-2 uppercase text-xs tracking-widest">
              <BarChart size={16} className="text-purple-500" />
              {isAdmin ? "Full Spectrum Analysis" : "Key Performance Indicators"}
            </h3>
            <span className="text-[10px] font-medium text-slate-400 italic">Data refreshes every 60s</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Primary Sector Dominance</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-black">{analytics.topCat.name}</p>
                  <p className="text-purple-500 font-bold mb-1 pb-1 border-b-2 border-purple-500/20">
                    ${analytics.topCat.val.toLocaleString()}
                  </p>
                </div>
              </div>
              
              {/* Complexity for Admin, Simplicity for Viewer */}
              {isAdmin ? (
                <div className="p-4 bg-white dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5">
                  <div className="flex justify-between text-[10px] font-black mb-3 text-slate-400">
                    <span>LIQUIDITY THRESHOLD</span>
                    <span>85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[85%]" />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your <span className="font-bold text-slate-900 dark:text-white">{analytics.topCat.name}</span> segment 
                  is performing <span className="text-emerald-500 font-bold underline decoration-2 offset-4">above benchmark</span>, 
                  driving the majority of your positive cash flow this cycle.
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-all" />
              <div className="relative p-6 rounded-3xl border border-dashed border-slate-300 dark:border-white/10">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Internal Momentum</p>
                 <div className="space-y-4">
                    <StatRow label="Avg. Ticket Size" value={`$${analytics.avgTransaction.toFixed(0)}`} />
                    {isAdmin && <StatRow label="Efficiency Index" value={`${analytics.efficiency}x`} />}
                    <StatRow label="Data Integrity" value="High" color="text-emerald-500" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Access & Control */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-500/20 rounded-2xl">
                {isAdmin ? <Fingerprint className="text-purple-400" /> : <Eye className="text-purple-400" />}
              </div>
              <div>
                <p className="text-[9px] font-black text-purple-300 uppercase tracking-widest">Protocol</p>
                <p className="text-sm font-black uppercase">{role} Layer</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase">Encrypted Tunnel</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="h-[2px] w-full bg-white/10">
                <div className="h-full bg-purple-500 w-full animate-pulse" />
              </div>
            </div>

            <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-lg shadow-purple-900/40">
              {isAdmin ? "Initialize Global Sync" : "Refresh Dashboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components for Cleanliness ---

function MetricCard({ icon, label, value, subtext, trend, isNegative = false }) {
  return (
    <div className="p-7 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-purple-500/40 transition-all duration-300 shadow-sm hover:shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={`text-[10px] font-black px-3 py-1 rounded-full ${isNegative ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
          {trend}
        </span>
      </div>
      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</h4>
      <p className="text-3xl font-black mt-1 group-hover:text-purple-500 transition-colors">{value}</p>
      <p className="text-[10px] font-medium text-slate-400 mt-2">{subtext}</p>
    </div>
  );
}

function StatRow({ label, value, color = "text-slate-900 dark:text-white" }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-2">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}