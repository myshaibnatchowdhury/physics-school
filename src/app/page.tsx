"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import FeaturedCourses from "@/components/FeaturedCourses";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlatformFeatures from "@/components/PlatformFeatures";
import DashboardPreview from "@/components/DashboardPreview";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import CourseModal from "@/components/CourseModal";
import { LoginModal, SignUpModal } from "@/components/AuthModals";
import { SearchModal } from "@/components/SearchModal";
import { Course } from "@/data/courses";

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCourseForSignUp, setSelectedCourseForSignUp] = useState<string | undefined>(undefined);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleEnrollFromCourse = (course: Course) => {
    setSelectedCourse(null);
    setSelectedCourseForSignUp(course.id);
    setSignUpOpen(true);
  };

  const handleStartLearning = () => {
    setSelectedCourseForSignUp(undefined);
    setSignUpOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION A: Header & Navigation */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onOpenSignUp={() => setSignUpOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION B: Hero Section */}
        <Hero onStartLearning={handleStartLearning} />

        {/* SECTION C: Trust & Statistics */}
        <TrustStats />

        {/* SECTION D: Featured Courses */}
        <FeaturedCourses onSelectCourse={handleOpenCourse} />

        {/* SECTION E: Why Choose Physics School? */}
        <WhyChooseUs onStartLearning={handleStartLearning} />

        {/* SECTION F: Platform Features */}
        <PlatformFeatures />

        {/* SECTION G: Student Dashboard Preview */}
        <DashboardPreview />

        {/* SECTION H: Student Testimonials */}
        <Testimonials />

        {/* SECTION I: Final Call to Action */}
        <FinalCta onGetStarted={handleStartLearning} />
      </main>

      {/* SECTION J: Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={handleEnrollFromCourse}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignUp={() => setSignUpOpen(true)}
      />

      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToLogin={() => setLoginOpen(true)}
        defaultCourseId={selectedCourseForSignUp}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCourse={handleOpenCourse}
      />
    </div>
  );
}
