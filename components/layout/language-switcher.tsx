"use client";

import type { ComponentType } from "react";
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
import { FlagBR, FlagUS, FlagES } from "@/components/icons/flag-icons";

const flags: Record<string, ComponentType<{ className?: string }>> = {
  pt: FlagBR,
  en: FlagUS,
  es: FlagES,
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
              "flex items-center gap-2 rounded-full bg-navy/8 px-3.5 py-2 text-base transition-colors hover:bg-navy/15 dark:bg-white/10 dark:hover:bg-white/15",
              className
            )}
          />
        }
      >
        <span className="block size-4 overflow-hidden rounded-[3px]">
          {(() => {
            const Flag = flags[locale];
            return <Flag className="size-full object-cover" />;
          })()}
        </span>
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="rounded-2xl border-none p-1.5 shadow-lg ring-1 ring-black/5 duration-150 data-open:zoom-in-100 data-closed:zoom-out-100"
      >
        {routing.locales.map((loc) => {
          const Flag = flags[loc];
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => router.replace(pathname, { locale: loc })}
              className={cn(
                "gap-2 rounded-xl px-3 py-2 text-sm",
                loc === locale && "font-semibold"
              )}
            >
              <span className="block size-4 shrink-0 overflow-hidden rounded-[3px]">
                <Flag className="size-full object-cover" />
              </span>
              {names[loc]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
