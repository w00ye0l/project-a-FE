import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/car/default?tab=country");
}
