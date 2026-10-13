import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = createMetadata({
  title: "Apply for a Hard Money or DSCR Loan",
  description:
    "Send your fix-and-flip, DSCR, bridge or construction deal for review. Business-purpose loans only. Usual response time: a few business hours. Call 929-639-2284.",
  path: "/apply",
});

export default function ApplyPage() {
  return <ApplyForm />;
}
