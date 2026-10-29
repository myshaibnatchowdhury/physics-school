"use client";

import React, { useState } from "react";
import { Bell, Plus, Calendar, Tag, Trash2, X } from "lucide-react";

export default function NoticesView() {
  const [notices, setNotices] = useState([
    {
      id: "n-1",
      title: "Final Term Physics Practical Examination Schedule 2026",
      category: "Examination",
      date: "October 28, 2026",
      author: "Mysha Ibnat Chowdhury (Admin)",
      content: "All students of Class 11 & 12 are requested to report to the Advanced Physics Laboratory by 9:00 AM with laboratory notebooks and apparatus records.",
    },
    {
      id: "n-2",
      title: "Class Routine Update for Winter Semester",
      category: "Academic",
      date: "October 25, 2026",
      author: "Academic Council",
      content: "Quantum Mechanics & Electrodynamics masterclass timing has been shifted from 10:30 AM to 11:15 AM starting next Sunday.",
    },
    {
      id: "n-3",
      title: "National Physics Olympiad Workshop Registration Open",
      category: "Co-Curricular",
      date: "October 20, 2026",
      author: "Prof. Arthur Pendelton",
      content: "Students preparing for the National Physics Olympiad can register for special problem-solving bootcamp sessions starting next week.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Academic");
  const [newContent, setNewContent] = useState("");

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    setNotices([
      {
        id: "n-" + Date.now(),
        title: newTitle,
        category: newCategory,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        author: "Mysha Ibnat Chowdhury (Admin)",
        content: newContent || "Notice details published for students and guardians.",
      },
      ...notices,
    ]);

    setIsModalOpen(false);
    setNewTitle("");
    setNewContent("");
  };

  const handleDelete = (id: string) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B1726] tracking-tight">
            Notices & Circulars
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Broadcast official academic notices, circulars and holiday updates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>+ Post New Notice</span>
        </button>
      </div>

      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.id} className="p-5 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {n.date}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B1726]">{n.title}</h3>
              </div>
              <button
                onClick={() => handleDelete(n.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
              Published by: {n.author}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 text-[#101D32]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#0B1726] mb-4">নতুন নোটিশ প্রকাশ করুন (Post Notice)</h3>

            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">নোটিশের শিরোনাম (Title) *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Physics Lab Schedule for Next Term"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">ক্যাটাগরি</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0]"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Co-Curricular">Co-Curricular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">বিস্তারিত বিবরণ (Description)</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="নোটিশের বিস্তারিত বার্তা এখানে লিখুন..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#E5EAF0] focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl"
                >
                  প্রকাশ করুন (Publish)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
