// Staff Dashboard — shared config (nav, mock data, roles).
// Single source of truth used by StaffSidebar, StaffTopBar, and all staff pages.

export type StaffRole = "principal" | "vice_principal" | "bursar" | "teacher";

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  principal: "Principal",
  vice_principal: "Vice Principal",
  bursar: "Bursar",
  teacher: "Teacher",
};

export const STAFF_ROLE_COLORS: Record<StaffRole, string> = {
  principal: "bg-amber-100 text-amber-700 border-amber-200",
  vice_principal: "bg-purple-100 text-purple-700 border-purple-200",
  bursar: "bg-emerald-100 text-emerald-700 border-emerald-200",
  teacher: "bg-blue-100 text-blue-700 border-blue-200",
};

export interface StaffNavItem {
  name: string;
  href: string;
  icon: string;
  roles: StaffRole[]; // which roles can see this item
}

const ALL_ROLES: StaffRole[] = ["principal", "vice_principal", "bursar", "teacher"];

export const STAFF_NAV_ITEMS: StaffNavItem[] = [
  { name: "Overview",       href: "/staff-dashboard/overview",       icon: "🏠", roles: ALL_ROLES },
  { name: "Students",       href: "/staff-dashboard/students",       icon: "🎓", roles: ALL_ROLES },
  { name: "Results",        href: "/staff-dashboard/results",        icon: "📝", roles: ["teacher", "principal"] },
  { name: "Attendance",     href: "/staff-dashboard/attendance",     icon: "📋", roles: ["teacher", "vice_principal"] },
  { name: "Fees & Finance", href: "/staff-dashboard/fees",           icon: "💰", roles: ["bursar"] },
  { name: "Discipline",     href: "/staff-dashboard/discipline",     icon: "⚖️", roles: ["vice_principal"] },
  { name: "Timetable",      href: "/staff-dashboard/timetable",      icon: "📅", roles: ALL_ROLES },
  { name: "Announcements",  href: "/staff-dashboard/announcements",  icon: "📢", roles: ["principal", "vice_principal"] },
  { name: "Messages",       href: "/staff-dashboard/messages",       icon: "💬", roles: ALL_ROLES },
  { name: "My Profile",     href: "/staff-dashboard/profile",        icon: "👤", roles: ALL_ROLES },
];

// Helper: filter nav items by role
export function getNavForRole(role: StaffRole): StaffNavItem[] {
  return STAFF_NAV_ITEMS.filter((item) => item.roles.includes(role));
}

// Mock staff data — will be replaced by Supabase query later
export const MOCK_STAFF = {
  firstName: "Mrs. Adaeze",
  lastName: "Okonkwo",
  initials: "AO",
  staffId: "GGS/STF/2021/003",
  role: "teacher" as StaffRole,
  department: "Science",
  email: "adaeze.okonkwo@gloriousschools.edu.ng",
  phone: "+234 812 345 6789",
  assignedClasses: ["SS 1", "SS 2"],
  assignedSubjects: ["Physics", "Mathematics"],
  dateJoined: "September 1, 2021",
  session: "2026/2027",
  term: "2nd Term",
  status: "Active" as const,
};

export const STAFF_UNREAD_COUNT = 4;
