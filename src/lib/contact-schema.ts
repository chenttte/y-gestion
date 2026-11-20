import { z } from "zod";

// Compartido entre el formulario (navegador) y la función de servidor que envía el correo.
export const contactSchema = z.object({
  nombre: z.string().trim().min(1, "Ingrese su nombre").max(100),
  correo: z.string().trim().email("Correo no válido").max(255),
  telefono: z.string().trim().max(30).optional(),
  junta: z.string().trim().min(1, "Ingrese el nombre de su Junta").max(150),
  mensaje: z.string().trim().max(1000).optional(),
  // Campo trampa (honeypot): invisible para personas; si viene con texto, es un bot.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
