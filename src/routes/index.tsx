import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Droplets, Check as CheckIcon, MessageCircle, Phone, Mail, Menu, X, Server, Cloud, ArrowRight,
  WifiOff, MapPin, History, Wallet, Smartphone, Monitor,
} from "lucide-react";
import panelImg from "@/assets/capturas/sistema-panel.webp";
import prefacturasImg from "@/assets/capturas/sistema-prefacturas.webp";
import appLecturasImg from "@/assets/capturas/app-lecturas.webp";
import appPeriodosImg from "@/assets/capturas/app-periodos.webp";
import appCatastroImg from "@/assets/capturas/app-catastro.webp";
import appMapaImg from "@/assets/capturas/app-mapa.webp";
import { BRAND, COMPANY, waLink, PHONE, PHONE_LOCAL, EMAIL } from "@/lib/contact";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND} | Sistema para Juntas de Saneamiento y aguaterías del Paraguay` },
      { name: "description", content: "Lecturas con el celular, facturación del período, cobros y control de morosidad para Juntas de Saneamiento. En la nube o en su propio servidor." },
      { property: "og:title", content: `${BRAND} | Sistema para Juntas de Saneamiento` },
      { property: "og:description", content: "Del medidor a la asamblea: lecturas, facturación, cobros y morosidad en un solo sistema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Precio base de instalación (el monto final depende de cada Junta).
const INSTALL_FEE = "660.000";
const demoMsg = "Hola, quisiera coordinar una demostración de Y-Gestión para nuestra Junta de Saneamiento.";
const telHref = `tel:+${PHONE.replace(/\D/g, "")}`;

const btn = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnOutline = `${btn} border border-ink/20 bg-background text-ink hover:border-ink/50`;

function Logo({ light }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-xl font-bold ${light ? "text-white" : "text-ink"}`}>
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <Droplets className="h-[18px] w-[18px]" />
      </span>
      {BRAND}
    </span>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
      <span>{children}</span>
    </li>
  );
}

// Encabezado de sección alineado a la izquierda, con número de sección.
function Heading({ n, label, title, children }: { n: string; label: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary">
        {n} · {label}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink md:text-[2.75rem]">{title}</h2>
      {children && <div className="mt-4 text-lg text-muted-foreground">{children}</div>}
    </div>
  );
}

function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-ink bg-ink shadow-[0_24px_48px_-20px_rgb(0_0_0/0.45)]">
      <img src={src} alt={alt} width={540} height={1134} loading="lazy" className="block w-full" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["El período", "#periodo"], ["App", "#app"], ["Módulos", "#modulos"], ["Precios", "#precios"], ["Preguntas", "#faq"]] as const;
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#inicio" aria-label={`${BRAND}, inicio`}><Logo /></a>
        <nav className="hidden items-center gap-7 text-[15px] font-medium text-muted-foreground lg:flex">
          {links.map(([l, h]) => <a key={h} href={h} className="hover:text-ink">{l}</a>)}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a href={telHref} className="text-sm font-semibold text-ink">{PHONE_LOCAL}</a>
          <a href="#contacto" className={`${btnPrimary} px-4 py-2.5 text-sm`}>Pedir demostración</a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-5 py-5 lg:hidden">
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-medium text-ink">{l}</a>)}
          <a href="#contacto" onClick={() => setOpen(false)} className={btnPrimary}>Pedir demostración</a>
        </nav>
      )}
    </header>
  );
}

const steps = [
  { app: true, t: "Lectura en terreno", d: "El lecturista recorre su zona con el celular. Ve la lectura anterior de cada medidor, carga la actual y el consumo se calcula solo. Funciona sin señal y sincroniza al volver." },
  { app: false, t: "Pre-facturas del período", d: "Con las lecturas cargadas, el sistema genera las pre-facturas por sector o por conexión, con fecha de emisión y vencimiento, listas para imprimir." },
  { app: false, t: "Cobro en caja", d: "Cada pago queda registrado y actualiza la cuenta corriente del socio. Nadie tiene que buscar en el cuaderno quién pagó y quién no." },
  { app: false, t: "Control de morosidad", d: "El panel muestra la deuda acumulada y los mayores deudores con sus días de mora, para decidir avisos, cortes y reconexiones con datos." },
  { app: false, t: "Informe a la comisión", d: "Facturado, cobrado, consumo por período y eficiencia de recaudación, listos para la reunión de la comisión directiva o la asamblea." },
];

const appFeatures = [
  { I: WifiOff, t: "Funciona sin señal", d: "Las lecturas se guardan en el celular y se envían al recuperar conexión." },
  { I: History, t: "Lectura anterior a la vista", d: "El consumo del período se calcula en el momento." },
  { I: MapPin, t: "Medidores en el mapa", d: "Se marca dónde está cada medidor para ubicarlo en la próxima ronda." },
  { I: Wallet, t: "Consulta de saldos", d: "Si un socio pregunta cuánto debe, se le responde ahí mismo." },
];

const appShots = [
  { src: appPeriodosImg, cap: "Elegir el período activo", alt: "App: selección del período de lectura activo" },
  { src: appCatastroImg, cap: "Buscar el medidor", alt: "App: catastro de medidores; el pin verde indica que el medidor ya tiene ubicación" },
  { src: appMapaImg, cap: "Fijar su ubicación", alt: "App: mapa para fijar la ubicación de un medidor" },
];

const plans = [
  { name: "Básico", price: "250.000", who: "Juntas pequeñas que empiezan a dejar el papel.", users: "Hasta 500 usuarios", rec: false, lead: "", items: ["Padrón de socios y conexiones", "Lecturas", "Facturación", "Cobranzas", "Soporte y actualizaciones"] },
  { name: "Estándar", price: "400.000", who: "Juntas en crecimiento que necesitan más control.", users: "Hasta 2.000 usuarios", rec: true, lead: "Todo lo del Básico, más:", items: ["App móvil para lecturistas", "Órdenes de trabajo: cortes, reconexiones y reclamos", "Reportes avanzados", "Soporte prioritario"] },
  { name: "Premium", price: "600.000", who: "Organizaciones grandes y cooperativas de agua.", users: "Usuarios ilimitados", rec: false, lead: "Todo lo del Estándar, más:", items: ["Portal de consulta para usuarios", "Indicadores gerenciales", "Todos los módulos de gestión", "Capacitación por área"] },
];

const extraModules = [
  ["Compras", "Órdenes de compra y proveedores"],
  ["Pagos", "Pago a proveedores y sueldos"],
  ["Bancos", "Cuentas, depósitos y conciliación"],
  ["Contabilidad", "Libro diario, mayor y balances"],
  ["Stock", "Insumos, medidores y repuestos"],
  ["Activo fijo", "Bienes de la Junta y su depreciación"],
  ["Ventas", "Venta de materiales y servicios"],
] as const;

function Modules() {
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (t: string) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const msg = sel.length
    ? `Hola, quiero cotizar Y-Gestión con los módulos: ${sel.join(", ")}.`
    : "Hola, quiero cotizar Y-Gestión con módulos administrativos.";
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h3 className="font-display text-xl font-bold text-ink">Base de todos los planes</h3>
        <ul className="mt-5 space-y-3">
          <Item>Padrón de socios, conexiones y medidores</Item>
          <Item>Lecturas por período y por sector</Item>
          <Item>Facturación con tarifas configurables</Item>
          <Item>Cobros y cuenta corriente de cada socio</Item>
          <Item>Consultas e informes</Item>
        </ul>
        <p className="mt-8 text-muted-foreground">
          Si la Junta también lleva su administración, sume los módulos que necesite. Están en el mismo
          sistema, así que lo que se cobra en caja llega solo a bancos y a contabilidad.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-background p-6">
        <p className="text-sm font-semibold text-ink">Marque los módulos que le interesan y le enviamos una cotización:</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {extraModules.map(([t, d]) => {
            const on = sel.includes(t);
            return (
              <button key={t} type="button" onClick={() => toggle(t)} aria-pressed={on}
                className={`flex items-start gap-3 rounded-md border px-3.5 py-3 text-left transition ${on ? "border-primary bg-water" : "border-border hover:border-ink/40"}`}>
                <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${on ? "border-primary bg-primary text-primary-foreground" : "border-ink/30"}`}>
                  {on && <CheckIcon className="h-3 w-3" strokeWidth={3.5} />}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{t}</span>
                  <span className="block text-sm text-muted-foreground">{d}</span>
                </span>
              </button>
            );
          })}
        </div>
        <a href={waLink(msg)} target="_blank" rel="noopener" className={`${btnPrimary} mt-5 w-full`}>
          Cotizar {sel.length ? `${sel.length} módulo${sel.length > 1 ? "s" : ""}` : "módulos"} por WhatsApp <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

const faqs = [
  ["¿Hay un costo de instalación?", `Sí. Además de la mensualidad hay un pago único de instalación, desde Gs. ${INSTALL_FEE}. Incluye la carga de su padrón de usuarios, la configuración de tarifas y la capacitación inicial. El monto final se define según las características de cada Junta.`],
  ["¿Tenemos que comprar un servidor?", "No es necesario. En la nube nosotros nos encargamos del servidor, las copias de seguridad y las actualizaciones; usted solo necesita una computadora o un celular con internet. Si prefiere que los datos queden en su organización, también instalamos el sistema en un servidor propio."],
  ["¿Cuánto cuesta tenerlo en un servidor propio?", "La instalación se cotiza según su infraestructura. No hay un costo fijo de mantenimiento: el soporte y las mejoras se cobran solo cuando los necesite."],
  ["¿La app funciona sin internet?", "Sí. El lecturista carga las lecturas sin conexión y los datos se sincronizan cuando el celular vuelve a tener señal."],
  ["¿Quién carga los datos que ya tenemos?", "Nosotros. La instalación incluye pasar su padrón de usuarios y sus tarifas al sistema, aunque hoy estén en planillas de Excel o en papel."],
  ["¿Capacitan a nuestro personal?", "Sí. Capacitamos a quienes administran, a quienes cobran y a los lecturistas, cada uno en lo que le toca usar."],
  ["¿Cómo es el soporte?", `Por WhatsApp, teléfono y correo, desde Paraguay. Escríbanos al ${PHONE_LOCAL} o a ${EMAIL}.`],
] as const;

function Index() {
  return (
    <div id="inicio" className="overflow-x-hidden">
      <Header />

      {/* INICIO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
          <div className="max-w-3xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Para Juntas de Saneamiento y aguaterías del Paraguay
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] text-ink md:text-7xl">
              Del medidor a la asamblea, sin planillas.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {BRAND} es el sistema con el que las Juntas toman las lecturas con el celular, emiten las
              facturas del período, registran los cobros y saben al día quién debe y desde cuándo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className={btnPrimary}>Pedir una demostración <ArrowRight className="h-4 w-4" /></a>
              <a href={waLink(demoMsg)} target="_blank" rel="noopener" className={btnOutline}>
                <MessageCircle className="h-4 w-4 text-success" />WhatsApp {PHONE_LOCAL}
              </a>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 border-t border-border pt-6 text-sm sm:grid-cols-3">
              {[["Desde", "Gs. 250.000 / mes"], ["Dónde", "En la nube o en su servidor"], ["Soporte", "Desde Paraguay"]].map(([k, v]) => (
                <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold text-ink">{v}</dd></div>
              ))}
            </dl>
          </div>

          <figure className="relative mt-14 pb-10 md:pb-16">
            <div className="overflow-hidden rounded-t-lg border border-b-0 border-ink/15 bg-white shadow-[0_-12px_40px_-24px_rgb(0_0_0/0.35)]">
              <img src={panelImg} alt="Panel principal del sistema: medidores, consumo, facturado, cobrado y deuda acumulada" width={1901} height={640} className="block w-full" />
            </div>
            <div className="absolute -bottom-2 right-3 w-[30%] max-w-[230px] md:right-10">
              <PhoneShot src={appLecturasImg} alt="App: lista de lecturas del período con el consumo de cada medidor" />
            </div>
            <figcaption className="mt-4 max-w-[60%] text-xs text-muted-foreground">
              Capturas reales del sistema y de la app. Ocultamos los datos personales de los socios.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* EL PERÍODO */}
      <section id="periodo" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Heading n="01" label="Cómo trabaja la Junta" title="Un período completo, en un solo sistema">
            Cada mes la Junta hace lo mismo: leer, facturar, cobrar y rendir cuentas. {BRAND} acompaña cada paso.
          </Heading>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {steps.map((s, k) => (
              <li key={s.t} className="bg-background p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-bold text-primary">{k + 1}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.app ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}{s.app ? "App" : "Sistema"}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
          <figure className="mt-12 grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-ink/15 bg-white">
              <img src={prefacturasImg} alt="Pantalla de generación e impresión de pre-facturas por sector" width={1901} height={861} loading="lazy" className="block w-full" />
            </div>
            <figcaption>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary">Paso 2</p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">Pre-facturas por sector</p>
              <p className="mt-3 text-muted-foreground">
                Se eligen el sector y las fechas de emisión y vencimiento, y se generan e imprimen todas las
                pre-facturas del período. Si una se pierde, se vuelve a imprimir desde el talonario.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* APP */}
      <section id="app" className="bg-ink py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-sky">02 · App del lecturista</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-[2.75rem]">Las lecturas se cargan donde está el medidor</h2>
            <p className="mt-4 text-lg text-white/75">
              Se acabaron las planillas mojadas y los números mal pasados. El lecturista anota en el
              celular y la lectura llega directo al sistema.
            </p>
            <ul className="mt-8 space-y-4">
              {appFeatures.map(({ I, t, d }) => (
                <li key={t} className="flex gap-4">
                  <I className="mt-1 h-5 w-5 shrink-0 text-sky" />
                  <div><p className="font-semibold">{t}</p><p className="text-white/65">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:items-start sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
            {appShots.map((s, k) => (
              <figure key={s.cap} className={`w-[62%] shrink-0 snap-center sm:w-auto ${k === 1 ? "sm:mt-10" : ""}`}>
                <PhoneShot src={s.src} alt={s.alt} />
                <figcaption className="mt-3 text-center text-sm text-white/70">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="border-b border-border bg-surface py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Heading n="03" label="Módulos" title="Además del agua, la administración de la Junta">
            Compras, pagos, bancos y contabilidad en el mismo sistema que la facturación del agua.
          </Heading>
          <Modules />
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Heading n="04" label="Precios" title="Una mensualidad según el tamaño de la Junta">
            Precios mensuales en la nube, con hosting, copias de seguridad, soporte y actualizaciones incluidos.
          </Heading>
          <div className="grid overflow-hidden rounded-lg border border-border md:grid-cols-3">
            {plans.map((p, k) => (
              <div key={p.name} className={`flex flex-col p-7 ${k > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} ${p.rec ? "bg-water/60" : "bg-background"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
                  {p.rec && <span className="text-xs font-semibold uppercase tracking-wider text-primary">Recomendado</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.who}</p>
                <p className="mt-6 font-display text-ink">
                  <span className="text-lg font-semibold">Gs.</span> <span className="text-[2.6rem] font-bold leading-none">{p.price}</span>
                  <span className="text-muted-foreground"> / mes</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{p.users}</p>
                {p.lead && <p className="mt-6 text-sm font-semibold text-ink">{p.lead}</p>}
                <ul className={`${p.lead ? "mt-3" : "mt-6"} flex-1 space-y-2.5 text-[15px]`}>{p.items.map((x) => <Item key={x}>{x}</Item>)}</ul>
                <a href={waLink(`Hola, me interesa el plan ${p.name} de Y-Gestión.`)} target="_blank" rel="noopener" className={`${p.rec ? btnPrimary : btnOutline} mt-8`}>
                  Consultar plan {p.name}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-ink/25 px-6 py-5 md:flex md:items-center md:justify-between md:gap-8">
            <p className="font-display text-lg font-bold text-ink">Instalación: desde Gs. {INSTALL_FEE}, pago único</p>
            <p className="mt-1 text-muted-foreground md:mt-0 md:max-w-xl md:text-right">
              Incluye la carga del padrón, la configuración de tarifas y la capacitación. El monto final se
              define según las características de cada Junta.
            </p>
          </div>

          <h3 className="mt-20 font-display text-2xl font-bold text-ink md:text-3xl">Dónde funciona el sistema</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border p-7">
              <Cloud className="h-7 w-7 text-primary" />
              <h4 className="mt-4 font-display text-xl font-bold text-ink">En la nube</h4>
              <p className="mt-1 text-muted-foreground">Nosotros nos encargamos del servidor.</p>
              <ul className="mt-5 space-y-2.5">
                <Item>Mensualidad según el plan</Item>
                <Item>Copias de seguridad y actualizaciones incluidas</Item>
                <Item>Acceso desde la oficina, la casa o el celular</Item>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-7">
              <Server className="h-7 w-7 text-primary" />
              <h4 className="mt-4 font-display text-xl font-bold text-ink">En su servidor (on-premise)</h4>
              <p className="mt-1 text-muted-foreground">Los datos quedan físicamente en su organización.</p>
              <ul className="mt-5 space-y-2.5">
                <Item>Funciona dentro de su red local</Item>
                <Item>Sin costo fijo de mantenimiento</Item>
                <Item>Soporte y mejoras se cobran solo cuando los necesite</Item>
                <Item>Instalación a cotizar según su infraestructura</Item>
              </ul>
              <a href={waLink("Hola, quiero cotizar Y-Gestión instalado en un servidor propio (on-premise).")} target="_blank" rel="noopener" className={`${btnOutline} mt-6`}>
                Cotizar instalación en servidor propio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS */}
      <section id="faq" className="border-t border-border bg-surface py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.6fr]">
          <Heading n="05" label="Preguntas" title="Lo que suelen preguntar las comisiones" />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map(([q, a], k) => (
              <details key={q} className="group py-5" open={k === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink">
                  {q}<span className="text-2xl font-normal text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary">06 · Demostración</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink md:text-[2.75rem]">Vea el sistema funcionando</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Déjenos sus datos y coordinamos una demostración, en su oficina o por videollamada. Sin compromiso.
            </p>
            <ul className="mt-8 space-y-4">
              <li><a href={waLink(demoMsg)} target="_blank" rel="noopener" className="flex items-center gap-3 font-semibold text-ink hover:text-success"><MessageCircle className="h-5 w-5 text-success" />WhatsApp {PHONE_LOCAL}</a></li>
              <li><a href={telHref} className="flex items-center gap-3 font-semibold text-ink hover:text-primary"><Phone className="h-5 w-5 text-primary" />{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-semibold text-ink hover:text-primary"><Mail className="h-5 w-5 text-primary" />{EMAIL}</a></li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* PIE */}
      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-white/70">
              <span className="font-semibold text-white">“Y” significa agua en guaraní.</span> Sistema de gestión para
              Juntas de Saneamiento, aguaterías y cooperativas de agua del Paraguay.
            </p>
            <p className="mt-3 text-sm text-white/50">Un sistema de {COMPANY}.</p>
          </div>
          <div>
            <h4 className="font-display font-bold">Secciones</h4>
            <ul className="mt-4 space-y-2 text-white/70">
              <li><a href="#periodo" className="hover:text-white">Cómo funciona</a></li>
              <li><a href="#app" className="hover:text-white">App del lecturista</a></li>
              <li><a href="#precios" className="hover:text-white">Precios</a></li>
              <li><Link to="/privacidad" className="hover:text-white">Política de privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold">Contacto</h4>
            <ul className="mt-4 space-y-2 text-white/70">
              <li><a href={waLink()} target="_blank" rel="noopener" className="hover:text-white">WhatsApp {PHONE_LOCAL}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-white/10 py-6 text-center text-sm text-white/50">© {new Date().getFullYear()} {BRAND} · {COMPANY}</p>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-13 w-13 place-items-center rounded-full bg-success text-success-foreground shadow-lg transition hover:scale-105">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
