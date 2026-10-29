"use client";

import React from "react";
import {
  BookOpen,
  Calendar,
  Receipt,
  BookMarked,
  Library,
  Bus,
  Briefcase,
  LayoutDashboard,
  Users,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { INITIAL_STUDENTS } from "@/data/mockStudents";
import { INITIAL_TEACHERS } from "@/data/mockTeachers";

interface GenericModuleViewProps {
  moduleKey: string;
}

export default function GenericModuleView({ moduleKey }: GenericModuleViewProps) {
  const getModuleInfo = () => {
    switch (moduleKey) {
      case "overview":
        return {
          title: "Physics School Overview & Analytics",
          subtitle: "Comprehensive summary of campus operations, student attendance & metrics.",
          icon: LayoutDashboard,
          metrics: [
            { label: "Total Students", value: INITIAL_STUDENTS.length.toString(), change: "+12% this term", color: "text-[#2563EB]" },
            { label: "Total Faculty", value: INITIAL_TEACHERS.length.toString(), change: "8 Active", color: "text-emerald-600" },
            { label: "Active Courses", value: "5", change: "Full Syllabus", color: "text-[#FFAA24]" },
            { label: "Today's Attendance", value: "96%", change: "+2% vs avg", color: "text-purple-600" },
          ],
          actions: [
            "Download Comprehensive Monthly Academic Report",
            "Generate Term Result Summary for Governing Body",
            "Backup Local & Cloud Firestore Records",
          ],
        };
      case "academics":
        return {
          title: "Academic Curriculum & Lesson Plans",
          subtitle: "Manage Physics courses, syllabi, class schedules and laboratory sessions.",
          icon: BookOpen,
          metrics: [
            { label: "Active Modules", value: "62 Lessons", change: "5 Main Courses", color: "text-[#2563EB]" },
            { label: "Lab Experiments", value: "24 Setups", change: "Mechanics & Optics", color: "text-emerald-600" },
            { label: "Class Schedules", value: "18 Routines", change: "Updated Weekly", color: "text-[#FFAA24]" },
          ],
          actions: [
            "+ Create New Course Syllabus Plan",
            "Update Class 11 & 12 Weekly Lecture Routine",
            "Assign Teachers to Lab Experiment Stations",
          ],
        };
      case "expenses":
        return {
          title: "Institutional Expenses & Budgeting",
          subtitle: "Track laboratory equipment procurement, faculty salaries, and campus utilities.",
          icon: Receipt,
          metrics: [
            { label: "Monthly Budget", value: "৳ 3,50,000", change: "Session 2026", color: "text-[#2563EB]" },
            { label: "Lab Equipment", value: "৳ 1,20,000", change: "Lasers & Oscilloscopes", color: "text-purple-600" },
            { label: "Utilities & Cloud", value: "৳ 45,000", change: "Paid", color: "text-emerald-600" },
          ],
          actions: [
            "+ Record New Expense Voucher",
            "Download Financial Audit Report",
            "Review Vendor Invoices for Physics Lab",
          ],
        };
      case "events":
        return {
          title: "Events, Seminars & Workshops",
          subtitle: "Organize Physics Olympiads, guest lectures, stargazing camps, and exhibitions.",
          icon: Calendar,
          metrics: [
            { label: "Upcoming Events", value: "3 Events", change: "This Quarter", color: "text-[#2563EB]" },
            { label: "Participants", value: "140 Students", change: "Registered", color: "text-emerald-600" },
            { label: "Guest Lectures", value: "2 Scheduled", change: "Quantum Mechanics", color: "text-[#FFAA24]" },
          ],
          actions: [
            "+ Schedule Physics Science Exhibition",
            "Send Invitations for Telescope Night Camp",
            "Publish Inter-School Science Fair Notice",
          ],
        };
      case "homework":
        return {
          title: "Homework & Daily Problem Sets",
          subtitle: "Assign chapter problem sheets, mathematical derivation tasks & track submissions.",
          icon: BookMarked,
          metrics: [
            { label: "Active Assignments", value: "8 Problem Sets", change: "Due This Week", color: "text-[#2563EB]" },
            { label: "Submitted Rate", value: "88%", change: "+5% vs last week", color: "text-emerald-600" },
          ],
          actions: [
            "+ Assign New Numerical Problem Set",
            "Grade Pending Mechanics Submissions",
            "Distribute Solved Solution Sheet (PDF)",
          ],
        };
      case "library":
        return {
          title: "Physics Library & Digital Archive",
          subtitle: "Catalog reference textbooks (Halliday Resnick, Feynman Lectures), PDFs, and papers.",
          icon: Library,
          metrics: [
            { label: "Cataloged Books", value: "1,240 Titles", change: "Classical to Modern", color: "text-[#2563EB]" },
            { label: "Borrowed Books", value: "42 Checked Out", change: "Due Soon", color: "text-amber-600" },
          ],
          actions: [
            "+ Add New Physics Book / Research Paper",
            "Manage Student Library Borrowing Cards",
            "Upload Digital PDF E-Books to Cloud",
          ],
        };
      case "transport":
        return {
          title: "Campus Transport & Shuttle Routes",
          subtitle: "Manage student buses, pick-up points, driver contacts, and emergency alerts.",
          icon: Bus,
          metrics: [
            { label: "Active Routes", value: "4 Bus Routes", change: "Citywide Coverage", color: "text-[#2563EB]" },
            { label: "Registered Riders", value: "38 Students", change: "Pass Active", color: "text-emerald-600" },
          ],
          actions: [
            "Update Morning Shuttle Schedule",
            "Assign Student Bus Pass Barcodes",
            "Broadcast Route Delay Alert to Parents",
          ],
        };
      case "hr":
        return {
          title: "HR, Staff & Administration",
          subtitle: "Manage administrative officers, lab assistants, attendance, and payroll.",
          icon: Briefcase,
          metrics: [
            { label: "Support Staff", value: "14 Staff", change: "All Verified", color: "text-[#2563EB]" },
            { label: "Monthly Payroll", value: "৳ 2,80,000", change: "Processed", color: "text-emerald-600" },
          ],
          actions: [
            "+ Register New Staff Member",
            "Generate Staff Attendance & Leave Report",
            "Download Monthly Payroll Payslips",
          ],
        };
      default:
        return {
          title: "Module Management",
          subtitle: "Institutional options and configurations.",
          icon: LayoutDashboard,
          metrics: [{ label: "Status", value: "Active", change: "Operational", color: "text-emerald-600" }],
          actions: ["Configure Settings", "Export Data"],
        };
    }
  };

  const info = getModuleInfo();
  const Icon = info.icon;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center shadow-2xs">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
              {info.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              {info.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {info.metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
            <p className="text-xs font-medium text-slate-500">{m.label}</p>
            <p className={`text-2xl font-black mt-1 ${m.color}`}>{m.value}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              {m.change}
            </p>
          </div>
        ))}
      </div>

      {/* Action Operations */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-[#0B1726] uppercase tracking-wider">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {info.actions.map((act, i) => (
            <button
              key={i}
              onClick={() => alert(`Executed: ${act}`)}
              className="p-3.5 rounded-xl border border-[#E5EAF0] hover:border-[#2563EB] hover:bg-blue-50/50 text-left text-xs font-semibold text-[#0B1726] transition-all flex items-center justify-between group"
            >
              <span>{act}</span>
              <span className="text-[#2563EB] font-bold group-hover:translate-x-1 transition-transform">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
