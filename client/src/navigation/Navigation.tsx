import {
  Heading,
  SideNav,
  SideNavItem,
  Stack,
  TopNav,
  TopNavHeading,
  TopNavItem,
} from "@astryxdesign/core";
import logoImg from "../assets/logo.webp";

type NavigationProps = {
  layout?: "side" | "top";
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Writing", href: "/writing" },
];

export const Navigation = ({ layout = "side" }: NavigationProps) => {
  if (layout === "top") {
    return (
      <Stack
        direction="horizontal"
        wrap="wrap"
        vAlign="center"
        hAlign="center"
        gap={2}
        padding={2}
      >
        <TopNavHeading
          heading="Aubrey Quinn"
          logo={
            <img
              alt="Portrait of Aubrey Quinn"
              src={logoImg}
              width={24}
              height={36}
            />
          }
        />
        <TopNav
          label="Primary navigation"
          style={{ width: "auto", padding: 0 }}
        >
          {navigationItems.map((item) => (
            <TopNavItem key={item.href} {...item} />
          ))}
        </TopNav>
      </Stack>
    );
  }

  return (
    <>
      <SideNav
        aria-label="Primary navigation"
        header={
          <Stack
            direction="horizontal"
            wrap="wrap"
            vAlign="center"
            hAlign="center"
            gap={2}
            padding={2}
          >
            <img alt="Portrait of Aubrey Quinn" src={logoImg} />
            <Heading level={1}>Aubrey Quinn</Heading>
          </Stack>
        }
      >
        {navigationItems.map((item) => (
          <SideNavItem key={item.href} {...item} />
        ))}
      </SideNav>
    </>
  );
};
