import { createFileRoute, Link } from "@tanstack/react-router";
import { BRAND, EMAIL } from "@/lib/contact";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: `Política de privacidad | ${BRAND}` },
      { name: "description", content: `Cómo ${BRAND} protege los datos de las Juntas de Saneamiento y sus usuarios.` },
      { property: "og:title", content: `Política de privacidad | ${BRAND}` },
      { property: "og:description", content: "Tratamiento y protección de datos personales." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <Link to="/" className="text-sm font-semibold text-primary">← Volver al inicio</Link>
      <h1 className="mt-6 text-4xl font-extrabold text-navy">Política de privacidad</h1>
      <div className="mt-8 space-y-5 text-lg text-muted-foreground">
        <p>En {BRAND} tratamos la información de las organizaciones y de sus usuarios con estricta confidencialidad. Los datos se utilizan únicamente para prestar el servicio de gestión contratado.</p>
        <p>La información se almacena en servidores seguros, con copias de seguridad automáticas y acceso restringido mediante usuario y contraseña.</p>
        <p>No vendemos ni compartimos datos con terceros. Cada organización es propietaria de su información y puede solicitar su exportación en cualquier momento.</p>
        <p>Para consultas sobre privacidad escríbanos a {EMAIL}.</p>
      </div>
    </main>
  );
}
