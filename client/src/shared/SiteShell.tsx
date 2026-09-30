"use client";

import type { ReactNode } from "react";
import { Navigation } from "../navigation/Navigation";
import { AppShell } from "@astryxdesign/core/AppShell";
import { useMediaQuery } from "@astryxdesign/core";

export const SiteShell = ({ children }: { children: ReactNode }) => {
  const isCompact = useMediaQuery("(width < 1024px)");

  return (
    <AppShell
      sideNav={isCompact ? undefined : <Navigation />}
      topNav={isCompact ? <Navigation layout="top" /> : undefined}
      mobileNav={false}
      height="auto"
      variant="surface"
      contentPadding={0}
    >
      {children}
    </AppShell>
  );
};
