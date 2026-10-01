"use client";

import { useActionState, useState } from "react";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Button } from "@astryxdesign/core/Button";
import { Spinner } from "@astryxdesign/core/Spinner";
import { Heading, Stack } from "@astryxdesign/core";
import { ContactSuccess } from "./ContactSuccess";
import { submitContactForm } from "./submitContactForm";
import { ContactError } from "./ContactError";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    status: "idle",
  });
  const isSubmitDisabled = !name.trim() || !email.trim() || !message.trim();

  return (
    <Stack direction="vertical" gap={8} padding={8}>
      <Heading level={1}>Contact</Heading>
      {isPending && <Spinner size="lg" label="Sending your message..." />}
      {state.status === "success" && <ContactSuccess />}
      {state.status === "error" && <ContactError />}
      {!isPending && state.status === "idle" && (
        <form action={formAction}>
          <FormLayout>
            <TextInput
              label="Full Name"
              htmlName="name"
              autoComplete="name"
              value={name}
              onChange={setName}
              isRequired
              isDisabled={isPending}
            />
            <TextInput
              label="Email Address"
              htmlName="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              isRequired
              isDisabled={isPending}
            />
            <TextArea
              label="Message"
              htmlName="message"
              value={message}
              onChange={setMessage}
              isRequired
              isDisabled={isPending}
            />
            <Button
              label={isPending ? "Submitting..." : "Submit"}
              type="submit"
              isDisabled={isSubmitDisabled || isPending}
            />
          </FormLayout>
        </form>
      )}
    </Stack>
  );
};
