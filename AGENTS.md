# AGENTS.md

## Proyecto

Licett Style es una landing comercial para pijamas femeninas en Cali. La direccion visual combina estructura tipo SKIMS con sensacion tranquila tipo Lunya, siempre orientada a compra por WhatsApp.

## Principios

- Producto protagonista: fotos grandes, colecciones visibles y botones claros.
- Mobile primero: la compra por WhatsApp debe estar disponible sin friccion.
- UI limpia: pocos enlaces, buen espacio, tarjetas simples con radio maximo de 8px.
- Marca cercana: moderna, femenina, elegante y local.
- Admin practico: Google Sheets como CMS inicial, Cloudinary para imagenes, GA4/Clarity/Meta Pixel para medicion.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel para hosting
- Google Sheets como fuente de datos futura
- Cloudinary para imagenes futuras
- WhatsApp Business para ventas

## Reglas de implementacion

- Mantener la landing publica rapida y cacheable.
- Mantener componentes interactivos como Client Components solo cuando sea necesario.
- No conectar SDKs en scope global; inicializarlos de forma perezosa cuando se agreguen integraciones.
- Evitar menus largos y textos explicativos innecesarios dentro de la UI.
- Antes de cambiar diseno global, revisar `src/app/globals.css`.

## Rutas

- `/`: landing publica.
- `/admin`: panel administrativo inicial.

## Proximas integraciones

- Google Sheets: productos, colecciones, banners, temas, promociones y FAQ.
- Cloudinary: carga y seleccion de imagenes.
- Analytics: visitas, clicks de producto, clicks a WhatsApp y ventas registradas.
