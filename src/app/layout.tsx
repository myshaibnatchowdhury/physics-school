import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://physicsschool.edu"),
  title: "Physics School | Learn Physics",
  description:
    "Physics School is a modern learning platform designed to help students understand the universe, one concept at a time. Learn, practice, and grow with structured physics learning and expert guidance.",
  keywords: [
    "Physics School",
    "Learn Physics",
    "Classical Mechanics",
    "Quantum Mechanics",
    "Electromagnetism",
    "Thermodynamics",
    "Optics",
    "Online Physics Courses",
    "School Management System",
  ],
  authors: [{ name: "Physics School Academic Council" }],
  icons: {
    icon: "/images/logo-mark.png",
    apple: "/images/logo-mark.png",
  },
  openGraph: {
    title: "Physics School | Learn Physics",
    description:
      "Explore the universe, understand the laws of nature, and strengthen your scientific thinking with structured physics learning.",
    url: "https://physicsschool.edu",
    siteName: "Physics School",
    images: [
      {
        url: "/images/reference-design.jpg",
        width: 1200,
        height: 630,
        alt: "Physics School Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07111D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F3] text-[#101D32] flex flex-col font-sans selection:bg-[#FFAA24]/30 selection:text-[#0B1726]">
        {children}
      </body>
    </html>
  );
}
