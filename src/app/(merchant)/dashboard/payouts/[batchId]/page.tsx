import { redirect } from "next/navigation";

type MerchantPayoutBatchRedirectPageProps = {
  params: {
    batchId: string;
  };
};

export default function MerchantPayoutBatchRedirectPage({
  params,
}: MerchantPayoutBatchRedirectPageProps) {
  redirect(`/dashboard/settlements/payout-batches/${params.batchId}`);
}