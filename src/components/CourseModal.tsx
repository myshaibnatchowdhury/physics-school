"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Course } from "@/data/courses";
import { X, Clock, BookOpen, Star, CheckCircle, Award, Sparkles } from "lucide-react";

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export default function CourseModal({ course, onClose, onEnroll }: CourseModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (course) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07111D]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full bg-[#07111D] overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1726] via-transparent to-black/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Level badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FFAA24] text-[#0B1726]">
              {course.level}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 id="course-modal-title" className="text-2xl sm:text-3xl font-bold text-[#0B1726] tracking-tight">
              {course.title}
            </h2>
            <p className="mt-2 text-base text-[#64748B] leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF8F3] border border-[#E5EAF0]">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#FFAA24]" />
              <div>
                <p className="text-xs text-[#64748B]">Lessons</p>
                <p className="text-sm font-semibold text-[#0B1726]">{course.lessons} Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#0D8B83]" />
              <div>
                <p className="text-xs text-[#64748B]">Duration</p>
                <p className="text-sm font-semibold text-[#0B1726]">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 text-[#FFAA24] fill-[#FFAA24]" />
              <div>
                <p className="text-xs text-[#64748B]">Rating</p>
                <p className="text-sm font-semibold text-[#0B1726]">{course.rating} ({course.reviewsCount})</p>
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#E5EAF0] bg-white">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#FFAA24]">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-[#64748B]">Course Educator</p>
              <p className="text-sm font-bold text-[#0B1726]">{course.instructor.name}</p>
              <p className="text-xs text-[#0D8B83]">{course.instructor.role}</p>
            </div>
          </div>

          {/* Syllabus Outline */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1726] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFAA24]" />
              Curriculum & Topics Covered
            </h3>
            <ul className="space-y-2 text-sm text-[#475569]">
              {course.syllabus.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0D8B83] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Course State:</strong> Lesson plans and course materials will sync with the school management database upon deployment.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5EAF0]">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0B1726] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onEnroll(course)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#FFAA24] text-[#0B1726] hover:bg-[#FF9A00] transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FFAA24]"
            >
              Enroll Now (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
