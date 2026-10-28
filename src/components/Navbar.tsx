"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}

export default function Navbar({
  onOpenSearch,
  onOpenLogin,
  onOpenSignUp,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["home", "courses", "features", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Courses", href: "#courses", id: "courses" },
    { label: "Features", href: "#features", id: "features" },
    { label: "About", href: "#why-choose", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07111D]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10 py-3"
          : "bg-[#07111D] border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo from Attachment 1 */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#FFAA24] rounded-lg p-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <Image
                src="/images/logo-mark.png"
                alt="Physics School Official Emblem"
                fill
                priority
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-black tracking-wider text-white leading-tight uppercase font-sans">
                Physics
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#FFAA24] uppercase leading-none">
                School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#FFAA24] font-semibold bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-0.5 bg-[#FFAA24] rounded-full mx-auto w-3/4 mt-0.5 animate-in fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search courses and topics"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenLogin}
              className="px-4 py-1.5 text-sm font-semibold text-white hover:text-[#FFAA24] rounded-lg border border-white/20 hover:border-[#FFAA24] transition-all focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
            >
              Login
            </button>

            {/* Sign Up Button (Primary golden-orange pill) */}
            <button
              onClick={onOpenSignUp}
              className="px-5 py-1.5 text-sm font-bold bg-[#FFAA24] text-[#0B1726] hover:bg-[#FFC247] rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07111D] focus:ring-[#FFAA24]"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu & Search Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search courses"
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07111D]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white rounded-lg border border-white/20 text-center hover:bg-white/5"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignUp();
              }}
              className="w-full py-2.5 text-sm font-bold bg-[#FFAA24] text-[#0B1726] rounded-lg text-center hover:bg-[#FFC247]"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
