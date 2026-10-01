import { Heading, Text } from "@astryxdesign/core/Text";

export const ContactError = () => (
  <>
    <Heading level={2}>Oops!</Heading>
    <Text as="p">
      We couldn&apos;t confirm your message was sent. Your message is still
      here, and you can try again.
    </Text>
  </>
);
