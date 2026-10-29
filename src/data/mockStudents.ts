export interface EnrolledStudent {
  id: string;
  roll: string;
  admissionNo: string;
  nameEn: string;
  nameBn: string;
  classSection: string;
  guardianName: string;
  guardianContact: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  joinedDate: string;
}

export const INITIAL_STUDENTS: EnrolledStudent[] = [
  {
    id: "stu-1",
    roll: "01",
    admissionNo: "ADM-2026-009",
    nameEn: "Tasnim Jahan",
    nameBn: "তাসনিম জাহান",
    classSection: "Class 7 (A)",
    guardianName: "Dr. Jahangir Alam",
    guardianContact: "01819876543",
    status: "ACTIVE",
    joinedDate: "2026-01-10",
  },
  {
    id: "stu-2",
    roll: "01",
    admissionNo: "ADM-2026-274",
    nameEn: "shariar sohel",
    nameBn: "সোহেল",
    classSection: "Class 11 (HSC) (A)",
    guardianName: "shariar sohel",
    guardianContact: "01675299177",
    status: "ACTIVE",
    joinedDate: "2026-01-15",
  },
  {
    id: "stu-3",
    roll: "01",
    admissionNo: "ADM-2026-001",
    nameEn: "Tanvir Ahmed",
    nameBn: "তানভীর আহমেদ",
    classSection: "Class 6 (A)",
    guardianName: "Mrs. Tahmina Akter",
    guardianContact: "01711223344",
    status: "ACTIVE",
    joinedDate: "2026-01-05",
  },
  {
    id: "stu-4",
    roll: "02",
    admissionNo: "ADM-2026-002",
    nameEn: "Fatima Zahra",
    nameBn: "ফাতিমা জাহরা",
    classSection: "Class 6 (A)",
    guardianName: "Dr. Mahmudul Hasan",
    guardianContact: "01811223344",
    status: "ACTIVE",
    joinedDate: "2026-01-08",
  },
  {
    id: "stu-5",
    roll: "03",
    admissionNo: "ADM-2026-003",
    nameEn: "Ayman Sadiq",
    nameBn: "আয়মান সাদিক",
    classSection: "Class 6 (B)",
    guardianName: "Sadiqur Rahman",
    guardianContact: "01911223344",
    status: "ACTIVE",
    joinedDate: "2026-01-12",
  },
  {
    id: "stu-6",
    roll: "01",
    admissionNo: "ADM-2026-004",
    nameEn: "Nusrat Jahan",
    nameBn: "নুসরাত জাহান",
    classSection: "Class 9 (Science-A)",
    guardianName: "M. A. Jalil",
    guardianContact: "01611223344",
    status: "ACTIVE",
    joinedDate: "2026-01-20",
  },
];
