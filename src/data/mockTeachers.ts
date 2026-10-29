export interface Teacher {
  id: string;
  teacherId: string;
  nameEn: string;
  nameBn: string;
  designation: string;
  subject: string;
  qualification: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "ON_LEAVE";
  joinDate: string;
  experience: string;
}

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "t-1",
    teacherId: "PHY-FAC-001",
    nameEn: "Dr. Alistair Vance",
    nameBn: "ড. অ্যালিস্টার ভ্যান্স",
    designation: "Senior Professor & Department Head",
    subject: "Classical & Theoretical Mechanics",
    qualification: "Ph.D. in Physics (Cambridge)",
    email: "a.vance@physicsschool.edu",
    phone: "01711234567",
    status: "ACTIVE",
    joinDate: "2020-03-01",
    experience: "14 Years",
  },
  {
    id: "t-2",
    teacherId: "PHY-FAC-002",
    nameEn: "Prof. Elena Rostova",
    nameBn: "প্রফেসর এলেনা রোস্তোভা",
    designation: "Associate Professor",
    subject: "Quantum Physics & Particle Dynamics",
    qualification: "Ph.D. in Quantum Electrodynamics",
    email: "e.rostova@physicsschool.edu",
    phone: "01811234568",
    status: "ACTIVE",
    joinDate: "2021-07-15",
    experience: "11 Years",
  },
  {
    id: "t-3",
    teacherId: "PHY-FAC-003",
    nameEn: "Engr. Tariq Mahmud",
    nameBn: "ইঞ্জি. তারিক মাহমুদ",
    designation: "Assistant Professor",
    subject: "Electromagnetism & Circuit Theory",
    qualification: "M.Sc. in Applied Physics & Electronics",
    email: "t.mahmud@physicsschool.edu",
    phone: "01911234569",
    status: "ACTIVE",
    joinDate: "2022-01-10",
    experience: "8 Years",
  },
  {
    id: "t-4",
    teacherId: "PHY-FAC-004",
    nameEn: "Dr. Sarah Chowdhury",
    nameBn: "ড. সারা চৌধুরী",
    designation: "Associate Professor",
    subject: "Thermodynamics & Statistical Physics",
    qualification: "Ph.D. in Thermal Physics (DU)",
    email: "s.chowdhury@physicsschool.edu",
    phone: "01611234570",
    status: "ACTIVE",
    joinDate: "2022-08-01",
    experience: "9 Years",
  },
  {
    id: "t-5",
    teacherId: "PHY-FAC-005",
    nameEn: "Prof. Arthur Pendelton",
    nameBn: "প্রফেসর আর্থার পেন্ডেলটন",
    designation: "Guest Lecturer",
    subject: "Wave Optics, Photonics & Laser",
    qualification: "M.Phil in Optical Engineering",
    email: "a.pendelton@physicsschool.edu",
    phone: "01511234571",
    status: "ACTIVE",
    joinDate: "2023-02-14",
    experience: "12 Years",
  },
  {
    id: "t-6",
    teacherId: "PHY-FAC-006",
    nameEn: "Dr. Farhana Yasmin",
    nameBn: "ড. ফারহানা ইয়াসমিন",
    designation: "Assistant Professor",
    subject: "Astrophysics & Cosmology",
    qualification: "Ph.D. in Astrophysics",
    email: "f.yasmin@physicsschool.edu",
    phone: "01722334455",
    status: "ACTIVE",
    joinDate: "2023-09-01",
    experience: "6 Years",
  },
  {
    id: "t-7",
    teacherId: "PHY-FAC-007",
    nameEn: "Tanvir Hassan",
    nameBn: "তানভীর হাসান",
    designation: "Senior Lab Instructor",
    subject: "Experimental Physics & Instruments",
    qualification: "B.Sc. (Honours) in Physics",
    email: "t.hassan@physicsschool.edu",
    phone: "01833445566",
    status: "ACTIVE",
    joinDate: "2024-01-15",
    experience: "5 Years",
  },
  {
    id: "t-8",
    teacherId: "PHY-FAC-008",
    nameEn: "Sadia Afrin",
    nameBn: "সাদিয়া আফরিন",
    designation: "Lecturer",
    subject: "Mathematical Methods in Physics",
    qualification: "M.Sc. in Applied Mathematics",
    email: "s.afrin@physicsschool.edu",
    phone: "01944556677",
    status: "ON_LEAVE",
    joinDate: "2024-06-01",
    experience: "4 Years",
  },
];
