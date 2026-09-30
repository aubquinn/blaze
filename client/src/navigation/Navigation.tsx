import React from "react";
import { SideNav, Heading, SideNavItem } from "@astryxdesign/core";
import logoImg from "../assets/logo.webp";

export const Navigation = () => {
  return (
    <>
      <SideNav
        header={
          <>
            <img alt="Portrait of Aubrey Quinn" src={logoImg} />
            <Heading level={1}>Aubrey Quinn</Heading>
          </>
        }
      >
        <SideNavItem label="Home" href="/" />
        <SideNavItem label="Contact" href="/contact" />
        <SideNavItem label="Writing" href="/writing" />
      </SideNav>
    </>
  );
};
