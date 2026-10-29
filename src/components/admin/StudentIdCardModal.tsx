"use client";

import React from "react";
import Image from "next/image";
import { X, Printer, Download, GraduationCap } from "lucide-react";
import { EnrolledStudent } from "@/data/mockStudents";

interface StudentIdCardModalProps {
  student: EnrolledStudent | null;
  onClose: () => void;
}

export default function StudentIdCardModal({ student, onClose }: StudentIdCardModalProps) {
  if (!student) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ID Card Front */}
        <div className="bg-[#0B1726] text-white p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFAA24]/10 rounded-full blur-2xl" />
          
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 relative">
              <Image src="/images/logo-mark.png" alt="Emblem" fill className="object-contain" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black tracking-wider uppercase leading-tight">Physics School</h4>
              <p className="text-[9px] font-bold text-[#FFAA24] tracking-widest uppercase">Student Identity Card</p>
            </div>
          </div>

          {/* Student Photo */}
          <div className="w-20 h-20 mx-auto rounded-xl bg-slate-800 border-2 border-[#FFAA24] relative overflow-hidden mb-3 shadow-md flex items-center justify-center">
            <span className="text-2xl font-black text-white">{student.nameEn.charAt(0)}</span>
          </div>

          <h3 className="text-base font-bold text-white leading-tight">{student.nameEn}</h3>
          <p className="text-xs text-slate-300 font-sans mt-0.5">{student.nameBn}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFAA24] text-[#0B1726] uppercase">
            {student.classSection}
          </span>
        </div>

        {/* ID Card Details */}
        <div className="p-5 space-y-2.5 text-xs bg-slate-50 border-t border-slate-200">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Roll Number:</span>
            <span className="font-bold text-[#0B1726]">{student.roll}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Admission No:</span>
            <span className="font-mono font-bold text-[#0B1726]">{student.admissionNo}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Guardian:</span>
            <span className="font-semibold text-[#0B1726]">{student.guardianName}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Contact:</span>
            <span className="font-semibold text-[#0B1726]">{student.guardianContact}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Academic Session:</span>
            <span className="font-bold text-[#0D8B83]">2026-2027</span>
          </div>

          {/* Faux Barcode */}
          <div className="pt-3 text-center">
            <div className="h-7 w-3/4 mx-auto bg-slate-800 flex items-center justify-center space-x-1 p-1 rounded">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`h-full ${i % 3 === 0 ? "w-1 bg-white" : "w-0.5 bg-white"}`}
                />
              ))}
            </div>
            <p className="text-[9px] font-mono text-slate-400 mt-1">{student.admissionNo}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Official Student Pass</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ID Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
