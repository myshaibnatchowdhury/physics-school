export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  iconName:
    | "online-admission"
    | "class-routine"
    | "attendance-tracking"
    | "exam-results"
    | "fee-management"
    | "notice-board"
    | "parent-portal"
    | "mobile-friendly";
  colorScheme: {
    bg: string;
    text: string;
    border: string;
  };
}

/**
 * Platform Features (Section F)
 * Note: These describe platform capabilities planned/available for the upcoming
 * school management system. Fictional backend connections are not fabricated.
 */
export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: "online-admission",
    title: "Online Admission",
    description: "Apply easily and start your journey with streamlined paperless digital enrollment.",
    iconName: "online-admission",
    colorScheme: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
  },
  {
    id: "class-routine",
    title: "Class Routine",
    description: "View your class schedule, live lecture timing, and plan ahead without confusion.",
    iconName: "class-routine",
    colorScheme: {
      bg: "bg-amber-500/10",
      text: "text-amber-600",
      border: "border-amber-200",
    },
  },
  {
    id: "attendance-tracking",
    title: "Attendance Tracking",
    description: "Stay consistent, track your lecture attendance and participation records in real time.",
    iconName: "attendance-tracking",
    colorScheme: {
      bg: "bg-teal-500/10",
      text: "text-teal-600",
      border: "border-teal-200",
    },
  },
  {
    id: "exam-results",
    title: "Exam & Results",
    description: "Take chapter tests, term exams, and access detailed question-by-question analytics online.",
    iconName: "exam-results",
    colorScheme: {
      bg: "bg-purple-500/10",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  },
  {
    id: "fee-management",
    title: "Fee Management",
    description: "Secure and easy payment system, automated monthly invoices, and receipt downloads.",
    iconName: "fee-management",
    colorScheme: {
      bg: "bg-green-500/10",
      text: "text-green-600",
      border: "border-green-200",
    },
  },
  {
    id: "notice-board",
    title: "Notice Board",
    description: "Get the latest updates, holiday circulars, and urgent announcements right to your feed.",
    iconName: "notice-board",
    colorScheme: {
      bg: "bg-orange-500/10",
      text: "text-orange-600",
      border: "border-orange-200",
    },
  },
  {
    id: "parent-portal",
    title: "Parent Portal",
    description: "Stay connected with your child's academic progress, exam results, and teacher feedback.",
    iconName: "parent-portal",
    colorScheme: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-700",
      border: "border-cyan-200",
    },
  },
  {
    id: "mobile-friendly",
    title: "Mobile Friendly",
    description: "Learn on the go, anytime, anywhere with an ultra-responsive interface designed for phones.",
    iconName: "mobile-friendly",
    colorScheme: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      border: "border-blue-200",
    },
  },
];
