import Script from "next/script";

const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

// This lint rule predates the App Router and only recognizes
// pages/_document.js as a valid home for beforeInteractive scripts.
// app/layout.tsx (the root layout) is the documented App Router
// equivalent: https://nextjs.org/docs/app/api-reference/components/script
export function ThemeScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
