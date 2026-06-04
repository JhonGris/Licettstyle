export const whatsappUrl =
  "https://wa.me/5703169739942?text=Hola%20Licett%20Style%2C%20quiero%20ver%20la%20colecci%C3%B3n";

export type Collection = {
  name: string;
  description: string;
  image: string;
};

export type FeaturedProduct = {
  name: string;
  category: string;
  price: string;
  status: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  change: string;
};

export type SiteConfig = {
  theme: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  city: string;
};

export type Banner = {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaUrl: string;
  location: string;
};

export type Promotion = {
  name: string;
  description: string;
  type: string;
  value: string;
  code: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const siteConfig: SiteConfig = {
  theme: "Nude",
  heroTitle: "Descansa con estilo",
  heroSubtitle:
    "Pijamas femeninas con telas suaves, colores tranquilos y compra directa por WhatsApp.",
  primaryCta: "Comprar por WhatsApp",
  secondaryCta: "Ver coleccion",
  city: "Cali",
};

export const banners: Banner[] = [
  {
    title: "Nueva coleccion satinada",
    subtitle: "Tonos suaves para regalar o descansar con estilo",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1800&q=88",
    ctaText: "Ver coleccion",
    ctaUrl: "#colecciones",
    location: "hero",
  },
];

export const promotions: Promotion[] = [
  {
    name: "Combo descanso",
    description: "Lleva dos pijamas seleccionadas con precio especial.",
    type: "combo",
    value: "2x precio especial",
    code: "COMBO2",
  },
  {
    name: "Envio Cali",
    description: "Envio local con tarifa preferencial.",
    type: "envio",
    value: "Consultar por zona",
    code: "CALI",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Hacen domicilio en Cali?",
    answer: "Si, coordinamos domicilio por WhatsApp segun la zona.",
  },
  {
    question: "Como puedo comprar?",
    answer: "Elige la referencia y escribenos para confirmar talla, color y disponibilidad.",
  },
  {
    question: "Que medios de pago reciben?",
    answer: "Inicialmente transferencia y pago acordado por WhatsApp.",
  },
];

export const collections: Collection[] = [
  {
    name: "Satinadas",
    description: "Brillo suave, caida elegante y colores listos para regalo.",
    image:
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Algodon",
    description: "Piezas frescas para dormir comoda en clima caleno.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Shorts",
    description: "Sets ligeros para descanso diario y fines de semana.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Premium",
    description: "Detalles finos, tonos tranquilos y sensacion de bienestar.",
    image:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=900&q=85",
  },
];

export const featuredProducts: FeaturedProduct[] = [
  {
    name: "Set Lavanda Satin",
    category: "Satinadas",
    price: "$89.000",
    status: "Nuevo",
  },
  {
    name: "Pijama Nude Algodon",
    category: "Algodon",
    price: "$72.000",
    status: "Mas consultado",
  },
  {
    name: "Short Arena",
    category: "Shorts",
    price: "$58.000",
    status: "Promo",
  },
];

export const adminMetrics: AdminMetric[] = [
  { label: "Visitas", value: "1.248", change: "+18%" },
  { label: "Clicks WhatsApp", value: "186", change: "+31%" },
  { label: "Productos consultados", value: "73", change: "+12%" },
  { label: "Ventas registradas", value: "24", change: "+9%" },
];
