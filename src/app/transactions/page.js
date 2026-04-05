"use client";
import React, { useState, useMemo } from 'react';
import { Download, ChevronRight, ChevronLeft, Trash2, AlertCircle, X, Calendar } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import { DASHBOARD_DATA } from '@/constants/dashboardData';
import { useRole } from "@/context/RoleContext";

export default function TransactionPage() {
  const { role } = useRole(); 
  const isAdmin = role === "admin";
  
  const [transactions, setTransactions] = useState(DASHBOARD_DATA?.transactions || []);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setTransactions(prev => prev.filter(t => t.id !== selectedId));
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    return transactions
      .map(t => {
        const amountStr = t?.amount?.toString() || "0";
        const cleanVal = parseFloat(amountStr.replace(/[$,\s]/g, ""));
        return { 
          ...t, 
          cleanAmount: isNaN(cleanVal) ? 0 : cleanVal,
          name: t?.name || "Unknown Entity",
          category: t?.category || "General",
          date: t?.date || "15/04/23" // Default fallback date
        };
      })
      .filter(t => {
        if (filter === "all") return true;
        return t.type.toLowerCase() === filter.toLowerCase();
      })
      .reverse();
  }, [filter, transactions]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownloadPDF = (tx) => {
    if (!isAdmin) return;
    const doc = new jsPDF();
    
    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(147, 51, 234); 
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("GLOBAL TRANSACTION REPORT", 15, 25);
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.text(`Transaction Node: ${tx.id || 'N/A'}`, 15, 35);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 140, 35);

    autoTable(doc, {
      startY: 55,
      head: [['Metric', 'Transaction Intelligence']],
      body: [
        ['Counterparty', tx.name],
        ['Classification', tx.category.toUpperCase()],
        ['Flow Type', tx.type.toUpperCase()],
        ['Net Amount', `${tx.type === 'income' ? '+' : '-'}$${tx.cleanAmount.toLocaleString()}`],
        ['Execution Status', tx.status],
        ['Reference Date', tx.date]
      ],
      theme: 'grid',
      headStyles: { fillColor: [124, 58, 237], fontSize: 12 },
      styles: { cellPadding: 8, fontSize: 10, font: "helvetica" },
      columnStyles: { 0: { fontStyle: 'bold', width: 50 } }
    });

    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(8);
    doc.setTextColor(180);
    doc.text("This is an electronically generated secure node document.", 15, finalY + 20);

    doc.save(`Transaction_${tx.name}_${tx.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white   transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">
            Global_Transaction<span className="text-purple-600">.</span>
          </h1>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">
            Node Access: {role}
          </p>
        </div>

        {/* Filter Tabs - Horizontal Scroll Fixed */}
        <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 min-w-max">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => { setFilter(type); setCurrentPage(1); }}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                  filter === type ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-purple-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-[2.5rem] border border-purple-500/50 bg-white dark:bg-black overflow-hidden shadow-2xl">
        
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-white/[0.03] text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="p-8">Timeline & Entity</th>
                <th className="p-8">Amount</th>
                <th className="p-8 text-center">Status</th>
                {isAdmin && <th className="p-8 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {currentItems.map((tx) => (
                <tr key={tx.id} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all">
                  <td className="p-8 relative">
                    <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${tx.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <div className="flex items-center gap-5">
                      <img src={tx.avatar} className="w-12 h-12 rounded-2xl border dark:border-white/10 object-cover" alt="" />
                      <div>
                        <p className="font-bold text-lg">{tx.name}</p>
                        <div className="flex items-center gap-2">
                           <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest">{tx.category}</p>
                           <span className="text-[9px] text-slate-400 font-bold">• {tx.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 font-black text-xl tracking-tighter">
                    <span className={tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}>
                      {tx.type === 'income' ? '+' : '-'}${tx.cleanAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    <span className="text-[9px] font-black uppercase px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-slate-500">
                      {tx.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleDownloadPDF(tx)} className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-purple-600 hover:text-white rounded-xl transition-all border dark:border-white/10">
                          <Download size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(tx.id)} className="p-3 bg-gray-100 dark:bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl transition-all border dark:border-white/10">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Design overlap fixed */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
          {currentItems.map((tx) => (
            <div key={tx.id} className="p-6 relative group">
              <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${tx.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
                  <img src={tx.avatar} className="w-12 h-12 rounded-xl border dark:border-white/10 flex-shrink-0" alt="" />
                  <div className="min-w-0">
                    <p className="font-bold dark:text-white truncate">{tx.name}</p>
                    <p className="text-[9px] text-purple-600 font-black uppercase tracking-widest truncate">{tx.category}</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => handleDownloadPDF(tx)} className="p-2.5 bg-gray-50 dark:bg-white/5 border dark:border-white/10 rounded-lg text-slate-500">
                      <Download size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(tx.id)} className="p-2.5 bg-gray-50 dark:bg-white/5 border dark:border-white/10 rounded-lg text-rose-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end border-t border-gray-100 dark:border-white/5 pt-4">
                <div>
                  <p className={`text-2xl font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.cleanAmount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter flex items-center gap-1">
                    <Calendar size={10}/> {tx.date}
                  </p>
                </div>
                <div className="text-[9px] font-black uppercase text-slate-500 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border dark:border-white/10">
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.01]">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
            Page {currentPage} / {totalPages}
          </p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2.5 rounded-xl border dark:border-white/10 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2.5 rounded-xl border dark:border-white/10 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-20">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0f0f0f] w-full max-w-sm rounded-[2rem] border border-gray-200 dark:border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20}/></button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={32} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Delete Node?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">This record will be permanently purged.</p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border dark:border-white/10 text-[10px] font-black uppercase">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-rose-600 text-white text-[10px] font-black uppercase">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}