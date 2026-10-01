import type { Metadata } from "next";
import { Experiments } from "../../experiments/Experiments";

export const metadata: Metadata = { title: "Experiments" };

export default function ExperimentsPage() {
  return <Experiments />;
}
