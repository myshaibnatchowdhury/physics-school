"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";
import { loginAdmin, checkAdminSession, getAdminPassword } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkAdminSession()) {
      router.push("/dashboard/students");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const success = loginAdmin(password);
    if (success) {
      router.push("/dashboard/students");
    } else {
      setError("ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন। (ডিফল্ট: admin)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111D] flex flex-col justify-between p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Background scientific aura */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFAA24]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FFAA24]" />
          <span>Back to Physics School Homepage</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-500">ADMIN_GATEWAY_V2</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-[#101D32] border border-white/20">
        <div className="text-center mb-6">
          <div className="w-14 h-14 relative mx-auto mb-3">
            <Image
              src="/images/logo-mark.png"
              alt="Physics School Official Emblem"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1726] tracking-tight">
            Physics School Admin
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            শুধু অনুমোদিত এডমিন লগইন করতে পারবেন
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1726] mb-1.5 flex items-center justify-between">
              <span>এডমিন পাসওয়ার্ড (Admin Password)</span>
              <span className="text-[10px] text-slate-400 font-normal">ডিফল্ট: admin</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন (e.g. admin)"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-[#FFAA24] shrink-0 mt-0.5" />
            <span>
              লগইন করার পর আপনি যেকোনো সময় আপনার নিজের পছন্দমতো নতুন পাসওয়ার্ড সেট/পরিবর্তন করতে পারবেন।
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <span>{loading ? "ভেরিফাই করা হচ্ছে..." : "এডমিন ড্যাশবোর্ডে প্রবেশ করুন"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          <span>Physics School Management System • 2026</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-slate-500">
        <p>© 2026 Physics School. Confidential & Proprietary Administrative System.</p>
      </div>
    </div>
  );
}
