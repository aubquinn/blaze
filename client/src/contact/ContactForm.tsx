"use client";

import { useActionState } from "react";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Button } from "@astryxdesign/core/Button";
import { Heading, Stack, Text } from "@astryxdesign/core";
import { ContactSuccess } from "./ContactSuccess";
import { submitContactForm } from "./submitContactForm";
import { ContactError } from "./ContactError";
import { useContactField } from "./useContactField";

export const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    status: "idle",
  });
  const showErrors = state.status === "invalid";
  const name = useContactField("name", showErrors);
  const email = useContactField("email", showErrors);
  const message = useContactField("message", showErrors);
  const isSubmitDisabled = !name.isValid || !email.isValid || !message.isValid;

  return (
    <Stack direction="vertical" gap={8} padding={8}>
      <Heading level={1}>Contact</Heading>
      {state.status === "success" && <ContactSuccess />}
      {state.status === "error" && <ContactError />}
      {(state.status === "idle" || state.status === "invalid") && (
        <form action={formAction}>
          <FormLayout defaultOptionality="required">
            <Text as="p" type="supporting">
              All fields are required.
            </Text>
            <TextInput
              label="Full Name"
              htmlName="name"
              autoComplete="name"
              value={name.value}
              onChange={name.onChange}
              status={name.status}
              statusVariant="detached"
              isRequired
              isDisabled={isPending}
            />
            <TextInput
              label="Email Address"
              htmlName="email"
              type="email"
              autoComplete="email"
              value={email.value}
              onChange={email.onChange}
              status={email.status}
              statusVariant="detached"
              isRequired
              isDisabled={isPending}
            />
            <TextArea
              label="Message"
              htmlName="message"
              value={message.value}
              onChange={message.onChange}
              status={message.status}
              statusVariant="detached"
              isRequired
              isDisabled={isPending}
            />
            <Button
              label={isPending ? "Submitting..." : "Submit"}
              type="submit"
              isDisabled={isSubmitDisabled}
              isLoading={isPending}
            />
          </FormLayout>
        </form>
      )}
    </Stack>
  );
};
