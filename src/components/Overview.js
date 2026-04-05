"use client";
import React from 'react';
import { 
  DollarSign, 
  ArrowDownRight, 
  ArrowUpRight, 
  PiggyBank, 
  Briefcase, 
  Wallet 
} from "lucide-react";

import { DASHBOARD_DATA } from "@/constants/dashboardData";


const iconMap = {
  balance: Wallet,
  income: Briefcase,
  expenses: DollarSign,
  savings: PiggyBank,
};

export default function Overview() {
  // Use the summary data from your constants file
  const financialData = DASHBOARD_DATA.summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {financialData.map((data) => {
        // Dynamically select the icon based on the ID
        const IconComponent = iconMap[data.id] || Wallet;
        
        return (
          <div 
            key={data.id}
            className="relative p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-100 dark:shadow-black/20 group hover:-translate-y-1 hover:border-purple-500 transition-all duration-300 overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${data.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`} />
            
            <div className="relative z-10 flex flex-col gap-4">
              {/* Header: Icon & Title */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-tr ${data.gradient} rounded-full shadow-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-purple-500 transition-colors">
                  {data.title}
                </h3>
              </div>
              
              {/* Body: Value & Trend Indicator */}
              <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-gray-950 dark:text-white group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-300">
                  {data.value}
                </span>
                <div className="p-1.5 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center">
                  {data.trend === "up" ? (
                    <ArrowUpRight size={16} className="text-green-500" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}