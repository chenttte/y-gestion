import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("acepta una consulta válida", () => {
    const r = contactSchema.safeParse({
      nombre: " Ana ",
      correo: "ana@example.com",
      junta: "Junta de Saneamiento Itá",
    });
    expect(r.success).toBe(true);
    expect(r.success && r.data.nombre).toBe("Ana");
  });

  it("rechaza correo inválido y junta vacía", () => {
    const r = contactSchema.safeParse({ nombre: "Ana", correo: "no-es-correo", junta: " " });
    expect(r.success).toBe(false);
    const campos = r.success ? [] : r.error.issues.map((i) => i.path[0]);
    expect(campos).toEqual(expect.arrayContaining(["correo", "junta"]));
  });
});
