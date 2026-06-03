import Link from "next/link";
import { adminMetrics, featuredProducts } from "@/lib/site-data";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f6f1ee] px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <div>
            <Link className="text-sm font-semibold text-rose" href="/">
              Licett Style
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">Panel admin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Vista base para productos, temas visuales, promociones y metricas.
              En la siguiente etapa se conecta con Google Sheets, Cloudinary y
              eventos de analytics.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
            href="/"
          >
            Ver landing
          </Link>
        </header>

        <section className="grid gap-4 py-6 md:grid-cols-4">
          {adminMetrics.map((metric) => (
            <article className="rounded-lg border border-line bg-white p-5" key={metric.label}>
              <p className="text-sm text-muted">{metric.label}</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="font-mono text-3xl font-semibold">{metric.value}</p>
                <p className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-rose">
                  {metric.change}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-line bg-white">
            <div className="border-b border-line p-5">
              <h2 className="text-xl font-semibold">Productos destacados</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-surface-soft text-muted">
                  <tr>
                    <th className="px-5 py-3 font-medium">Producto</th>
                    <th className="px-5 py-3 font-medium">Categoria</th>
                    <th className="px-5 py-3 font-medium">Precio</th>
                    <th className="px-5 py-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {featuredProducts.map((product) => (
                    <tr className="border-t border-line" key={product.name}>
                      <td className="px-5 py-4 font-medium">{product.name}</td>
                      <td className="px-5 py-4 text-muted">{product.category}</td>
                      <td className="px-5 py-4 font-mono">{product.price}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[#f3dfdc] px-3 py-1 text-xs font-semibold text-rose">
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-lg border border-line bg-white p-5">
            <h2 className="text-xl font-semibold">Tema activo</h2>
            <div className="mt-5 grid gap-3">
              {["Nude", "Lavanda", "Azul Cielo", "Navidad", "Madres"].map(
                (theme, index) => (
                  <div
                    className="flex items-center justify-between rounded-lg border border-line p-4"
                    key={theme}
                  >
                    <span className="font-medium">{theme}</span>
                    <span className="text-sm text-muted">
                      {index === 0 ? "Activo" : "Disponible"}
                    </span>
                  </div>
                ),
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
