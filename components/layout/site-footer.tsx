import Image from "next/image";
import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, PawPrint, CalendarCheck } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { MastercardIcon } from "@/components/icons/mastercard-icon";
import { VisaIcon } from "@/components/icons/visa-icon";
import { PixIcon } from "@/components/icons/pix-icon";
import { EloIcon } from "@/components/icons/elo-icon";
import { BoletoIcon } from "@/components/icons/boleto-icon";
import { contact, whatsappLink } from "@/lib/data/pousada";
import { HashLink } from "@/components/layout/hash-link";

const paymentIcons = [
  { Icon: PixIcon, label: "Pix" },
  { Icon: VisaIcon, label: "Visa" },
  { Icon: MastercardIcon, label: "Mastercard" },
  { Icon: EloIcon, label: "Elo" },
  { Icon: BoletoIcon, label: "Boleto" },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-gold">{children}</h2>
  );
}

function ContactItem({
  href,
  Icon,
  children,
  external = true,
}: {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group flex min-h-11 items-start gap-3 py-2.5 transition-colors hover:text-gold lg:min-h-0 lg:py-1.5"
      >
        <Icon className="mt-0.5 size-4 shrink-0 text-gold/80 transition-colors group-hover:text-gold" />
        <span className="break-words">{children}</span>
      </a>
    </li>
  );
}

export function SiteFooter() {
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const tInfo = useTranslations("essentialInfo");
  const tAmenities = useTranslations("amenities");

  const navLinks = [
    { href: "/", label: tNav("home"), hash: false },
    { href: "/acomodacoes", label: tNav("accommodations"), hash: false },
    { href: "/#servicos", label: tNav("amenities"), hash: true },
    { href: "/#maps", label: tNav("location"), hash: true },
  ];

  const stayInfo = [
    { Icon: Clock, text: tAmenities("items.reception") },
    {
      Icon: CalendarCheck,
      text: `${tInfo("cancellationLabel")}: ${tInfo("cancellationValue")}`,
    },
    { Icon: PawPrint, text: `${tInfo("petLabel")}: ${tInfo("petValue")}` },
  ];

  const linkClass =
    "inline-flex min-h-11 items-center transition-colors hover:text-gold lg:min-h-0 lg:py-1.5";

  return (
    <footer
      id="contato"
      className="border-t border-white/10 bg-navy text-navy-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-28 sm:pb-10 md:pt-20">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-y-12 lg:grid-cols-12">
          <div className="sm:col-span-6 lg:col-span-4">
            <Link
              href="/"
              aria-label="Pousada Recanto do Park"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/brand/logo.png"
                alt="Pousada Recanto do Park"
                width={1391}
                height={876}
                className="h-auto w-36 sm:w-44"
                sizes="176px"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
              {tFooter("description")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-navy-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <WhatsappIcon className="size-5" />
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-navy-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>

          <nav aria-label={tFooter("navTitle")} className="sm:col-span-2 lg:col-span-2">
            <ColumnTitle>{tFooter("navTitle")}</ColumnTitle>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm text-navy-foreground/70 sm:grid-cols-1 lg:mt-4">
              {navLinks.map(({ href, label, hash }) => (
                <li key={href}>
                  {hash ? (
                    <HashLink href={href} className={linkClass}>
                      {label}
                    </HashLink>
                  ) : (
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <ColumnTitle>{tContact("title")}</ColumnTitle>
            <ul className="mt-3 text-sm text-navy-foreground/70 lg:mt-4">
              <ContactItem href={whatsappLink()} Icon={WhatsappIcon}>
                {contact.phoneDisplay}
              </ContactItem>
              <ContactItem
                href={`mailto:${contact.email}`}
                Icon={Mail}
                external={false}
              >
                {contact.email}
              </ContactItem>
              <ContactItem href={contact.googleMapsUrl} Icon={MapPin}>
                {tContact("address")}
              </ContactItem>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <ColumnTitle>{tFooter("stayTitle")}</ColumnTitle>
            <ul className="mt-3 text-sm text-navy-foreground/70 lg:mt-4">
              {stayInfo.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 py-2.5 lg:py-1.5">
                  <Icon className="mt-0.5 size-4 shrink-0 text-gold/80" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-6 border-t border-white/10 pt-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-navy-foreground/55">
            © {new Date().getFullYear()} Pousada Recanto do Park.{" "}
            {tFooter("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-navy-foreground/55">
              {tFooter("paymentMethods")}
            </span>
            <ul className="flex items-center gap-2">
              {paymentIcons.map(({ Icon, label }) => (
                <li
                  key={label}
                  title={label}
                  className="flex h-8 w-11 items-center justify-center rounded-md bg-white"
                >
                  <Icon className="size-5" />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
