import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { contactSchema } from "./contact-schema";
import { sendContactEmail } from "./mailer.server";

// Límite simple en memoria: máx. 5 envíos por IP cada 10 minutos.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export const enviarConsulta = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    // Bot detectado: respondemos "ok" sin enviar nada.
    if (data.website) return { ok: true };

    // nginx fija X-Real-IP con la IP real del visitante (X-Forwarded-For lo puede falsear el cliente).
    const ip = getRequestHeader("x-real-ip") ?? getRequestIP() ?? "desconocida";
    if (rateLimited(ip)) throw new Error("Demasiadas consultas. Intente más tarde.");

    await sendContactEmail(data);
    return { ok: true };
  });
