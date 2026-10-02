"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heading } from "@astryxdesign/core/Text";
import { SideNav, SideNavItem } from "@astryxdesign/core/SideNav";
import { Stack } from "@astryxdesign/core/Stack";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import logoImg from "../assets/logo.webp";

type NavigationProps = {
  layout?: "side" | "top";
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Experiments", href: "/experiments" },
  { label: "Contact", href: "/contact" },
];

export const Navigation = ({ layout = "side" }: NavigationProps) => {
  const pathname = usePathname();
  const isSelected = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

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
            <Image
              alt="Portrait of Aubrey Quinn"
              src={logoImg}
              preload
              width={250}
              height={375}
              unoptimized
            />
          }
        />
        <TopNav
          label="Primary navigation"
          style={{ width: "auto", padding: 0 }}
        >
          {navigationItems.map((item) => (
            <TopNavItem
              key={item.href}
              as={Link}
              {...item}
              isSelected={isSelected(item.href)}
            />
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
            <Image
              alt="Portrait of Aubrey Quinn"
              src={logoImg}
              preload
              sizes="228px"
              style={{ width: "100%", height: "auto" }}
            />
            <Heading level={1}>Aubrey Quinn</Heading>
          </Stack>
        }
      >
        {navigationItems.map((item) => (
          <SideNavItem
            key={item.href}
            as={Link}
            {...item}
            isSelected={isSelected(item.href)}
          />
        ))}
      </SideNav>
    </>
  );
};
