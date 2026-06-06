import {
  adminMetrics,
  banners,
  collections,
  faqItems,
  featuredProducts,
  promotions,
  siteConfig,
  type AdminMetric,
  type Banner,
  type Collection,
  type FaqItem,
  type FeaturedProduct,
  type Promotion,
  type SiteConfig,
} from "@/lib/site-data";
import { parseCsv, rowsToObjects } from "@/lib/csv";

const spreadsheetId =
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID ??
  "1k89uYizzD5b8WO52CH774AGiV0PZHKYNuOp_c6oaAwc";

const publicCsvBase = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
const sheetFetchTimeoutMs = 3500;

export type SiteContent = {
  collections: Collection[];
  featuredProducts: FeaturedProduct[];
  adminMetrics: AdminMetric[];
  config: SiteConfig;
  banners: Banner[];
  promotions: Promotion[];
  faqItems: FaqItem[];
  source: "google-sheets" | "fallback";
};

export async function getSiteContent(): Promise<SiteContent> {
  const [
    sheetCollections,
    sheetProducts,
    sheetMetrics,
    sheetConfig,
    sheetBanners,
    sheetPromotions,
    sheetFaqItems,
  ] = await Promise.all([
    getCollections(),
    getProducts(),
    getMetrics(),
    getConfig(),
    getBanners(),
    getPromotions(),
    getFaqItems(),
  ]);

  const hasSheetData =
    sheetCollections.length > 0 ||
    sheetProducts.length > 0 ||
    sheetMetrics.length > 0 ||
    Boolean(sheetConfig) ||
    sheetBanners.length > 0 ||
    sheetPromotions.length > 0 ||
    sheetFaqItems.length > 0;

  return {
    collections: sheetCollections.length > 0 ? sheetCollections : collections,
    featuredProducts:
      sheetProducts.length > 0 ? sheetProducts : featuredProducts,
    adminMetrics: sheetMetrics.length > 0 ? sheetMetrics : adminMetrics,
    config: sheetConfig ?? siteConfig,
    banners: sheetBanners.length > 0 ? sheetBanners : banners,
    promotions: sheetPromotions.length > 0 ? sheetPromotions : promotions,
    faqItems: sheetFaqItems.length > 0 ? sheetFaqItems : faqItems,
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

async function getConfig(): Promise<SiteConfig | null> {
  const rows = await getSheetObjects("CONFIG_VISUAL");

  if (rows.length === 0) {
    return null;
  }

  const configMap = rows.reduce<Record<string, string>>((config, row) => {
    if (row.clave) {
      config[row.clave] = row.valor;
    }
    return config;
  }, {});

  return {
    theme: configMap.tema_activo || siteConfig.theme,
    heroTitle: configMap.hero_titulo || siteConfig.heroTitle,
    heroSubtitle: configMap.hero_subtitulo || siteConfig.heroSubtitle,
    primaryCta: configMap.cta_principal || siteConfig.primaryCta,
    secondaryCta: configMap.cta_secundario || siteConfig.secondaryCta,
    city: configMap.ciudad || siteConfig.city,
  };
}

async function getBanners(): Promise<Banner[]> {
  const rows = await getSheetObjects("BANNERS");

  return rows
    .filter(isActive)
    .map((row) => ({
      order: Number(row.orden || 0),
      title: row.titulo || row.title,
      subtitle: row.subtitulo || row.subtitle,
      image: row.imagen || row.image,
      ctaText: row.cta_texto || row.cta || "Ver coleccion",
      ctaUrl: row.cta_url || row.url || "#colecciones",
      location: row.ubicacion || row.location || "promo_home",
    }))
    .filter((banner) => banner.title && isValidImageUrl(banner.image))
    .sort(byOrder)
    .map(stripOrder);
}

async function getPromotions(): Promise<Promotion[]> {
  const rows = await getSheetObjects("PROMOCIONES");

  return rows
    .filter(isActive)
    .map((row) => ({
      order: Number(row.orden || 0),
      name: row.nombre || row.name,
      description: row.descripcion || row.description,
      type: row.tipo || row.type,
      value: row.valor || row.value,
      code: row.codigo || row.code,
    }))
    .filter((promotion) => promotion.name && promotion.description)
    .sort(byOrder)
    .map(stripOrder);
}

async function getFaqItems(): Promise<FaqItem[]> {
  const rows = await getSheetObjects("FAQ");

  return rows
    .filter(isActive)
    .map((row) => ({
      order: Number(row.orden || 0),
      question: row.pregunta || row.question,
      answer: row.respuesta || row.answer,
    }))
    .filter((faqItem) => faqItem.question && faqItem.answer)
    .sort(byOrder)
    .map(stripOrder);
}

function isActive(row: Record<string, string>) {
  const value = row.activo || row.active;

  return !value || ["si", "true", "1", "activo", "yes"].includes(value.toLowerCase());
}

function byOrder(first: { order: number }, second: { order: number }) {
  return first.order - second.order;
}

function isValidImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function stripOrder<T extends { order: number }>(item: T): Omit<T, "order"> {
  const { order: _order, ...rest } = item;
  void _order;
  return rest;
}

async function getSheetObjects(sheetName: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), sheetFetchTimeoutMs);
    const response = await fetch(
      `${publicCsvBase}&sheet=${encodeURIComponent(sheetName)}`,
      {
        next: { revalidate: 300 },
        signal: controller.signal,
      },
    );
    clearTimeout(timeout);

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
