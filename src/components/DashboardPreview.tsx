"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Award,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"courses" | "notices">("courses");

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E5EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-teal-50 text-[#0D8B83] mb-3">
            Promotional System Preview
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
            All-in-One Student Dashboard
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B]">
            Track your progress, manage your courses, check results, and stay updated with the latest notices — all in one place.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0B1726] p-2 sm:p-4 shadow-2xl border border-[#E5EAF0] overflow-hidden">
          {/* Top Browser Chrome Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#07111D] rounded-t-xl sm:rounded-t-2xl border-b border-white/10 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-[11px] font-mono text-slate-400 hidden sm:inline">
                portal.physicsschool.edu/student/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Demonstration Mode</span>
            </div>
          </div>

          {/* Inner Dashboard Layout */}
          <div className="bg-[#FAF8F3] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Sidebar (Desktop) */}
            <aside className="lg:col-span-3 bg-[#0B1726] text-white p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Mini Brand Header */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 relative shrink-0">
                    <Image
                      src="/images/logo-mark.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-wider uppercase text-white block leading-tight">
                      Physics
                    </span>
                    <span className="text-[10px] font-bold text-[#FFAA24] tracking-widest uppercase block leading-none">
                      School
                    </span>
                  </div>
                </div>

                {/* Nav items */}
                <nav className="space-y-1 text-xs">
                  {[
                    { label: "Dashboard", icon: LayoutDashboard, active: true },
                    { label: "My Courses", icon: BookOpen, active: false },
                    { label: "Attendance", icon: CalendarCheck, active: false },
                    { label: "Results & Grades", icon: Award, active: false },
                    { label: "Notice Board", icon: Bell, active: false },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
                          item.active
                            ? "bg-[#FFAA24] text-[#0B1726] font-bold shadow-sm"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Student mini card */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 relative overflow-hidden border border-[#FFAA24]">
                  <Image
                    src="/images/avatar-rafid.jpg"
                    alt="Demo student"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-white">Rafid Islam</p>
                  <p className="text-[10px] text-slate-400">Roll: PHY-2401</p>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 p-4 sm:p-6 lg:p-8 space-y-6 text-[#101D32]">
              {/* Top Search & Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1726]">
                    Welcome back, Student! 👋
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Keep going! You have completed 3 of 6 physics modules this term.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      readOnly
                      value="Search curriculum..."
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E5EAF0] bg-white text-slate-500 w-44"
                    />
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#E5EAF0] text-slate-600 relative">
                    <Bell className="w-3.5 h-3.5" />
                    <span className="w-2 h-2 rounded-full bg-[#FFAA24] absolute top-1 right-1" />
                  </div>
                </div>
              </div>

              {/* 4 Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Courses", value: "6", change: "+2 this term", color: "text-[#0B1726]" },
                  { label: "Completed", value: "3", change: "50% done", color: "text-emerald-600" },
                  { label: "In Progress", value: "2", change: "Active lessons", color: "text-[#FFAA24]" },
                  { label: "Upcoming Exams", value: "1", change: "Next Monday", color: "text-rose-600" },
                ].map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-[#E5EAF0] shadow-2xs">
                    <p className="text-[11px] font-medium text-[#64748B]">{stat.label}</p>
                    <p className={`text-xl sm:text-2xl font-black mt-0.5 ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Course Progress & Notices Split Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Recent Courses (7 cols) */}
                <div className="md:col-span-7 bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0B1726]">Recent Course Progress</h4>
                    <span className="text-xs text-[#FFAA24] font-semibold">Active Syllabus</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Classical Mechanics",
                        percent: 75,
                        lessons: "9 of 12 lessons",
                        color: "bg-[#FFAA24]",
                      },
                      {
                        title: "Quantum Mechanics",
                        percent: 50,
                        lessons: "7 of 15 lessons",
                        color: "bg-[#0D8B83]",
                      },
                      {
                        title: "Electromagnetism",
                        percent: 30,
                        lessons: "4 of 14 lessons",
                        color: "bg-blue-600",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E5EAF0] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#0B1726]">{item.title}</span>
                          <span className="font-mono font-semibold text-slate-600">{item.percent}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                          <span>{item.lessons}</span>
                          <span className="text-xs font-semibold text-[#0B1726] hover:underline flex items-center gap-1 cursor-pointer">
                            Continue <ChevronRight className="w-3 h-3 text-[#FFAA24]" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Notices (5 cols) */}
                <div className="md:col-span-5 bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-[#0B1726]">Latest Notices</h4>
                      <span className="text-[10px] text-slate-400 font-mono">TERM_2026</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          title: "Final Exam Schedule",
                          date: "May 12, 2026",
                          tag: "Academic",
                          bg: "text-purple-600 bg-purple-50",
                        },
                        {
                          title: "Class Routine Update",
                          date: "May 8, 2026",
                          tag: "Routine",
                          bg: "text-amber-600 bg-amber-50",
                        },
                        {
                          title: "Result Publication",
                          date: "May 3, 2026",
                          tag: "Exam",
                          bg: "text-emerald-600 bg-emerald-50",
                        },
                        {
                          title: "Holiday Notice",
                          date: "Apr 28, 2026",
                          tag: "Administrative",
                          bg: "text-rose-600 bg-rose-50",
                        },
                      ].map((n, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#0B1726] line-clamp-1">{n.title}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${n.bg}`}>
                              {n.tag}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#64748B] mt-0.5">{n.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-center border-t border-slate-100">
                    <span className="text-xs font-semibold text-[#0D8B83] hover:underline cursor-pointer">
                      View All 12 Notices →
                    </span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
