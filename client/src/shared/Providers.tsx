"use client";

import type { ReactNode } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { butterTheme } from "@astryxdesign/theme-butter/built";

export const Providers = ({ children }: { children: ReactNode }) => (
  <Theme theme={butterTheme} mode="system">
    {children}
  </Theme>
);
