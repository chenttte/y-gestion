import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { contactSchema as schema } from "@/lib/contact-schema";
import { enviarConsulta } from "@/lib/contact.functions";

const field = "mt-1.5 w-full rounded-md border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await enviarConsulta({ data: parsed.data });
    } catch {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold text-ink">¡Gracias! Recibimos su consulta.</h3>
        <p className="mt-2 text-muted-foreground">Le escribiremos para coordinar la demostración.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">Nombre y apellido*<input name="nombre" maxLength={100} className={field} />{err("nombre")}</label>
        <label className="text-sm font-semibold text-ink">Correo electrónico*<input name="correo" type="email" maxLength={255} className={field} />{err("correo")}</label>
        <label className="text-sm font-semibold text-ink">Teléfono<input name="telefono" type="tel" maxLength={30} className={field} /></label>
        <label className="text-sm font-semibold text-ink">Nombre de la Junta o Aguatería*<input name="junta" maxLength={150} className={field} />{err("junta")}</label>
        {/* Honeypot anti-spam: oculto para personas, los bots suelen completarlo */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="text-sm font-semibold text-ink sm:col-span-2">Mensaje (opcional)<textarea name="mensaje" rows={4} maxLength={1000} className={field} /></label>
      </div>
      {status === "error" && <p className="mt-4 text-sm text-destructive">No pudimos enviar su consulta. Intente de nuevo o escríbanos por WhatsApp.</p>}
      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
        <Send className="h-4 w-4" /> {status === "sending" ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
