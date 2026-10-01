import { List, ListItem } from "@astryxdesign/core/List";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Stack } from "@astryxdesign/core/Stack";

export const About = () => (
  <Stack direction="vertical" gap={8} padding={8}>
    <Heading level={1}>About</Heading>
    <Text as="p">
      This site is built with a small, typed stack focused on reusable,
      accessible components and fast feedback while developing.
    </Text>
    <Heading level={2}>Technology stack</Heading>
    <List listStyle="disc">
      <ListItem
        label="Next.js App Router"
        description="Routing, metadata, and prerendered pages."
      />
      <ListItem
        label="React 19 and TypeScript"
        description="UI composition and type-safe application code."
      />
      <ListItem
        label="Astryx Design System and StyleX"
        description="Accessible components, design tokens, and styling."
      />
      <ListItem
        label="pnpm"
        description="Package management and workspace tooling."
      />
      <ListItem
        label="Storybook, Vitest, and Playwright"
        description="Component development and browser interaction tests."
      />
      <ListItem
        label="ESLint"
        description="Code quality and project conventions."
      />
    </List>
  </Stack>
);
