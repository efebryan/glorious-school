// Shared navigation items and mock student data for the dashboard.
// Single source of truth — used by both Sidebar and TopBar.

export const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard/overview", icon: "🏠" },
  { name: "My Results", href: "/dashboard/results", icon: "📊" },
  { name: "Timetable", href: "/dashboard/timetable", icon: "📅" },
  { name: "Fees & Payments", href: "/dashboard/fees", icon: "💰" },
  { name: "Attendance", href: "/dashboard/attendance", icon: "📋" },
  { name: "Notifications", href: "/dashboard/notifications", icon: "🔔" },
  { name: "My Profile", href: "/dashboard/profile", icon: "👤" },
  { name: "Print Result", href: "/dashboard/print-result", icon: "🖨️" },
] as const;

// Mock student data — will be replaced by Supabase query in Phase 2
export const MOCK_STUDENT = {
  firstName: "John",
  lastName: "Doe",
  initials: "JD",
  admissionNo: "GGS/2024/0014",
  class: "SS 2",
  department: "Science",
  session: "2026/2027",
  term: "2nd Term",
  enrollmentDate: "September 12, 2024",
  status: "Active" as const,
  guardian: {
    name: "Mr. Richard Doe",
    relationship: "Father",
    phone: "+234 800 123 4567",
    email: "richard.doe@example.com",
  },
} as const;

export const UNREAD_COUNT = 1;
