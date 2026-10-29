"use client";

import React, { useState } from "react";
import { X, UserPlus, CheckCircle2 } from "lucide-react";
import { EnrolledStudent } from "@/data/mockStudents";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: EnrolledStudent) => void;
}

export default function AddStudentModal({ isOpen, onClose, onAddStudent }: AddStudentModalProps) {
  const [nameEn, setNameEn] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [roll, setRoll] = useState("");
  const [admissionNo, setAdmissionNo] = useState(`ADM-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [classSection, setClassSection] = useState("Class 11 (HSC) (A)");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !roll) return;

    const newStudent: EnrolledStudent = {
      id: "stu-" + Date.now(),
      roll: roll.padStart(2, "0"),
      admissionNo: admissionNo || `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
      nameEn,
      nameBn: nameBn || nameEn,
      classSection,
      guardianName: guardianName || "Guardian",
      guardianContact: guardianContact || "01700000000",
      status: "ACTIVE",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1726]">নতুন শিক্ষার্থী যুক্ত করুন (Add Student)</h3>
            <p className="text-xs text-[#64748B]">শিক্ষার্থীর ব্যক্তিগত ও একাডেমিক বিবরণ পূরণ করুন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                শিক্ষার্থীর নাম (English) *
              </label>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Mysha Chowdhury"
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                শিক্ষার্থীর নাম (বাংলায়)
              </label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="e.g. মাইশা চৌধুরী"
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                রোল নং (Roll) *
              </label>
              <input
                type="text"
                required
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="01"
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                ভর্তি নং (Admission No)
              </label>
              <input
                type="text"
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                শ্রেণি ও সেকশন
              </label>
              <select
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Class 11 (HSC) (A)">Class 11 (HSC) (A)</option>
                <option value="Class 12 (HSC) (A)">Class 12 (HSC) (A)</option>
                <option value="Class 10 (SSC) (A)">Class 10 (SSC) (A)</option>
                <option value="Class 9 (Science-A)">Class 9 (Science-A)</option>
                <option value="Class 8 (A)">Class 8 (A)</option>
                <option value="Class 7 (A)">Class 7 (A)</option>
                <option value="Class 6 (A)">Class 6 (A)</option>
                <option value="Undergraduate Physics">Undergraduate Physics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                অভিভাবকের নাম (Guardian Name)
              </label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="e.g. Dr. Alam"
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                অভিভাবকের মোবাইল নং (Phone)
              </label>
              <input
                type="tel"
                value={guardianContact}
                onChange={(e) => setGuardianContact(e.target.value)}
                placeholder="01700000000"
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
            >
              শিক্ষার্থী সংরক্ষণ করুন (+ Add)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
