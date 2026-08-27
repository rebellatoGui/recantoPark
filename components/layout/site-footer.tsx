import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { MastercardIcon } from "@/components/icons/mastercard-icon";
import { VisaIcon } from "@/components/icons/visa-icon";
import { PixIcon } from "@/components/icons/pix-icon";
import { EloIcon } from "@/components/icons/elo-icon";
import { BoletoIcon } from "@/components/icons/boleto-icon";
import { contact, whatsappLink } from "@/lib/data/pousada";

const paymentIcons = [
  { Icon: PixIcon, label: "Pix" },
  { Icon: VisaIcon, label: "Visa" },
  { Icon: MastercardIcon, label: "Mastercard" },
  { Icon: EloIcon, label: "Elo" },
  { Icon: BoletoIcon, label: "Boleto" },
];

export function SiteFooter() {
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <footer id="contato" className="border-t border-white/10 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:gap-10 sm:py-16 md:grid-cols-3">
        <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
          <Logo spin={false} className="size-28 sm:size-40" />
          <p className="max-w-xs text-sm text-navy-foreground/70">
            {tFooter("madeWith")}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-display text-base text-gold">{tNav("home")}</p>
          <nav className="flex flex-col gap-2 text-navy-foreground/70">
            <Link href="/" className="hover:text-gold">
              {tNav("home")}
            </Link>
            <Link href="/acomodacoes" className="hover:text-gold">
              {tNav("accommodations")}
            </Link>
            <Link href="/#localizacao" className="hover:text-gold">
              {tNav("location")}
            </Link>
          </nav>
        </div>

        <div className="space-y-3 text-sm text-navy-foreground/70">
          <p className="font-display text-base text-gold">
            {tContact("title")}
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {tContact("address")}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <Phone className="size-4 shrink-0" />
            {tContact("phoneLabel")}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-gold"
          >
            <Mail className="size-4 shrink-0" />
            {contact.email}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <InstagramIcon className="size-4 shrink-0" />
            {contact.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-navy-foreground/40">
            {tFooter("paymentMethods")}
          </p>
          <div className="flex items-center gap-3">
            {paymentIcons.map(({ Icon, label }) => (
              <span
                key={label}
                className="flex size-10 items-center justify-center rounded-lg bg-white"
              >
                <Icon className="size-6" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-navy-foreground/50">
        © {new Date().getFullYear()} Recanto do Park. {tFooter("rights")}
      </div>
    </footer>
  );
}
