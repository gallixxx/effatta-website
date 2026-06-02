/* PartnerPage.jsx — pagina Business / Partner.
 *
 * Registro CHIARO, coerente col resto del sito (bianco + paper-50 crema,
 * blu solo come accento, un'unica banda scura per i numeri e per la CTA —
 * esattamente come Fatturazione e Scontrino).
 *
 * Due pilastri di pari dignità — API REST e White-Label — diagramma
 * "doppio binario" su fondo chiaro, i tre target, il percorso partner,
 * numeri e FAQ. Self-contained: Icon, Button (atoms), NavBar, Footer.
 * Convenzioni responsive mobile-first scoped a .pa-page.
 */

const PA_CSS = `
  .pa-reveal { opacity: 0; transform: translateY(14px); transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out); }
  .pa-reveal.in { opacity: 1; transform: none; }
  .pa-card { transition: transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out), box-shadow var(--t-base) var(--ease-out); }
  .pa-card:hover { border-color: var(--border-2); transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .pa-mode { cursor: pointer; transition: border-color var(--t-base) var(--ease-out), background var(--t-base) var(--ease-out); }
  @keyframes paFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

  /* Tablet */
  @media (max-width: 920px) {
    .pa-split   { grid-template-columns: 1fr !important; gap: 44px !important; }
    .pa-pillars { grid-template-columns: 1fr !important; }
    .pa-grid3   { grid-template-columns: 1fr !important; }
    .pa-grid4   { grid-template-columns: 1fr 1fr !important; }
    .pa-flow    { grid-template-columns: 1fr 1fr !important; row-gap: 32px !important; }
  }

  /* Telefono — mobile-first */
  @media (max-width: 600px) {
    .pa-page section { padding-top: 52px !important; padding-bottom: 52px !important; }
    .pa-page section > div { padding-left: 18px !important; padding-right: 18px !important; }
    .pa-flow { grid-template-columns: 1fr 1fr !important; column-gap: 16px !important; row-gap: 24px !important; }

    .pa-page h1 { font-size: 1.8rem !important; line-height: 1.14 !important; }
    .pa-page h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
    .pa-page h3 { font-size: 1rem !important; }
    .pa-page p  { font-size: 0.875rem !important; line-height: 1.5 !important; }
    .pa-page p.pa-lede { font-size: 0.95rem !important; }

    .pa-card { padding: 18px !important; border-radius: 12px !important; }
    .pa-card > svg { width: 22px !important; height: 22px !important; }

    .pa-bigstat { font-size: 40px !important; }
    .pa-bigstat span { font-size: 22px !important; }

    .pa-faq-aside { position: static !important; top: auto !important; }
    .pa-connector { display: none !important; }
    .pa-binario-top { grid-template-columns: 1fr !important; }

    .pa-page .eff-btn { height: 40px !important; padding: 0 16px !important; font-size: 14px !important; }
  }
`;

function PartnerPage() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".pa-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pa-page">
      <style>{PA_CSS}</style>
      <PartnerHero />
      <div className="pa-reveal"><PartnerPillars /></div>
      <div className="pa-reveal"><DoppioBinario /></div>
      <div className="pa-reveal"><PartnerTargets /></div>
      <div className="pa-reveal"><PartnerHow /></div>
      <div className="pa-reveal"><PartnerStats /></div>
      <div className="pa-reveal"><PartnerFAQ /></div>
      <div className="pa-reveal"><PartnerCTA /></div>
    </div>
  );
}

function PaHeading({ eyebrow, title, sub, light = false, maxWidth = 620, style }) {
  return (
    <div style={{ maxWidth, ...style }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: light ? "rgba(255,255,255,0.55)" : "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em" }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: light ? "#fff" : "var(--fg-1)", textWrap: "balance" }}>{title}</h2>
      {sub && <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: light ? "rgba(255,255,255,0.7)" : "var(--fg-2)" }}>{sub}</p>}
    </div>
  );
}

/* ============================================================
 * 1 — HERO (chiaro)
 * ============================================================ */
function PartnerHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: -200, right: -260, width: 720, height: 720, background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div className="pa-split" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 8px", borderRadius: 999, background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--fg-1)", marginBottom: 24 }}>
            <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontWeight: 700, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Business</span>
            Partner & White-Label
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 600, textWrap: "balance" }}>
            La tua offerta fiscale, sul nostro motore.
          </h1>
          <p className="pa-lede" style={{ margin: "22px 0 0", maxWidth: 520, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5, color: "var(--fg-2)" }}>
            Integri Effatta via <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>API</strong> nel tuo software o lo offri in <strong style={{ color: "var(--fg-1)", fontWeight: 600 }}>white-label</strong> col tuo brand. SDI, conservazione e scontrini restano dietro le quinte — davanti ci sei tu.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button variant="blue" trailingIcon="arrow-right" as="a" href="contatti.html">Diventa partner</Button>
            <Button variant="secondary" as="a" href="api.html">Documentazione API</Button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--border-1)", flexWrap: "wrap" }}>
            {[["100M+", "fatture gestite"], ["10M+", "scontrini emessi"], ["10K+", "clienti attivi"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>{v}</div>
                <div style={{ marginTop: 4, fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--fg-3)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <InfraCard />
      </div>
    </section>
  );
}

/* Card "infrastruttura" — chiara */
function InfraCard() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 24, boxShadow: "var(--shadow-md)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <img src="assets/logos/effatta-mark-blue.svg" alt="" style={{ height: 22, display: "block" }} />
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--fg-1)" }}>Effatta · infrastruttura fiscale</div>
      </div>
      {[
        { lbl: "Sistema di Interscambio", val: "online" },
        { lbl: "Conservazione a norma", val: "10 anni" },
        { lbl: "Corrispettivi telematici", val: "attivi" },
        { lbl: "Sandbox", val: "24/7" },
      ].map((r) => (
        <div key={r.lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderTop: "1px solid var(--border-1)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--eff-success-500)" }} />{r.lbl}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-3)" }}>{r.val}</span>
        </div>
      ))}
      <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, background: "var(--eff-blue-50)", border: "1px solid var(--eff-blue-300)", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-1)" }}>
        Tu costruisci sopra. Noi teniamo il passo con la normativa.
      </div>
    </div>
  );
}

/* ============================================================
 * 2 — DUE PILASTRI (API + White-Label, pari dignità)
 * ============================================================ */
function PartnerPillars() {
  const pillars = [
    {
      icon: "code-2", tag: "Per il prodotto",
      title: "API REST",
      desc: "Integri la fatturazione elettronica e gli scontrini direttamente nel tuo gestionale o SaaS. Una chiamata per emettere, webhook firmati per gli esiti.",
      bullets: ["API fatturazione + API scontrino", "Sandbox dedicata, sempre attiva", "Webhook con retry esponenziale", "OpenAPI 3.1 e SDK ufficiali"],
      cta: "Vai alla documentazione", href: "api.html",
    },
    {
      icon: "layers", tag: "Per il brand",
      title: "White-Label",
      desc: "Offri Effatta come fosse un tuo prodotto: dominio, logo, colori, e-mail di sistema e portale cliente col tuo brand. Effatta resta invisibile.",
      bullets: ["Dominio, logo e colori tuoi", "Portale cliente brandizzato", "Sotto-account multi-tenant isolati", "Margine commerciale a tua discrezione"],
      cta: "Richiedi il white-label", href: "contatti.html",
    },
  ];
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <PaHeading eyebrow="Due modi, stessa infrastruttura" title="API e White-Label. Stessa dignità, scopi diversi." sub="Puoi scegliere uno dei due o combinarli: l'integrazione tecnica nel tuo software e la distribuzione col tuo brand non si escludono." style={{ marginBottom: 48 }} maxWidth={680} />
        <div className="pa-pillars" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {pillars.map((p) => (
            <div key={p.title} className="pa-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 36, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ width: 48, height: 48, flex: "none", borderRadius: 12, background: "var(--eff-blue-50)", color: "var(--eff-blue-700)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={p.icon} size={24} /></span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--fg-3)" }}>{p.tag}</div>
                  <h3 style={{ margin: "2px 0 0", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{p.title}</h3>
                </div>
              </div>
              <p style={{ margin: "0 0 20px", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)" }}>{p.desc}</p>
              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {p.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-1)" }}>
                    <span style={{ color: "var(--eff-success-500)", display: "inline-flex" }}><Icon name="check" size={15} strokeWidth={2.4} /></span>{b}
                  </li>
                ))}
              </ul>
              <div><Button variant="ink" size="md" trailingIcon="arrow-right" as="a" href={p.href}>{p.cta}</Button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 3 — DOPPIO BINARIO (diagramma interattivo, su chiaro)
 * ============================================================ */
function DoppioBinario() {
  const [track, setTrack] = React.useState("api");
  const modes = {
    api: { title: "Il tuo software", sub: "via API REST", icon: "code-2", detail: "Chiami le nostre REST API dal tuo gestionale: emetti, trasmetti allo SDI e ricevi gli esiti via webhook. Il tuo software resta in primo piano, Effatta lavora dietro." },
    wl:  { title: "Il tuo brand", sub: "white-label", icon: "layers", detail: "Offri il portale Effatta con il tuo dominio, logo e colori. I tuoi clienti emettono in autonomia; tu controlli brand, margini e parco clienti da un'unica regia." },
  };
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <PaHeading eyebrow="Doppio binario" title="Un solo motore. Due modi di portarlo ai tuoi clienti." sub="API e white-label corrono sulla stessa infrastruttura: SDI, firma, conservazione e corrispettivi. Tocca un binario per vederlo." style={{ marginBottom: 44, marginInline: "auto", textAlign: "center" }} maxWidth={680} />

        <div className="pa-binario-top" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 720, margin: "0 auto" }}>
          {["api", "wl"].map((k) => {
            const on = track === k; const m = modes[k];
            return (
              <button key={k} className="pa-mode" onClick={() => setTrack(k)} style={{
                textAlign: "left", borderRadius: 14, padding: "18px 20px",
                background: on ? "var(--eff-blue-50)" : "#fff",
                border: on ? "1px solid var(--eff-blue-500)" : "1px solid var(--border-1)",
                cursor: "pointer",
              }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", background: on ? "var(--eff-blue-500)" : "var(--eff-paper-100)", color: on ? "#fff" : "var(--fg-1)" }}><Icon name={m.icon} size={20} /></span>
                <div style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{m.title}</div>
                <div style={{ marginTop: 2, fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-3)" }}>{m.sub}</div>
              </button>
            );
          })}
        </div>

        <svg className="pa-connector" viewBox="0 0 320 56" preserveAspectRatio="none" style={{ width: "100%", maxWidth: 720, height: 56, display: "block", margin: "0 auto" }}>
          <path d="M80 2 L160 54" fill="none" strokeWidth="2" stroke={track === "api" ? "var(--eff-blue-500)" : "var(--border-2)"} />
          <path d="M240 2 L160 54" fill="none" strokeWidth="2" stroke={track === "wl" ? "var(--eff-blue-500)" : "var(--border-2)"} />
        </svg>

        <div style={{ maxWidth: 460, margin: "0 auto", background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", borderRadius: 16, padding: "22px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, color: "var(--fg-1)" }}>Effatta · core</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 14 }}>
            {["SDI", "Firma digitale", "Conservazione", "Corrispettivi"].map((c) => (
              <span key={c} style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500, color: "var(--fg-2)", background: "#fff", border: "1px solid var(--border-1)", borderRadius: 999, padding: "5px 12px" }}>{c}</span>
            ))}
          </div>
        </div>

        <p key={track} style={{ animation: "paFade 240ms var(--ease-out)", maxWidth: 600, margin: "24px auto 0", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--fg-2)" }}>
          {modes[track].detail}
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * 4 — PER CHI È (i tre target)
 * ============================================================ */
const PA_TARGETS = [
  { id: "software-house", icon: "code-2", eyebrow: "Software house", title: "Integri Effatta nel tuo gestionale.", desc: "REST API, webhook e sotto-account per ogni cliente. Il tuo software resta davanti, la parte fiscale gira sotto.", bullets: ["Integrazione via API", "Sandbox e SDK", "Pricing per volume"], cta: "Per software house", href: "software-house.html" },
  { id: "associazioni", icon: "building-2", eyebrow: "Associazioni e Ordini", title: "Una piattaforma per tutti gli iscritti.", desc: "Listino convenzionato, white-label dell'ente e una quota ricorrente per ogni iscritto attivo. Offri lo strumento fiscale col brand dell'associazione o dell'Ordine.", bullets: ["White-label dell'ente", "Pricing convenzionato", "Account manager dedicato"], cta: "Per associazioni e ordini", href: "associazioni.html" },
  { id: "commercialisti", icon: "briefcase", eyebrow: "Commercialisti", title: "Offri Effatta ai tuoi clienti.", desc: "Portale white-label col logo dello studio. I clienti emettono in autonomia, tu vedi tutto, esporti per la contabilità e decidi il margine.", bullets: ["White-label dello studio", "Pannello del commercialista", "Export massivo contabilità"], cta: "Per commercialisti", href: "commercialisti.html" },
];

function PartnerTargets() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <PaHeading eyebrow="Per chi è" title="Tre tipi di partner, un'unica piattaforma." sub="Ognuno parte da un binario diverso — ma il motore fiscale è lo stesso." style={{ marginBottom: 48 }} maxWidth={680} />
        <div className="pa-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PA_TARGETS.map((t) => (
            <div key={t.id} id={t.id} className="pa-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", scrollMarginTop: 96 }}>
              <Icon name={t.icon} size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <div style={{ margin: "20px 0 6px", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--eff-blue-700)" }}>{t.eyebrow}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", color: "var(--fg-1)", lineHeight: 1.2 }}>{t.title}</h3>
              <p style={{ margin: "12px 0 18px", fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--fg-2)" }}>{t.desc}</p>
              <ul style={{ listStyle: "none", margin: "0 0 22px", padding: "16px 0 0", borderTop: "1px solid var(--border-1)", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                {t.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
                    <Icon name="check" size={14} strokeWidth={2} style={{ color: "var(--fg-3)" }} />{b}
                  </li>
                ))}
              </ul>
              <a href={t.href} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--eff-blue-700)", textDecoration: "none" }}>{t.cta} <Icon name="arrow-right" size={15} /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5 — COME SI DIVENTA PARTNER
 * ============================================================ */
const PA_FLOW = [
  { n: "01", title: "Contatto", desc: "Ci racconti il tuo caso d'uso: software, base clienti, volumi." },
  { n: "02", title: "Sandbox & proposta", desc: "Attiviamo la sandbox e ti mandiamo un piano commerciale su misura." },
  { n: "03", title: "Integrazione o branding", desc: "Integri le API o configuriamo il tuo portale white-label." },
  { n: "04", title: "Go-live", desc: "Vai in produzione con account manager dedicato e supporto." },
];

function PartnerHow() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <PaHeading eyebrow="Come si diventa partner" title="Dalla prima chiamata al go-live, in quattro passi." style={{ marginBottom: 56 }} />
        <div className="pa-flow" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {PA_FLOW.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--eff-blue-700)", marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{s.title}</h3>
              <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)" }}>{s.desc}</p>
              {i < PA_FLOW.length - 1 && <div style={{ position: "absolute", top: 8, right: -12, width: 24, height: 1, background: "var(--border-2)" }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6 — NUMERI (unica banda scura, coerente col sito)
 * ============================================================ */
const PA_STATS = [
  { value: 100, suffix: "M+", label: "fatture trasmesse allo SDI", sub: "Dal 2018 a oggi" },
  { value: 99.9, suffix: "%", label: "uptime trasmissione SDI", sub: "Misurato nel 2025" },
  { value: 10, suffix: "K+", label: "partite IVA servite", sub: "Dirette e via partner" },
  { value: 24, suffix: "/7", label: "sandbox sempre disponibile", sub: "Per testare l'integrazione" },
];

function PartnerStats() {
  const [seen, setSeen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setSeen(true); }); }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return (
    <section ref={ref} style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0", borderBottom: "1px solid var(--eff-ink-800)" }}>
      <div className="pa-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "center" }}>
        <PaHeading light eyebrow="Affidabilità" title="Un'infrastruttura su cui costruire." sub="Effatta è online dal 2018: i tuoi clienti contano su una base solida, tu su un partner che resta." maxWidth={340} />
        <div className="pa-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, overflow: "hidden" }}>
          {PA_STATS.map((s, i) => <PaCountStat key={s.label} stat={s} seen={seen} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function PaCountStat({ stat, seen, index }) {
  const [n, setN] = React.useState(0);
  const isDecimal = !Number.isInteger(stat.value);
  React.useEffect(() => {
    if (!seen) return;
    const dur = 1100;
    const start = performance.now() + index * 80;
    let raf;
    const tick = (t) => {
      if (t < start) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, stat.value, index]);
  const display = isDecimal ? n.toFixed(1).replace(".", ",") : Math.round(n).toString();
  const borderLeft = index % 2 === 1 ? "1px solid rgba(255,255,255,0.10)" : "none";
  const borderTop = index >= 2 ? "1px solid rgba(255,255,255,0.10)" : "none";
  return (
    <div style={{ padding: "36px 36px 32px", borderLeft, borderTop }}>
      <div className="pa-bigstat" style={{ fontFamily: "var(--font-sans)", fontSize: 60, lineHeight: 1, letterSpacing: "-0.035em", color: "#fff", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
        {display}<span style={{ fontSize: 34, fontWeight: 800 }}>{stat.suffix}</span>
      </div>
      <div style={{ marginTop: 16, fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.85)", maxWidth: 260, lineHeight: 1.4 }}>{stat.label}</div>
      <div style={{ marginTop: 6, fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{stat.sub}</div>
    </div>
  );
}

/* ============================================================
 * 7 — FAQ
 * ============================================================ */
const PA_FAQ = [
  { q: "Qual è la differenza tra API e white-label?", a: "Con le API integri Effatta dentro al tuo software, mantenendo la tua interfaccia. Con il white-label offri il portale Effatta col tuo brand, senza sviluppare nulla. Puoi anche combinarli." },
  { q: "Posso usare API e white-label insieme?", a: "Sì. Molti partner integrano alcune funzioni via API e offrono allo stesso tempo il portale white-label ai clienti che preferiscono operare in autonomia." },
  { q: "Come funziona il pricing per i partner?", a: "Il pricing è per volume e concordato caso per caso. Sul white-label decidi tu il margine verso i tuoi clienti: ci raccontiamo i numeri e costruiamo una proposta su misura." },
  { q: "Il white-label è davvero completo?", a: "Sì: dominio, logo, colori, e-mail di sistema e portale cliente sono col tuo brand. Effatta resta dietro le quinte; il cliente vede te." },
  { q: "I dati dei clienti sono isolati?", a: "Ogni cliente del partner è un sotto-account separato, con quote e fatturazione indipendenti. L'architettura è multi-tenant con isolamento dei dati." },
  { q: "C'è una sandbox e un referente dedicato?", a: "Sì. La sandbox è sempre attiva e replica i comportamenti reali dello SDI. Ai partner assegniamo un account manager dedicato per integrazione e go-live." },
];

function PartnerFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: "#fff", padding: "112px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="pa-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "flex-start" }}>
        <div className="pa-faq-aside" style={{ position: "sticky", top: 96 }}>
          <PaHeading eyebrow="Domande frequenti" title="Le domande dei partner." sub="Vuoi parlarne con una persona? Ti rispondiamo entro 24 ore lavorative." maxWidth={340} />
          <div style={{ marginTop: 28 }}><Button variant="secondary" size="md" trailingIcon="arrow-right" as="a" href="contatti.html">Parla con noi</Button></div>
        </div>
        <div style={{ border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          {PA_FAQ.map((item, i) => (
            <PaFaqRow key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PaFaqRow({ item, isOpen, onToggle, isFirst }) {
  return (
    <div style={{ borderTop: isFirst ? "none" : "1px solid var(--border-1)" }}>
      <button onClick={onToggle} style={{ width: "100%", background: isOpen ? "var(--eff-paper-50)" : "transparent", border: 0, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em", color: "var(--fg-1)", textAlign: "left", transition: "background var(--t-base) var(--ease-out)" }}>
        <span style={{ flex: 1 }}>{item.q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: isOpen ? "var(--eff-ink-900)" : "var(--eff-paper-50)", color: isOpen ? "#fff" : "var(--fg-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", border: isOpen ? "none" : "1px solid var(--border-1)", transition: "all var(--t-base) var(--ease-out)", flex: "none" }}>
          <Icon name={isOpen ? "x" : "chevron-down"} size={14} strokeWidth={2.2} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: isOpen ? 420 : 0, transition: "max-height var(--t-slow) var(--ease-out)" }}>
        <div style={{ padding: "0 28px 28px", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--fg-2)", maxWidth: 640 }}>{item.a}</div>
      </div>
    </div>
  );
}

/* ============================================================
 * 8 — CTA FINALE (banda scura, come Fatturazione/Scontrino)
 * ============================================================ */
function PartnerCTA() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Diventa partner</div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff" }}>
          Una proposta su misura in 48 ore.
        </h2>
        <p style={{ margin: "20px auto 0", maxWidth: 560, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
          Raccontaci il tuo caso d'uso. Ti rispondiamo con un piano commerciale, una sandbox attiva e un account manager dedicato.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="contatti.html">Richiedi un contatto</Button>
          <a href="api.html" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px", borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center" }}>Documentazione API</a>
        </div>
      </div>
    </section>
  );
}

window.PartnerPage = PartnerPage;
