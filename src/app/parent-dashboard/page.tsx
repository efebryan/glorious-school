import { redirect } from "next/navigation";

export default function ParentDashboardIndex() {
  redirect("/parent-dashboard/overview");
}
