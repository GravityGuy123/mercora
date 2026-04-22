import { redirect } from "next/navigation";

export default function MerchantBillingRedirectPage() {
  redirect("/dashboard/subscriptions");
}