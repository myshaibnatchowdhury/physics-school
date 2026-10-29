"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Download,
  FileSpreadsheet,
  Search,
  Filter,
  CreditCard,
  Trash2,
  CheckCircle2,
  Plus,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ChangePasswordModal from "@/components/admin/ChangePasswordModal";
import AddStudentModal from "@/components/admin/AddStudentModal";
import StudentIdCardModal from "@/components/admin/StudentIdCardModal";
import OnlineAdmissionsTab from "@/components/admin/OnlineAdmissionsTab";
import { INITIAL_STUDENTS, EnrolledStudent } from "@/data/mockStudents";
import { checkAdminSession, logoutAdmin } from "@/lib/adminAuth";

export default function StudentsDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [currentSidebarTab, setCurrentSidebarTab] = useState("students");
  const [activeSubTab, setActiveSubTab] = useState<"enrolled" | "online">("enrolled");

  // Students Data State
  const [students, setStudents] = useState<EnrolledStudent[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  // Modals State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedStudentForId, setSelectedStudentForId] = useState<EnrolledStudent | null>(null);

  useEffect(() => {
    // Check if admin is authenticated
    if (!checkAdminSession()) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  const handleAddStudent = (newStudent: EnrolledStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Are you sure you want to remove this student record?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ["Roll", "Admission No", "Student Name En", "Student Name Bn", "Class & Section", "Guardian Name", "Guardian Contact", "Status"];
    const rows = students.map((s) => [
      s.roll,
      s.admissionNo,
      `"${s.nameEn}"`,
      `"${s.nameBn}"`,
      `"${s.classSection}"`,
      `"${s.guardianName}"`,
      s.guardianContact,
      s.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `physics_school_students_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">Verifying Admin Access...</p>
      </div>
    );
  }

  // Filter students based on search and class dropdown
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.includes(searchQuery);

    const matchesClass =
      selectedClass === "All Classes" || s.classSection.toLowerCase().includes(selectedClass.toLowerCase());

    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-[#101D32]">
      {/* Sidebar (Matching screenshot layout) */}
      <AdminSidebar
        currentTab={currentSidebarTab}
        onSelectTab={(tab) => setCurrentSidebarTab(tab)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <AdminHeader
          adminName="Mysha Ibnat Chowdhury"
          onOpenChangePassword={() => setIsPasswordModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Dashboard Main View */}
        <main className="p-6 sm:p-8 space-y-6">
          {/* Page Title & Top Actions Bar (Matching screenshot) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
                Students & Admissions
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {students.length} Registered Students • 3 Pending Online Admissions • Session 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => alert("CSV import tool: Select a valid CSV file containing student roster.")}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E5EAF0] hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Import Excel / CSV</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E5EAF0] hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Student</span>
              </button>
            </div>
          </div>

          {/* Sub-Tabs (Enrolled Students vs Online Admissions) */}
          <div className="flex items-center gap-6 border-b border-[#E5EAF0] text-xs font-bold">
            <button
              onClick={() => setActiveSubTab("enrolled")}
              className={`pb-3 flex items-center gap-2 transition-all relative ${
                activeSubTab === "enrolled"
                  ? "text-[#2563EB]"
                  : "text-[#64748B] hover:text-[#0B1726]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Enrolled Students (তালিকাভুক্ত শিক্ষার্থী)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-[#2563EB]">
                {students.length}
              </span>
              {activeSubTab === "enrolled" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab("online")}
              className={`pb-3 flex items-center gap-2 transition-all relative ${
                activeSubTab === "online"
                  ? "text-[#2563EB]"
                  : "text-[#64748B] hover:text-[#0B1726]"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Online Admission Applications (ভর্তি আবেদন)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800">
                3
              </span>
              {activeSubTab === "online" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
              )}
            </button>
          </div>

          {/* Active Tab Content */}
          {activeSubTab === "enrolled" ? (
            <div className="space-y-4">
              {/* Search & Filter Bar (Matching screenshot) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, roll, admission no..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                  <span className="text-slate-500 font-medium">Class:</span>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="All Classes">All Classes</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 11 (HSC)">Class 11 (HSC)</option>
                    <option value="Class 12 (HSC)">Class 12 (HSC)</option>
                  </select>
                </div>
              </div>

              {/* Students Data Table (Matching screenshot pixel-for-pixel) */}
              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">ROLL</th>
                        <th className="py-3 px-4">ADMISSION NO</th>
                        <th className="py-3 px-4">STUDENT NAME</th>
                        <th className="py-3 px-4">CLASS & SECTION</th>
                        <th className="py-3 px-4">GUARDIAN CONTACT</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EAF0]">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            কোনো শিক্ষার্থী পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50/60 transition-colors group">
                            <td className="py-4 px-4 font-black text-[#0B1726]">
                              {student.roll}
                            </td>
                            <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                              {student.admissionNo}
                            </td>
                            <td className="py-4 px-4">
                              <p className="font-bold text-[#0B1726]">{student.nameEn}</p>
                              <p className="text-[11px] text-slate-400 font-sans">{student.nameBn}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-semibold text-[#2563EB]">
                                {student.classSection}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <p className="font-medium text-[#0B1726]">{student.guardianName}</p>
                              <p className="text-[11px] text-slate-400">{student.guardianContact}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                                {student.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedStudentForId(student)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="View & Print ID Card"
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(student.id)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors"
                                  title="Remove Student"
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
            </div>
          ) : (
            <OnlineAdmissionsTab onApproveToEnrolled={handleAddStudent} />
          )}
        </main>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />

      <StudentIdCardModal
        student={selectedStudentForId}
        onClose={() => setSelectedStudentForId(null)}
      />
    </div>
  );
}
