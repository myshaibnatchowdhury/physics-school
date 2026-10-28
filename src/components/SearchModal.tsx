"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";
import { COURSES, Course } from "@/data/courses";
import { PLATFORM_FEATURES } from "@/data/features";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export function SearchModal({ isOpen, onClose, onSelectCourse }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredCourses = query.trim() === ""
    ? COURSES
    : COURSES.filter((c) =>
        c.title.toLowerCase().includes(normalizedQuery) ||
        c.description.toLowerCase().includes(normalizedQuery) ||
        c.category.toLowerCase().includes(normalizedQuery) ||
        c.syllabus.some((s) => s.toLowerCase().includes(normalizedQuery))
      );

  const filteredFeatures = query.trim() === ""
    ? []
    : PLATFORM_FEATURES.filter((f) =>
        f.title.toLowerCase().includes(normalizedQuery) ||
        f.description.toLowerCase().includes(normalizedQuery)
      );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-[#07111D]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] overflow-hidden text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E5EAF0] bg-white">
          <Search className="w-5 h-5 text-[#FFAA24]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search physics courses, topics, or platform tools (e.g. quantum, mechanics, routine)..."
            className="flex-1 text-sm sm:text-base outline-none bg-transparent placeholder:text-[#64748B]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#64748B] hover:text-[#0B1726] px-1.5 py-0.5 rounded bg-slate-100"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full text-[#64748B] hover:text-[#0B1726] hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F3] border-b border-[#E5EAF0] overflow-x-auto text-xs text-[#64748B]">
          <span className="font-semibold text-[#0B1726] shrink-0">Popular:</span>
          {["Mechanics", "Quantum", "Electromagnetism", "Thermodynamics", "Optics", "Class Routine", "Admission"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#E5EAF0] hover:border-[#FFAA24] hover:text-[#FFAA24] transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Courses ({filteredCourses.length})
            </h3>
            {filteredCourses.length === 0 ? (
              <p className="text-xs text-[#64748B] py-3 text-center">No matching courses found for &quot;{query}&quot;</p>
            ) : (
              <div className="space-y-2">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onClose();
                      onSelectCourse(c);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#E5EAF0] hover:border-[#FFAA24] hover:bg-[#FAF8F3] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 relative rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={c.image}
                          alt={c.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1726] group-hover:text-[#FFAA24] transition-colors">
                          {c.title}
                        </h4>
                        <p className="text-xs text-[#64748B] line-clamp-1">{c.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] shrink-0">
                      <span className="hidden sm:inline">{c.lessons} Lessons</span>
                      <ArrowRight className="w-4 h-4 text-[#FFAA24] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {filteredFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                Platform Tools & Features ({filteredFeatures.length})
              </h3>
              <div className="space-y-2">
                {filteredFeatures.map((f) => (
                  <a
                    key={f.id}
                    href="#features"
                    onClick={onClose}
                    className="block p-3 rounded-xl border border-[#E5EAF0] hover:bg-[#FAF8F3] transition-colors"
                  >
                    <p className="text-sm font-bold text-[#0B1726]">{f.title}</p>
                    <p className="text-xs text-[#64748B]">{f.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
