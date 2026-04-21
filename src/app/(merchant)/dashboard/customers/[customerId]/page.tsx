import type { Metadata } from "next";
import CustomerDetailPageClient from "@/components/customers/CustomerDetailPageClient";

export const metadata: Metadata = {
  title: "Customer Detail",
  description: "Merchant customer detail, saved addresses, notes, and customer analytics.",
};

export default function MerchantCustomerDetailPage() {
  return <CustomerDetailPageClient />;
}