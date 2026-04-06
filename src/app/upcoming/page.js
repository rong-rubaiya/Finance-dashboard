"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ArrowUpRight, ArrowDownLeft, 
  Plus, X, Trash2, Edit3, ShieldCheck,
  CheckCircle2, TrendingUp, TrendingDown, Activity, AlertTriangle
} from "lucide-react";
import { DASHBOARD_DATA } from "../../constants/dashboardData";
import { useRole } from '@/context/RoleContext';

export default function ProfessionalUpcomingNodes() {
  const { role } = useRole();
  const isAdmin = role === "admin";

  const [transactions, setTransactions] = useState(DASHBOARD_DATA.upcomingData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState({ show: false, message: '' });
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    label: '', amount: '', date: '', type: 'expense', from_to: ''
  });

  // --- Calculations ---
  const totalIn = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + parseFloat(String(curr.amount).replace(/[^0-9.-]+/g, "")), 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Math.abs(parseFloat(String(curr.amount).replace(/[^0-9.-]+/g, ""))), 0);
  const balance = totalIn - totalOut;

  const triggerSuccess = (msg) => {
    setShowSuccess({ show: true, message: msg });
    setTimeout(() => setShowSuccess({ show: false, message: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? { ...formData } : t));
      triggerSuccess("Protocol Updated Successfully");
    } else {
      const newEvent = { ...formData, id: `EVT-${Math.floor(Math.random() * 9000)}` };
      setTransactions([newEvent, ...transactions]);
      triggerSuccess("New Event Added Successfully");
    }
    resetForm();
  };

  const confirmDelete = () => {
    setTransactions(transactions.filter(t => t.id !== itemToDelete));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    triggerSuccess("Entry Terminated Successfully");
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ label: '', amount: '', date: '', type: 'expense', from_to: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className=" min-h-screen bg-white dark:bg-[#050507] text-slate-900 dark:text-slate-100   font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">Upcoming<span className="text-purple-600">_</span>Flow<span className="text-purple-600">.</span></h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-[0.2em] mt-1">OPERATIONAL TIMELINE & FORECAST</p>
        </div>

        {isAdmin && (
          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-purple-600/20 hover:bg-purple-700 transition-all"
          >
            <Plus size={16} strokeWidth={3}/> Schedule Event
          </motion.button>
        )}
      </div>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
        <AnalyticsCard label="Pending Inflow" amount={totalIn} icon={<TrendingUp/>} color="emerald" />
        <AnalyticsCard label="Upcoming Outflow" amount={totalOut} icon={<TrendingDown/>} color="rose" />
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-6 rounded-[2rem] flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Net Forecast</p>
                <h3 className={`text-2xl font-black mt-1 ${balance >= 0 ? 'text-purple-500' : 'text-rose-500'}`}>
                    ${balance.toLocaleString()}
                </h3>
            </div>
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-full border-4 border-purple-600/20 border-t-purple-600 flex items-center justify-center animate-spin-slow">
                <Activity size={20} className="text-purple-600"/>
            </div>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="max-w-5xl mx-auto space-y-4 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/50 via-slate-200 dark:via-white/10 to-transparent hidden md:block" />
        
        <AnimatePresence mode='popLayout'>
          {transactions.map((item) => (
            <motion.div 
              layout key={item.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative md:pl-20 group"
            >
              <div className="absolute left-[29px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white dark:bg-black border-2 border-purple-600 z-10 hidden md:block group-hover:scale-150 transition-transform" />

              <div className="bg-white dark:bg-[#0C0C0E] border border-slate-200 dark:border-white/[0.08] p-4 md:p-5 rounded-[1.5rem] flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-2xl hover:shadow-purple-600/5 transition-all">
                <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
                  <div className={`h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-purple-600/10 text-purple-600'}`}>
                    {item.type === 'income' ? <ArrowUpRight size={20}/> : <ArrowDownLeft size={20}/>}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-sm uppercase tracking-tight truncate">{item.label}</h4>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase truncate">
                        {item.type === 'income' ? `From: ${item.from_to}` : `Pay To: ${item.from_to}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:gap-8 lg:gap-12 border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 md:justify-end">
                      <Calendar size={10}/> {item.date}
                    </p>
                    <p className={`text-base md:text-lg font-black italic ${item.type === 'income' ? 'text-emerald-500' : 'text-purple-500'}`}>
                      {item.amount}
                    </p>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-1.5 md:gap-2">
                      <button onClick={() => openEditModal(item)} className="p-2 md:p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-purple-500 transition-colors"><Edit3 size={14}/></button>
                      <button onClick={() => { setItemToDelete(item.id); setIsDeleteModalOpen(true); }} className="p-2 md:p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- SUCCESS TOAST --- */}
      <AnimatePresence>
        {showSuccess.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap"
          >
            <CheckCircle2 size={18} />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{showSuccess.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-6 z-[120]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#0F0F12] p-8 rounded-[2rem] w-full max-w-sm relative border border-white/10 text-center">
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter mb-2">Delete Event?</h2>
              <p className="text-xs text-slate-500 font-medium mb-8">This action will permanently purge the event from the timeline.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 font-bold uppercase text-[10px] tracking-widest text-slate-500 bg-slate-50 dark:bg-white/5 rounded-2xl">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-rose-500/20">Confirm</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FORM MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[110] ">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetForm} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#07070b] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-xl relative border border-purple-700/50 shadow-2xl overflow-y-auto max-h-[90vh] ">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{editingId ? 'Update_Event' : 'New_Event'}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all"><X/></button>
              </div>

             <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 ">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
    {/* Event Identity */}
    <div className="col-span-1 md:col-span-2">
      <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Event Identity</label>
      <input 
        required 
        value={formData.label} 
        onChange={(e)=>setFormData({...formData, label: e.target.value})} 
        className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 outline-none focus:border-purple-600 transition-all text-sm" 
        placeholder="e.g. Pay bill electricity" 
      />
    </div>
    
    {/* Transaction Type */}
    <div className="col-span-1 md:col-span-2">
      <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Transaction Type</label>
      <div className="flex gap-2 md:gap-3">
          {['income', 'expense'].map((t) => (
              <button 
                key={t} 
                type="button" 
                onClick={() => setFormData({...formData, type: t})} 
                className={`flex-1 py-2.5 md:py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === t ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-200 dark:border-white/10 text-slate-500'}`}
              >
                  {t}
              </button>
          ))}
      </div>
    </div>

    {/* Source / Entity */}
    <div className="col-span-1 md:col-span-2">
      <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">
          {formData.type === 'income' ? 'Income From (Source)' : 'Pay To (Entity)'}
      </label>
      <input 
        required 
        value={formData.from_to} 
        onChange={(e)=>setFormData({...formData, from_to: e.target.value})} 
        className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 outline-none focus:border-purple-600 transition-all text-sm" 
        placeholder={formData.type === 'income' ? "Client Name / Platform" : "Vendor / Utility Name"} 
      />
    </div>

    {/* Value */}
    <div>
      <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Value</label>
      <input 
        required 
        value={formData.amount} 
        onChange={(e)=>setFormData({...formData, amount: e.target.value})} 
        className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 outline-none focus:border-purple-600 transition-all text-sm" 
        placeholder="$0.00" 
      />
    </div>

    {/* Date */}
    <div>
      <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Target Date</label>
      <input 
        type="date" 
        required 
        value={formData.date} 
        onChange={(e)=>setFormData({...formData, date: e.target.value})} 
        className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 outline-none focus:border-purple-600 transition-all text-sm" 
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-3 pt-2 md:pt-4">
      <button 
        type="button" 
        onClick={resetForm} 
        className="flex-1 py-3 md:py-4 font-bold uppercase text-[10px] tracking-widest text-slate-500 hover:text-rose-500 transition-colors"
      >
        Abort
      </button>
      <button 
        className="flex-[2] py-3 md:py-4 bg-purple-600 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-600/20 active:scale-95 transition-all"
      >
          {editingId ? "Update Event" : "Add Event"}
      </button>
  </div>
</form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnalyticsCard({ label, amount, icon, color }) {
    const isEmerald = color === 'emerald';
    return (
        <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-5 md:p-6 rounded-[2rem] flex items-center justify-between group hover:border-purple-500/30 transition-all">
            <div>
                <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
                <h3 className={`text-xl md:text-2xl font-black mt-1 ${isEmerald ? 'text-emerald-500' : 'text-rose-500'}`}>
                    ${amount.toLocaleString()}
                </h3>
            </div>
            <div className={`h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center ${isEmerald ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {icon}
            </div>
        </div>
    );
}