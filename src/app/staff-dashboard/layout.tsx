import { StaffDashboardShell } from "@/components/staff-dashboard/StaffDashboardShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Portal | Glorious Group of Schools",
  description: "Staff management portal for Glorious Group of Schools",
};

export default function StaffDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffDashboardShell>{children}</StaffDashboardShell>;
}
