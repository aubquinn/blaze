"use client";

import type { ReactNode } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

export const Providers = ({ children }: { children: ReactNode }) => (
  <Theme theme={neutralTheme} mode="system">
    {children}
  </Theme>
);
