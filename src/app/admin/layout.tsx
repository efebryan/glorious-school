import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Panel | Glorious Group of Schools",
  description: "Super Admin control panel for Glorious Group of Schools.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
