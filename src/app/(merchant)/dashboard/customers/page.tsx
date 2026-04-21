import type { Metadata } from "next";
import CustomersPageClient from "@/components/customers/CustomersPageClient";

export const metadata: Metadata = {
  title: "Customers",
  description: "Merchant customer records, spend signals, and buyer identity management.",
};

export default function MerchantCustomersPage() {
  return <CustomersPageClient />;
}