# 📘 PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 🏫 Product Name  
**Glorious Group of Schools Management System**

---

## 🎯 1. Product Overview

The system is a **web-based school management platform** designed for **Glorious Group of Schools, Ughelli**, serving Nursery, Primary, and Secondary levels.

It will provide:

- Public-facing website
- Administrative control panel
- Student and parent portals
- Academic, financial, and communication tools

---

## 🎯 2. Objectives

- Digitize school operations
- Improve communication between school, students, and parents
- Enable secure result management and access
- Provide online fee payment and tracking
- Centralize academic and administrative data

---

## 👥 3. User Roles

### 3.1 Super Admin
- Full system control
- Manage admins and roles
- Override permissions
- System-wide settings

### 3.2 Admin
- Manage students and staff
- Manage classes and subjects
- Approve results
- Manage website content (CMS)

### 3.3 Management Staff

#### Principal
- Approve final results
- Post announcements

#### Vice Principal
- Manage attendance
- Handle discipline records

#### Bursar
- Manage fees and payments
- Generate invoices
- Track financial records

### 3.4 Student
- Login to portal
- View and download results
- View timetable and academic calendar
- Receive notifications
- Pay fees
- Print receipts/invoices

### 3.5 Parent
- Separate login
- View child(ren) results
- Track attendance
- Pay fees
- View events and notices
- Submit complaints
- Print receipts/invoices

---

# 🌐 4. Core Modules

## 🖥️ 4.1 Public Website (CMS)

### Pages:
- Home
- About
- Admissions
- Events
- Contact
- Result Checker

### Features:
- Admin-editable content (CMS)
- Event publishing
- Basic SEO support

## 🔐 4.2 Authentication & Authorization
- Email/password authentication (Supabase Auth)
- Role-based access control (RBAC)
- Secure session handling
- Row-Level Security (RLS) enforcement

## 🎓 4.3 Student Management
- Create and manage student profiles
- Assign admission numbers (unique)
- Assign classes
- Upload passport photos
- Link students to parents

## 👪 4.4 Parent Management
- Parent account creation
- Link multiple students to one parent
- View academic and financial data of children

## 🏫 4.5 Academic Management
- Class structure (Nursery, Primary, Secondary)
- Subject management per class
- Academic calendar
- Timetable management

## 📝 4.6 Result Management
- Input subject scores per student
- Automatic grade calculation
- Approval workflow (Draft → Admin → Principal)
- Report card generation (PDF)

## 💰 4.7 Finance & Payment System
- Fee configuration
- Invoice generation
- Online payments
- Receipt printing
- Payment tracking

## 📅 4.8 Attendance System
- Daily tracking
- Parent visibility

## 📢 4.9 Communication System
- Announcements
- Messaging
- Complaints

## 📰 4.10 Events Management
- Create and publish events

## 🧾 4.11 Result Checker
- Admission number + PIN access

---

# ⚙️ 5. Non-Functional Requirements

- Security (RLS, API protection)
- Performance (fast load)
- Responsive design
- High availability

---

# 🚀 6. Development Phases

## Phase 1
- Auth, roles, student management, CMS

## Phase 2
- Results, portals, report cards

## Phase 3
- Payments, invoices

## Phase 4
- Attendance, messaging

---

# ✅ Next Step

Move to database design and implementation.
