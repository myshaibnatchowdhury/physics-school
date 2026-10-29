"use client";

import React, { useState } from "react";
import { X, Lock, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { getAdminPassword, setAdminPassword } from "@/lib/adminAuth";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const actualCurrent = getAdminPassword();
    if (currentPass !== actualCurrent) {
      setError("বর্তমান পাসওয়ার্ডটি সঠিক নয়!");
      return;
    }

    if (newPass.length < 4) {
      setError("নতুন পাসওয়ার্ডটি অন্তত ৪ অক্ষরের হতে হবে!");
      return;
    }

    if (newPass !== confirmPass) {
      setError("নতুন পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    const updated = setAdminPassword(newPass);
    if (updated) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
        onClose();
      }, 1500);
    } else {
      setError("পাসওয়ার্ড আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#FFAA24] flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1726]">পাসওয়ার্ড পরিবর্তন (Admin Password)</h3>
            <p className="text-xs text-[#64748B]">এডমিন লগইন করার নতুন পাসওয়ার্ড নির্ধারণ করুন</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1726] mb-1">
              বর্তমান পাসওয়ার্ড (Current Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="ডিফল্ট: admin"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">প্রথমবার লগইন করার জন্য ডিফল্ট পাসওয়ার্ড: <strong>admin</strong></p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1726] mb-1">
              নতুন পাসওয়ার্ড (New Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="আপনার পছন্দসই নতুন পাসওয়ার্ড"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1726] mb-1">
              নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
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
              সংরক্ষণ করুন (Save Password)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
