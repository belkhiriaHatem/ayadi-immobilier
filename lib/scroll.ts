import type Lenis from "lenis";

/** Offset for fixed header (matches scroll-padding-top on html). */
export const SECTION_SCROLL_OFFSET = 96;

export function scrollToSection(
  target: string,
  lenis?: Lenis | null,
  options?: { immediate?: boolean }
) {
  const hash = target.startsWith("#") ? target : `#${target}`;

  if (lenis) {
    lenis.scrollTo(hash, { offset: SECTION_SCROLL_OFFSET, ...options });
    return;
  }

  const element = document.querySelector(hash);
  if (!element) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({
    behavior: reduceMotion ? "instant" : "smooth",
    block: "start",
  });
}
