/* ScontrinoPage.jsx — pagina prodotto "Scontrino digitale".
 *
 * Riscritta al livello della home. Il centro è la CASSA WEB INTERATTIVA:
 * si toccano i prodotti, si riempie il carrello, il totale si aggiorna e
 * "Emetti scontrino" mostra la ricevuta trasmessa all'Agenzia delle Entrate.
 *
 * Sezioni: hero + ricevuta, cassa interattiva, come funziona (flusso
 * corrispettivi), funzioni, web+app, banda numeri (count-up), FAQ, CTA.
 * Self-contained: Icon, Button, Pill (atoms), NavBar, Footer.
 */

const SC_CSS = `
  .sc-reveal { opacity: 0; transform: translateY(14px); transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out); }
  .sc-reveal.in { opacity: 1; transform: none; }
  .sc-card { transition: transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out), box-shadow var(--t-base) var(--ease-out); }
  .sc-card:hover { border-color: var(--border-2); transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .sc-prod { transition: transform var(--t-fast) var(--ease-out), border-color var(--t-fast) var(--ease-out); }
  .sc-prod:hover { border-color: var(--eff-blue-300); transform: translateY(-2px); }
  .sc-prod:active { transform: scale(0.97); }
  @keyframes scFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  /* Tablet */
  @media (max-width: 920px) {
    .sc-split { grid-template-columns: 1fr !important; gap: 44px !important; }
    .sc-grid3 { grid-template-columns: 1fr 1fr !important; }
    .sc-grid4 { grid-template-columns: 1fr 1fr !important; }
    .sc-apps  { grid-template-columns: 1fr 1fr !important; }
    .sc-flow  { grid-template-columns: 1fr 1fr !important; row-gap: 32px !important; }
  }

  /* Telefono — mobile-first */
  @media (max-width: 600px) {
    .sc-page section { padding-top: 52px !important; padding-bottom: 52px !important; }
    .sc-page section > div { padding-left: 18px !important; padding-right: 18px !important; }
    .sc-grid3 { grid-template-columns: 1fr !important; gap: 12px !important; }
    .sc-apps  { grid-template-columns: 1fr !important; gap: 12px !important; }
    .sc-flow  { grid-template-columns: 1fr 1fr !important; column-gap: 16px !important; row-gap: 24px !important; }

    .sc-page h1 { font-size: 1.7rem !important; line-height: 1.15 !important; }
    .sc-page h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
    .sc-page h3 { font-size: 1rem !important; }
    .sc-page p  { font-size: 0.875rem !important; line-height: 1.5 !important; }
    .sc-page p.sc-lede { font-size: 0.95rem !important; }

    .sc-card { padding: 18px !important; border-radius: 12px !important; }
    .sc-card > svg { width: 22px !important; height: 22px !important; }

    .sc-bigstat { font-size: 40px !important; }
    .sc-bigstat span { font-size: 22px !important; }

    .sc-faq-aside { position: static !important; top: auto !important; }
    .sc-strip { display: none !important; }
    .sc-receipt { margin: 0 auto !important; }

    .sc-page .eff-btn { height: 40px !important; padding: 0 16px !important; font-size: 14px !important; }
  }
`;

function ScontrinoPage() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".sc-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sc-page">
      <style>{SC_CSS}</style>
      <ScontrinoHero />
      <div className="sc-reveal"><CassaInteractive /></div>
      <div className="sc-reveal"><ScontrinoFlow /></div>
      <div className="sc-reveal"><ScontrinoFeatures /></div>
      <div className="sc-reveal"><ScontrinoApps /></div>
      <div className="sc-reveal"><ScontrinoStats /></div>
      <div className="sc-reveal"><ScontrinoFAQ /></div>
      <div className="sc-reveal"><ScontrinoPromo /></div>
    </div>
  );
}

function ScHeading({ eyebrow, title, sub, light = false, maxWidth = 620, style }) {
  return (
    <div style={{ maxWidth, ...style }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: light ? "rgba(255,255,255,0.55)" : "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em" }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: light ? "#fff" : "var(--fg-1)", textWrap: "balance" }}>{title}</h2>
      {sub && <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: light ? "rgba(255,255,255,0.7)" : "var(--fg-2)" }}>{sub}</p>}
    </div>
  );
}

const eur = (n) => n.toFixed(2).replace(".", ",");

/* ============================================================
 * 1 — HERO
 * ============================================================ */
function ScontrinoHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: -200, right: -260, width: 720, height: 720, background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div className="sc-split" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px 5px 8px", borderRadius: 999, background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--fg-1)", marginBottom: 24 }}>
            <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontWeight: 700, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>Prodotto</span>
            Scontrino digitale
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 580, textWrap: "balance" }}>
            Una cassa digitale che vive nel tuo browser.
          </h1>
          <p className="sc-lede" style={{ margin: "24px 0 0", maxWidth: 500, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5, color: "var(--fg-2)" }}>
            Sostituisci il registratore telematico con Effatta Scontrino: cassa web e app mobile, con la trasmissione dei corrispettivi all'Agenzia delle Entrate già a bordo.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button variant="blue" trailingIcon="arrow-right" as="a" href="#signup">Prova la cassa web</Button>
            <Button variant="secondary" as="a" href="pricing.html">Vedi il piano Scontrino</Button>
          </div>
          <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--border-1)", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Nessun registratore telematico da acquistare",
              "Corrispettivi trasmessi all'AdE in automatico",
              "Lotteria degli scontrini e resi integrati",
            ].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
                <span style={{ color: "var(--eff-success-500)", display: "inline-flex" }}><Icon name="check" size={15} strokeWidth={2.4} /></span>
                {b}
              </div>
            ))}
          </div>
        </div>
        <ReceiptMock />
      </div>
    </section>
  );
}

function ReceiptMock() {
  const rows = [["1×", "Espresso", "1,20"], ["2×", "Cappuccino", "3,00"], ["1×", "Pizza margherita", "8,00"], ["1×", "Coperto", "2,00"]];
  return (
    <div className="sc-receipt" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: 28, maxWidth: 420, margin: "0 0 0 auto", boxShadow: "var(--shadow-md)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--fg-1)" }}>Documento commerciale</div>
        <Pill tone="success">Emesso</Pill>
      </div>
      <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>0001-0193 · 19/05/2026 · 14:30</div>
      <div style={{ height: 1, background: "var(--border-1)", margin: "18px 0" }} />
      {rows.map(([q, n, p]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "32px 1fr auto", padding: "6px 0", fontFamily: "var(--font-sans)", fontSize: 14 }}>
          <span style={{ color: "var(--fg-3)", fontVariantNumeric: "tabular-nums" }}>{q}</span>
          <span style={{ color: "var(--fg-1)" }}>{n}</span>
          <span style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>€ {p}</span>
        </div>
      ))}
      <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--fg-2)" }}>Totale EUR</span>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>14,20</span>
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--eff-paper-50)", borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="check-circle" size={14} style={{ color: "var(--eff-success-500)" }} />
        Trasmesso all'Agenzia delle Entrate
      </div>
    </div>
  );
}

/* ============================================================
 * 2 — CASSA WEB INTERATTIVA (momento clou)
 * ============================================================ */
const SC_CATS = [
  { id: "tutti", label: "Tutti" },
  { id: "bar", label: "Bar" },
  { id: "piz", label: "Pizzeria" },
  { id: "vin", label: "Vini" },
  { id: "alc", label: "Alcolici" },
];
const SC_PRODUCTS = [
  { id: "espresso", name: "Espresso", price: 1.20, cat: "bar" },
  { id: "cappuccino", name: "Cappuccino", price: 1.80, cat: "bar" },
  { id: "cornetto", name: "Cornetto", price: 1.50, cat: "bar" },
  { id: "acqua", name: "Acqua naturale", price: 1.00, cat: "bar" },
  { id: "coperto", name: "Coperto", price: 2.00, cat: "bar" },
  { id: "margherita", name: "Pizza margherita", price: 8.00, cat: "piz" },
  { id: "marinara", name: "Pizza marinara", price: 6.00, cat: "piz" },
  { id: "capricciosa", name: "Pizza capricciosa", price: 12.00, cat: "piz" },
  { id: "rosso", name: "Calice rosso", price: 4.50, cat: "vin" },
  { id: "bianco", name: "Calice bianco", price: 4.50, cat: "vin" },
  { id: "birra", name: "Birra media", price: 5.00, cat: "alc" },
  { id: "amaro", name: "Amaro", price: 4.00, cat: "alc" },
];

function useIsMobile(bp) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: " + bp + "px)");
    const on = () => setM(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener("change", on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", on); else mq.removeListener(on); };
  }, [bp]);
  return m;
}

function CassaInteractive() {
  const isMobile = useIsMobile(860);
  const [cat, setCat] = React.useState("tutti");
  const [cart, setCart] = React.useState({});
  const [pay, setPay] = React.useState("cash");
  const [emitted, setEmitted] = React.useState(null);

  const shown = cat === "tutti" ? SC_PRODUCTS : SC_PRODUCTS.filter((p) => p.cat === cat);
  const lines = Object.keys(cart).map((id) => ({ p: SC_PRODUCTS.find((x) => x.id === id), qty: cart[id] })).filter((l) => l.p && l.qty > 0);
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) => setCart((c) => { const q = (c[id] || 0) - 1; const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const reset = () => { setCart({}); setEmitted(null); setCat("tutti"); };
  const emit = () => { if (count === 0) return; setEmitted({ n: "0001-" + (Math.floor(Math.random() * 9000) + 1000), total, pay }); };

  const api = { cat, setCat, shown, cart, lines, total, count, pay, setPay, emitted, add, dec, reset, emit };

  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <ScHeading eyebrow="Cassa web · provala qui" title="Una cassa che apri dal browser. Tocca e prova." sub="Aggiungi prodotti, vedi il totale aggiornarsi ed emetti lo scontrino: è il vero flusso, in piccolo. Niente da installare, niente registratore telematico." style={{ marginBottom: 40 }} maxWidth={680} />

        {isMobile ? <CassaMobile api={api} /> : (
        <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          {/* chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: "1px solid var(--border-1)", background: "var(--eff-paper-50)" }}>
            <img src="assets/logos/effatta-mark-blue.svg" style={{ height: 22, display: "block" }} alt="" />
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-1)" }}>Cassa · Bar dei Vicoli</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--eff-success-500)" }} />
              Cassa attiva
            </div>
          </div>

          <div className="sc-cassa" style={{ display: "grid", gridTemplateColumns: "160px 1fr 320px", minHeight: 480 }}>
            {/* categorie */}
            <div className="sc-cassa-cats" style={{ borderRight: "1px solid var(--border-1)", background: "#fff", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              {SC_CATS.map((c) => {
                const on = cat === c.id;
                const n = c.id === "tutti" ? SC_PRODUCTS.length : SC_PRODUCTS.filter((p) => p.cat === c.id).length;
                return (
                  <button key={c.id} onClick={() => setCat(c.id)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                    padding: "10px 12px", borderRadius: 8, border: 0, cursor: "pointer", whiteSpace: "nowrap",
                    background: on ? "var(--eff-ink-900)" : "transparent", color: on ? "#fff" : "var(--fg-1)",
                    fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13, textAlign: "left",
                    transition: "background var(--t-fast) var(--ease-out)",
                  }}>
                    <span>{c.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: on ? "rgba(255,255,255,0.5)" : "var(--fg-3)" }}>{n}</span>
                  </button>
                );
              })}
            </div>

            {/* prodotti */}
            <div style={{ padding: 20, background: "var(--eff-paper-50)" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", marginBottom: 16 }}>Tocca un prodotto per aggiungerlo</div>
              <div className="sc-prodgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {shown.map((p) => (
                  <button key={p.id} className="sc-prod" onClick={() => add(p.id)} style={{
                    background: "#fff", border: "1px solid var(--border-1)", borderRadius: 10, padding: 14,
                    aspectRatio: "1 / 1", display: "flex", flexDirection: "column", justifyContent: "space-between",
                    cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-1)", lineHeight: 1.25 }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>€ {eur(p.price)}</span>
                      {cart[p.id] > 0 && (
                        <span style={{ minWidth: 20, height: 20, padding: "0 6px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{cart[p.id]}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* carrello / esito */}
            <div className="sc-cart" style={{ borderLeft: "1px solid var(--border-1)", padding: 20, background: "#fff", display: "flex", flexDirection: "column" }}>
              {emitted ? (
                <div key="ok" style={{ animation: "scFade 240ms var(--ease-out)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{ width: 36, height: 36, borderRadius: 999, background: "var(--eff-success-50)", color: "var(--eff-success-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="check-circle" size={22} /></span>
                      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--fg-1)" }}>Scontrino emesso</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>{emitted.n} · documento commerciale</div>
                    <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-2)" }}>Totale</span>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>€ {eur(emitted.total)}</span>
                    </div>
                    <div style={{ marginTop: 8, fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)" }}>Pagamento: {emitted.pay === "cash" ? "contanti" : "elettronico"}</div>
                    <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--eff-paper-50)", borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name="check-circle" size={14} style={{ color: "var(--eff-success-500)" }} />
                      Trasmesso all'Agenzia delle Entrate
                    </div>
                  </div>
                  <Button variant="secondary" size="md" style={{ width: "100%", marginTop: 16 }} icon="receipt" onClick={reset}>Nuovo scontrino</Button>
                </div>
              ) : (
                <React.Fragment>
                  <div style={{ background: "var(--eff-ink-900)", color: "#fff", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Totale EUR</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{eur(total)}</div>
                  </div>

                  <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1, overflow: "auto" }}>
                    {lines.length === 0 ? (
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)", padding: "20px 0", textAlign: "center" }}>Il carrello è vuoto.<br />Tocca un prodotto per iniziare.</div>
                    ) : lines.map((l) => (
                      <div key={l.p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-1)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.p.name}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => dec(l.p.id)} aria-label="Rimuovi" style={qtyBtn}><Icon name="minus" size={13} strokeWidth={2.4} /></button>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-1)", minWidth: 16, textAlign: "center" }}>{l.qty}</span>
                          <button onClick={() => add(l.p.id)} aria-label="Aggiungi" style={qtyBtn}><Icon name="plus" size={13} strokeWidth={2.4} /></button>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", minWidth: 58, textAlign: "right" }}>€ {eur(l.p.price * l.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
                    {[["cash", "Contanti"], ["card", "Elettronico"]].map(([k, lbl]) => {
                      const on = pay === k;
                      return (
                        <button key={k} onClick={() => setPay(k)} style={{
                          padding: "10px 0", borderRadius: 8,
                          border: on ? "1px solid var(--eff-ink-900)" : "1px solid var(--border-1)",
                          background: on ? "var(--eff-ink-900)" : "#fff", color: on ? "#fff" : "var(--fg-2)",
                          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, cursor: "pointer",
                          transition: "all var(--t-fast) var(--ease-out)",
                        }}>{lbl}</button>
                      );
                    })}
                  </div>

                  <Button variant="blue" size="md" trailingIcon="arrow-right" style={{ width: "100%", marginTop: 12, opacity: count === 0 ? 0.5 : 1, pointerEvents: count === 0 ? "none" : "auto" }} onClick={emit}>
                    Emetti scontrino
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        )}
        <p style={{ margin: "16px 4px 0", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)" }}>Demo dimostrativa: nessun corrispettivo viene realmente trasmesso.</p>
      </div>
    </section>
  );
}

const qtyBtn = {
  width: 26, height: 26, borderRadius: 6, border: "1px solid var(--border-1)", background: "#fff",
  color: "var(--fg-1)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0,
};

/* Cassa — layout dedicato al mobile: chip categorie, tiles 2 colonne, carrello compatto */
function CassaMobile({ api }) {
  const { cat, setCat, shown, cart, lines, total, count, pay, setPay, emitted, add, dec, reset, emit } = api;
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: "1px solid var(--border-1)", background: "var(--eff-paper-50)" }}>
        <img src="assets/logos/effatta-mark-blue.svg" style={{ height: 18, display: "block" }} alt="" />
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-1)" }}>Bar dei Vicoli</div>
        <div style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-3)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--eff-success-500)" }} />Attiva
        </span>
      </div>

      {emitted ? (
        <div style={{ animation: "scFade 240ms var(--ease-out)", padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: 999, background: "var(--eff-success-50)", color: "var(--eff-success-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="check-circle" size={19} /></span>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--fg-1)" }}>Scontrino emesso</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>{emitted.n} · documento commerciale</div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-2)" }}>Totale</span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>€ {eur(emitted.total)}</span>
          </div>
          <div style={{ marginTop: 12, padding: "10px 12px", background: "var(--eff-paper-50)", borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="check-circle" size={14} style={{ color: "var(--eff-success-500)" }} />Trasmesso all'Agenzia delle Entrate
          </div>
          <Button variant="secondary" size="sm" style={{ width: "100%", marginTop: 14 }} icon="receipt" onClick={reset}>Nuovo scontrino</Button>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 14px", borderBottom: "1px solid var(--border-1)", WebkitOverflowScrolling: "touch" }}>
            {SC_CATS.map((c) => {
              const on = cat === c.id;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{
                  flex: "none", padding: "7px 13px", borderRadius: 999,
                  border: on ? "1px solid var(--eff-ink-900)" : "1px solid var(--border-2)",
                  background: on ? "var(--eff-ink-900)" : "#fff", color: on ? "#fff" : "var(--fg-2)",
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                }}>{c.label}</button>
              );
            })}
          </div>

          <div style={{ padding: 14, background: "var(--eff-paper-50)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {shown.map((p) => (
              <button key={p.id} className="sc-prod" onClick={() => add(p.id)} style={{
                display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8, minHeight: 60,
                background: "#fff", border: "1px solid var(--border-1)", borderRadius: 10, padding: "10px 12px", textAlign: "left", cursor: "pointer",
              }}>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12.5, color: "var(--fg-1)", lineHeight: 1.25 }}>{p.name}</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>€ {eur(p.price)}</span>
                  {cart[p.id] > 0 && <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{cart[p.id]}</span>}
                </div>
              </button>
            ))}
          </div>

          <div style={{ padding: 14, borderTop: "1px solid var(--border-1)" }}>
            {lines.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14, maxHeight: 168, overflow: "auto" }}>
                {lines.map((l) => (
                  <div key={l.p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--fg-1)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.p.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => dec(l.p.id)} aria-label="Rimuovi" style={qtyBtn}><Icon name="minus" size={12} strokeWidth={2.4} /></button>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-1)", minWidth: 14, textAlign: "center" }}>{l.qty}</span>
                      <button onClick={() => add(l.p.id)} aria-label="Aggiungi" style={qtyBtn}><Icon name="plus" size={12} strokeWidth={2.4} /></button>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", minWidth: 52, textAlign: "right" }}>€ {eur(l.p.price * l.qty)}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "var(--eff-ink-900)", color: "#fff", borderRadius: 10 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Totale · {count} art.</span>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>€ {eur(total)}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
              {[["cash", "Contanti"], ["card", "Elettronico"]].map(([k, lbl]) => {
                const on = pay === k;
                return (
                  <button key={k} onClick={() => setPay(k)} style={{
                    padding: "9px 0", borderRadius: 8,
                    border: on ? "1px solid var(--eff-ink-900)" : "1px solid var(--border-1)",
                    background: on ? "var(--eff-ink-900)" : "#fff", color: on ? "#fff" : "var(--fg-2)",
                    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12.5, cursor: "pointer",
                  }}>{lbl}</button>
                );
              })}
            </div>

            <Button variant="blue" size="sm" trailingIcon="arrow-right" style={{ width: "100%", marginTop: 10, opacity: count === 0 ? 0.5 : 1, pointerEvents: count === 0 ? "none" : "auto" }} onClick={emit}>Emetti scontrino</Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ============================================================
 * 3 — COME FUNZIONA (flusso corrispettivi)
 * ============================================================ */
const SC_FLOW = [
  { n: "01", title: "Vendi al banco", desc: "Componi il conto dalla cassa web o dall'app, con catalogo e varianti." },
  { n: "02", title: "Emetti il documento", desc: "Il documento commerciale viene generato e mostrato, stampato o inviato al cliente." },
  { n: "03", title: "Trasmetti all'AdE", desc: "I corrispettivi vengono trasmessi all'Agenzia delle Entrate, senza registratore telematico." },
  { n: "04", title: "Chiusura giornaliera", desc: "Il riepilogo dei corrispettivi del giorno è pronto, in automatico." },
];

function ScontrinoFlow() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <ScHeading eyebrow="Come funziona" title="Dalla vendita ai corrispettivi, senza pensarci." style={{ marginBottom: 56 }} />
        <div className="sc-flow" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
          {SC_FLOW.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--eff-blue-700)", marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{s.title}</h3>
              <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)" }}>{s.desc}</p>
              {i < SC_FLOW.length - 1 && <div style={{ position: "absolute", top: 8, right: -12, width: 24, height: 1, background: "var(--border-2)" }} />}
            </div>
          ))}
        </div>
        <div className="sc-strip" style={{ padding: "20px 28px", border: "1px solid var(--border-1)", borderRadius: 14, background: "var(--eff-paper-50)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginRight: 12 }}>Il flusso dei corrispettivi</div>
          {["Vendi", "Emetti documento", "Lotteria scontrini", "Trasmetti all'AdE", "Chiusura"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--eff-success-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Icon name="check" size={11} strokeWidth={3} /></span>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14, color: "var(--fg-1)" }}>{s}</span>
              </div>
              {i < arr.length - 1 && <Icon name="chevron-right" size={14} style={{ color: "var(--fg-3)" }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4 — FUNZIONI
 * ============================================================ */
const SC_FEATURES = [
  { icon: "scan-line", title: "Pagamento e scontrino", desc: "Documento commerciale e incasso legati nello stesso gesto.", bullets: ["Contanti o elettronico", "Resto e sconti", "Conforme alla normativa"] },
  { icon: "receipt", title: "Documento commerciale", desc: "A video, via e-mail o SMS al cliente, con lotteria integrata.", bullets: ["Invio digitale", "Lotteria scontrini", "Ristampa"] },
  { icon: "code-2", title: "Reso e storno", desc: "Resi totali o parziali e storni con causale, sempre tracciati.", bullets: ["Reso parziale", "Storno con causale", "Corrispettivi coerenti"] },
  { icon: "webhook", title: "Trasmissione AdE", desc: "Corrispettivi giornalieri inviati all'Agenzia delle Entrate.", bullets: ["Invio automatico", "Niente chiavetta", "Chiusura giornaliera"] },
  { icon: "users", title: "Multi-postazione", desc: "Più casse in contemporanea, sincronizzate sotto la stessa P.IVA.", bullets: ["Più casse", "Sync in tempo reale", "Un'unica P.IVA"] },
  { icon: "building-2", title: "Bar, ristoranti, retail", desc: "Catalogo per reparto, varianti e prodotti pensati per il banco.", bullets: ["Catalogo per reparto", "Varianti", "Veloce al banco"] },
];

function ScontrinoFeatures() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <ScHeading eyebrow="Funzioni" title="Tutto quello che serve al banco. Niente registratore." style={{ marginBottom: 56 }} />
        <div className="sc-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {SC_FEATURES.map((f) => (
            <div key={f.title} className="sc-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 12, padding: 32 }}>
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
 * 5 — WEB + APP
 * ============================================================ */
function ScontrinoApps() {
  const cards = [
    { icon: "monitor", title: "Cassa web", desc: "Apri il browser e sei al banco. Catalogo, lotteria degli scontrini e resi già pronti. Funziona anche da tablet.", bullets: ["Zero installazioni", "Da PC e tablet", "Multi-postazione"] },
    { icon: "smartphone", title: "App mobile", desc: "iOS e Android. In tasca, al banco o a un evento all'aperto: emetti scontrini ovunque ci sia rete.", bullets: ["iOS e Android", "Anche in mobilità", "Stessi dati della cassa web"] },
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <ScHeading eyebrow="Web e mobile" title="La stessa cassa, dove ti serve." style={{ marginBottom: 48 }} />
        <div className="sc-apps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {cards.map((c) => (
            <div key={c.title} className="sc-card" style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, padding: "40px 36px" }}>
              <span style={{ width: 48, height: 48, borderRadius: 12, background: "var(--eff-blue-50)", color: "var(--eff-blue-700)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={c.icon} size={24} /></span>
              <h3 style={{ margin: "20px 0 10px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{c.title}</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)", maxWidth: 400 }}>{c.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                {c.bullets.map((b) => (
                  <span key={b} style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--fg-2)", background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", borderRadius: 999, padding: "5px 12px" }}>{b}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6 — NUMERI (banda scura, count-up)
 * ============================================================ */
const SC_STATS = [
  { value: 10, suffix: "M+", label: "scontrini emessi con Effatta", sub: "Cassa web + API" },
  { value: 100, suffix: "%", label: "corrispettivi trasmessi all'AdE", sub: "In automatico, ogni giorno" },
  { value: 10, suffix: "K+", label: "partite IVA attive ogni giorno", sub: "Dirette e via partner" },
  { value: 0, suffix: " €", label: "di hardware da acquistare", sub: "Nessun registratore telematico" },
];

function ScontrinoStats() {
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
      <div className="sc-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "center" }}>
        <ScHeading light eyebrow="I numeri" title="La cassa senza registratore." sub="Niente hardware da comprare o mantenere: la cassa è il tuo browser, i corrispettivi viaggiano da soli." maxWidth={340} />
        <div className="sc-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, overflow: "hidden" }}>
          {SC_STATS.map((s, i) => <ScCountStat key={s.label} stat={s} seen={seen} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ScCountStat({ stat, seen, index }) {
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
      <div className="sc-bigstat" style={{ fontFamily: "var(--font-sans)", fontSize: 60, lineHeight: 1, letterSpacing: "-0.035em", color: "#fff", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
        {display}<span style={{ fontSize: 34, fontWeight: 800 }}>{stat.suffix}</span>
      </div>
      <div style={{ marginTop: 16, fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.85)", maxWidth: 260, lineHeight: 1.4 }}>{stat.label}</div>
      <div style={{ marginTop: 6, fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{stat.sub}</div>
    </div>
  );
}

/* ============================================================
 * 7 — FAQ + PROMO
 * ============================================================ */
const SC_FAQ = [
  { q: "Effatta sostituisce il registratore telematico?", a: "Sì. Con la cassa web e l'app emetti il documento commerciale e trasmetti i corrispettivi all'Agenzia delle Entrate, senza registratore telematico né chiavetta. Ti serve solo un dispositivo con browser e una connessione." },
  { q: "Come vengono trasmessi i corrispettivi all'AdE?", a: "I corrispettivi vengono inviati all'Agenzia delle Entrate e la chiusura giornaliera è generata in automatico. Niente trasmissione manuale a fine giornata." },
  { q: "Posso gestire la lotteria degli scontrini?", a: "Sì. Il codice lotteria del cliente si inserisce al momento dell'emissione del documento commerciale ed è gestito nel flusso della cassa." },
  { q: "Come funzionano resi e storni?", a: "Puoi effettuare resi totali o parziali e storni con causale. I corrispettivi vengono ricalcolati di conseguenza, mantenendo tutto coerente." },
  { q: "Posso usare più casse contemporaneamente?", a: "Sì. Puoi avere più postazioni attive sotto la stessa partita IVA: gli scontrini e il catalogo si sincronizzano in tempo reale." },
  { q: "Serve hardware particolare?", a: "No. Bastano un PC, un tablet o uno smartphone con browser. Se vuoi, puoi collegare una stampante per lo scontrino cartaceo, ma non è obbligatoria." },
];

function ScontrinoFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: "#fff", padding: "112px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="sc-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "flex-start" }}>
        <div className="sc-faq-aside" style={{ position: "sticky", top: 96 }}>
          <ScHeading eyebrow="Domande frequenti" title="Le cose che ci chiedono sullo scontrino." sub="Non hai trovato la risposta? Ti risponde una persona vera entro 24 ore lavorative." maxWidth={340} />
          <div style={{ marginTop: 28 }}>
            <Button variant="secondary" size="md" trailingIcon="arrow-right" as="a" href="contatti.html">Parla con noi</Button>
          </div>
        </div>
        <div style={{ border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          {SC_FAQ.map((item, i) => (
            <ScFaqRow key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScFaqRow({ item, isOpen, onToggle, isFirst }) {
  return (
    <div style={{ borderTop: isFirst ? "none" : "1px solid var(--border-1)" }}>
      <button onClick={onToggle} style={{ width: "100%", background: isOpen ? "var(--eff-paper-50)" : "transparent", border: 0, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em", color: "var(--fg-1)", textAlign: "left", transition: "background var(--t-base) var(--ease-out)" }}>
        <span style={{ flex: 1 }}>{item.q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: isOpen ? "var(--eff-ink-900)" : "var(--eff-paper-50)", color: isOpen ? "#fff" : "var(--fg-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", border: isOpen ? "none" : "1px solid var(--border-1)", transition: "all var(--t-base) var(--ease-out)", flex: "none" }}>
          <Icon name={isOpen ? "x" : "chevron-down"} size={14} strokeWidth={2.2} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: isOpen ? 400 : 0, transition: "max-height var(--t-slow) var(--ease-out)" }}>
        <div style={{ padding: "0 28px 28px", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--fg-2)", maxWidth: 640 }}>{item.a}</div>
      </div>
    </div>
  );
}

function ScontrinoPromo() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: "var(--eff-blue-500)", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Cassa web</div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff" }}>
          Apri la cassa oggi.<br />Lascia il registratore telematico nel cassetto.
        </h2>
        <p style={{ margin: "20px auto 0", maxWidth: 580, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>
          Cassa web e app mobile, corrispettivi trasmessi all'Agenzia delle Entrate, lotteria e resi inclusi. Senza hardware da comprare.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="#signup">Prova la cassa web</Button>
          <a href="pricing.html" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px", borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center" }}>Vedi il piano Scontrino</a>
        </div>
      </div>
    </section>
  );
}

window.ScontrinoPage = ScontrinoPage;
