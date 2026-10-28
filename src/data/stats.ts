export interface StatItem {
  id: string;
  value: string;
  label: string;
  iconName: "graduation-cap" | "book-open" | "users" | "star";
  isDemoPlaceholder: boolean;
}

/**
 * Trust and Statistics Placeholders
 * Mark: Illustrative design placeholders only. Configurable before production launch.
 */
export const TRUST_STATS: StatItem[] = [
  {
    id: "students",
    value: "5,000+",
    label: "Active Students",
    iconName: "graduation-cap",
    isDemoPlaceholder: true,
  },
  {
    id: "courses",
    value: "50+",
    label: "Courses",
    iconName: "book-open",
    isDemoPlaceholder: true,
  },
  {
    id: "teachers",
    value: "100+",
    label: "Expert Teachers",
    iconName: "users",
    isDemoPlaceholder: true,
  },
  {
    id: "satisfaction",
    value: "98%",
    label: "Satisfaction Rate",
    iconName: "star",
    isDemoPlaceholder: true,
  },
];
