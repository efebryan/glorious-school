import { ParentDashboardShell } from "@/components/parent-dashboard/ParentDashboardShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Portal | Glorious Group of Schools",
  description: "Parent portal for Glorious Group of Schools",
};

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParentDashboardShell>{children}</ParentDashboardShell>;
}
