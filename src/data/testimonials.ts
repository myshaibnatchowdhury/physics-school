export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  badge: string;
  isDemoPlaceholder: boolean;
}

/**
 * Student Testimonials Data (Section H)
 * Note: Clearly marked demo testimonials and fictional placeholder identities.
 * Configurable with verified student feedback before production launch.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rafid-islam",
    name: "Rafid Islam",
    role: "HSC Candidate",
    avatar: "/images/avatar-rafid.jpg",
    rating: 5,
    badge: "Mechanics & Electromagnetism",
    content: "Physics School made complex concepts so easy to understand. The teachers are amazing!",
    isDemoPlaceholder: true,
  },
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    role: "University Student",
    avatar: "/images/avatar-nusrat.jpg",
    rating: 5,
    badge: "Quantum & Modern Physics",
    content: "I love the flexible learning system. I can study at my own pace and still get great results.",
    isDemoPlaceholder: true,
  },
  {
    id: "tanvir-ahmed",
    name: "Tanvir Ahmed",
    role: "HSC Candidate",
    avatar: "/images/avatar-tanvir.jpg",
    rating: 5,
    badge: "Thermodynamics & Optics",
    content: "The practice questions and tests really helped me in my exams. Highly recommended!",
    isDemoPlaceholder: true,
  },
];
