"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Banner, SiteConfig } from "@/lib/site-data";

type HeroCarouselProps = {
  slides: Banner[];
  config: SiteConfig;
  whatsappUrl: string;
};

export function HeroCarousel({
  slides,
  config,
  whatsappUrl,
}: HeroCarouselProps) {
  const safeSlides = useMemo(
    () => (slides.length > 0 ? slides : []),
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = safeSlides[activeIndex];

  useEffect(() => {
    if (safeSlides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [safeSlides.length]);

  function goToSlide(index: number) {
    setActiveIndex(index);
  }

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? safeSlides.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % safeSlides.length);
  }

  if (!activeSlide) {
    return null;
  }

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-surface-soft pt-16">
      {safeSlides.map((slide, index) => (
        <Image
          key={`${slide.image}-${slide.title}`}
          src={slide.image}
          alt={slide.title}
          fill
          priority={index === 0}
          className={`object-contain object-right-bottom transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,248,0.98)_0%,rgba(255,250,248,0.84)_38%,rgba(255,250,248,0.18)_72%)]" />
      <div className="relative mx-auto flex min-h-[calc(92svh-4rem)] max-w-7xl items-center px-5 py-16 sm:px-8">
        <div className="max-w-xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-rose">
            Pijamas en {config.city}
          </p>
          <h1 className="text-5xl font-semibold leading-[0.95] text-ink sm:text-7xl">
            {config.heroTitle}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            {config.heroSubtitle}
          </p>
          <p className="mt-5 max-w-md text-sm font-medium leading-6 text-rose">
            {activeSlide.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-rose"
              href={whatsappUrl}
            >
              {config.primaryCta}
            </a>
            <a
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/20 bg-white/70 px-7 text-sm font-semibold text-ink transition hover:border-rose hover:text-rose"
              href={activeSlide.ctaUrl || "#colecciones"}
            >
              {activeSlide.ctaText || config.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {safeSlides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex gap-2">
            {safeSlides.map((slide, index) => (
              <button
                aria-label={`Ver banner ${index + 1}: ${slide.title}`}
                className={`h-2.5 w-8 rounded-full transition ${
                  index === activeIndex ? "bg-ink" : "bg-ink/25"
                }`}
                key={`${slide.title}-${index}`}
                onClick={() => goToSlide(index)}
                type="button"
              />
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              aria-label="Banner anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/75 text-xl text-ink backdrop-blur transition hover:border-rose hover:text-rose"
              onClick={goToPrevious}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Siguiente banner"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/75 text-xl text-ink backdrop-blur transition hover:border-rose hover:text-rose"
              onClick={goToNext}
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
