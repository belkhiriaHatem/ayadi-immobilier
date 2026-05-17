"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLenis } from "lenis/react";
import { scrollToSection } from "@/lib/scroll";

type SectionLinkProps = ComponentProps<typeof Link> & {
  onNavigate?: () => void;
};

export function SectionLink({
  href,
  onClick,
  onNavigate,
  scroll = false,
  ...props
}: SectionLinkProps) {
  const lenis = useLenis();

  if (typeof href !== "string" || !href.startsWith("#")) {
    return <Link href={href} scroll={scroll} onClick={onClick} {...props} />;
  }

  return (
    <Link
      href={href}
      scroll={false}
      {...props}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();
        scrollToSection(href, lenis);
        onClick?.(event);
      }}
    />
  );
}
