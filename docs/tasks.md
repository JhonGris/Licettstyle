# Tareas Licett Style

## Base creada

- [x] Inicializar proyecto Next.js con App Router.
- [x] Crear landing publica de Licett Style.
- [x] Crear pagina `/admin`.
- [x] Definir tokens visuales en `globals.css`.
- [x] Crear `AGENTS.md` con reglas del proyecto.

## Landing

- [ ] Reemplazar imagenes de referencia por fotos reales de productos.
- [x] Definir numero real de WhatsApp Business.
- [ ] Ajustar textos finales de colecciones.
- [ ] Crear seccion de promociones.
- [ ] Agregar FAQ corta.

## Google Sheets

- [x] Registrar ID de spreadsheet de Licett Style.
- [x] Crear lector publico CSV con fallback a datos de ejemplo.
- [ ] Dar permiso al conector de Google Drive para editar la hoja.
- [ ] Crear pestañas reales: PRODUCTOS, COLECCIONES, CONFIG_VISUAL, BANNERS, ANALYTICS, PROMOCIONES, FAQ.
- [ ] Definir encabezados por pestaña.

## Cloudinary

- [x] Instalar paquete `cloudinary`.
- [x] Crear helper server-side con inicializacion perezosa.
- [ ] Configurar `CLOUDINARY_API_SECRET` en `.env.local` y Vercel.
- [ ] Subir imagenes reales de productos.
- [ ] Guardar `public_id` o URL optimizada en Google Sheets.

## Admin

- [x] Conectar Google Sheets como CMS de lectura con fallback.
- [x] Preparar Cloudinary para imagenes.
- [ ] Proteger `/admin` con autenticacion simple.
- [ ] Crear selector de tema visual.

## Medicion

- [ ] Instalar Google Analytics 4.
- [ ] Instalar Microsoft Clarity.
- [ ] Instalar Meta Pixel.
- [ ] Medir clicks a producto.
- [ ] Medir clicks a WhatsApp.
- [ ] Registrar conversion manual o automatizada.

## Deploy

- [x] Crear repositorio remoto `JhonGris/Licettstyle`.
- [ ] Conectar repo a Vercel.
- [ ] Crear variables de entorno.
- [ ] Comprar o conectar dominio.
