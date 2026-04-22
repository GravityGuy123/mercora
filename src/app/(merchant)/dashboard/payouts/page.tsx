import { redirect } from "next/navigation";

export default function MerchantPayoutsRedirectPage() {
  redirect("/dashboard/settlements");
}