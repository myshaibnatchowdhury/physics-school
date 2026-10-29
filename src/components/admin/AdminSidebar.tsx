"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  FileCheck2,
  Award,
  Wallet,
  Receipt,
  Bell,
  Calendar,
  BookMarked,
  Library,
  Bus,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export default function AdminSidebar({ currentTab, onSelectTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: Users },
    { id: "teachers", label: "Teachers", icon: GraduationCap },
    { id: "academics", label: "Academics", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: CalendarCheck },
    { id: "examinations", label: "Examinations", icon: FileCheck2 },
    { id: "results", label: "Results & Marksheets", icon: Award },
    { id: "fees", label: "Fees & Billing", icon: Wallet },
    { id: "expenses", label: "Expenses", icon: Receipt },
    { id: "notices", label: "Notices", icon: Bell },
    { id: "events", label: "Events", icon: Calendar },
    { id: "homework", label: "Homework", icon: BookMarked },
    { id: "library", label: "Library", icon: Library },
    { id: "transport", label: "Transport", icon: Bus },
    { id: "hr", label: "HR & Staff", icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E5EAF0] min-h-screen flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E5EAF0] flex items-center gap-3">
          <div className="w-9 h-9 relative shrink-0">
            <Image
              src="/images/logo-mark.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-base font-black tracking-wider text-[#0B1726] leading-tight uppercase font-sans">
              Physics School
            </h1>
            <span className="text-[10px] font-bold tracking-widest text-[#FFAA24] uppercase block leading-none">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
                    : "text-[#64748B] hover:text-[#0B1726] hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#64748B]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Back Link */}
      <div className="p-4 border-t border-[#E5EAF0]">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0B1726] p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FFAA24]" />
          <span>Exit to Public Website</span>
        </Link>
      </div>
    </aside>
  );
}
