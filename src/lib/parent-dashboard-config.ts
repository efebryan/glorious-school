// Shared navigation items and mock parent data for the dashboard.
// Single source of truth — used by both ParentSidebar and ParentTopBar.

export const PARENT_NAV_ITEMS = [
  { name: "Overview", href: "/parent-dashboard/overview", icon: "🏠" },
  { name: "My Wards", href: "/parent-dashboard/children", icon: "👨‍👩‍👧‍👦" },
  { name: "Fees & Payments", href: "/parent-dashboard/fees", icon: "💰" },
  { name: "Messages", href: "/parent-dashboard/messages", icon: "💬" },
  { name: "My Profile", href: "/parent-dashboard/profile", icon: "👤" },
] as const;

// Mock parent data — will be replaced by Supabase query in Phase 2
export const MOCK_PARENT = {
  firstName: "Richard",
  lastName: "Doe",
  initials: "RD",
  phone: "+234 800 123 4567",
  email: "richard.doe@example.com",
  status: "Active" as const,
  children: [
    {
      id: "C001",
      firstName: "John",
      lastName: "Doe",
      admissionNo: "GGS/2024/0014",
      class: "SS 2",
      department: "Science",
      attendance: 94,
      lastTermAvg: 85.4,
      position: "4th",
      outstandingFees: 150000, // in Naira
    },
    {
      id: "C002",
      firstName: "Jane",
      lastName: "Doe",
      admissionNo: "GGS/2025/0089",
      class: "JSS 1",
      department: "General",
      attendance: 98,
      lastTermAvg: 91.2,
      position: "1st",
      outstandingFees: 0,
    }
  ]
} as const;

export const PARENT_UNREAD_COUNT = 3;
