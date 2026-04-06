"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Calendar, DollarSign, 
  ChevronRight, X, CheckCircle2, AlertCircle, UserPlus, Lock, Briefcase, CreditCard
} from "lucide-react";
import { TEAM_DATA } from '@/constants/teamData.';
import { useRole } from "@/context/RoleContext";

export default function TeamManagementPage() {
  const [team, setTeam] = useState(TEAM_DATA);
  const [filter, setFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { role, setRole } = useRole(); 
  
  const isAdmin = role === "admin";
  const categories = ['All', 'Engineering', 'Marketing', 'Product'];

  const filteredTeam = filter === 'All' ? team : team.filter(m => m.category === filter);

  // Function to toggle payment status (Admin Only)
  const togglePaymentStatus = (memberId) => {
    setTeam(prevTeam => prevTeam.map(member => 
      member.id === memberId 
        ? { ...member, paymentStatus: member.paymentStatus === "Paid" ? "Pending" : "Paid" } 
        : member
    ));
    // Update selected member view in modal
    setSelectedMember(prev => ({...prev, paymentStatus: prev.paymentStatus === "Paid" ? "Pending" : "Paid"}));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMember = {
      id: team.length + 1,
      name: formData.get('name'),
      role: formData.get('role'),
      category: formData.get('category'),
      salary: `$${formData.get('salary')}`,
      joiningDate: new Date().toISOString().split('T')[0],
      email: formData.get('email'),
      phone: formData.get('phone'),
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get('name')}`,
      paymentStatus: "Pending"
    };
    setTeam([newMember, ...team]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050507] text-slate-900 dark:text-slate-100  font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">Personnel<span className="text-purple-600">_</span>Registry<span className="text-purple-600">.</span></h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <Lock size={10} className="text-purple-600"/> ACCESS: <span className={isAdmin ? "text-purple-600" : "text-slate-400"}>{isAdmin ? "ADMIN_PRIVILEGE" : "VIEWER_ONLY"}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex bg-white dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                {cat}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
              <UserPlus size={14}/> Add_Member
            </button>
          )}
        </div>
      </div>

      {/* 2. TEAM GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredTeam.map((member) => (
            <motion.div layout key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#0C0C0E] border border-slate-200 dark:border-white/[0.08] rounded-[2rem] overflow-hidden group hover:border-purple-600/30 transition-all shadow-sm">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <img src={member.image} className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10" alt="" />
                  <span className="text-[8px] font-black uppercase px-2 py-1 rounded-md bg-purple-600/10 text-purple-600 border border-purple-600/20">{member.category}</span>
                </div>
                <h3 className="font-black text-sm uppercase truncate">{member.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{member.role}</p>
              </div>

              <div className="px-6 py-4 space-y-3 bg-slate-50/50 dark:bg-white/[0.02] border-y border-slate-100 dark:border-white/5">
                <DataRow icon={<DollarSign size={12}/>} label="Remuneration" value={member.salary} color="text-emerald-500" />
                <DataRow icon={<Briefcase size={12}/>} label="Specialty" value={member.specialty || "General"} />
              </div>

              <button onClick={() => setSelectedMember(member)} className="w-full py-4 bg-slate-50 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                Access File <ChevronRight size={12}/>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. MEMBER DETAIL MODAL (Admin Payment Access) */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[200]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMember(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#0F0F12] p-8 rounded-[2.5rem] w-full max-w-md relative border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-20 w-20 rounded-3xl bg-purple-600/10 p-1 border border-purple-600/20">
                    <img src={selectedMember.image} alt="" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <button onClick={() => setSelectedMember(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400"><X size={20}/></button>
                </div>

                <h2 className="text-2xl font-black uppercase tracking-tighter italic">{selectedMember.name}</h2>
                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-6">{selectedMember.role}</p>

                <div className="space-y-4 mb-8">
                   <DataRow icon={<Mail size={14}/>} label="Network_ID" value={selectedMember.email} />
                   <DataRow icon={<Phone size={14}/>} label="Secure_Line" value={selectedMember.phone} />
                   <DataRow icon={<Calendar size={14}/>} label="Enlistment" value={selectedMember.joiningDate} />
                </div>

                {/* --- PAYMENT STATUS BLOCK (Admin Only) --- */}
                <div className="p-5 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-slate-400"/>
                      <span className="text-[9px] font-black uppercase text-slate-500">Monthly_Payment</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${selectedMember.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                      {selectedMember.paymentStatus}
                    </span>
                  </div>
                  
                  {isAdmin ? (
                    <button 
                      onClick={() => togglePaymentStatus(selectedMember.id)}
                      className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white transition-all shadow-lg"
                    >
                      {selectedMember.paymentStatus === "Paid" ? "Mark as Unpaid" : "Execute Payment"}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 justify-center py-2 text-slate-400 italic">
                      <Lock size={12}/> <span className="text-[9px] font-bold uppercase">Modification_Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. ADD MEMBER MODAL */}
      <AnimatePresence>
        {isAddModalOpen && isAdmin && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[200]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.form onSubmit={handleAddMember} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#0F0F12] p-8 rounded-[2.5rem] w-full max-w-xl relative border border-slate-200 dark:border-white/10 shadow-2xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 italic">Personnel_Entry_Form</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Full Name</label>
                  <input required name="name" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-purple-600 text-xs" placeholder="e.g. John Doe" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Category</label>
                  <select name="category" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs">
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Role Title</label>
                  <input required name="role" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs" placeholder="e.g. Frontend Lead" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Salary (Monthly)</label>
                  <input required name="salary" type="number" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs" placeholder="5000" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Email</label>
                  <input required name="email" type="email" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none text-xs" placeholder="user@devstone.io" />
                </div>
              </div>
              <button type="submit" className="w-full mt-8 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-600/20">Authorize and Save</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ROLE SWITCHER */}
      <div className="fixed bottom-6 right-6 z-[200] bg-white dark:bg-[#121214] p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl flex gap-1">
        <button onClick={() => setRole("viewer")} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${role === "viewer" ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white" : "text-slate-400"}`}>Viewer</button>
        <button onClick={() => setRole("admin")} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${role === "admin" ? "bg-purple-600 text-white shadow-md" : "text-slate-400"}`}>Admin</button>
      </div>

    </div>
  );
}

function DataRow({ icon, label, value, color = "text-slate-700 dark:text-slate-300" }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
      </div>
      <span className={`text-[10px] font-black italic truncate max-w-[120px] text-right ${color}`}>{value}</span>
    </div>
  );
}