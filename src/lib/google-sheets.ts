import {
  adminMetrics,
  collections,
  featuredProducts,
  type AdminMetric,
  type Collection,
  type FeaturedProduct,
} from "@/lib/site-data";
import { parseCsv, rowsToObjects } from "@/lib/csv";

const spreadsheetId =
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID ??
  "1ee_1YHyeTkaILri8qKyk35So2mocTfr-RsYS3LEcCGo";

const publicCsvBase = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;

export type SiteContent = {
  collections: Collection[];
  featuredProducts: FeaturedProduct[];
  adminMetrics: AdminMetric[];
  source: "google-sheets" | "fallback";
};

export async function getSiteContent(): Promise<SiteContent> {
  const [sheetCollections, sheetProducts, sheetMetrics] = await Promise.all([
    getCollections(),
    getProducts(),
    getMetrics(),
  ]);

  const hasSheetData =
    sheetCollections.length > 0 ||
    sheetProducts.length > 0 ||
    sheetMetrics.length > 0;

  return {
    collections: sheetCollections.length > 0 ? sheetCollections : collections,
    featuredProducts:
      sheetProducts.length > 0 ? sheetProducts : featuredProducts,
    adminMetrics: sheetMetrics.length > 0 ? sheetMetrics : adminMetrics,
    source: hasSheetData ? "google-sheets" : "fallback",
  };
}

async function getCollections(): Promise<Collection[]> {
  const rows = await getSheetObjects("COLECCIONES");

  return rows
    .filter(isActive)
    .map((row) => ({
      order: Number(row.orden || 0),
      name: row.name || row.nombre,
      description: row.description || row.descripcion,
      image: row.image || row.imagen,
    }))
    .filter((collection) => collection.name && collection.image)
    .sort(byOrder)
    .map(stripOrder);
}

async function getProducts(): Promise<FeaturedProduct[]> {
  const rows = await getSheetObjects("PRODUCTOS");

  return rows
    .filter(isActive)
    .map((row) => ({
      order: Number(row.orden || 0),
      name: row.name || row.nombre || row.producto,
      category: row.category || row.categoria,
      price: row.price || row.precio,
      status: row.status || row.estado || "Disponible",
    }))
    .filter((product) => product.name && product.price)
    .sort(byOrder)
    .map(stripOrder);
}

async function getMetrics(): Promise<AdminMetric[]> {
  const rows = await getSheetObjects("ANALYTICS");

  return rows
    .map((row) => ({
      label: row.label || row.metrica,
      value: row.value || row.valor,
      change: row.change || row.cambio || "",
    }))
    .filter((metric) => metric.label && metric.value);
}

function isActive(row: Record<string, string>) {
  const value = row.activo || row.active;

  return !value || ["si", "true", "1", "activo", "yes"].includes(value.toLowerCase());
}

function byOrder(first: { order: number }, second: { order: number }) {
  return first.order - second.order;
}

function stripOrder<T extends { order: number }>(item: T): Omit<T, "order"> {
  const { order: _order, ...rest } = item;
  void _order;
  return rest;
}

async function getSheetObjects(sheetName: string) {
  try {
    const response = await fetch(
      `${publicCsvBase}&sheet=${encodeURIComponent(sheetName)}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const csv = await response.text();
    const rows = parseCsv(csv);
    const objects = rowsToObjects(rows);

    return isPlaceholderSheet(rows) ? [] : objects;
  } catch {
    return [];
  }
}

function isPlaceholderSheet(rows: string[][]) {
  const firstColumn = rows.map((row) => row[0]).filter(Boolean);
  const expectedSheets = [
    "PRODUCTOS",
    "COLECCIONES",
    "CONFIG_VISUAL",
    "BANNERS",
    "ANALYTICS",
    "PROMOCIONES",
    "FAQ",
  ];

  return (
    firstColumn.length === expectedSheets.length &&
    expectedSheets.every((sheet) => firstColumn.includes(sheet))
  );
}
