import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/google-sheets";
import { whatsappUrl } from "@/lib/site-data";

export default async function Home() {
  const {
    banners,
    collections,
    config,
    faqItems,
    featuredProducts,
    promotions,
  } = await getSiteContent();
  const heroBanner = banners.find((banner) => banner.location === "hero") ?? banners[0];

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/35 bg-white/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="text-lg font-semibold uppercase tracking-[0.18em]" href="#">
            Licett <span className="font-light">Style</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-muted md:flex">
            <a href="#colecciones">Colecciones</a>
            <a href="#novedades">Novedades</a>
            <a href="#promociones">Promos</a>
            <a href="#faq">FAQ</a>
            <Link href="/admin">Admin</Link>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-rose"
            href={whatsappUrl}
          >
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden bg-surface-soft pt-16">
        <Image
          src={heroBanner.image}
          alt={heroBanner.title}
          fill
          priority
          className="object-contain object-right-bottom"
          sizes="100vw"
        />
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-rose"
                href={whatsappUrl}
              >
                {config.primaryCta}
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/20 bg-white/70 px-7 text-sm font-semibold text-ink transition hover:border-rose hover:text-rose"
                href={heroBanner.ctaUrl || "#colecciones"}
              >
                {config.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="colecciones" className="mx-auto max-w-7xl px-5 py-18 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-rose">
              Colecciones
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Producto visible, compra rapida
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-muted">
            Una experiencia limpia: pocas opciones, fotos grandes y llamadas a
            WhatsApp en el momento correcto.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {collections.map((collection) => (
            <article
              className="group overflow-hidden rounded-lg border border-line bg-surface"
              key={collection.name}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={`Coleccion ${collection.name} de Licett Style`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-ink">
                  {collection.name}
                </h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-muted">
                  {collection.description}
                </p>
                <a
                  className="mt-5 inline-flex text-sm font-semibold text-rose"
                  href={whatsappUrl}
                >
                  Ver coleccion
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="novedades" className="bg-surface-soft py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-rose">
              Novedades
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Lo que mas deberia consultarse primero
            </h2>
          </div>
          <div className="grid gap-3">
            {featuredProducts.map((product) => (
              <article
                className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border border-line bg-white p-5"
                key={product.name}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-rose">
                    {product.status}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted">{product.category}</p>
                </div>
                <p className="font-mono text-base font-semibold text-ink">
                  {product.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="promociones" className="mx-auto max-w-7xl px-5 py-18 sm:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-rose">
              Promociones
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Ofertas listas para consultar
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-muted">
            Promos administradas desde Google Sheets para activar temporadas sin
            tocar codigo.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {promotions.map((promotion) => (
            <article
              className="rounded-lg border border-line bg-surface p-6"
              key={promotion.name}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-rose">
                    {promotion.type}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">
                    {promotion.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {promotion.description}
                  </p>
                </div>
                <p className="rounded-full bg-surface-soft px-4 py-2 font-mono text-sm font-semibold text-ink">
                  {promotion.code}
                </p>
              </div>
              <a
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-rose"
                href={whatsappUrl}
              >
                Consultar promo
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="beneficios" className="mx-auto max-w-7xl px-5 py-18 sm:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Disenos exclusivos", "Colecciones pequenas con identidad propia."],
            ["Telas suaves", "Comodidad real para dormir y estar en casa."],
            ["Domicilio en Cali", "Venta directa y atencion cercana por WhatsApp."],
            ["Marca viva", "Temas por temporada desde el panel admin."],
          ].map(([title, copy]) => (
            <article className="rounded-lg border border-line bg-surface p-6" key={title}>
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-surface-soft py-18">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-rose">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <article className="rounded-lg border border-line bg-white p-5" key={item.question}>
                <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
