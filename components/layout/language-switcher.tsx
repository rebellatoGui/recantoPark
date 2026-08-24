"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const flags: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

const names: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={names[locale]}
            className={cn(
              "flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-base transition-colors hover:bg-white/15",
              className
            )}
          />
        }
      >
        <span className="text-lg leading-none">{flags[locale]}</span>
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="rounded-2xl border-none p-1.5 shadow-lg ring-1 ring-black/5 duration-150 data-open:zoom-in-100 data-closed:zoom-out-100"
      >
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "gap-2 rounded-xl px-3 py-2 text-sm",
              loc === locale && "font-semibold"
            )}
          >
            <span className="text-base">{flags[loc]}</span>
            {names[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
