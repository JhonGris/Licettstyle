import Image from "next/image";
import { collections, featuredProducts, whatsappUrl } from "@/lib/site-data";

export default function Home() {
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
            <a href="#beneficios">Beneficios</a>
            <a href="/admin">Admin</a>
          </div>
          <a
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-rose"
            href={whatsappUrl}
          >
            WhatsApp
          </a>
        </nav>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden pt-16">
        <Image
          src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1800&q=88"
          alt="Modelo con ropa de descanso en tonos suaves"
          fill
          priority
          className="object-cover object-[58%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,248,0.95)_0%,rgba(255,250,248,0.72)_38%,rgba(255,250,248,0.12)_72%)]" />
        <div className="relative mx-auto flex min-h-[calc(92svh-4rem)] max-w-7xl items-center px-5 py-16 sm:px-8">
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-rose">
              Pijamas en Cali
            </p>
            <h1 className="text-5xl font-semibold leading-[0.95] text-ink sm:text-7xl">
              Descansa con estilo
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted">
              Pijamas femeninas con telas suaves, colores tranquilos y compra
              directa por WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-rose"
                href={whatsappUrl}
              >
                Comprar por WhatsApp
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-ink/20 bg-white/70 px-7 text-sm font-semibold text-ink transition hover:border-rose hover:text-rose"
                href="#colecciones"
              >
                Ver coleccion
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
    </main>
  );
}
