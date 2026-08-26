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
      className="sticky top-0 z-40 border-b border-navy/10 bg-[#efefef] text-navy shadow-none transition-shadow duration-300 [&.is-scrolled]:shadow-lg [&.is-scrolled]:shadow-black/10 dark:border-white/10 dark:bg-navy dark:text-navy-foreground"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 transition-[padding] duration-300 sm:py-5 [.is-scrolled_&]:py-3 sm:[.is-scrolled_&]:py-3.5">
        <Link
          href="/"
          className="w-20 shrink-0 transition-opacity duration-300 hover:opacity-80 sm:w-24 md:w-28"
        >
          <Image
            src="/brand/logo-oficial.png"
            alt="Pousada Recanto do Park"
            width={1254}
            height={1254}
            priority
            className="absolute bottom-0 left-6 z-10 h-20 w-20 translate-y-1/2 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] dark:rounded-2xl sm:h-24 sm:w-24 md:h-28 md:w-28"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm tracking-wide text-navy/70 transition-colors hover:text-gold dark:text-navy-foreground/80"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-navy/70 dark:text-navy-foreground/80" />
            <LanguageSwitcher className="text-navy/70 dark:text-navy-foreground/80" />
          </div>
          <span className="h-5 w-px bg-navy/15 dark:bg-white/15" aria-hidden />
          <BookNowButton label={t("bookNow")} className="h-10 px-5" />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-navy lg:hidden dark:text-navy-foreground"
                aria-label="Menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-white text-navy dark:bg-navy dark:text-navy-foreground">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Image
                  src="/brand/logo-oficial.png"
                  alt="Pousada Recanto do Park"
                  width={1254}
                  height={1254}
                  className="size-9 shrink-0 object-contain dark:rounded-xl"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 px-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-navy/80 hover:text-gold dark:text-navy-foreground/90"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <ThemeToggle className="text-navy/70 dark:text-navy-foreground/80" />
                <LanguageSwitcher className="text-navy/70 dark:text-navy-foreground/80" />
              </div>
              <BookNowButton label={t("bookNow")} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
