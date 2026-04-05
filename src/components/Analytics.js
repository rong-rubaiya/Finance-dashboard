"use client";
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { CalendarDays, Filter } from "lucide-react";
// Import the dynamic data from your folder
import { DASHBOARD_DATA } from "@/constants/dashboardData";

export default function Analytics() {
  const [mounted, setMounted] = useState(false);

  // Extract data from constants
  const monthlyData = DASHBOARD_DATA.analytics.monthlyTrend;
  const categoryData = DASHBOARD_DATA.analytics.categories;

  // Prevents hydration mismatch on charts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="h-96 lg:col-span-1 bg-gray-50 dark:bg-gray-950/20 animate-pulse rounded-3xl" />
        <div className="h-96 lg:col-span-2 bg-gray-50 dark:bg-gray-950/20 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
      
      {/* 1. Category-based Breakdown (Donut Chart) */}
      <div className="relative group lg:col-span-1 bg-white dark:bg-gray-950 p-7 rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-100 dark:shadow-black/20 overflow-hidden transition-all duration-300 hover:border-purple-500/50">
        
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">All Expenses</h3>
            <button className="flex items-center gap-1.5 p-2 bg-gray-50 dark:bg-white/5 text-[10px] rounded-full border border-gray-100 dark:border-white/10 text-gray-500 hover:text-purple-500 transition-colors">
              <Filter size={12} />
              Monthly
            </button>
          </div>
          
          <div className="h-64 relative mt-2 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={categoryData}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  cornerRadius={10}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="none"
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px', fontSize: '12px', padding: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider">Total</span>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                ${DASHBOARD_DATA.summary.find(s => s.id === "expenses")?.amount || "0"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2.5 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 group/legend">
                <div className="w-2.5 h-2.5 rounded-full shadow-md" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover/legend:text-white transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Earnings Trend (Area Chart) */}
      <div className="relative group lg:col-span-2 bg-white dark:bg-gray-950 p-7 rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-100 dark:shadow-black/20 overflow-hidden transition-all duration-300 hover:border-purple-500/50">
        
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-bl from-teal-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6 gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">Earnings Trend</h3>
              <p className="text-xs text-gray-500">Track your cashflow across the month.</p>
            </div>
            
            <div className="flex items-center gap-3 p-1.5 bg-gray-50 dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10 shadow-inner">
                <div className="flex gap-1.5 text-[9px] font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10">
                  <span className="text-teal-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Income</span>
                  <span className="text-amber-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Expenses</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 pr-2">
                  <CalendarDays size={14} />
                  April 2026
                </div>
            </div>
          </div>

          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 11}} tickFormatter={(v) => `$${v/1000}k`} width={40} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '13px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#colorIncome)" strokeWidth={4} dot={{ r: 3, fill: '#111', stroke: '#10b981' }} />
                <Area type="monotone" dataKey="expenses" stroke="#f59e0b" fill="url(#colorExpense)" strokeWidth={4} dot={{ r: 3, fill: '#111', stroke: '#f59e0b' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}