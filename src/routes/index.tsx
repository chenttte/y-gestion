import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Droplets, CheckCircle2, MessageCircle, CalendarCheck, FileSpreadsheet, AlertTriangle,
  HandCoins, ClipboardX, PhoneCall, FileBarChart, Users, Gauge, Receipt, Wallet, Wrench,
  BarChart3, TrendingUp, ShieldCheck, Zap, Clock, Lock, Lightbulb, Star, ChevronDown,
  Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Menu, X, Smartphone, Globe,
  ShoppingCart, Banknote, Landmark, Calculator, Package, Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";
import appImg from "@/assets/app-movil.jpg";
import { BRAND, waLink, PHONE, EMAIL, ADDRESS } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND} | Sistema para Juntas de Saneamiento y Aguaterías de Paraguay` },
      { name: "description", content: "Digitalice su Junta de Saneamiento: lecturas con app móvil, facturación automática, cobranzas, control de morosos y reportes en una sola plataforma." },
      { property: "og:title", content: `${BRAND} | Gestión para Juntas de Saneamiento` },
      { property: "og:description", content: "Lecturas, facturación, cobranzas y órdenes de trabajo desde una sola plataforma. Solicite su demostración." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-primary/90";
const btnWa = "inline-flex items-center justify-center gap-2 rounded-xl bg-success px-6 py-3.5 font-semibold text-success-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-success/90";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-navy shadow-soft transition hover:-translate-y-0.5 hover:border-primary";

const demoMsg = "Hola, quisiera solicitar una demostración del sistema para nuestra Junta de Saneamiento.";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
      <span>{children}</span>
    </li>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="reveal mx-auto mb-14 max-w-3xl text-center">
      <span className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">{title}</h2>
      {desc && <p className="mt-5 text-lg text-muted-foreground">{desc}</p>}
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2 text-xl font-extrabold text-navy">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><Droplets className="h-5 w-5" /></span>
      {BRAND}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Funcionalidades", "#funcionalidades"], ["App móvil", "#app"], ["Beneficios", "#beneficios"], ["Planes", "#planes"], ["Preguntas", "#faq"]];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4">
        <a href="#inicio"><Logo /></a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {links.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm font-semibold text-success"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          <a href={waLink(demoMsg)} target="_blank" rel="noopener" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Solicitar demostración</a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-5 py-5 lg:hidden">
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-medium">{l}</a>)}
          <a href={waLink(demoMsg)} target="_blank" rel="noopener" className={btnPrimary}>Solicitar demostración</a>
        </nav>
      )}
    </header>
  );
}

function CTAButtons({ center }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? "sm:justify-center" : ""}`}>
      <a href={waLink(demoMsg)} target="_blank" rel="noopener" className={btnPrimary}><CalendarCheck className="h-5 w-5" />Solicitar demostración</a>
      <a href={waLink()} target="_blank" rel="noopener" className={btnWa}><MessageCircle className="h-5 w-5" />Contactar por WhatsApp</a>
    </div>
  );
}

const problems = [
  { i: FileSpreadsheet, t: "Lecturas en papel", d: "Planillas que se pierden, se mojan o se transcriben con errores." },
  { i: AlertTriangle, t: "Errores de facturación", d: "Cálculos manuales que generan cobros incorrectos y desconfianza." },
  { i: HandCoins, t: "Cobro difícil de deudas", d: "Sin saber con claridad quién debe, cuánto y desde cuándo." },
  { i: ClipboardX, t: "Falta de control administrativo", d: "Información dispersa entre cuadernos, Excel y la memoria de cada uno." },
  { i: PhoneCall, t: "Reclamos constantes", d: "Usuarios que llaman o van a la oficina para consultar su saldo." },
  { i: FileBarChart, t: "Reportes incompletos", d: "La comisión directiva decide sin datos actualizados." },
];

const modules = [
  { i: Users, t: "Gestión de Clientes", items: ["Datos completos de cada socio", "Historial de servicio", "Consumos por período"] },
  { i: Gauge, t: "Lecturas", items: ["App móvil para lecturistas", "Trabajo online y offline", "Registro rápido en terreno"] },
  { i: Receipt, t: "Facturación", items: ["Emisión automática", "Tarifas configurables", "Control de vencimientos"] },
  { i: Wallet, t: "Cobranzas", items: ["Registro de pagos", "Cuenta corriente", "Estados de cuenta"] },
  { i: Wrench, t: "Órdenes de Trabajo", items: ["Cortes y reconexiones", "Reclamos", "Reparaciones"] },
  { i: BarChart3, t: "Reportes", items: ["Morosidad y recaudación", "Consumo", "Indicadores clave"] },
];

const benefits = [
  { i: TrendingUp, t: "Aumente la recaudación", d: "Identifique morosos al instante y recupere ingresos pendientes." },
  { i: ShieldCheck, t: "Reduzca errores administrativos", d: "Cálculos automáticos y precisos en cada factura." },
  { i: Zap, t: "Automatice procesos", d: "Lo que antes tomaba días, ahora se resuelve en minutos." },
  { i: Clock, t: "Información en tiempo real", d: "Consulte el estado de su Junta desde el celular o la computadora." },
  { i: Lock, t: "Proteja sus datos", d: "Copias de seguridad automáticas y acceso con usuario y contraseña." },
  { i: Lightbulb, t: "Tome mejores decisiones", d: "Reportes claros para presentar a la comisión y a la asamblea." },
];

const plans = [
  { name: "Básico", price: "250.000", desc: "Ideal para Juntas pequeñas que inician su digitalización.", cta: "Comenzar ahora", items: ["Gestión de socios", "Lecturas", "Facturación", "Cobranzas", "Hosting", "Soporte", "Actualizaciones", "Backups automáticos", "Hasta 500 usuarios"] },
  { name: "Estándar", price: "400.000", desc: "Para Juntas en crecimiento que necesitan más control.", cta: "Solicitar demostración", popular: true, lead: "Todo lo del plan Básico, más:", items: ["Órdenes de trabajo", "Reportes avanzados", "App móvil", "Hasta 2.000 usuarios", "Soporte prioritario"] },
  { name: "Premium", price: "600.000", desc: "Gestión completa para organizaciones grandes y cooperativas.", cta: "Solicitar asesoramiento", items: ["Usuarios ilimitados", "Todos los módulos", "Portal de usuarios", "Indicadores gerenciales", "App móvil completa", "Capacitación inicial", "Soporte prioritario", "Hosting", "Actualizaciones", "Backups automáticos"] },
];

const customModules = [
  { i: ShoppingCart, t: "Compras", d: "Órdenes de compra y proveedores" },
  { i: Banknote, t: "Pagos", d: "Pago a proveedores y sueldos" },
  { i: Landmark, t: "Tesorería", d: "Caja, bancos y movimientos" },
  { i: Calculator, t: "Contabilidad", d: "Libro diario, mayor y balances" },
  { i: Package, t: "Stock", d: "Inventario de insumos y repuestos" },
];

function CustomPlan() {
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (t: string) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const msg = sel.length
    ? `Hola, quiero un plan a medida con los módulos: ${sel.join(", ")}.`
    : "Hola, quiero un plan a medida para nuestra Junta de Saneamiento.";
  return (
    <div className="reveal mt-6 rounded-3xl border border-primary/25 bg-card p-8 shadow-lift md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-navy">
            <Sparkles className="h-4 w-4 text-primary" /> Plan a medida
          </span>
          <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
            Arme su plan con los módulos que su organización necesita
          </h3>
          <p className="mt-4 text-muted-foreground">
            A los módulos de cada plan puede sumar áreas de gestión administrativa y financiera.
            La cotización se ajusta a los módulos elegidos y a la cantidad de usuarios.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <Check>Cotización según módulos y usuarios</Check>
            <Check>Implementación por etapas</Check>
            <Check>Capacitación por área</Check>
            <Check>Hosting, soporte y backups incluidos</Check>
          </ul>
          <a href={waLink(msg)} target="_blank" rel="noopener" className={`${btnPrimary} mt-8`}>
            <CalendarCheck className="h-5 w-5" />Cotizar mi plan a medida
          </a>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Elija los módulos a incluir</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {customModules.map(({ i: I, t, d }, k) => {
              const on = sel.includes(t);
              return (
                <button key={t} type="button" onClick={() => toggle(t)} aria-pressed={on}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${on ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-card hover:border-primary/50"} ${k === customModules.length - 1 ? "col-span-2" : ""}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${on ? "bg-gradient-primary text-primary-foreground" : "bg-accent text-primary"}`}>
                    <I className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold text-navy">{t}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{d}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 min-h-10 text-sm text-muted-foreground">
            {sel.length ? `Módulos seleccionados: ${sel.join(", ")}.` : "Toque los módulos que desea incluir y envíelos por WhatsApp."}
          </p>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  ["¿Debo comprar servidores?", "No. El servicio incluye hosting: el sistema funciona en la nube y usted solo necesita una computadora o celular con internet."],
  ["¿El sistema incluye soporte?", "Sí. Nuestro equipo lo acompaña por WhatsApp, teléfono y correo ante cualquier consulta."],
  ["¿Incluye copias de seguridad?", "Sí, realizamos backups automáticos para que su información esté siempre protegida."],
  ["¿Puedo acceder desde cualquier lugar?", "Sí. Puede ingresar desde la oficina, su casa o el celular, en cualquier momento."],
  ["¿Capacitan a nuestro personal?", "Sí. Capacitamos a administradores, encargados de facturación y lecturistas para que usen el sistema con confianza."],
  ["¿La aplicación móvil funciona sin internet?", "Sí. Los lecturistas registran las lecturas sin conexión y los datos se sincronizan automáticamente al recuperar señal."],
];

function Index() {
  useReveal();
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <div id="inicio" className="overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="bg-hero relative">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-2">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-semibold text-navy">
              <Droplets className="h-4 w-4 text-primary" /> Especializado en agua potable · Paraguay
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy md:text-6xl">
              Digitalice la gestión de su <span className="text-gradient">Junta de Saneamiento</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Controle lecturas, facturación, cobranzas y órdenes de trabajo desde una sola plataforma.
            </p>
            <ul className="mt-8 grid gap-3 font-medium sm:grid-cols-2">
              <Check>Facturación automática</Check>
              <Check>App para toma de lecturas</Check>
              <Check>Control de morosidad</Check>
              <Check>Reportes gerenciales</Check>
              <Check>Acceso desde cualquier lugar</Check>
            </ul>
            <div className="mt-10"><CTAButtons /></div>
            <p className="mt-5 text-sm text-muted-foreground">Ya operativo en varias Juntas de Saneamiento del país.</p>
          </div>
          <div className="reveal relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-15 blur-3xl" />
            <img src={heroImg} alt="Panel del sistema con lecturas, facturación y morosidad" width={1408} height={1056} className="relative rounded-3xl shadow-lift" />
            <div className="float-slow absolute -bottom-6 -left-4 hidden rounded-2xl bg-card p-4 shadow-lift sm:block">
              <p className="text-xs text-muted-foreground">Recaudación del mes</p>
              <p className="flex items-center gap-1 text-xl font-extrabold text-navy">+18% <TrendingUp className="h-5 w-5 text-success" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="El problema" title="¿Su Junta sigue trabajando con planillas y procesos manuales?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map(({ i: I, t, d }) => (
              <div key={t} className="reveal rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive"><I className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="reveal mx-auto mt-14 max-w-2xl text-center text-xl font-semibold text-navy">
            Nuestro sistema elimina estos problemas mediante <span className="text-primary">procesos completamente digitalizados.</span>
          </p>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section id="funcionalidades" className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="La solución" title="Todo lo que necesita para gestionar su Junta de Saneamiento" desc="Módulos integrados que trabajan juntos, desde la lectura del medidor hasta el reporte para la asamblea." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ i: I, t, items }) => (
              <div key={t} className="reveal group rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><I className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-bold text-navy">{t}</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">{items.map((x) => <Check key={x}>{x}</Check>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP */}
      <section id="app" className="bg-gradient-navy py-24 text-navy-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
          <div className="reveal order-2 lg:order-1">
            <img src={appImg} alt="App móvil para registrar lecturas de medidores" width={1024} height={1152} loading="lazy" className="mx-auto max-h-[560px] w-auto rounded-3xl object-cover shadow-lift" />
          </div>
          <div className="reveal order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky"><Smartphone className="h-4 w-4" />App móvil</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">Lecturas desde el terreno con nuestra App Móvil</h2>
            <p className="mt-5 text-lg opacity-85">Los lecturistas pueden registrar consumos desde cualquier lugar, incluso sin conexión a internet.</p>
            <ul className="mt-8 space-y-4 text-lg">
              <Check>Trabajo offline</Check>
              <Check>Sincronización automática</Check>
              <Check>Consulta de clientes</Check>
              <Check>Historial de lecturas</Check>
              <Check>Fotografías de respaldo</Check>
            </ul>
            <a href={waLink("Hola, quiero ver la App móvil para lecturistas.")} target="_blank" rel="noopener" className={`${btnWa} mt-10`}><MessageCircle className="h-5 w-5" />Quiero ver la app</a>
          </div>
        </div>
      </section>

      {/* PORTAL */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary"><Globe className="h-4 w-4" />Portal de usuarios</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">Mejor atención para sus usuarios</h2>
            <p className="mt-5 text-lg text-muted-foreground">Los usuarios pueden consultar su información sin necesidad de acercarse a la oficina. Menos filas, menos llamadas, más satisfacción.</p>
            <ul className="mt-8 grid gap-3 font-medium sm:grid-cols-2">
              <Check>Consulta de saldo</Check>
              <Check>Historial de facturas</Check>
              <Check>Historial de pagos</Check>
              <Check>Estado de cuenta</Check>
              <Check>Información de servicios</Check>
            </ul>
          </div>
          <div className="reveal rounded-3xl border border-border bg-card p-6 shadow-lift md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div><p className="text-sm text-muted-foreground">Socio N.º 0482</p><p className="text-lg font-bold text-navy">María González</p></div>
              <span className="rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-success">Al día</span>
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-primary p-6 text-primary-foreground">
              <p className="text-sm opacity-90">Saldo actual</p>
              <p className="mt-1 text-4xl font-extrabold">Gs. 0</p>
              <p className="mt-2 text-sm opacity-90">Próximo vencimiento: 10/11</p>
            </div>
            <ul className="mt-6 divide-y divide-border text-sm">
              {[["Factura Octubre", "18 m³", "Gs. 62.000", "Pagado"], ["Factura Septiembre", "16 m³", "Gs. 55.000", "Pagado"], ["Factura Agosto", "21 m³", "Gs. 71.500", "Pagado"]].map(([a, b, c, d]) => (
                <li key={a} className="flex items-center justify-between py-3.5">
                  <div><p className="font-semibold text-navy">{a}</p><p className="text-muted-foreground">{b}</p></div>
                  <div className="text-right"><p className="font-semibold">{c}</p><p className="text-success">{d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="Beneficios" title="Más control. Más eficiencia. Más recaudación." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ i: I, t, d }) => (
              <div key={t} className="reveal flex gap-5 rounded-2xl bg-card p-7 shadow-soft">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-success/15 text-success"><I className="h-6 w-6" /></span>
                <div><h3 className="text-lg font-bold text-navy">{t}</h3><p className="mt-1.5 text-muted-foreground">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="Casos de éxito" title="Plataforma utilizada por Juntas de Saneamiento" desc="Nuestra solución ya se encuentra operativa ayudando a organizaciones a mejorar su gestión administrativa y financiera." />
          <div className="reveal mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Junta de Saneamiento", "Aguatería", "Cooperativa de Agua", "Junta de Saneamiento"].map((n, k) => (
              <div key={k} className="flex h-20 items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface text-sm font-semibold text-muted-foreground">
                <Droplets className="h-5 w-5" />{n}
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Antes tardábamos una semana en facturar. Hoy lo hacemos en una tarde y sin errores.", "Presidente", "Junta de Saneamiento"],
              ["Ahora sabemos exactamente quién debe. La morosidad bajó y la recaudación mejoró notablemente.", "Tesorera", "Junta de Saneamiento"],
              ["Los lecturistas aprendieron a usar la app en un día. Ya no usamos más papel.", "Administrador", "Aguatería privada"],
            ].map(([q, r, o], k) => (
              <figure key={k} className="reveal rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-4 text-lg text-foreground">“{q}”</blockquote>
                <figcaption className="mt-5 text-sm"><span className="font-bold text-navy">{r}</span> · <span className="text-muted-foreground">{o}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow="Planes y precios" title="Planes adaptados al tamaño de su organización" desc="Sin inversión en servidores. Hosting, soporte y actualizaciones incluidos." />
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`reveal relative rounded-3xl bg-card p-8 ${p.popular ? "border-2 border-primary shadow-lift lg:-mt-4" : "border border-border shadow-soft"}`}>
                {p.popular && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-4 py-1 text-xs font-bold tracking-wider text-primary-foreground">MÁS POPULAR</span>}
                <h3 className="text-xl font-bold text-navy">Plan {p.name}</h3>
                <p className="mt-2 min-h-12 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-6"><span className="text-sm font-semibold text-muted-foreground">Gs.</span> <span className="text-4xl font-extrabold text-navy">{p.price}</span> <span className="text-muted-foreground">/ mes</span></p>
                <a href={waLink(`Hola, me interesa el Plan ${p.name}.`)} target="_blank" rel="noopener" className={`${p.popular ? btnPrimary : btnGhost} mt-7 w-full`}>{p.cta}</a>
                {p.lead && <p className="mt-7 text-sm font-semibold text-navy">{p.lead}</p>}
                <ul className={`${p.lead ? "mt-3" : "mt-7"} space-y-3 text-sm`}>{p.items.map((x) => <Check key={x}>{x}</Check>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead eyebrow="Preguntas frecuentes" title="Resolvemos sus dudas" />
          <div className="space-y-4">
            {faqs.map(([q, a], k) => (
              <div key={q} className="reveal rounded-2xl border border-border bg-card shadow-soft">
                <button onClick={() => setFaq(faq === k ? null : k)} className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-semibold text-navy" aria-expanded={faq === k}>
                  {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${faq === k ? "rotate-180" : ""}`} />
                </button>
                {faq === k && <p className="px-6 pb-6 text-muted-foreground">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="px-5 pb-24">
        <div className="reveal mx-auto max-w-6xl rounded-[2rem] bg-gradient-navy px-6 py-16 text-center text-navy-foreground shadow-lift md:px-16 md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Modernice hoy la gestión de su Junta de Saneamiento</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg opacity-85">Controle lecturas, facturación, cobranzas y usuarios desde una única plataforma diseñada especialmente para organizaciones de agua potable.</p>
          <div className="mt-10"><CTAButtons center /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-muted-foreground">Sistema de gestión especializado para Juntas de Saneamiento, Aguaterías y Cooperativas de agua de Paraguay.</p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((I, k) => <a key={k} href="#" aria-label="Red social" className="grid h-10 w-10 place-items-center rounded-full bg-card text-navy shadow-soft hover:text-primary"><I className="h-4 w-4" /></a>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-navy">Enlaces</h4>
            <ul className="mt-4 space-y-2.5 text-muted-foreground">
              <li><a href="#inicio" className="hover:text-primary">Inicio</a></li>
              <li><a href="#funcionalidades" className="hover:text-primary">Funcionalidades</a></li>
              <li><a href="#planes" className="hover:text-primary">Planes</a></li>
              <li><a href="#contacto" className="hover:text-primary">Contacto</a></li>
              <li><Link to="/privacidad" className="hover:text-primary">Política de privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-navy">Contacto</h4>
            <ul className="mt-4 space-y-2.5 text-muted-foreground">
              <li className="flex gap-2"><Phone className="h-4 w-4 mt-1" />{PHONE}</li>
              <li><a href={waLink()} target="_blank" rel="noopener" className="flex gap-2 hover:text-success"><MessageCircle className="h-4 w-4 mt-1" />WhatsApp</a></li>
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-1" />{EMAIL}</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-1" />{ADDRESS}</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.</p>
      </footer>

      {/* WhatsApp flotante */}
      <a href={waLink()} target="_blank" rel="noopener" aria-label="Contactar por WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground shadow-lift transition hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
