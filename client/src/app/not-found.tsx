import Link from "next/link";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";

export default function NotFound() {
  return (
    <Stack direction="vertical" gap={4} padding={8}>
      <Heading level={1}>Page not found</Heading>
      <Text as="p">That page could not be found.</Text>
      <Link href="/">Return home</Link>
    </Stack>
  );
}
