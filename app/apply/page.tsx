import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = createMetadata({
  title: "Apply for Hard Money Loans | Get a Quote Fast | AssetLift Lending",
  description:
    "Apply for fix and flip, DSCR rental, bridge, construction, or commercial lending. Submit your deal and get a hard money loan quote from AssetLift Lending fast.",
  path: "/apply",
});

export default function ApplyPage() {
  return <ApplyForm />;
}
