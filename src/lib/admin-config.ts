// Admin Dashboard — config (nav, mock data, roles).
// Single source of truth used by AdminSidebar, AdminTopBar, and all admin pages.

export type AdminRole = "super_admin" | "admin";

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
};

export const ADMIN_ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: "bg-gradient-to-r from-red-500 to-amber-500 text-white",
  admin: "bg-blue-500 text-white",
};

export interface AdminNavItem {
  name: string;
  href: string;
  icon: string;
  roles: AdminRole[];
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

const ALL: AdminRole[] = ["super_admin", "admin"];

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { name: "Overview", href: "/admin/overview", icon: "📊", roles: ALL },
    ],
  },
  {
    label: "People",
    items: [
      { name: "All Users", href: "/admin/users", icon: "👥", roles: ALL },
      { name: "Roles & Permissions", href: "/admin/users/roles", icon: "🔐", roles: ["super_admin"] },
    ],
  },
  {
    label: "Academics",
    items: [
      { name: "Classes & Subjects", href: "/admin/academics", icon: "🎓", roles: ALL },
      { name: "Calendar & Sessions", href: "/admin/academics/calendar", icon: "📅", roles: ALL },
      { name: "Results Oversight", href: "/admin/results", icon: "📝", roles: ALL },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Finance Overview", href: "/admin/finance", icon: "💰", roles: ALL },
    ],
  },
  {
    label: "Website",
    items: [
      { name: "Page Content", href: "/admin/cms", icon: "🌐", roles: ALL },
      { name: "Events Manager", href: "/admin/cms/events", icon: "📰", roles: ALL },
    ],
  },
  {
    label: "Communication",
    items: [
      { name: "Announcements", href: "/admin/communications", icon: "📢", roles: ALL },
      { name: "Inbox & Queries", href: "/admin/communications/inbox", icon: "💬", roles: ALL },
    ],
  },
  {
    label: "Insights",
    items: [
      { name: "Reports", href: "/admin/reports", icon: "📈", roles: ALL },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: "⚙️", roles: ["super_admin"] },
    ],
  },
];

// Filter nav groups by role
export function getNavGroupsForRole(role: AdminRole): AdminNavGroup[] {
  return ADMIN_NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}

// Flatten all items for mobile/search
export function getAllNavItems(role: AdminRole): AdminNavItem[] {
  return getNavGroupsForRole(role).flatMap((g) => g.items);
}

// Mock admin data
export const MOCK_ADMIN = {
  firstName: "Dr. O.",
  lastName: "Emmanuel",
  initials: "OE",
  email: "admin@gloriousschools.edu.ng",
  phone: "+234 800 123 4567",
  role: "super_admin" as AdminRole,
  lastLogin: "Today, 8:15 AM",
};

export const MOCK_AUDIT_LOG = [
  { id: 1, actor: "Mrs. Okonkwo", action: "Submitted SS1 Physics results", time: "2 hours ago", type: "results" },
  { id: 2, actor: "Bursar", action: "Updated SS2 fee structure", time: "5 hours ago", type: "finance" },
  { id: 3, actor: "Admin", action: "Published Inter-House Sports event", time: "Yesterday", type: "cms" },
  { id: 4, actor: "Principal", action: "Approved JSS3 English results", time: "Yesterday", type: "results" },
  { id: 5, actor: "System", action: "Weekly database backup completed", time: "2 days ago", type: "system" },
  { id: 6, actor: "Mr. James", action: "Enrolled new student: Grace Akpan", time: "2 days ago", type: "users" },
  { id: 7, actor: "VP", action: "Recorded discipline case: Ahmed Musa", time: "3 days ago", type: "discipline" },
  { id: 8, actor: "Mrs. Ngozi", action: "Submitted SS2 English results", time: "3 days ago", type: "results" },
];

export const MOCK_SYSTEM_STATS = {
  totalStudents: 1042,
  totalStaff: 28,
  totalParents: 412,
  totalAdmins: 3,
  pendingResults: 5,
  feeCollectionRate: 77,
  contactQueries: 8,
  activeSession: "2025/2026",
  activeTerm: "2nd Term",
};

export const ADMIN_UNREAD_COUNT = 8;
