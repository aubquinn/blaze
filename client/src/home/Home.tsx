import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";

export const Home = () => {
  return (
    <>
      <Stack direction="vertical" gap={8} padding={8}>
        <Heading level={1}>Hello, World! I'm Aubrey.</Heading>

        <Text as="p">
          I'm a Senior Software Engineer with 10+ years of experience building
          customer-focused software, improving engineering practices, and
          delivering reliable solutions across web, mobile, platform, and
          AI-enabled products. I enjoy solving complex problems, learning new
          technologies, and collaborating across disciplines to turn ideas into
          useful and high-quality products.
        </Text>

        <Text as="p">
          When I'm not doing that, I'm usually thinking about writing about
          doing that. Occasionally, I actually manage to write something. Those
          thoughts end up here.
        </Text>
      </Stack>
    </>
  );
};
