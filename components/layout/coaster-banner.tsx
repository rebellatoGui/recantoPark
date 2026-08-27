import Image from "next/image";

export function CoasterBanner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/brand/menu-lateral-mobile-transparent.png"
        alt="Pousada Recanto do Park"
        width={1351}
        height={422}
        className="h-auto w-full object-contain dark:brightness-0 dark:invert dark:opacity-90"
      />
    </div>
  );
}
