"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, ChevronRight } from "lucide-react";
import { COURSES, Course } from "@/data/courses";

interface FeaturedCoursesProps {
  onSelectCourse: (course: Course) => void;
}

export default function FeaturedCourses({ onSelectCourse }: FeaturedCoursesProps) {
  const [filter, setFilter] = useState<"All" | "Beginner" | "Intermediate">("All");

  const displayedCourses = filter === "All"
    ? COURSES
    : COURSES.filter((c) => c.level === filter);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-[#FFAA24]/15 text-[#B45309] mb-2">
              Curriculum Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
              Our Courses
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-2xl">
              From foundational concepts to advanced topics, explore physics through structured learning.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center p-1 bg-white border border-[#E5EAF0] rounded-xl text-xs font-semibold">
              {(["All", "Beginner", "Intermediate"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    filter === lvl
                      ? "bg-[#0B1726] text-white"
                      : "text-[#64748B] hover:text-[#0B1726]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setFilter("All");
                onSelectCourse(COURSES[0]);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#FFAA24] hover:text-[#B45309] transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Column Responsive Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {displayedCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5EAF0] shadow-sm hover:shadow-xl hover:border-[#FFAA24]/60 transition-all duration-300 group"
            >
              {/* Course Thumbnail Image */}
              <div className="relative aspect-[16/10] w-full bg-[#07111D] overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1726] group-hover:text-[#FFAA24] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  {/* Meta items */}
                  <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#FFAA24]" />
                      {course.lessons} Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0D8B83]" />
                      {course.duration}
                    </span>
                  </div>

                  {/* View Course Action Button */}
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#0B1726] bg-[#FAF8F3] hover:bg-[#FFAA24] hover:text-[#0B1726] border border-[#E5EAF0] hover:border-[#FFAA24] transition-all flex items-center justify-center gap-1.5 group-hover:shadow-sm"
                  >
                    <span>View Course</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => onSelectCourse(COURSES[0])}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FFAA24]"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
