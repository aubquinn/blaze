import type { Metadata } from "next";
import { Writing } from "../../writing/Writing";

export const metadata: Metadata = { title: "Writing" };

export default function WritingPage() {
  return <Writing />;
}
