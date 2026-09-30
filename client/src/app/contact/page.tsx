import type { Metadata } from "next";
import { Heading, Stack } from "@astryxdesign/core";
import { ContactForm } from "../../contact/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Stack direction="vertical" gap={8} padding={8}>
      <Heading level={1}>Contact</Heading>
      <ContactForm />
    </Stack>
  );
}
