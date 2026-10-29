"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Plus,
  Search,
  Download,
  Mail,
  Phone,
  Trash2,
  Edit2,
  CheckCircle2,
  BookOpen,
  X,
  UserCheck,
} from "lucide-react";
import { INITIAL_TEACHERS, Teacher } from "@/data/mockTeachers";

export default function TeachersView() {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Teacher Form State
  const [nameEn, setNameEn] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [designation, setDesignation] = useState("Assistant Professor");
  const [subject, setSubject] = useState("Classical Mechanics");
  const [qualification, setQualification] = useState("M.Sc. in Physics");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubject === "All" || t.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn) return;

    const newTeacher: Teacher = {
      id: "t-" + Date.now(),
      teacherId: `PHY-FAC-00${teachers.length + 1}`,
      nameEn,
      nameBn: nameBn || nameEn,
      designation,
      subject,
      qualification,
      email: email || `${nameEn.toLowerCase().replace(/\s+/g, ".")}@physicsschool.edu`,
      phone: phone || "01700000000",
      status: "ACTIVE",
      joinDate: new Date().toISOString().split("T")[0],
      experience: "3+ Years",
    };

    setTeachers([newTeacher, ...teachers]);
    setIsAddModalOpen(false);
    setNameEn("");
    setNameBn("");
    setEmail("");
    phone && setPhone("");
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm("Are you sure you want to remove this faculty record?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ["Teacher ID", "Name", "Designation", "Subject", "Qualification", "Email", "Phone", "Status"];
    const rows = teachers.map((t) => [
      t.teacherId,
      `"${t.nameEn}"`,
      `"${t.designation}"`,
      `"${t.subject}"`,
      `"${t.qualification}"`,
      t.email,
      t.phone,
      t.status,
    ]);

    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `faculty_roster_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
            Teachers & Faculty Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            {teachers.length} Faculty Members • {teachers.filter((t) => t.status === "ACTIVE").length} Active Teaching Staff • Physics Department
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E5EAF0] hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export Faculty Roster</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Teacher</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher by name, ID, or subject specialization..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <span className="text-slate-500 font-medium">Subject Domain:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="All">All Domains</option>
            <option value="Mechanics">Mechanics</option>
            <option value="Quantum">Quantum Physics</option>
            <option value="Electromagnetism">Electromagnetism</option>
            <option value="Thermodynamics">Thermodynamics</option>
            <option value="Optics">Optics & Waves</option>
            <option value="Astrophysics">Astrophysics</option>
            <option value="Lab">Experimental Lab</option>
          </select>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">FACULTY ID</th>
                <th className="py-3 px-4">NAME & DESIGNATION</th>
                <th className="py-3 px-4">SUBJECT SPECIALIZATION</th>
                <th className="py-3 px-4">QUALIFICATION</th>
                <th className="py-3 px-4">CONTACT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    কোনো শিক্ষক পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher, idx) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-mono text-[11px] font-bold text-[#0B1726]">
                      {teacher.teacherId}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {teacher.nameEn.replace("Dr. ", "").replace("Prof. ", "").replace("Engr. ", "").charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#0B1726]">{teacher.nameEn}</p>
                          <p className="text-[11px] text-slate-400">{teacher.nameBn}</p>
                          <span className="text-[10px] font-semibold text-[#0D8B83]">{teacher.designation}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {teacher.subject}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-600">
                      {teacher.qualification}
                    </td>
                    <td className="py-4 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{teacher.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {teacher.status === "ACTIVE" ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                          ON LEAVE
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => alert(`Teacher profile for ${teacher.nameEn}`)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                          title="View Profile"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="p-1.5 rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50"
                          title="Delete Faculty Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Teacher */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 text-[#101D32]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B1726]">নতুন শিক্ষক যুক্ত করুন (Add Faculty)</h3>
                <p className="text-xs text-[#64748B]">শিক্ষকের বিবরণ ও বিশেষায়িত বিষয় পূরণ করুন</p>
              </div>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    শিক্ষকের নাম (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Dr. Mahmud Hasan"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    শিক্ষকের নাম (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder="e.g. ড. মাহমুদ হাসান"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    পদবি (Designation)
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Professor & Department Head">Professor & Department Head</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Senior Lab Instructor">Senior Lab Instructor</option>
                    <option value="Guest Faculty">Guest Faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    বিষয় (Specialization)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Quantum Physics"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    শিক্ষাগত যোগ্যতা (Qualification)
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. Ph.D. in Physics"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                    মোবাইল নং (Phone)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01700000000"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                  প্রাতিষ্ঠানিক ইমেইল (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faculty@physicsschool.edu"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                >
                  শিক্ষক যুক্ত করুন (+ Add Faculty)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
