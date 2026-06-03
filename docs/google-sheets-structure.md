# Estructura profesional de Google Sheets

Spreadsheet: https://docs.google.com/spreadsheets/d/1k89uYizzD5b8WO52CH774AGiV0PZHKYNuOp_c6oaAwc/edit

## Reglas generales

- Usar una pestaña por entidad: productos, colecciones, configuracion, banners, promociones, FAQ y metricas.
- Fila 1 siempre son encabezados.
- `activo` controla si la landing debe mostrar el registro. Valores recomendados: `SI` o `NO`.
- `orden` controla el orden visual en la landing.
- Las imagenes pueden ser URLs de Cloudinary o URLs temporales de Unsplash mientras se construye.
- Los precios se guardan como texto colombiano, por ejemplo `$89.000`.

## PRODUCTOS

Columnas:

`id`, `nombre`, `categoria`, `descripcion`, `precio`, `precio_anterior`, `estado`, `destacado`, `stock`, `imagen`, `orden`, `activo`, `whatsapp_texto`

Uso:

- Alimenta productos destacados, catalogo futuro y clicks a WhatsApp.
- `destacado=SI` permite priorizar productos en la landing.
- `stock` puede ser `Disponible`, `Pocas unidades`, `Agotado` o `Preventa`.

## COLECCIONES

Columnas:

`id`, `nombre`, `descripcion`, `imagen`, `orden`, `activo`

Uso:

- Alimenta las tarjetas grandes de colecciones.
- Mantener 4 a 6 colecciones visibles al inicio.

## CONFIG_VISUAL

Columnas:

`clave`, `valor`, `descripcion`

Uso:

- Controla textos y tema visual sin tocar codigo.
- Ejemplos: `tema_activo`, `hero_titulo`, `hero_subtitulo`, `cta_principal`, `cta_secundario`.

## BANNERS

Columnas:

`id`, `titulo`, `subtitulo`, `imagen`, `cta_texto`, `cta_url`, `ubicacion`, `orden`, `activo`

Uso:

- Promos visuales por temporada.
- `ubicacion` puede ser `hero`, `promo_home`, `admin_preview`.

## ANALYTICS

Columnas:

`metrica`, `valor`, `cambio`, `periodo`, `notas`

Uso:

- Alimenta tarjetas del panel admin.
- Ejemplos: visitas, clicks WhatsApp, productos consultados, ventas registradas.

## PROMOCIONES

Columnas:

`id`, `nombre`, `descripcion`, `tipo`, `valor`, `fecha_inicio`, `fecha_fin`, `codigo`, `orden`, `activo`

Uso:

- Promociones temporales como San Valentin, Madres o Navidad.
- `tipo` puede ser `porcentaje`, `valor_fijo`, `combo` o `envio`.

## FAQ

Columnas:

`id`, `pregunta`, `respuesta`, `orden`, `activo`

Uso:

- Preguntas frecuentes de domicilio, pagos, tallas y cambios.
