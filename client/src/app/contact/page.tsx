import type { Metadata } from "next";
import { ContactForm } from "../../contact/ContactForm";

export const dynamic = "force-static";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactForm />;
}
