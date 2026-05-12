# Super Admin Dashboard — Refined Implementation Plan

## Problem & Context

The Glorious Group of Schools management system currently has **four operating portals**:

| Portal | Route | Purpose | Pages |
|---|---|---|---|
| Public Website | `/`, `/about`, `/admissions`, etc. | Marketing, info, event listing | 11 routes |
| Student Dashboard | `/dashboard/*` | View results, timetable, fees, attendance | 8 pages |
| Parent Dashboard | `/parent-dashboard/*` | View wards, fees, messages | 3 pages |
| Staff Dashboard | `/staff-dashboard/*` | Results entry, attendance, discipline, fees | 10 pages |

**What's missing:** A Super Admin/Admin portal that can control *all of the above* from a single command center. Per PRD §3.1–3.2:

- **Super Admin** — Full system control, manage admins/roles, override permissions, system settings
- **Admin** — Manage students/staff, manage classes/subjects, approve results, manage website content (CMS)

Currently, all content (events, school info, stats, fees, etc.) is **hardcoded** in the frontend. The Super Admin dashboard must mock the interface that will eventually control this data.

---

## User Review Required

> [!IMPORTANT]
> **Admin Hierarchy:** I propose a unified `/admin/*` route with two roles: `super_admin` (sees everything) and `admin` (restricted from System Settings and Admin user management). A role switcher will be included for development previewing, same pattern as the Staff Dashboard. Does this approach work?

> [!IMPORTANT]
> **Visual Identity:** To immediately distinguish the Admin portal from all others, I recommend a **dark slate (`#0f172a`) sidebar** with an **indigo/violet accent** instead of the standard green. This signals "elevated privilege" at a glance while keeping the same layout architecture. Alternatively I can keep the green but use a distinctive header badge. Which do you prefer?

> [!IMPORTANT]
> **Page Count:** This plan proposes **14 pages** across 7 management areas. This is significantly larger than the Staff Dashboard (10 pages). I've designed it to be comprehensive enough to truly "control the entire website." If you want to reduce scope, let me know which sections to defer.

---

## Complete Project Inventory (What the Admin Controls)

Before defining pages, here's everything in the system that the Super Admin needs oversight or control over:

### A. Public Website Content (currently hardcoded)
| Content | Source File | What Admin Would Edit |
|---|---|---|
| Homepage hero text, CTA, stats banner | [page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/page.tsx) | Headline, description, stats (1000+ students, 25+ teachers, etc.) |
| About page history, mission/vision, leadership | [about/page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/about/page.tsx) | School history text, mission/vision, leadership bios |
| Admissions process steps, requirements | [admissions/page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/admissions/page.tsx) | Application steps, deadline, fee amounts |
| Events list (6 hardcoded events) | [events/page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/events/page.tsx) | Create/edit/delete events, dates, venues |
| Contact info (address, phone, email, hours) | [contact/page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/contact/page.tsx) | School address, phone numbers, email |
| Navbar links | [Navbar.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/layout/Navbar.tsx) | Navigation items |
| Footer links, contact, socials | [Footer.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/layout/Footer.tsx) | Footer content, social media URLs |
| Academic sections (nursery/primary/secondary) | `/academics/*` (5 pages) | Curriculum details, calendar |

### B. User Accounts (currently mock data)
| Data | Source | Count |
|---|---|---|
| Student profiles | [dashboard-config.ts](file:///c:/Users/ENN/Desktop/Glorious%20School/src/lib/dashboard-config.ts) | `MOCK_STUDENT` |
| Parent profiles | [parent-dashboard-config.ts](file:///c:/Users/ENN/Desktop/Glorious%20School/src/lib/parent-dashboard-config.ts) | `MOCK_PARENT` |
| Staff profiles | [staff-dashboard-config.ts](file:///c:/Users/ENN/Desktop/Glorious%20School/src/lib/staff-dashboard-config.ts) | `MOCK_STAFF` + role system |

### C. Academic Structure
- Class levels: Nursery, Primary (JSS 1–3), Secondary (SS 1–3)
- Subjects per class (Physics, Math, English, etc.)
- Academic sessions & terms
- Timetable data
- Result grading scales (A/B/C/D/F mapping)

### D. Financial Data
- Fee types and amounts (per class level)
- Student payment records
- Revenue tracking

### E. Communication
- Announcements (staff-dashboard has basic version)
- Messages between staff/parents
- Contact form submissions

---

## Proposed Architecture

```
src/
├── app/admin/
│   ├── layout.tsx                         # AdminShell wrapper + SEO
│   ├── page.tsx                           # Redirect → /admin/overview
│   │
│   ├── overview/page.tsx                  # 📊 Command Center
│   │
│   ├── users/
│   │   ├── page.tsx                       # 👥 All Users Directory (tabs: Students, Staff, Parents, Admins)
│   │   └── roles/page.tsx                 # 🔐 Role & Permission Management (Super Admin only)
│   │
│   ├── academics/
│   │   ├── page.tsx                       # 🎓 Classes & Subjects Configuration
│   │   └── calendar/page.tsx              # 📅 Academic Calendar & Sessions
│   │
│   ├── results/page.tsx                   # 📝 Global Results Oversight & Approval
│   │
│   ├── finance/page.tsx                   # 💰 Executive Financial Dashboard
│   │
│   ├── cms/
│   │   ├── page.tsx                       # 🌐 Website Content Manager (homepage, about, etc.)
│   │   └── events/page.tsx                # 📰 Events Manager (CRUD)
│   │
│   ├── communications/
│   │   ├── page.tsx                       # 📢 Announcements & Broadcasts
│   │   └── inbox/page.tsx                 # 💬 Contact Form Submissions & Messages
│   │
│   ├── reports/page.tsx                   # 📈 Analytics & Reports
│   │
│   └── settings/page.tsx                  # ⚙️ System Settings (Super Admin only)
│
├── components/admin/
│   ├── AdminShell.tsx                     # Layout (sidebar + content region)
│   ├── AdminSidebar.tsx                   # Navigation with nested groups
│   └── AdminTopBar.tsx                    # Search, quick-add, profile
│
└── lib/
    └── admin-config.ts                    # Nav items, roles, mock admin data
```

**Total: 14 pages + 3 shell components + 1 config = 18 new files, 2 modified files**

---

## Proposed Changes

### 1. Configuration Layer

#### [NEW] [admin-config.ts](file:///c:/Users/ENN/Desktop/Glorious%20School/src/lib/admin-config.ts)

```typescript
type AdminRole = "super_admin" | "admin";

// Navigation organized into logical groups with nested structure
ADMIN_NAV_GROUPS = [
  {
    label: "Dashboard",
    items: [
      { name: "Overview", href: "/admin/overview", icon: "📊", roles: ALL }
    ]
  },
  {
    label: "People",
    items: [
      { name: "All Users", href: "/admin/users", icon: "👥", roles: ALL },
      { name: "Roles & Permissions", href: "/admin/users/roles", icon: "🔐", roles: ["super_admin"] }
    ]
  },
  {
    label: "Academics",
    items: [
      { name: "Classes & Subjects", href: "/admin/academics", icon: "🎓", roles: ALL },
      { name: "Calendar & Sessions", href: "/admin/academics/calendar", icon: "📅", roles: ALL },
      { name: "Results Oversight", href: "/admin/results", icon: "📝", roles: ALL }
    ]
  },
  {
    label: "Finance",
    items: [
      { name: "Finance Overview", href: "/admin/finance", icon: "💰", roles: ALL }
    ]
  },
  {
    label: "Website",
    items: [
      { name: "Page Content", href: "/admin/cms", icon: "🌐", roles: ALL },
      { name: "Events Manager", href: "/admin/cms/events", icon: "📰", roles: ALL }
    ]
  },
  {
    label: "Communication",
    items: [
      { name: "Announcements", href: "/admin/communications", icon: "📢", roles: ALL },
      { name: "Inbox & Queries", href: "/admin/communications/inbox", icon: "💬", roles: ALL }
    ]
  },
  {
    label: "Insights",
    items: [
      { name: "Reports", href: "/admin/reports", icon: "📈", roles: ALL }
    ]
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: "⚙️", roles: ["super_admin"] }
    ]
  }
];
```

Mock data: `MOCK_ADMIN` (name, email, role, avatar initials, lastLogin), `MOCK_AUDIT_LOG` (recent system actions), `MOCK_SYSTEM_STATS` (total users by type, storage usage, uptime).

---

### 2. Shell Components

#### [NEW] `AdminShell.tsx`
- Same architecture as `StaffDashboardShell.tsx`
- Dark slate sidebar (`#0f172a`) instead of dark green, to visually differentiate
- Indigo accent highlight for active nav item (instead of brand-yellow)
- Role switcher (Super Admin ↔ Admin) for development
- No notice modal (admin doesn't need school notices)

#### [NEW] `AdminSidebar.tsx`
- **Grouped navigation** with collapsible section headers (Dashboard, People, Academics, Finance, Website, Communication, Insights, System)
- Role-based filtering (hides "Roles & Permissions" and "Settings" from regular Admin)
- Collapse to icon-only mode
- Header badge: "Super Admin" or "Admin" with distinct colors
- "ADMIN PANEL" label in the logo area to clearly differentiate

#### [NEW] `AdminTopBar.tsx`
- Global search bar (mocked — searches across users, content, events)
- Quick-add dropdown: "+ Student", "+ Event", "+ Announcement"
- Admin profile dropdown with role indicator
- Responsive: hamburger drawer on mobile with grouped nav

---

### 3. Pages — Detailed Specifications

---

#### [NEW] `admin/overview/page.tsx` — **Command Center**

The nerve center. At a glance, the Super Admin understands the health of the entire system.

**Layout:**
- **System Health Banner** — colored bar showing overall status (green = all systems normal)

- **Stats Grid (6 cards):**

| Metric | Source | Visual |
|---|---|---|
| Total Students | Count from users | Number + trend arrow |
| Total Staff | Count from users | Number + active/inactive split |
| Total Parents | Count from users | Number |
| Result Submissions | Pending approval count | Number + urgency color |
| Fee Collection Rate | This term % collected | Progress ring |
| Contact Queries | Unread submissions | Number + badge |

- **Audit Log Feed** — Last 10 system actions with timestamp, actor, and action type:
  - "Mrs. Okonkwo submitted SS1 Physics results — 2 hours ago"
  - "Bursar updated SS2 fee structure — Yesterday"
  - "New student John Doe enrolled — 2 days ago"

- **Quick Actions Grid** — 4–6 prominent action cards:
  - Add New Student → `/admin/users`
  - Approve Results → `/admin/results`
  - Create Event → `/admin/cms/events`
  - Post Announcement → `/admin/communications`
  - View Financial Report → `/admin/finance`
  - System Settings → `/admin/settings`

- **Portal Status Widget** — Shows live status of each portal:

| Portal | Status | Last Activity |
|---|---|---|
| Public Website | 🟢 Live | — |
| Student Portal | 🟢 Active | 2 min ago |
| Parent Portal | 🟢 Active | 15 min ago |
| Staff Portal | 🟢 Active | 5 min ago |

---

#### [NEW] `admin/users/page.tsx` — **All Users Directory**

Master user management interface.

**Layout:**
- **Tab bar:** Students | Staff | Parents | Admins (4 tabs)
- **Toolbar:** Search input + filter dropdowns (class, role, status) + "Add User" button
- **Bulk Actions Bar** (appears when checkboxes are selected): Suspend, Activate, Export

**Per Tab:**

| Tab | Columns | Special Actions |
|---|---|---|
| Students | Name, Adm No, Class, Dept, Guardian, Status | View Profile, Edit, Suspend, Link Parent |
| Staff | Name, Staff ID, Role, Department, Classes, Status | View Profile, Edit, Change Role |
| Parents | Name, Phone, Email, Linked Students, Status | View Profile, Edit, Link Student |
| Admins | Name, Email, Role (Super Admin/Admin), Last Login | Edit, Revoke Access |

**"Add User" Modal** — Tabbed form: Student / Staff / Parent / Admin with relevant fields.

---

#### [NEW] `admin/users/roles/page.tsx` — **Roles & Permission** (Super Admin only)

**Layout:**
- **Role Cards** — Visual card for each role showing:

| Role | Users | Permissions Summary |
|---|---|---|
| Super Admin | 1 | Full system access |
| Admin | 2 | Manage users, academics, CMS |
| Principal | 1 | Approve results, announcements |
| Vice Principal | 1 | Attendance, discipline |
| Bursar | 1 | Finance, invoices |
| Teacher | 8 | Results entry, attendance |
| Student | 450+ | View own data |
| Parent | 200+ | View children data |

- **Permission Matrix Table** — Grid showing which role can access which module (checkboxes, read-only for mock):

| Module | Super Admin | Admin | Principal | VP | Bursar | Teacher |
|---|---|---|---|---|---|---|
| User Management | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Results Approval | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Fee Configuration | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| CMS | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

#### [NEW] `admin/academics/page.tsx` — **Classes & Subjects**

**Layout:**
- **Class Structure Panel** — Collapsible accordion:
  - Nursery (Nursery 1, Nursery 2)
  - Primary (Primary 1–6)
  - Junior Secondary (JSS 1–3)
  - Senior Secondary (SS 1–3)
  - Each class shows: capacity, enrolled count, class teacher, and subject count

- **Subject Management Table** — Searchable list:

| Subject | Levels | Teachers Assigned | Status |
|---|---|---|---|
| Mathematics | JSS 1–SS 3 | Mr. James Okafor | Active |
| Physics | SS 1–SS 3 | Mrs. Adaeze Okonkwo | Active |

- **"Add Class"** and **"Add Subject"** modals with relevant form fields

---

#### [NEW] `admin/academics/calendar/page.tsx` — **Calendar & Sessions**

**Layout:**
- **Active Session Banner** — Shows current: `2025/2026 Academic Session — 2nd Term`
- **Term Configuration Cards (3):**

| Term | Start | End | Weeks | Status |
|---|---|---|---|---|
| 1st Term | Sep 8, 2025 | Dec 12, 2025 | 14 | Completed |
| 2nd Term | Jan 6, 2026 | Mar 28, 2026 | 12 | **Active** ← |
| 3rd Term | Apr 21, 2026 | Jul 18, 2026 | 13 | Upcoming |

- **Holiday Calendar** — List of declared holidays with dates
- **"Edit Session"** modal: Session name, term dates, holidays

---

#### [NEW] `admin/results/page.tsx` — **Results Oversight**

Higher-level view than the Staff Dashboard results page. The admin sees the *workflow pipeline* across all classes.

**Layout:**
- **Pipeline Summary Cards:**

| Stage | Count | Color |
|---|---|---|
| Awaiting Entry | 12 subjects | 🔴 Red |
| Draft | 8 subjects | 🟡 Yellow |
| Pending Approval | 5 subjects | 🟠 Orange |
| Approved | 25 subjects | 🟢 Green |

- **Results Matrix Table** — Grid showing completion status per class × subject:

| Subject | JSS 1 | JSS 2 | JSS 3 | SS 1 | SS 2 | SS 3 |
|---|---|---|---|---|---|---|
| Mathematics | ✅ | ✅ | 🟡 | ✅ | 🟠 | ✅ |
| English | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| Physics | — | — | — | ✅ | 🟠 | ✅ |

(where ✅ = Approved, 🟠 = Pending Review, 🟡 = Draft, 🔴 = Not started, — = N/A)

- **Bulk Approve Button** — For mass-approving all pending results
- **Grade Configuration Panel** — Shows the grading scale (A: 70–100, B: 60–69, etc.)

---

#### [NEW] `admin/finance/page.tsx` — **Executive Financial Dashboard**

Bird's-eye view of all school finances (overseeing the Bursar).

**Layout:**
- **Revenue Cards Row:**

| Card | Value | Context |
|---|---|---|
| Total Expected (This Term) | ₦48,500,000 | Based on fee structure × enrollment |
| Total Collected | ₦37,200,000 (77%) | With progress bar |
| Outstanding | ₦11,300,000 | With student count owning |
| Expenses | ₦8,400,000 | Staff salaries, utilities |

- **Collection Trend Chart** (mock) — Bar chart showing monthly collection over 6 months
- **Top Defaulters Table** — Students with highest outstanding balances
- **Fee Structure Overview** — Same as Bursar's view but read-only, with "Edit" option
- **Export Reports Button** — UI mock for PDF/Excel export

---

#### [NEW] `admin/cms/page.tsx` — **Website Content Manager**

Interface to control all hardcoded content on the public website.

**Layout:**
- **Page Cards Grid** — One card per public page, each showing last edited date and status:

| Page | Route | Sections | Status |
|---|---|---|---|
| Homepage | `/` | Hero, Stats, Features, Events, CTA | 🟢 Published |
| About | `/about` | History, Mission/Vision, Values, Leadership | 🟢 Published |
| Admissions | `/admissions` | Process Steps, Requirements, Contact | 🟢 Published |
| Contact | `/contact` | Form, Contact Info, Map | 🟢 Published |
| Academics → Nursery | `/academics/nursery` | Curriculum, Features | 🟢 Published |
| Academics → Primary | `/academics/primary` | Curriculum, Features | 🟢 Published |
| Academics → Secondary | `/academics/secondary` | Curriculum, Features | 🟢 Published |

- **Click any card** → Expandable section with inline-editable fields:
  - Homepage: Hero title, hero subtitle, stats numbers, CTA text
  - About: History paragraphs, mission text, vision text, leadership team members
  - Admissions: Steps text, requirements list
  - Contact: Address, phones, emails, hours

- **Global Settings Panel:**
  - School name, subtitle/tagline
  - Navbar links (add/remove/reorder)
  - Footer content (description, social URLs)
  - Homepage announcement banner (optional emergency text)

---

#### [NEW] `admin/cms/events/page.tsx` — **Events Manager**

Full CRUD for the events that appear on `/events`.

**Layout:**
- **Toolbar:** "Create Event" button + search + filter (past/upcoming)
- **Events Table:**

| Title | Date | Time | Location | Status | Actions |
|---|---|---|---|---|---|
| Inter-House Sports | May 15, 2026 | 9:00 AM | Main Field | Published | Edit, Unpublish, Delete |
| PTA Meeting | May 28, 2026 | 10:00 AM | Auditorium | Published | Edit, Unpublish, Delete |
| Science Exhibition | Jun 5, 2026 | 11:00 AM | Exhibition Hall | Draft | Edit, Publish, Delete |

- **"Create/Edit Event" Modal:** Title, date, time, location, description, image upload (mock), status (Draft/Published)

---

#### [NEW] `admin/communications/page.tsx` — **Announcements & Broadcasts**

System-wide announcement management.

**Layout:**
- **"New Broadcast" button** — Modal to create announcement targeting specific audiences
- **Active Broadcasts Table:**

| Title | Target | Channel | Published | Reach | Actions |
|---|---|---|---|---|---|
| Mid-Term Break | All | Portal + SMS | Feb 10 | 1,200 | Edit, Expire |
| PTA Meeting | Parents | Portal | Feb 8 | 420 | Edit, Expire |
| Exam Timetable | Students + Staff | Portal | Feb 5 | 1,050 | Edit, Expire |

- **Target Audience Selector** (in modal): All, Students Only, Parents Only, Staff Only, Specific Class
- **Channel Options** (mock): Portal Notification, SMS (mock), Email (mock)
- **Broadcast History** — Archived past announcements

---

#### [NEW] `admin/communications/inbox/page.tsx` — **Inbox & Contact Queries**

Where all contact form submissions and internal messages land.

**Layout:**
- **Tabs:** Contact Queries | Internal Messages | Complaints
- **Contact Queries Tab** — Messages from the public `/contact` form:

| From | Email | Subject | Date | Status | Actions |
|---|---|---|---|---|---|
| John Doe | john@example.com | Admission Inquiry | Feb 20 | Unread | Reply, Archive |
| Mary Eze | mary@example.com | Fee Question | Feb 18 | Read | Reply, Archive |

- **Internal Messages Tab** — Staff-to-admin messages
- **Message Detail Panel** — Split-panel view (list left, detail right) same pattern as Staff Messages page
- **Reply functionality** (mock)

---

#### [NEW] `admin/reports/page.tsx` — **Analytics & Reports**

Data analysis and exportable reports.

**Layout:**
- **Report Cards Grid (6 reports):**

| Report | Description | Action |
|---|---|---|
| Student Demographics | Enrollment by class, gender, department | View / Export |
| Academic Performance | Average scores by class, top performers | View / Export |
| Attendance Summary | Monthly attendance rates by class | View / Export |
| Financial Statement | Income vs expenditure summary | View / Export |
| Staff Workload | Classes/subjects per teacher | View / Export |
| Result Completion | Submission status across all subjects | View / Export |

- **Click any report card** → Expandable section with mock data table and "Export as PDF / Excel" button (UI mock)

- **Quick Stats Section:**
  - Gender distribution breakdown (bar chart mock)
  - Class-wise enrollment count
  - Term-over-term performance comparison

---

#### [NEW] `admin/settings/page.tsx` — **System Settings** (Super Admin only)

Master configuration panel.

**Layout — Grouped Sections:**

**1. School Identity**
- School Name: `Glorious Group of Schools`
- Subtitle: `Ughelli, Delta State`
- School Logo: Upload area (mock)
- School Motto: Text field
- Founding Year: `2005`

**2. Contact Information**
- Primary Address
- Phone numbers (editable list)
- Email addresses (editable list)
- Office hours
- Social media URLs (Facebook, Instagram, X, WhatsApp)

**3. Academic Configuration**
- Current Session: `2025/2026`
- Current Term: Dropdown (1st, 2nd, 3rd)
- Grading Scale: Editable table (A: 70-100, B: 60-69, etc.)
- CA/Exam Weight: CA1 (20) + CA2 (20) + Exam (60) = 100

**4. Portal Controls**
- Student Portal: Toggle on/off
- Parent Portal: Toggle on/off
- Staff Portal: Toggle on/off
- Result Checker: Toggle on/off
- Maintenance Mode: Global toggle with custom message field

**5. Security**
- Minimum password length
- Session timeout (minutes)
- Two-factor authentication: Toggle (mock)

**6. Danger Zone** (red-bordered section)
- Reset all student passwords
- Clear audit log
- Export full database (mock button)

---

### 4. Layout & Routing Updates

#### [MODIFY] [ConditionalWrapper.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/components/layout/ConditionalWrapper.tsx)
Add `pathname.startsWith('/admin')` to the `isDashboard` condition to hide the public Navbar/Footer on admin routes.

#### [MODIFY] [login/page.tsx](file:///c:/Users/ENN/Desktop/Glorious%20School/src/app/login/page.tsx)
Add an "Admin Login" link alongside the existing Staff Portal link.

---

## File Summary

| Category | Files | Count |
|---|---|---|
| Config | `admin-config.ts` | 1 |
| Shell Components | `AdminShell.tsx`, `AdminSidebar.tsx`, `AdminTopBar.tsx` | 3 |
| Pages | `layout.tsx`, `page.tsx` + 12 feature pages | 14 |
| Modified | `ConditionalWrapper.tsx`, `login/page.tsx` | 2 |
| **Total** | | **20 files** |

---

## Design Specifications

### Color Palette (Admin-Specific)
| Element | Color | Hex |
|---|---|---|
| Sidebar background | Slate 950 | `#020617` |
| Sidebar active item | Indigo 500 | `#6366f1` |
| Sidebar text | Slate 400 | `#94a3b8` |
| Active indicator bar | Indigo 400 | `#818cf8` |
| "Super Admin" badge | Red-amber gradient | `bg-gradient-to-r from-red-500 to-amber-500` |
| "Admin" badge | Blue | `bg-blue-500` |
| Page backgrounds | Same slate-100 as other dashboards | `#f1f5f9` |
| Cards, tables | Same white cards with slate borders | Consistent with project |

### Typography & Spacing
- Same Inter font, same text scales as existing dashboards
- Grouped sidebar sections with small uppercase labels (like Slack/Discord)
- 12px section labels, 14px nav item text

---

## Open Questions

> [!NOTE]
> **Admin Theme Color:** The plan uses an indigo/violet accent to distinguish the Admin portal. Should I go with this, keep the standard green, or use a different accent?

> [!NOTE]
> **CMS Depth:** The CMS page mocks inline editing of all public page content. Should I focus on just simulating the most important controllable sections (Homepage hero + Events + Contact info), or mock the full content editor for every page?

---

## Verification Plan

### Automated Tests
1. `npm run build` — All 14 new pages compile without errors
2. TypeScript types are consistent with existing config patterns

### Manual Verification
1. Navigate all 14 routes on dev server
2. Verify sidebar grouped navigation and role-based filtering
3. Verify visual distinction (slate/indigo theme vs green for Staff)
4. Confirm mobile responsiveness of all tables and grids
5. Ensure public Navbar/Footer are hidden on `/admin/*` routes
6. Browser recording of the full admin dashboard walkthrough
