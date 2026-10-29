"use client";

import React, { useState } from "react";
import { Wallet, Download, Search, CheckCircle2, Clock, Printer } from "lucide-react";
import { INITIAL_STUDENTS } from "@/data/mockStudents";

export default function FeesView() {
  const [fees, setFees] = useState([
    { id: "INV-2026-001", student: "Tasnim Jahan", roll: "01", class: "Class 7 (A)", amount: "৳ 8,500", month: "October 2026", status: "PAID" },
    { id: "INV-2026-002", student: "shariar sohel", roll: "01", class: "Class 11 (HSC)", amount: "৳ 12,000", month: "October 2026", status: "PAID" },
    { id: "INV-2026-003", student: "Tanvir Ahmed", roll: "01", class: "Class 6 (A)", amount: "৳ 7,500", month: "October 2026", status: "PENDING" },
    { id: "INV-2026-004", student: "Fatima Zahra", roll: "02", class: "Class 6 (A)", amount: "৳ 7,500", month: "October 2026", status: "PAID" },
    { id: "INV-2026-005", student: "Ayman Sadiq", roll: "03", class: "Class 6 (B)", amount: "৳ 7,500", month: "October 2026", status: "PENDING" },
    { id: "INV-2026-006", student: "Nusrat Jahan", roll: "01", class: "Class 9 (Science)", amount: "৳ 9,500", month: "October 2026", status: "PAID" },
  ]);

  const togglePay = (id: string) => {
    setFees(fees.map((f) => (f.id === id ? { ...f, status: f.status === "PAID" ? "PENDING" : "PAID" } : f)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
            Fees & Billing Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Manage tuition fees, term invoices, receipts & financial summaries.
          </p>
        </div>

        <button
          onClick={() => alert("Generate monthly fee invoices for all active classes.")}
          className="px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          + Generate Monthly Invoices
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Total Invoiced (মোট ধার্য ফি)</p>
          <p className="text-2xl font-black text-[#0B1726] mt-1">৳ 52,500</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Total Collected (মোট আদায়কৃত)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">৳ 37,500</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Outstanding Dues (বকেয়া)</p>
          <p className="text-2xl font-black text-amber-600 mt-1">৳ 15,000</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">INVOICE NO</th>
                <th className="py-3 px-4">STUDENT NAME</th>
                <th className="py-3 px-4">CLASS</th>
                <th className="py-3 px-4">MONTH</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {fees.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#0B1726]">{item.id}</td>
                  <td className="py-4 px-4 font-bold text-[#0B1726]">{item.student}</td>
                  <td className="py-4 px-4 font-semibold text-[#2563EB]">{item.class}</td>
                  <td className="py-4 px-4 text-slate-600">{item.month}</td>
                  <td className="py-4 px-4 font-bold text-[#0B1726]">{item.amount}</td>
                  <td className="py-4 px-4">
                    {item.status === "PAID" ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
                        PAID
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-50 text-amber-600 border border-amber-200">
                        PENDING
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => togglePay(item.id)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      {item.status === "PAID" ? "Mark Unpaid" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
