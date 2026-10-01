import { Heading, Text } from "@astryxdesign/core/Text";

export const ContactError = () => (
  <>
    <Heading level={2}>Oops!</Heading>
    <Text as="p">
      There was an error submitting your message. Please try again.
    </Text>
  </>
);
