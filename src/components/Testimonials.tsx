"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section aria-label="Student Testimonials" className="py-16 sm:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-[#FFAA24]/15 text-[#B45309] mb-3">
            Learner Feedback
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
            What Our Students Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B]">
            Real stories. Real progress.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5EAF0] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#FFAA24] fill-[#FFAA24]"
                    />
                  ))}
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-[#101D32] leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#FFAA24]/40 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1726]">
                    {t.name}
                  </h3>
                  <p className="text-xs text-[#64748B]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder disclaimer */}
        <div className="mt-8 text-center text-xs text-[#64748B]">
          <span>* Fictional demonstration student reviews shown. Replaceable with verified testimonials prior to public launch.</span>
        </div>
      </div>
    </section>
  );
}
