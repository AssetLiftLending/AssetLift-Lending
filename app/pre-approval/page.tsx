import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import PreApprovalForm from "./PreApprovalForm";

export const metadata: Metadata = createMetadata({
  title: "Get Pre-Approved for an Investment Property Loan | AssetLift Lending",
  description:
    "Request a pre-approval letter and loan terms for fix and flip, DSCR rental, bridge or construction financing. Business-purpose loans only.",
  path: "/pre-approval",
});

export default function PreApprovalPage() {
  return <PreApprovalForm />;
}
