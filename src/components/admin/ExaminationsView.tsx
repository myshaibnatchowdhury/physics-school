"use client";

import React, { useState } from "react";
import { FileCheck2, Award, Calendar, Plus, Download } from "lucide-react";
import { INITIAL_STUDENTS } from "@/data/mockStudents";

export default function ExaminationsView() {
  const [activeTab, setActiveTab] = useState<"exams" | "results">("exams");

  const exams = [
    { id: "EX-101", title: "Classical Mechanics Mid-Term Examination", date: "Nov 15, 2026", time: "10:00 AM - 1:00 PM", class: "Class 11 (HSC)", room: "Physics Hall A", totalMarks: 100 },
    { id: "EX-102", title: "Quantum Physics & Wave Mechanics Term Test", date: "Nov 18, 2026", time: "11:00 AM - 1:00 PM", class: "Class 12 (HSC)", room: "Room 304", totalMarks: 50 },
    { id: "EX-103", title: "Thermodynamics & Heat Transfer Assessment", date: "Nov 22, 2026", time: "10:00 AM - 12:00 PM", class: "Class 9", room: "Room 201", totalMarks: 50 },
  ];

  const results = [
    { student: "Tasnim Jahan", roll: "01", class: "Class 7 (A)", subject: "General Physics", score: "94 / 100", gpa: "5.00 (A+)", grade: "PASSED" },
    { student: "shariar sohel", roll: "01", class: "Class 11 (HSC)", subject: "Classical Mechanics", score: "88 / 100", gpa: "4.80 (A)", grade: "PASSED" },
    { student: "Tanvir Ahmed", roll: "01", class: "Class 6 (A)", subject: "Foundation Science", score: "96 / 100", gpa: "5.00 (A+)", grade: "PASSED" },
    { student: "Fatima Zahra", roll: "02", class: "Class 6 (A)", subject: "Foundation Science", score: "91 / 100", gpa: "5.00 (A+)", grade: "PASSED" },
    { student: "Ayman Sadiq", roll: "03", class: "Class 6 (B)", subject: "Foundation Science", score: "85 / 100", gpa: "4.50 (A)", grade: "PASSED" },
    { student: "Nusrat Jahan", roll: "01", class: "Class 9 (Science)", subject: "Optics & Light", score: "92 / 100", gpa: "5.00 (A+)", grade: "PASSED" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
            Examinations & Academic Results
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Schedule upcoming physics exams, manage grade sheets & publish official marksheets.
          </p>
        </div>

        <button
          onClick={() => alert("Schedule new exam routine dialog")}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>+ Schedule Exam</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5EAF0] text-xs font-bold">
        <button
          onClick={() => setActiveTab("exams")}
          className={`pb-3 flex items-center gap-2 relative ${
            activeTab === "exams" ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming Exams (আসন্ন পরীক্ষা)</span>
          {activeTab === "exams" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />}
        </button>

        <button
          onClick={() => setActiveTab("results")}
          className={`pb-3 flex items-center gap-2 relative ${
            activeTab === "results" ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Published Results & Marksheets (ফলাফল)</span>
          {activeTab === "results" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />}
        </button>
      </div>

      {activeTab === "exams" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exams.map((ex) => (
            <div key={ex.id} className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 font-bold">{ex.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#2563EB]">
                  {ex.class}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#0B1726]">{ex.title}</h3>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p>📅 <strong>Date:</strong> {ex.date}</p>
                <p>⏰ <strong>Time:</strong> {ex.time}</p>
                <p>📍 <strong>Hall:</strong> {ex.room}</p>
                <p>🎯 <strong>Total Marks:</strong> {ex.totalMarks}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">STUDENT NAME</th>
                  <th className="py-3 px-4">ROLL</th>
                  <th className="py-3 px-4">CLASS</th>
                  <th className="py-3 px-4">SUBJECT</th>
                  <th className="py-3 px-4">MARKS</th>
                  <th className="py-3 px-4">GPA / GRADE</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF0]">
                {results.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0B1726]">{r.student}</td>
                    <td className="py-4 px-4 font-black">{r.roll}</td>
                    <td className="py-4 px-4 font-semibold text-[#2563EB]">{r.class}</td>
                    <td className="py-4 px-4">{r.subject}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#0B1726]">{r.score}</td>
                    <td className="py-4 px-4 font-bold text-emerald-600">{r.gpa}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200">
                        {r.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
