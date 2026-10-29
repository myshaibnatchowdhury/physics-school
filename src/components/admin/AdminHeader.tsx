"use client";

import React, { useState } from "react";
import { KeyRound, LogOut, ChevronDown, Bell, Search, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  onOpenChangePassword: () => void;
  onLogout: () => void;
  adminName?: string;
}

export default function AdminHeader({
  onOpenChangePassword,
  onLogout,
  adminName = "Engr. Sohel Rana",
}: AdminHeaderProps) {
  const [role, setRole] = useState("Admin");

  return (
    <header className="h-16 bg-white border-b border-[#E5EAF0] px-6 flex items-center justify-between shrink-0">
      {/* Left: User Profile & Role Switcher (Matching Screenshot) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {adminName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0B1726]">{adminName}</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 tracking-wider">
                ADMIN
              </span>
            </div>
          </div>
        </div>

        {/* Switch Role Preview Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs font-medium text-amber-900 cursor-pointer hover:bg-amber-100/70 transition-colors">
          <span className="text-[#FFAA24]">✨</span>
          <span>Switch Role Preview</span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
        </div>
      </div>

      {/* Right Actions: Password, Logout, Notification */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenChangePassword}
          title="Change Admin Password"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0B1726] bg-slate-100 hover:bg-[#FFAA24]/20 hover:text-[#0B1726] border border-slate-200 transition-colors"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#FFAA24]" />
          <span className="hidden sm:inline">Set/Change Password</span>
        </button>

        <button
          onClick={onLogout}
          title="Sign out from Admin Portal"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
