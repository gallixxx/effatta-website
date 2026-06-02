/* FatturazionePage.jsx — pagina prodotto "Fatturazione Elettronica".
 *
 * Riscritta al livello della home: hero con card + timeline SDI, flusso
 * con striscia di stato, switcher interattivo dei tipi di documento
 * (B2B / B2C / PA / Nota di credito), griglia funzioni con hover, banda
 * numeri scura con count-up, FAQ dedicata e promo finale.
 *
 * Self-contained: usa solo Icon, Button, Pill (atoms), NavBar, Footer.
 * Reveal allo scroll e stili locali iniettati qui sotto (la pagina HTML
 * non include il CSS .reveal della home).
 */

const FATT_CSS = `
  .ff-reveal { opacity: 0; transform: translateY(14px); transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out); }
  .ff-reveal.in { opacity: 1; transform: none; }
  .ff-card { transition: transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out), box-shadow var(--t-base) var(--ease-out); }
  .ff-card:hover { border-color: var(--border-2); transform: translateY(-3px); box-shadow: var(--shadow-md); }
  @keyframes ffFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  @media (max-width: 920px) {
    .ff-split { grid-template-columns: 1fr !important; gap: 48px !important; }
    .ff-grid3 { grid-template-columns: 1fr !important; }
    .ff-grid4 { grid-template-columns: 1fr 1fr !important; }
    .ff-flow { grid-template-columns: 1fr 1fr !important; row-gap: 36px !important; }
  }
  @media (max-width: 560px) {
    .ff-grid4 { grid-template-columns: 1fr !important; }
    .ff-flow { grid-template-columns: 1fr !important; }
  }
  /* Rifinitura mobile: respiro verticale, margini laterali, tipografia */
  @media (max-width: 760px) {
    .ff-page section { padding-top: 60px !important; padding-bottom: 60px !important; }
    .ff-page section > div { padding-left: 20px !important; padding-right: 20px !important; }
    .ff-faq-aside { position: static !important; top: auto !important; }
  }
  @media (max-width: 560px) {
    .ff-bigstat { font-size: 44px !important; }
    .ff-bigstat span { font-size: 26px !important; }
  }
`;

function FatturazionePage() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".ff-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ff-page">
      <style>{FATT_CSS}</style>
      <FatturazioneHero />
      <div className="ff-reveal"><FatturazioneFlow /></div>
      <div className="ff-reveal"><DocTypeSwitcher /></div>
      <div className="ff-reveal"><FatturazioneFeatures /></div>
      <div className="ff-reveal"><FatturazioneStats /></div>
      <div className="ff-reveal"><FatturazioneFAQ /></div>
      <div className="ff-reveal"><FatturazionePromo /></div>
    </div>
  );
}

/* Heading di sezione riusato nella pagina */
function FfHeading({ eyebrow, title, sub, light = false, maxWidth = 620, style }) {
  return (
    <div style={{ maxWidth, ...style }}>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
        color: light ? "rgba(255,255,255,0.55)" : "var(--fg-3)",
        marginBottom: 16, letterSpacing: "0.02em",
      }}>{eyebrow}</div>
      <h2 style={{
        margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
        letterSpacing: "-0.025em", color: light ? "#fff" : "var(--fg-1)",
        textWrap: "balance",
      }}>{title}</h2>
      {sub && (
        <p style={{
          margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
          color: light ? "rgba(255,255,255,0.7)" : "var(--fg-2)",
        }}>{sub}</p>
      )}
    </div>
  );
}

/* ============================================================
 * 1 — HERO
 * ============================================================ */
function FatturazioneHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{
        position: "absolute", top: -200, right: -260, width: 720, height: 720,
        background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)", pointerEvents: "none",
      }} />
      <div className="ff-split" style={{
        position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 8px",
            borderRadius: 999, background: "var(--eff-paper-50)", border: "1px solid var(--border-1)",
            fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--fg-1)", marginBottom: 24,
          }}>
            <span style={{
              padding: "2px 8px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff",
              fontWeight: 700, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>Prodotto</span>
            Fatturazione elettronica
          </div>

          <h1 style={{
            margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 580, textWrap: "balance",
          }}>
            Fatture B2B e B2C, emesse e trasmesse allo SDI.
          </h1>

          <p style={{
            margin: "24px 0 0", maxWidth: 500, fontFamily: "var(--font-sans)",
            fontSize: 19, lineHeight: 1.5, color: "var(--fg-2)",
          }}>
            Una piattaforma online, un'app per iOS e Android e il primo anno gratis fino a 100 fatture. Conversione FatturaPA, firma, invio e conservazione: ci pensa Effatta.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button variant="blue" trailingIcon="arrow-right" as="a" href="#signup">Inizia gratis</Button>
            <Button variant="secondary" as="a" href="pricing.html">Vedi i prezzi</Button>
          </div>

          <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--border-1)", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "100 fatture gratis il primo anno",
              "Poi 1,99 € + IVA al mese, bloccato per sempre",
              "Conservazione a norma per 10 anni inclusa da Standard in su",
            ].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
                <span style={{ color: "var(--eff-success-500)", display: "inline-flex" }}><Icon name="check" size={15} strokeWidth={2.4} /></span>
                {b}
              </div>
            ))}
          </div>
        </div>

        <FatturaTimelineCard />
      </div>
    </section>
  );
}

/* Card fattura con timeline SDI (mostra "il risultato") */
function FatturaTimelineCard() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-md)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>IT001-2026-00193</div>
        <Pill tone="success">Trasmessa allo SDI</Pill>
      </div>
      <div style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>Bar Caffè dei Vicoli SRL</div>
      <div style={{ height: 1, background: "var(--border-1)", margin: "20px 0" }} />
      <KV label="Codice destinatario" value="X2K8R1L" mono />
      <KV label="Imponibile" value="€ 1.250,00" mono />
      <KV label="IVA 22%" value="€ 275,00" mono />
      <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-2)" }}>Totale</div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>€ 1.525,00</div>
      </div>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-1)", display: "flex", gap: 8 }}>
        {[
          { lbl: "Emessa", t: "14:31:02", done: true },
          { lbl: "SDI", t: "14:31:07", done: true },
          { lbl: "Accettata", t: "14:31:09", done: true },
          { lbl: "Conservata", t: "—", done: false },
        ].map((s) => (
          <div key={s.lbl} style={{ flex: 1 }}>
            <div style={{ height: 3, borderRadius: 999, background: s.done ? "var(--eff-success-500)" : "var(--border-1)", marginBottom: 8 }} />
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: s.done ? "var(--fg-1)" : "var(--fg-3)" }}>{s.lbl}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", marginTop: 2 }}>{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KV({ label, value, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
      <span style={{ color: "var(--fg-3)" }}>{label}</span>
      <span style={{ color: "var(--fg-1)", fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

/* ============================================================
 * 2 — COME FUNZIONA (flow + striscia SDI)
 * ============================================================ */
const FLOW = [
  { n: "01", title: "Emetti", desc: "Crea la fattura in pochi click dal programma online o dall'app." },
  { n: "02", title: "Effatta trasmette", desc: "Conversione FatturaPA, firma e invio allo SDI: automatici." },
  { n: "03", title: "Ricevi la notifica", desc: "Dashboard e webhook ti aggiornano in tempo reale sullo stato SDI." },
  { n: "04", title: "Conserva", desc: "Conservazione a norma per 10 anni, gestita interamente da Effatta." },
];

function FatturazioneFlow() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FfHeading eyebrow="Come funziona" title="Dalla fattura alla conservazione, in quattro passi." style={{ marginBottom: 56 }} />

        <div className="ff-flow" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
          {FLOW.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--eff-blue-700)", marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{s.title}</h3>
              <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)" }}>{s.desc}</p>
              {i < FLOW.length - 1 && (
                <div style={{ position: "absolute", top: 8, right: -12, width: 24, height: 1, background: "var(--border-2)" }} />
              )}
            </div>
          ))}
        </div>

        <SdiStrip />
      </div>
    </section>
  );
}

function SdiStrip() {
  const steps = [
    { label: "Emetti", done: true },
    { label: "Firma", done: true },
    { label: "Trasmetti allo SDI", done: true },
    { label: "Ricevi esito", done: true },
    { label: "Conserva 10 anni", done: true },
  ];
  return (
    <div style={{
      padding: "20px 28px", border: "1px solid var(--border-1)", borderRadius: 14, background: "#fff",
      display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
    }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginRight: 12 }}>
        Il flusso completo
      </div>
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999, background: "var(--eff-success-500)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              <Icon name="check" size={11} strokeWidth={3} />
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14, color: "var(--fg-1)" }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && <Icon name="chevron-right" size={14} style={{ color: "var(--fg-3)" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ============================================================
 * 3 — SWITCHER TIPI DI DOCUMENTO (momento interattivo)
 * ============================================================ */
const DOC_TYPES = [
  {
    key: "b2b", tab: "B2B",
    id: "IT001-2026-00193", tone: "success", status: "Trasmessa allo SDI",
    client: "Bar Caffè dei Vicoli SRL",
    rows: [["Codice destinatario", "X2K8R1L"], ["Imponibile", "€ 1.250,00"], ["IVA 22%", "€ 275,00"]],
    total: "€ 1.525,00",
    note: "Fattura tra aziende. Recapito tramite codice destinatario a 7 caratteri.",
  },
  {
    key: "b2c", tab: "B2C",
    id: "IT001-2026-00194", tone: "success", status: "Trasmessa allo SDI",
    client: "Maria De Santis",
    rows: [["Codice fiscale", "DSNMRA85T..."], ["Codice destinatario", "0000000"], ["Imponibile", "€ 80,00"], ["IVA 22%", "€ 17,60"]],
    total: "€ 97,60",
    note: "Fattura a privato: codice destinatario 0000000, copia disponibile nel cassetto fiscale.",
  },
  {
    key: "pa", tab: "PA",
    id: "IT001-2026-00195", tone: "info", status: "In consegna",
    client: "Comune di Napoli",
    rows: [["Codice univoco ufficio", "UF5D7W"], ["Imponibile", "€ 3.000,00"], ["IVA — scissione (split)", "€ 660,00"], ["Bollo", "€ 2,00"]],
    total: "€ 3.002,00",
    note: "Fattura PA con scissione dei pagamenti (split payment) e recapito al codice ufficio IPA.",
  },
  {
    key: "nc", tab: "Nota di credito",
    id: "IT001-2026-00196", tone: "warning", status: "TD04 · emessa",
    client: "Bar Caffè dei Vicoli SRL",
    rows: [["Riferimento", "IT001-2026-00193"], ["Imponibile", "− € 1.250,00"], ["IVA 22%", "− € 275,00"]],
    total: "− € 1.525,00",
    note: "Nota di credito (TD04) collegata alla fattura originale per storno totale o parziale.",
  },
];

function DocTypeSwitcher() {
  const [active, setActive] = React.useState("b2b");
  const doc = DOC_TYPES.find((d) => d.key === active) || DOC_TYPES[0];
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="ff-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <FfHeading
            eyebrow="Un solo flusso, ogni documento"
            title="B2B, B2C, PA e note di credito. Senza cambiare strumento."
            sub="Effatta gestisce tutti i tipi di documento previsti dallo SDI con le loro regole: codice destinatario, scissione dei pagamenti per la PA, riferimenti per le note di credito. Tu compili, il formato giusto lo costruisce Effatta."
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32 }}>
            {DOC_TYPES.map((d) => {
              const on = d.key === active;
              return (
                <button key={d.key} onClick={() => setActive(d.key)} style={{
                  border: on ? "1px solid var(--eff-ink-900)" : "1px solid var(--border-2)",
                  background: on ? "var(--eff-ink-900)" : "#fff",
                  color: on ? "#fff" : "var(--fg-2)",
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                  padding: "9px 16px", borderRadius: 999, cursor: "pointer",
                  transition: "background var(--t-fast) var(--ease-out), color var(--t-fast) var(--ease-out), border-color var(--t-fast) var(--ease-out)",
                }}>{d.tab}</button>
              );
            })}
          </div>
        </div>

        <div>
          <div key={doc.key} style={{ animation: "ffFade 240ms var(--ease-out)", background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 28, boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>{doc.id}</div>
              <Pill tone={doc.tone}>{doc.status}</Pill>
            </div>
            <div style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{doc.client}</div>
            <div style={{ height: 1, background: "var(--border-1)", margin: "20px 0" }} />
            {doc.rows.map((r) => <KV key={r[0]} label={r[0]} value={r[1]} mono />)}
            <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-2)" }}>Totale</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{doc.total}</div>
            </div>
          </div>
          <p style={{ margin: "16px 4px 0", fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-3)" }}>{doc.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4 — FUNZIONI
 * ============================================================ */
const FATT_FEATURES = [
  { icon: "file-text",    title: "B2B, B2C e PA",            desc: "Tutti i flussi SDI gestiti senza configurazioni diverse.", bullets: ["Privati e aziende", "Pubblica amministrazione", "Reverse charge"] },
  { icon: "key-round",    title: "Firma e invio automatici", desc: "Effatta firma il documento e lo invia allo SDI. Nessuna PEC da configurare.", bullets: ["Firma digitale", "Invio diretto SDI", "Zero PEC"] },
  { icon: "webhook",      title: "Notifiche in tempo reale", desc: "Webhook e dashboard ti dicono se la fattura è accettata, scartata o ricevuta.", bullets: ["Esiti in dashboard", "Webhook firmati", "Niente polling"] },
  { icon: "shield-check", title: "Conservazione a norma",    desc: "10 anni di conservazione firmata, inclusa nei piani da Standard in su.", bullets: ["Conforme AgID", "Esibizione AdE", "Export PDF/A"] },
  { icon: "users",        title: "Multi-utente",             desc: "Inviti commercialista, collaboratori e soci, ognuno con i suoi permessi.", bullets: ["Ruoli e permessi", "Accesso commercialista", "Più sedi"] },
  { icon: "code-2",       title: "Importa ed esporta",       desc: "Sincronizzazione con i principali gestionali ed export annuale completo.", bullets: ["Import gestionali", "Export annuale", "API disponibili"] },
];

function FatturazioneFeatures() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FfHeading eyebrow="Funzioni" title="Tutto quello che serve per fatturare. Niente di più." style={{ marginBottom: 56 }} />
        <div className="ff-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {FATT_FEATURES.map((f) => (
            <div key={f.title} className="ff-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 12, padding: 32 }}>
              <Icon name={f.icon} size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{ margin: "24px 0 10px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{f.title}</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)" }}>{f.desc}</p>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: "16px 0 0", borderTop: "1px solid var(--border-1)" }}>
                {f.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
                    <Icon name="check" size={14} strokeWidth={2} style={{ color: "var(--fg-3)" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5 — NUMERI (banda scura, count-up)
 * ============================================================ */
const FATT_STATS = [
  { value: 100, suffix: "M+", label: "fatture trasmesse allo SDI", sub: "Dal 2018 a oggi" },
  { value: 99.9, suffix: "%", label: "uptime trasmissione SDI", sub: "Misurato nel 2025" },
  { value: 10, suffix: "K+", label: "partite IVA attive ogni giorno", sub: "Dirette e via partner" },
  { value: 10, suffix: " anni", label: "conservazione a norma inclusa", sub: "Firmata e certificata" },
];

function FatturazioneStats() {
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
      <div className="ff-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "center" }}>
        <FfHeading light eyebrow="I numeri" title="Otto anni di trasmissioni allo SDI." sub="Effatta è online dal 2018, da prima che la fattura elettronica B2B diventasse obbligatoria." maxWidth={340} />
        <div className="ff-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, overflow: "hidden" }}>
          {FATT_STATS.map((s, i) => <CountStat key={s.label} stat={s} seen={seen} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function CountStat({ stat, seen, index }) {
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
      <div className="ff-bigstat" style={{ fontFamily: "var(--font-sans)", fontSize: 60, lineHeight: 1, letterSpacing: "-0.035em", color: "#fff", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
        {display}<span style={{ fontSize: 34, fontWeight: 800 }}>{stat.suffix}</span>
      </div>
      <div style={{ marginTop: 16, fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.85)", maxWidth: 260, lineHeight: 1.4 }}>{stat.label}</div>
      <div style={{ marginTop: 6, fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{stat.sub}</div>
    </div>
  );
}

/* ============================================================
 * 6 — FAQ
 * ============================================================ */
const FATT_FAQ = [
  { q: "Effatta trasmette le fatture direttamente allo SDI?", a: "Sì. Le fatture vengono normalizzate in FatturaPA, firmate digitalmente e trasmesse al Sistema di Interscambio. Le ricevute (consegna, mancata consegna, scarto) tornano nella dashboard, non in PEC." },
  { q: "Cosa succede se una fattura viene scartata?", a: "La dashboard ti mostra il codice errore esatto restituito dallo SDI (00200, 00305, …) e il campo da correggere. Hai 5 giorni per ritrasmettere la stessa fattura senza emettere una nota di credito." },
  { q: "Posso fatturare alla Pubblica Amministrazione?", a: "Sì. Effatta gestisce le fatture PA con codice univoco ufficio IPA, scissione dei pagamenti (split payment) e l'iter di accettazione/rifiuto previsto per la PA." },
  { q: "La conservazione a norma è davvero inclusa?", a: "Sì, dal piano Standard in su: 10 anni di conservazione sostitutiva firmata, conforme alle linee guida AgID. Export annuale in PDF/A scaricabile in qualsiasi momento." },
  { q: "Può accedere anche il mio commercialista?", a: "Sì. Puoi invitare il commercialista, collaboratori e soci come utenti aggiuntivi, ognuno con i propri permessi, e dare loro accesso ai documenti e all'export." },
  { q: "Devo configurare una PEC o un canale SDI?", a: "No. L'accreditamento al Sistema di Interscambio e la firma sono gestiti da Effatta: non serve PEC né codice destinatario tuo. Inizi a emettere subito." },
];

function FatturazioneFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: "#fff", padding: "112px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="ff-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "flex-start" }}>
        <div className="ff-faq-aside" style={{ position: "sticky", top: 96 }}>
          <FfHeading eyebrow="Domande frequenti" title="Le cose che ci chiedono sulla fatturazione." sub="Non hai trovato la risposta? Ti risponde una persona vera entro 24 ore lavorative." maxWidth={340} />
          <div style={{ marginTop: 28 }}>
            <Button variant="secondary" size="md" trailingIcon="arrow-right" as="a" href="contatti.html">Parla con noi</Button>
          </div>
        </div>

        <div style={{ border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          {FATT_FAQ.map((item, i) => (
            <FaqRow key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, isOpen, onToggle, isFirst }) {
  return (
    <div style={{ borderTop: isFirst ? "none" : "1px solid var(--border-1)" }}>
      <button onClick={onToggle} style={{
        width: "100%", background: isOpen ? "var(--eff-paper-50)" : "transparent", border: 0,
        padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
        cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 17,
        letterSpacing: "-0.015em", color: "var(--fg-1)", textAlign: "left",
        transition: "background var(--t-base) var(--ease-out)",
      }}>
        <span style={{ flex: 1 }}>{item.q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: 999, background: isOpen ? "var(--eff-ink-900)" : "var(--eff-paper-50)",
          color: isOpen ? "#fff" : "var(--fg-2)", display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: isOpen ? "none" : "1px solid var(--border-1)", transition: "all var(--t-base) var(--ease-out)", flex: "none",
        }}>
          <Icon name={isOpen ? "x" : "chevron-down"} size={14} strokeWidth={2.2} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: isOpen ? 400 : 0, transition: "max-height var(--t-slow) var(--ease-out)" }}>
        <div style={{ padding: "0 28px 28px", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--fg-2)", maxWidth: 640 }}>{item.a}</div>
      </div>
    </div>
  );
}

/* ============================================================
 * 7 — PROMO + CTA
 * ============================================================ */
function FatturazionePromo() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{
          display: "inline-block", padding: "4px 10px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff",
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24,
        }}>Offerta del mese</div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff" }}>
          Gratis il primo anno fino a 100 fatture.<br />Poi 1,99 €&nbsp;+&nbsp;IVA al mese, bloccato per sempre.
        </h2>
        <p style={{ margin: "20px auto 0", maxWidth: 580, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
          Niente sorprese, niente aumenti silenziosi: il prezzo resta lo stesso finché vuoi usare Effatta. Si applicano condizioni.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="#signup">Attiva la promo</Button>
          <a href="pricing.html" style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none",
            display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px",
            borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center",
          }}>Vedi i prezzi</a>
        </div>
      </div>
    </section>
  );
}

window.FatturazionePage = FatturazionePage;
window.FatturazioneHero = FatturazioneHero;
window.FatturazioneFlow = FatturazioneFlow;
window.FatturazioneFeatures = FatturazioneFeatures;
window.FatturazionePromo = FatturazionePromo;
