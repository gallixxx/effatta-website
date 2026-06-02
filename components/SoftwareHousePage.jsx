/* SoftwareHousePage.jsx — sottopagina partner "Software house".
 *
 * Riscritta allo standard del sito: registro chiaro, reveal allo scroll,
 * hover sulle card, banda scura per endpoint, responsive mobile-first
 * scoped a .sh-page. Tecnica più che commerciale: scenario → architettura
 * → perché integrare → modello di pricing → CTA.
 */

const SH_CSS = `
  .sh-reveal { opacity: 0; transform: translateY(14px); transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out); }
  .sh-reveal.in { opacity: 1; transform: none; }
  .sh-card { transition: transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out), box-shadow var(--t-base) var(--ease-out); }
  .sh-card:hover { border-color: var(--border-2); transform: translateY(-3px); box-shadow: var(--shadow-md); }

  @media (max-width: 920px) {
    .sh-split { grid-template-columns: 1fr !important; gap: 44px !important; }
    .sh-grid3 { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .sh-page section { padding-top: 52px !important; padding-bottom: 52px !important; }
    .sh-page section > div { padding-left: 18px !important; padding-right: 18px !important; }
    .sh-grid3 { grid-template-columns: 1fr !important; gap: 12px !important; }
    .sh-page h1 { font-size: 1.85rem !important; line-height: 1.14 !important; }
    .sh-page h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
    .sh-page h3 { font-size: 1rem !important; }
    .sh-page p  { font-size: 0.875rem !important; line-height: 1.5 !important; }
    .sh-page p.sh-lede { font-size: 0.95rem !important; }
    .sh-card { padding: 18px !important; border-radius: 12px !important; }
    .sh-card > svg { width: 22px !important; height: 22px !important; }
    .sh-ep-desc { display: none !important; }
    .sh-page .eff-btn { height: 40px !important; padding: 0 16px !important; font-size: 14px !important; }
  }
`;

function SoftwareHousePage() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".sh-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="sh-page">
      <style>{SH_CSS}</style>
      <SHHeader />
      <div className="sh-reveal"><SHWhy /></div>
      <div className="sh-reveal"><SHArchitecture /></div>
      <div className="sh-reveal"><SHPricing /></div>
      <div className="sh-reveal"><SHCta /></div>
    </div>
  );
}

function Crumb({ href, label }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", textDecoration: "none" }}>
      <Icon name="arrow-left" size={14} />{label}
    </a>
  );
}

function ShHeading({ eyebrow, title, sub, light = false, maxWidth = 620, style }) {
  return (
    <div style={{ maxWidth, ...style }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: light ? "rgba(255,255,255,0.55)" : "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em" }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: light ? "#fff" : "var(--fg-1)", textWrap: "balance" }}>{title}</h2>
      {sub && <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: light ? "rgba(255,255,255,0.7)" : "var(--fg-2)" }}>{sub}</p>}
    </div>
  );
}

/* -------- 1. Hero -------- */
function SHHeader() {
  return (
    <section style={{ background: "#fff", padding: "96px 0 88px", borderBottom: "1px solid var(--border-1)", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: -200, right: -260, width: 700, height: 700, background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <Crumb href="partner.html" label="Partner · Software house" />
        <div className="sh-split" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center", marginTop: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 600, textWrap: "balance" }}>
              Effatta nel tuo gestionale, col tuo brand davanti.
            </h1>
            <p className="sh-lede" style={{ margin: "22px 0 0", maxWidth: 520, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5, color: "var(--fg-2)" }}>
              Due API REST coordinate, sandbox sempre disponibile, webhook firmati. Tu mantieni la UX, Effatta gestisce gli adempimenti italiani.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Button variant="blue" trailingIcon="arrow-right" as="a" href="api.html">Documentazione API</Button>
              <Button variant="secondary" as="a" href="contatti.html">Parla con noi</Button>
            </div>
          </div>
          <SHHeaderVisual />
        </div>
      </div>
    </section>
  );
}

function SHHeaderVisual() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-md)" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>Architettura · in breve</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ArchBox label="Il tuo gestionale" sub="il software che il cliente vede" tone="brand" />
        <ArchArrow code="POST /v1/invoices" />
        <ArchBox label="Effatta API" sub="normalizza, firma, conserva" tone="ink" />
        <ArchArrow code="FatturaPA · XML firmato" />
        <ArchBox label="Sistema di Interscambio" sub="Agenzia delle Entrate" tone="paper" />
      </div>
    </div>
  );
}

function ArchBox({ label, sub, tone }) {
  const styles =
    tone === "brand" ? { background: "var(--eff-blue-50)", border: "1px solid var(--eff-blue-300)", color: "var(--fg-1)" } :
    tone === "ink" ? { background: "var(--eff-ink-900)", border: "1px solid var(--eff-ink-900)", color: "#fff" } :
                     { background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", color: "var(--fg-1)" };
  return (
    <div style={{ ...styles, borderRadius: 10, padding: "14px 18px" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.005em" }}>{label}</div>
      <div style={{ marginTop: 2, fontFamily: "var(--font-sans)", fontSize: 12, color: tone === "ink" ? "rgba(255,255,255,0.6)" : "var(--fg-3)" }}>{sub}</div>
    </div>
  );
}

function ArchArrow({ code }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 18 }}>
      <span style={{ width: 1, height: 16, background: "var(--border-2)" }} />
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)", background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", borderRadius: 6, padding: "2px 8px" }}>{code}</code>
    </div>
  );
}

/* -------- 2. Why integrate -------- */
const WHY_POINTS = [
  { icon: "code-2", title: "Due API, una sola autenticazione", desc: "Stessa chiave per fatturazione e scontrino. OpenAPI 3.1, SDK ufficiali in Node, Python, PHP, Go." },
  { icon: "webhook", title: "Eventi firmati, retry esponenziale", desc: "Ogni transizione SDI atterra come webhook HMAC-SHA256. Niente polling, niente eventi persi." },
  { icon: "key-round", title: "Sotto-account per ogni cliente", desc: "Ogni partita IVA è un sotto-account isolato con quote e fatturazione separate. Il rendiconto resta uno: il tuo." },
  { icon: "shield-check", title: "Conservazione gestita da Effatta", desc: "10 anni di conservazione sostitutiva firmata. Esibizione AdE generata in PDF/A dalla API." },
  { icon: "layers", title: "White-label completo", desc: "Dominio cliente, logo, e-mail di sistema, portale di assistenza: tutto sotto il tuo brand." },
  { icon: "zap", title: "Sandbox sempre attiva", desc: "Endpoint sandbox gemello del live: restituisce i codici di errore SDI reali per testare i casi limite." },
];

function SHWhy() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <ShHeading eyebrow="Cosa ti porti a casa" title="Gli adempimenti italiani, smessi di essere il tuo problema." style={{ marginBottom: 48 }} />
        <div className="sh-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {WHY_POINTS.map((p) => (
            <div key={p.title} className="sh-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 12, padding: 28 }}>
              <Icon name={p.icon} size={26} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{ margin: "18px 0 8px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{p.title}</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 3. Endpoints (banda scura) -------- */
function SHArchitecture() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div className="sh-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "flex-start" }}>
        <ShHeading light eyebrow="Endpoint principali" title="Quattro chiamate, e l'integrazione è in piedi." sub="Una versione semplificata: nella documentazione trovi tutti i parametri, gli errori SDI gestiti e le note di credito." maxWidth={460} style={{ marginBottom: 0 }} />
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Endpoint method="POST" path="/v1/invoices" desc="Emette una fattura, la trasmette allo SDI." />
            <Endpoint method="POST" path="/v1/receipts" desc="Emette un documento commerciale (scontrino)." />
            <Endpoint method="GET" path="/v1/invoices/:id" desc="Stato SDI, ricevute, conservazione." />
            <Endpoint method="POST" path="/v1/webhooks" desc="Registra l'endpoint per gli eventi firmati." />
          </div>
          <div style={{ marginTop: 24 }}><Button variant="secondary" trailingIcon="arrow-right" as="a" href="api.html">Vai alla documentazione</Button></div>
        </div>
      </div>
    </section>
  );
}

function Endpoint({ method, path, desc }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px", flexWrap: "wrap" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 24, padding: "0 8px", borderRadius: 6, background: method === "POST" ? "var(--eff-blue-500)" : "rgba(255,255,255,0.12)", color: "#fff", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, letterSpacing: "0.04em" }}>{method}</span>
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#fff", fontWeight: 600, flex: 1 }}>{path}</code>
      <span className="sh-ep-desc" style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "right", maxWidth: 280 }}>{desc}</span>
    </div>
  );
}

/* -------- 4. Pricing model -------- */
function SHPricing() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="sh-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <ShHeading eyebrow="Modello commerciale" title="Pricing per volume, sempre su misura." sub="Non c'è un listino esposto per le software house. Il prezzo dipende dai volumi annui, dal numero di sotto-account e da quanto white-label vuoi spingerti. Definiamo tutto su un'unica offerta scritta." maxWidth={480} style={{ marginBottom: 0 }} />
        <div className="sh-card" style={{ background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", borderRadius: 16, padding: 32 }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["Volume annuo di fatture / scontrini", "fascia a scaglioni decrescenti"],
              ["Numero di sotto-account", "incluso fino a una soglia"],
              ["White-label", "dominio + logo + e-mail di sistema"],
              ["SLA scritta", "su richiesta, dal piano enterprise"],
              ["Account manager", "incluso per i partner attivi"],
            ].map(([k, v]) => (
              <li key={k} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, paddingBottom: 14, borderBottom: "1px solid var(--border-1)", fontFamily: "var(--font-sans)" }}>
                <span style={{ fontWeight: 500, fontSize: 14, color: "var(--fg-1)" }}>{k}</span>
                <span style={{ fontSize: 13, color: "var(--fg-3)", textAlign: "right" }}>{v}</span>
              </li>
            ))}
          </ul>
          <p style={{ margin: "20px 0 0", fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.5, color: "var(--fg-3)" }}>Risposta scritta in 48 ore lavorative dalla prima e-mail.</p>
        </div>
      </div>
    </section>
  );
}

/* -------- 5. CTA -------- */
function SHCta() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff" }}>Apri la sandbox in 5 minuti.</h2>
        <p style={{ margin: "16px auto 32px", maxWidth: 560, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
          Registra un account sandbox, genera una chiave, fai la prima POST. La proposta commerciale arriva in parallelo, senza bloccare l'integrazione.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="api.html">Documentazione API</Button>
          <a href="contatti.html" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px", borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center" }}>Richiedi un contatto</a>
        </div>
      </div>
    </section>
  );
}

window.SoftwareHousePage = SoftwareHousePage;
