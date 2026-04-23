# Staff Dashboard — Implementation Plan

## Overview

Build a complete **Staff Dashboard** for the Glorious Group of Schools Management System. Per the [school_prd.md](file:///c:/Users/ENN/Desktop/Glorious%20School/school_prd.md), the system defines the following management staff roles:

| PRD Role | Key Responsibilities (from PRD §3.3) |
|---|---|
| **Principal** | Approve final results, post announcements |
| **Vice Principal** | Manage attendance, handle discipline records |
| **Bursar** | Manage fees/payments, generate invoices, track financial records |
| **Teacher** *(implied)* | Input subject scores, manage class activities |

The Staff Dashboard will be a unified portal at `/staff-dashboard/*` that adapts its navigation and visible features based on the logged-in staff member's role. For this frontend phase, we'll build with **mock data** (same pattern as the Student and Parent dashboards) and role-based UI toggling.

---

## User Review Required

> [!IMPORTANT]
> **Role-Based vs. Separate Dashboards**: The plan proposes a **single Staff Dashboard** with role-based navigation visibility (e.g., Bursar sees Finance pages, Teachers see Results Entry). This avoids code duplication and mirrors real-world school admin tools. If you'd prefer separate dashboards per role, let me know.

> [!IMPORTANT]
> **Scope Confirmation**: This plan covers **frontend UI only** with mock data, matching the current Student/Parent dashboard approach. Backend (Supabase) integration is deferred to a later phase per PRD §6.

---

## Architecture & Patterns

### Mirroring Existing Dashboard Architecture

We'll follow the exact same architecture as the existing Student (`/dashboard`) and Parent (`/parent-dashboard`) portals:

```
src/
├── app/staff-dashboard/
│   ├── layout.tsx                    # Wraps in StaffDashboardShell
│   ├── page.tsx                      # Redirects to /overview
│   ├── overview/page.tsx             # Dashboard home
│   ├── students/page.tsx             # Student management
│   ├── results/page.tsx              # Results entry & approval
│   ├── attendance/page.tsx           # Attendance tracking
│   ├── fees/page.tsx                 # Fee management (Bursar)
│   ├── discipline/page.tsx           # Discipline records (VP)
│   ├── timetable/page.tsx            # Timetable management
│   ├── announcements/page.tsx        # Post announcements
│   ├── messages/page.tsx             # Staff messaging
│   └── profile/page.tsx              # Staff profile
│
├── components/staff-dashboard/
│   ├── StaffDashboardShell.tsx        # Layout shell (sidebar + topbar + content)
│   ├── StaffSidebar.tsx               # Desktop sidebar with role-based nav
│   ├── StaffTopBar.tsx                # Header with mobile drawer
│   └── StaffNotificationDropdown.tsx  # Notification bell dropdown
│
└── lib/
    └── staff-dashboard-config.ts      # Nav items, mock staff data, role config
```

### Design System

- **Same color palette**: `brand-green` (#1b9d4e) primary, `brand-yellow` (#f5b000) accent
- **Same sidebar style**: Dark `#0f2316` sidebar, collapsible with toggle button
- **Same card, table, and stat patterns** from the Student dashboard
- **Label**: Sidebar header will read "Staff" instead of "Student" or "Parent"
- **Tailwind v4** with the existing `@theme` tokens in `globals.css`

---

## Proposed Changes

### 1. Configuration Layer

#### [NEW] [staff-dashboard-config.ts](file:///c:/Users/ENN/Desktop/Glorious%20School/src/lib/staff-dashboard-config.ts)

Central config file containing:

- **`STAFF_ROLES`** enum: `"principal" | "vice_principal" | "bursar" | "teacher"`
- **`STAFF_NAV_ITEMS`** array — each item has `name`, `href`, `icon`, and `roles[]` (which roles can see it):

| Nav Item | Route | Visible To |
|---|---|---|
| Overview | `/staff-dashboard/overview` | All |
| Students | `/staff-dashboard/students` | All |
| Results | `/staff-dashboard/results` | Teacher, Principal |
| Attendance | `/staff-dashboard/attendance` | VP, Teacher |
| Fees & Finance | `/staff-dashboard/fees` | Bursar |
| Discipline | `/staff-dashboard/discipline` | VP |
| Timetable | `/staff-dashboard/timetable` | All |
| Announcements | `/staff-dashboard/announcements` | Principal, VP |
| Messages | `/staff-dashboard/messages` | All |
| My Profile | `/staff-dashboard/profile` | All |

- **`MOCK_STAFF`** object with profile data (name, role, staffId, department, etc.)
- **`STAFF_UNREAD_COUNT`** for notification badge

---

### 2. Shell Components

#### [NEW] [StaffDashboardShell.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/staff-dashboard/StaffDashboardShell.tsx)

Identical structure to [DashboardShell.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/dashboard/DashboardShell.tsx):
- Collapsible sidebar state
- Notice modal on load
- Footer with copyright

#### [NEW] [StaffSidebar.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/staff-dashboard/StaffSidebar.tsx)

Based on [Sidebar.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/dashboard/Sidebar.tsx):
- Logo section with "Staff" label
- Filters `STAFF_NAV_ITEMS` by `MOCK_STAFF.role` to show only relevant links
- Active state with brand-yellow indicator bar
- Collapsible mode with icon-only view
- Sign Out link

#### [NEW] [StaffTopBar.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/staff-dashboard/StaffTopBar.tsx)

Based on [TopBar.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/dashboard/TopBar.tsx):
- Mobile hamburger drawer with role-filtered nav
- Page title derived from path
- Notification bell + profile avatar
- Role badge beside staff name

#### [NEW] [StaffNotificationDropdown.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/staff-dashboard/StaffNotificationDropdown.tsx)

Based on [NotificationDropdown.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/dashboard/NotificationDropdown.tsx):
- Staff-relevant notifications (result submissions, fee alerts, disciplinary reports)

---

### 3. Pages

#### [NEW] `staff-dashboard/layout.tsx`
- Imports `StaffDashboardShell`, wraps children
- SEO metadata: "Staff Portal | Glorious Group of Schools"

#### [NEW] `staff-dashboard/page.tsx`
- Simple redirect to `/staff-dashboard/overview`

---

#### [NEW] `staff-dashboard/overview/page.tsx` — **Staff Home**

Welcome banner with staff name, role badge, and current session/term. Stats grid:

| Stat | Description |
|---|---|
| Total Students | Count of students in assigned classes |
| Pending Results | Results awaiting entry or approval |
| Attendance Today | Today's attendance percentage |
| Fee Collection | Total collected this term (Bursar) / Class average (Teacher) |

Below stats:
- **Recent Activity** feed (last 5 actions: result submissions, attendance marks, etc.)
- **Quick Actions** card grid (Enter Results, Take Attendance, View Timetable)
- **Upcoming Events** panel (same pattern as student overview)

---

#### [NEW] `staff-dashboard/students/page.tsx` — **Student Management** (PRD §4.3)

- Search bar with filters (class, department, status)
- Student table: Name, Admission No, Class, Department, Status, Actions
- Each row links to a student detail view (expandable or modal)
- "Add Student" button (form modal — UI only)
- Pagination controls

> Maps to PRD: *"Create and manage student profiles, assign admission numbers, assign classes, link students to parents"*

---

#### [NEW] `staff-dashboard/results/page.tsx` — **Results Entry & Approval** (PRD §4.6)

- **For Teachers**: Score entry form
  - Select Class → Select Subject → Enter scores per student (table with inline inputs)
  - Save as Draft / Submit for Review buttons
  - Status badges: Draft, Pending Approval, Approved

- **For Principal**: Approval queue
  - Table of submitted results awaiting approval
  - Bulk approve / reject actions
  - View detailed breakdown per subject

> Maps to PRD: *"Input subject scores, automatic grade calculation, approval workflow (Draft → Admin → Principal)"*

---

#### [NEW] `staff-dashboard/attendance/page.tsx` — **Attendance Tracking** (PRD §4.8)

- Date picker (defaults to today)
- Class selector dropdown
- Student list with Present/Absent/Late toggle buttons per row
- Summary bar: X Present, Y Absent, Z Late
- "Save Attendance" action
- Historical view: calendar heatmap showing attendance rates per day

> Maps to PRD: *"Daily tracking, parent visibility"*

---

#### [NEW] `staff-dashboard/fees/page.tsx` — **Fee Management** (PRD §4.7, Bursar role)

- **Revenue overview cards**: Total Expected, Total Collected, Outstanding Balance
- **Fee configuration table**: Fee type, amount, class level, status
- **Student payment tracking**: Searchable table (Student, Class, Amount Due, Amount Paid, Balance, Status)
- **Invoice generation**: Button to generate/print invoice (UI mockup)
- Payment receipt preview

> Maps to PRD: *"Fee configuration, invoice generation, payment tracking"*

---

#### [NEW] `staff-dashboard/discipline/page.tsx` — **Discipline Records** (VP role)

- **Active cases table**: Student, Class, Offence, Date, Severity (badge), Status
- **Add Record** button/modal (Student selector, offence description, severity dropdown, action taken)
- **Filter by**: Class, severity level, date range
- Case detail view with timeline of actions

> Maps to PRD §3.3: *VP "Handle discipline records"*

---

#### [NEW] `staff-dashboard/timetable/page.tsx` — **Timetable Management** (PRD §4.5)

- Weekly grid view (Mon–Fri, Period 1–8)
- Color-coded by subject
- Class/teacher filter selector
- "Edit Timetable" toggle (for admin staff) — drag or click cells to assign subjects
- Print/export button

> Maps to PRD: *"Timetable management"*

---

#### [NEW] `staff-dashboard/announcements/page.tsx` — **Announcements** (PRD §4.9, §4.10)

- **Announcement feed**: List of posted announcements with date, category badge, audience tag
- **Create announcement** form: Title, body (textarea), category dropdown, target audience (All/Students/Parents/Staff)
- **Published vs Draft** tabs
- Edit/delete actions on own announcements

> Maps to PRD: *"Post announcements, create and publish events"*

---

#### [NEW] `staff-dashboard/messages/page.tsx` — **Messaging** (PRD §4.9)

- **Inbox/Sent** tabs
- Message list with sender, subject, preview, time, read/unread status
- Compose message: To (searchable dropdown of parents, staff), Subject, Body
- Message detail view (conversation thread)

> Maps to PRD: *"Messaging, complaints"*

---

#### [NEW] `staff-dashboard/profile/page.tsx` — **Staff Profile**

- Profile card: Avatar/initials, full name, role badge, staff ID, department
- Personal info section: Email, phone, address (read-only with edit button)
- Employment details: Date joined, assigned classes/subjects
- Change password form (UI mock)

---

### 4. Login Page Update

#### [MODIFY] [page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/login/page.tsx)

Add a "Staff Login" link at the bottom of the login form, similar to the existing "Result Checker Portal" link, pointing to `/staff-dashboard/overview`. This gives staff a discoverable entry point.

---

## File Summary

| Category | Files | Count |
|---|---|---|
| Config | `staff-dashboard-config.ts` | 1 |
| Shell Components | `StaffDashboardShell.tsx`, `StaffSidebar.tsx`, `StaffTopBar.tsx`, `StaffNotificationDropdown.tsx` | 4 |
| Pages | `layout.tsx`, `page.tsx`, + 10 page directories | 12 |
| Modified | `login/page.tsx` | 1 |
| **Total** | | **18 files** |

---

## Open Questions

> [!IMPORTANT]
> **Default Role for Mock Data**: Which role should the mock staff user default to? I suggest **Teacher** as it has the broadest set of visible pages, but we could also default to **Principal** to showcase the approval workflow. What do you prefer?

> [!NOTE]
> **Role Switcher**: Would you like a temporary **role switcher** dropdown in the sidebar/topbar during development? This would let you preview how the dashboard looks for each role (Principal, VP, Bursar, Teacher) without rebuilding.

---

## Verification Plan

### Automated Tests
- `npm run build` — Ensure all pages compile without errors
- Visual inspection of all 10 pages via the dev server

### Manual Verification
- Navigate to each page and verify:
  - Responsive layout (mobile drawer, desktop sidebar)
  - Sidebar role filtering works correctly
  - All stat cards, tables, and forms render properly
  - Consistent branding with Student/Parent dashboards
- Browser recording of the full staff dashboard walkthrough
