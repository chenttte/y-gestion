import nodemailer from "nodemailer";
import type { ContactInput } from "./contact-schema";

// Solo se ejecuta en el servidor: las credenciales SMTP nunca llegan al navegador.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

let transporter: nodemailer.Transporter | undefined;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const port = Number(process.env["SMTP_PORT"] ?? 587);
    const secureEnv = process.env["SMTP_SECURE"];
    transporter = nodemailer.createTransport({
      host: requireEnv("SMTP_HOST"),
      port,
      // 465 = TLS directo; 587 = STARTTLS. SMTP_SECURE permite forzarlo.
      secure: secureEnv ? secureEnv === "true" : port === 465,
      auth: { user: requireEnv("SMTP_USER"), pass: requireEnv("SMTP_PASS") },
    });
  }
  return transporter;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export async function sendContactEmail(v: ContactInput): Promise<void> {
  const text = [
    `Nombre: ${oneLine(v.nombre)}`,
    `Correo: ${v.correo}`,
    `Teléfono: ${oneLine(v.telefono || "-")}`,
    `Junta / Aguatería: ${oneLine(v.junta)}`,
    "",
    "Mensaje:",
    v.mensaje || "(sin mensaje)",
  ].join("\n");

  await getTransporter().sendMail({
    from: process.env["CONTACT_FROM"] ?? requireEnv("SMTP_USER"),
    to: requireEnv("CONTACT_TO"),
    replyTo: { name: oneLine(v.nombre), address: v.correo },
    subject: `Nueva consulta web: ${oneLine(v.junta)}`,
    text,
  });
}
