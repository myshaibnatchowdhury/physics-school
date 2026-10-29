"use client";

import React, { useState } from "react";
import { CalendarCheck, Check, X, Clock, Download, Search, Users } from "lucide-react";
import { INITIAL_STUDENTS, EnrolledStudent } from "@/data/mockStudents";

export default function AttendanceView() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("Class 7 (A)");
  const [attendance, setAttendance] = useState<{ [id: string]: "present" | "absent" | "late" }>({
    "stu-1": "present",
    "stu-2": "present",
    "stu-3": "late",
    "stu-4": "present",
    "stu-5": "absent",
    "stu-6": "present",
  });

  const toggleStatus = (id: string, status: "present" | "absent" | "late") => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const presentCount = Object.values(attendance).filter((s) => s === "present").length;
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length;
  const lateCount = Object.values(attendance).filter((s) => s === "late").length;
  const total = INITIAL_STUDENTS.length;
  const rate = Math.round(((presentCount + lateCount) / total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
            Daily Attendance Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Track student classroom attendance, mark present/absent & generate reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#E5EAF0] bg-white text-[#0B1726] focus:ring-2 focus:ring-[#2563EB]"
          />
          <button
            onClick={() => alert("Attendance submitted successfully!")}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
          >
            Save Attendance
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Present (উপস্থিত)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{presentCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Absent (অনুপস্থিত)</p>
          <p className="text-2xl font-black text-rose-600 mt-1">{absentCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Late (বিলম্বিত)</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{lateCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
          <p className="text-2xl font-black text-[#2563EB] mt-1">{rate}%</p>
        </div>
      </div>

      {/* Attendance Sheet Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">ROLL</th>
                <th className="py-3 px-4">ADMISSION NO</th>
                <th className="py-3 px-4">STUDENT NAME</th>
                <th className="py-3 px-4">CLASS</th>
                <th className="py-3 px-4 text-center">ATTENDANCE STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {INITIAL_STUDENTS.map((student) => {
                const currentStatus = attendance[student.id] || "present";
                return (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-black text-[#0B1726]">{student.roll}</td>
                    <td className="py-4 px-4 font-mono text-slate-500">{student.admissionNo}</td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#0B1726]">{student.nameEn}</p>
                      <p className="text-[11px] text-slate-400">{student.nameBn}</p>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#2563EB]">{student.classSection}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleStatus(student.id, "present")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentStatus === "present"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Present</span>
                        </button>

                        <button
                          onClick={() => toggleStatus(student.id, "late")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentStatus === "late"
                              ? "bg-amber-600 text-white shadow-xs"
                              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Late</span>
                        </button>

                        <button
                          onClick={() => toggleStatus(student.id, "absent")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentStatus === "absent"
                              ? "bg-rose-600 text-white shadow-xs"
                              : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Absent</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
