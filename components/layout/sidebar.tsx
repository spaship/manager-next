import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Brand, Nav, NavItem, NavList, Stack, StackItem } from "@patternfly/react-core";
import { FlagIcon, LockOpenIcon, NetworkIcon, OutlinedQuestionCircleIcon, TrendUpIcon } from "@patternfly/react-icons";
import styled from "styled-components";
import UserStatus from "./user-status";

interface SidebarProps {}

const StyledStack = styled(Stack) ({
  position: "fixed",
  width: "250px",
  height: "100%",
  background: "black",
  color: "#white"
});

const BrandItem = styled(StackItem) `
  margin: auto;
`;

const StyledBrand = styled(Brand) `
  padding: 1.4em 2.4em;
`;

const StyledNavList = styled(NavList) `
  text-transform: capitalize;
  padding: 0;
`

const StyledNavItem = styled(NavItem) `
  font-weight: 100;
  --pf-c-nav__link--m-current--after--BorderLeftWidth: var(--spaship-global--Color--amarillo-flare);
  --pf-c-nav__link--m-current--after--BorderColor: var(--spaship-global--Color--amarillo-flare);
  --pf-c-nav__link--m-current--Color:  var(--spaship-global--Color--amarillo-flare);
  --pf-c-nav__link--before--BorderColor:  black;
`

const NavButton = styled.a`
    color: var(--spaship-global--Color--bright-gray);
    display: block;
    font-size: 1.2em;

  :hover, :active {
    background: var(--spaship-global--Color--spaship-gray);
    color: var(--spaship-global--Color--amarillo-flare);
  }

    > svg {
      margin-right: 1em;
    }
`

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <StyledStack>
      <BrandItem>
        <Link href="/" passHref><a><StyledBrand src="/images/logo/spaship-logo-light-transparent.png" alt="SPAship Logo" /></a></Link>
      </BrandItem>
      <StackItem isFilled>
        <Nav aria-label="Nav">
          <StyledNavList>
            <StyledNavItem itemId={0} isActive={path.toString().includes("/property") || path === "/"} onClick={()=>{router.push("/")}}>
              <NavButton><NetworkIcon />Web Properties</NavButton>
            </StyledNavItem>
            <StyledNavItem itemId={1} isActive={path === "/dashboard"} onClick={()=>{router.push("/dashboard")}}>
                <NavButton><TrendUpIcon />Dashboard</NavButton>
            </StyledNavItem>
            <StyledNavItem itemId={2} isActive={path === "/authentication"} onClick={()=>{router.push("/authentication")}}>
                <NavButton><LockOpenIcon />Authentication</NavButton>
            </StyledNavItem>
            <StyledNavItem itemId={3} isActive={path === "/faqs"} onClick={()=>{router.push("/faqs")}}>
                <NavButton><OutlinedQuestionCircleIcon />FAQs</NavButton>
            </StyledNavItem>
            <StyledNavItem itemId={4} isActive={path === "/feedback"} onClick={()=>{router.push("/feedback")}}>
                <NavButton><FlagIcon />Feedback</NavButton>
            </StyledNavItem>
          </StyledNavList>
        </Nav>
      </StackItem>
      <StackItem><UserStatus /></StackItem>
    </StyledStack>
  );
};

export default Sidebar;
