"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { BookNowButton } from "@/components/booking/book-now-button";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const update = () => {
      headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    update();
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  });

  const links = [
    { href: "/", label: t("home") },
    { href: "/acomodacoes", label: t("accommodations") },
    { href: "/#comodidades", label: t("amenities") },
    { href: "/#contato", label: t("contact") },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-white/10 bg-navy text-navy-foreground shadow-none transition-shadow duration-300 [&.is-scrolled]:shadow-lg [&.is-scrolled]:shadow-black/20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 transition-[padding] duration-300 [.is-scrolled_&]:py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/brand/mark.png"
            alt=""
            width={44}
            height={44}
            priority
            className="size-11 shrink-0 object-contain"
          />
          <span className="font-wordmark text-2xl font-semibold tracking-wide text-gold">
            Recanto do Park
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm tracking-wide text-navy-foreground/80 transition-colors hover:text-gold"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-navy-foreground/80" />
            <LanguageSwitcher className="text-navy-foreground/80" />
          </div>
          <span className="h-5 w-px bg-white/15" aria-hidden />
          <BookNowButton label={t("bookNow")} className="h-10 px-5" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-navy-foreground lg:hidden"
                aria-label="Menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-navy text-navy-foreground">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5 font-wordmark text-2xl font-semibold tracking-wide text-gold">
                <Image
                  src="/brand/mark.png"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 object-contain"
                />
                Recanto do Park
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 px-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-navy-foreground/90 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <ThemeToggle className="text-navy-foreground/80" />
                <LanguageSwitcher className="text-navy-foreground/80" />
              </div>
              <BookNowButton label={t("bookNow")} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
