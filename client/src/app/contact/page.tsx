import type { Metadata } from "next";
import { ContactForm } from "../../contact/ContactForm";
import { submitContactForm } from "../../contact/helpers/submitContactForm";

export const dynamic = "force-static";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactForm submitAction={submitContactForm} />;
}
