"use client";

import { useActionState, type SubmitEvent } from "react";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Button } from "@astryxdesign/core/Button";
import { VisuallyHidden } from "@astryxdesign/core/VisuallyHidden";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";
import { ContactSuccess } from "./contactSuccess/ContactSuccess";
import { submitContactForm } from "./helpers/submitContactForm";
import { ContactError } from "./contactError/ContactError";
import { useContactField } from "./hooks/useContactField";
import { validateContactForm } from "./helpers/validateContactForm";

type ContactFormProps = {
  submitAction?: typeof submitContactForm;
};

export const ContactForm = ({
  submitAction = submitContactForm,
}: ContactFormProps) => {
  const [state, formAction, isPending] = useActionState(submitAction, {
    status: "idle",
  });
  const showErrors = state.status === "invalid";
  const name = useContactField("name", showErrors);
  const email = useContactField("email", showErrors);
  const message = useContactField("message", showErrors);
  const isSubmitDisabled = !name.isValid || !email.isValid || !message.isValid;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const validation = validateContactForm(
      values,
      String(formData.get("website") ?? ""),
    );

    if (!validation.isValid) {
      event.preventDefault();
    }
  };

  return (
    <Stack direction="vertical" gap={8} padding={8}>
      <Heading level={1}>Contact</Heading>
      {state.status === "success" && <ContactSuccess />}
      {(state.status === "idle" ||
        state.status === "invalid" ||
        state.status === "error") && (
        <form action={formAction} onSubmit={handleSubmit}>
          <VisuallyHidden aria-hidden="true">
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
            />
          </VisuallyHidden>
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
              label={state.status === "error" ? "Try again" : "Submit"}
              type="submit"
              variant="primary"
              isDisabled={isSubmitDisabled}
              isLoading={isPending}
              tooltip={
                isPending
                  ? "Submitting..."
                  : state.status === "error"
                    ? "Try again"
                    : "Submit"
              }
            />
          </FormLayout>
        </form>
      )}
      {state.status === "error" && <ContactError />}
    </Stack>
  );
};
