"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { handleHashNav } from "@/lib/nav/hash-scroll";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function HashLink({ href, children, onNavigate, ...props }: Props) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onNavigate?.();
        handleHashNav(event, href);
      }}
    >
      {children}
    </Link>
  );
}
