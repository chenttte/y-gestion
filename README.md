# Y-Gestión — landing page

Landing de Y-Gestión, el sistema para Juntas de Saneamiento y Aguaterías de Paraguay.
Está hecha con TanStack Start (React 19 con renderizado en el servidor), Vite y Tailwind 4.
No usa servicios externos: el formulario de contacto envía un correo por SMTP desde el
servidor, y la fuente tipográfica está incluida en el proyecto.

## Estructura

- `src/routes/index.tsx`: la landing; `src/routes/privacidad.tsx`: la política de privacidad.
- `src/lib/contact.ts`: marca, WhatsApp, teléfono, correo y dirección que se muestran en la página.
- `src/components/ContactForm.tsx`: el formulario; llama a `enviarConsulta` (`src/lib/contact.functions.ts`),
  que valida con `src/lib/contact-schema.ts` y envía el correo con `src/lib/mailer.server.ts`.
- `src/components/ui/`: componentes shadcn/ui disponibles (no usados por ahora).

## Desarrollo

```sh
cp .env.example .env   # completar las credenciales SMTP
bun install
bun run dev            # usa el primer puerto libre desde 3000 (lo muestra en la terminal)
bun run test
```

## Producción (Docker)

```sh
docker compose up -d --build   # expone el puerto ${YG_PORT:-3030}
```

Sin Docker: `bun run build && bun run start` (lee las variables del entorno, no del `.env`).

El prompt original con el que se generó la página está en `docs/prompt-original.md`.
