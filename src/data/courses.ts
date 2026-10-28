export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  category: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  syllabus: string[];
}

/**
 * Featured Physics Courses Data
 * Note: Lesson counts, ratings, and syllabus details are configurable demonstration content.
 */
export const COURSES: Course[] = [
  {
    id: "classical-mechanics",
    title: "Classical Mechanics",
    description: "Understand the motion of objects and the fundamental laws of nature.",
    lessons: 12,
    level: "Beginner",
    image: "/images/course-mechanics-hd.jpg",
    category: "Foundations",
    duration: "6 Weeks",
    rating: 4.9,
    reviewsCount: 342,
    instructor: {
      name: "Dr. Alistair Vance",
      role: "Senior Lecturer in Mechanics",
      avatar: "/images/avatar-rafid.jpg",
    },
    syllabus: [
      "Newtonian Kinematics & Vectors",
      "Dynamics, Force, and Newton's Three Laws",
      "Conservation of Momentum & Collisions",
      "Work, Energy, and Power Theorems",
      "Rotational Kinematics & Angular Momentum",
      "Gravitation & Planetary Orbits",
    ],
  },
  {
    id: "quantum-mechanics",
    title: "Quantum Mechanics",
    description: "Explore the fascinating world of particles, wave duality, and probability.",
    lessons: 15,
    level: "Intermediate",
    image: "/images/course-quantum-hd.jpg",
    category: "Modern Physics",
    duration: "8 Weeks",
    rating: 5.0,
    reviewsCount: 428,
    instructor: {
      name: "Prof. Elena Rostova",
      role: "Quantum Physics Researcher",
      avatar: "/images/avatar-nusrat.jpg",
    },
    syllabus: [
      "The Ultraviolet Catastrophe & Photoelectric Effect",
      "De Broglie Wave-Particle Hypothesis",
      "The Uncertainty Principle & Wavepackets",
      "Schrödinger Equation in 1D Potentials",
      "Hydrogen Atom Quantum Numbers",
      "Quantum Superposition & Entanglement",
    ],
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    description: "Learn about electric and magnetic fields, induction, and their modern applications.",
    lessons: 14,
    level: "Intermediate",
    image: "/images/course-electromagnetism-hd.jpg",
    category: "Electrodynamics",
    duration: "7 Weeks",
    rating: 4.8,
    reviewsCount: 295,
    instructor: {
      name: "Engr. Tariq Mahmud",
      role: "Electromagnetic Systems Specialist",
      avatar: "/images/avatar-tanvir.jpg",
    },
    syllabus: [
      "Coulomb's Law & Electric Fields",
      "Gauss's Law & Electrostatic Potential",
      "Capacitance, Dielectrics & Current Circuits",
      "Magnetic Forces & Ampere's Law",
      "Faraday's Law of Induction & Lenz's Rule",
      "Maxwell's Equations & EM Wave Propagation",
    ],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    description: "Discover heat, thermal energy, entropy, and the universal laws of thermodynamics.",
    lessons: 10,
    level: "Beginner",
    image: "/images/course-thermodynamics-hd.jpg",
    category: "Thermal Physics",
    duration: "5 Weeks",
    rating: 4.9,
    reviewsCount: 210,
    instructor: {
      name: "Dr. Sarah Chowdhury",
      role: "Associate Professor of Physics",
      avatar: "/images/avatar-nusrat.jpg",
    },
    syllabus: [
      "Temperature, Thermal Expansion & Ideal Gases",
      "First Law of Thermodynamics & Internal Energy",
      "Heat Capacities & Thermodynamic Processes",
      "Second Law: Heat Engines & Carnot Cycle",
      "Entropy, Reversibility & Statistical Nature",
      "Phase Transitions & Real Gas Behavior",
    ],
  },
  {
    id: "optics",
    title: "Optics",
    description: "Explore the behavior of light, ray tracing, wave interference, and its applications.",
    lessons: 11,
    level: "Intermediate",
    image: "/images/course-optics-hd.jpg",
    category: "Wave Physics",
    duration: "6 Weeks",
    rating: 4.8,
    reviewsCount: 185,
    instructor: {
      name: "Prof. Arthur Pendelton",
      role: "Applied Optics Lead",
      avatar: "/images/avatar-rafid.jpg",
    },
    syllabus: [
      "Geometric Optics: Reflection & Spherical Mirrors",
      "Snell's Law, Total Internal Reflection & Prisms",
      "Thin Lens Formula & Optical Instruments",
      "Wave Theory: Huygens' Principle & Coherence",
      "Double Slit Interference & Diffraction Gratings",
      "Polarization, Birefringence & Modern Lasers",
    ],
  },
];
