/* PartnerAssociazioniPage.jsx — sottopagina partner "Associazioni e Ordini".
 *
 * Riscritta allo standard del sito: responsive mobile-first (.as-page),
 * reveal allo scroll, hover. Tre momenti: il valore doppio (iscritto +
 * ente), la "matematica" della rendita ricorrente e il portale white-label.
 * Nessun onboarding di massa: ogni iscritto attiva il proprio account.
 */

const AS_CSS = `
  .as-reveal { opacity: 0; transform: translateY(14px); transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out); }
  .as-reveal.in { opacity: 1; transform: none; }

  @media (max-width: 920px) {
    .as-split { grid-template-columns: 1fr !important; gap: 44px !important; }
    .as-2col  { grid-template-columns: 1fr !important; }
    .as-math  { grid-template-columns: 1fr !important; }
    .as-flow  { grid-template-columns: 1fr 1fr !important; row-gap: 32px !important; }
  }
  @media (max-width: 600px) {
    .as-page section { padding-top: 52px !important; padding-bottom: 52px !important; }
    .as-page section > div { padding-left: 18px !important; padding-right: 18px !important; }
    .as-flow { grid-template-columns: 1fr !important; }
    .as-page h1 { font-size: 1.85rem !important; line-height: 1.14 !important; }
    .as-page h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
    .as-page h3 { font-size: 1rem !important; }
    .as-page p  { font-size: 0.875rem !important; line-height: 1.5 !important; }
    .as-page p.as-lede { font-size: 0.95rem !important; }
    .as-page .eff-btn { height: 40px !important; padding: 0 16px !important; font-size: 14px !important; }
  }
`;

function PartnerAssociazioniPage() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".as-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="as-page">
      <style>{AS_CSS}</style>
      <AssHero />
      <div className="as-reveal"><AssMath /></div>
      <div className="as-reveal"><AssTwoSides /></div>
      <div className="as-reveal"><AssPortalMock /></div>
      <div className="as-reveal"><AssSteps /></div>
      <div className="as-reveal"><AssCTA /></div>
    </div>
  );
}

/* -------- 1. Hero -------- */
function AssHero() {
  return (
    <section style={{ background: "#fff", padding: "96px 0 88px", borderBottom: "1px solid var(--border-1)", overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: -200, right: -240, width: 680, height: 680, background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 880, margin: "0 auto", padding: "0 32px" }}>
        <a href="partner.html" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", textDecoration: "none", marginBottom: 28 }}>
          <Icon name="arrow-left" size={14} />Partner · Associazioni e Ordini di categoria
        </a>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--fg-1)", textWrap: "balance" }}>
          Un servizio in più per gli iscritti.<br />
          <span style={{ color: "var(--fg-3)" }}>Una nuova entrata per l'ente.</span>
        </h1>
        <p className="as-lede" style={{ margin: "26px 0 0", maxWidth: 640, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5, color: "var(--fg-2)" }}>
          Offri Effatta agli iscritti col logo dell'associazione o dell'Ordine e a un prezzo convenzionato. Per ogni iscritto attivo, l'ente riceve una quota mensile concordata a contratto.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
          <Button variant="blue" trailingIcon="arrow-right" as="a" href="contatti.html">Diventa partner</Button>
          <Button variant="secondary" as="a" href="contatti.html">Parla con noi</Button>
        </div>
      </div>
    </section>
  );
}

/* -------- 2. Revenue math -------- */
function AssMath() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "88px 0", borderBottom: "1px solid var(--eff-ink-800)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>La matematica del partner program</div>
        <h2 style={{ margin: 0, color: "#fff", maxWidth: 700, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
          Più iscritti attivano Effatta, più cresce la voce di entrata dell'ente.
        </h2>
        <div className="as-math" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "stretch", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, overflow: "hidden" }}>
          <MathCell big="3.000" small="iscritti attivi sul totale dell'ente" />
          <MathOp>×</MathOp>
          <MathCell big={<>Quota <em style={{ fontStyle: "normal", color: "rgba(255,255,255,0.65)" }}>X</em></>} small="concordata per iscritto attivo / mese" />
          <MathOp>=</MathOp>
          <MathCell highlight big="Una rendita mensile" small="che ritorna all'ente, ogni mese." />
        </div>
        <div style={{ marginTop: 20, fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.55)", maxWidth: 720, lineHeight: 1.55 }}>
          La quota per iscritto si definisce caso per caso: dipende dalla dimensione dell'ente e dal listino convenzionato. Te la formalizziamo nella prima call.
        </div>
      </div>
    </section>
  );
}

function MathCell({ big, small, highlight }) {
  return (
    <div style={{ padding: "26px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14, background: highlight ? "var(--eff-blue-500)" : "transparent" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#fff", fontVariantNumeric: "tabular-nums" }}>{big}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.45, color: highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)" }}>{small}</div>
    </div>
  );
}
function MathOp({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", minWidth: 56, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 26, color: "rgba(255,255,255,0.45)" }}>{children}</div>
  );
}

/* -------- 3. Two sides -------- */
function AssTwoSides() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", marginBottom: 16 }}>Per chi è la partnership</div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Vince l'iscritto. Vince l'ente.</h2>
        </div>
        <div className="as-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden" }}>
          <SideCol label="Per gli iscritti" title="Un benefit concreto, non un PDF in archivio." bullets={["Listino convenzionato dedicato", "Onboarding co-brandizzato con l'ente", "Assistenza in italiano, riconosce la tessera", "Stesso strumento per fatture e scontrini"]} />
          <SideCol divider label="Per l'ente" title="Più valore alla quota, una rendita ricorrente." bullets={["Quota ricorrente per iscritto attivo", "Pannello con metriche reali", "Rendiconto e fattura mensile a tuo favore", "Posizionamento moderno verso i soci"]} />
        </div>
      </div>
    </section>
  );
}

function SideCol({ label, title, bullets, divider }) {
  return (
    <div style={{ padding: 36, borderLeft: divider ? "1px solid var(--border-1)" : "none", background: divider ? "var(--eff-paper-50)" : "#fff" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 16 }}>{label}</div>
      <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: "24px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-1)" }}>
            <Icon name="check" size={16} strokeWidth={2} style={{ color: "var(--eff-blue-500)" }} />{b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------- 4. White-label portal mock -------- */
function AssPortalMock() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div className="as-split" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", marginBottom: 16 }}>White-label, davvero.</div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", maxWidth: 460 }}>L'iscritto vede il tuo logo. Non vede Effatta.</h2>
          <p style={{ margin: "20px 0 28px", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)" }}>
            Dominio dedicato, logo e colori dell'ente, e-mail di sistema firmate dal tuo dominio. Anche la fattura del servizio porta l'intestazione dell'ente.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Dominio", "fatture.tuoente.it"], ["Logo", "Il tuo asset, applicato ovunque"], ["E-mail", "noreply@tuoente.it"], ["Fattura", "Intestazione e CF dell'ente"]].map(([k, v]) => (
              <li key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border-1)", fontFamily: "var(--font-sans)", fontSize: 14 }}>
                <span style={{ color: "var(--fg-3)" }}>{k}</span>
                <span style={{ color: "var(--fg-1)", fontWeight: 500, fontFamily: k === "Dominio" || k === "E-mail" ? "var(--font-mono)" : "var(--font-sans)" }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <PortalMock />
      </div>
    </section>
  );
}

function PortalMock() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--eff-paper-100)", borderBottom: "1px solid var(--border-1)" }}>
        <Icon name="globe" size={14} style={{ color: "var(--fg-3)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>fatture.ristoratoritalia.it</span>
        <div style={{ flex: 1 }} />
        <Pill tone="success">Live</Pill>
      </div>
      <div style={{ padding: "20px 24px", background: "#7A1F1F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 12 }}>RI</div>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>Ristoratori Italia</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>portale convenzionato per gli associati</div>
          </div>
        </div>
        <div style={{ padding: "5px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500 }}>Mario Rossi · attivo</div>
      </div>
      <div style={{ padding: "24px 26px" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>Le tue fatture, semplici.</div>
        <p style={{ margin: "8px 0 22px", maxWidth: 360, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-3)" }}>Sei un associato di Ristoratori Italia: hai il <strong style={{ color: "var(--fg-1)" }}>prezzo convenzionato</strong> incluso nella tua quota.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FtCard icon="file-text" title="Fatturazione" line="Emetti la prossima fattura" />
          <FtCard icon="receipt" title="Scontrino" line="Apri la cassa web" />
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={{ padding: "10px 18px", borderRadius: 999, border: 0, cursor: "pointer", background: "#7A1F1F", color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14 }}>Nuova fattura</button>
          <button style={{ padding: "10px 18px", borderRadius: 999, border: "1px solid var(--border-2)", cursor: "pointer", background: "#fff", color: "var(--fg-1)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14 }}>Storico</button>
        </div>
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--border-1)", fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-4)", letterSpacing: "0.02em" }}>Servizio offerto in convenzione · CF ente 80012345678</div>
      </div>
    </div>
  );
}

function FtCard({ icon, title, line }) {
  return (
    <div style={{ padding: "14px 16px", borderRadius: 12, border: "1px solid var(--border-1)", background: "#fff", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--eff-paper-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-1)" }}><Icon name={icon} size={18} /></div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.005em", color: "var(--fg-1)" }}>{title}</div>
        <div style={{ marginTop: 2, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)" }}>{line}</div>
      </div>
    </div>
  );
}

/* -------- 5. Steps -------- */
function AssSteps() {
  const steps = [
    { n: "01", t: "Una call con il commerciale", d: "Definiamo perimetro, listino convenzionato e quota per iscritto." },
    { n: "02", t: "Apriamo l'istanza white-label", d: "Dominio, logo e colori dell'ente. Online in pochi giorni." },
    { n: "03", t: "Lanciamo insieme agli iscritti", d: "Annuncio co-brandizzato, webinar, materiali pronti. Niente fai-da-te." },
    { n: "04", t: "Rendiconto mensile", d: "Ricevi report e fattura per la quota ricorrente. Ogni mese, puntuale." },
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)", marginBottom: 16 }}>Come si attiva</div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Una partnership, non un'integrazione qualsiasi.</h2>
        </div>
        <div className="as-flow" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map((s) => (
            <div key={s.n}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--eff-blue-700)", marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{s.t}</h3>
              <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 6. CTA -------- */
function AssCTA() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{ margin: 0, color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>Mezz'ora per capire se ha senso per il tuo ente.</h2>
        <p style={{ margin: "16px auto 32px", maxWidth: 560, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>Scrivici quanti iscritti hai e in che settore operate. Torniamo con una proposta concreta — prezzo, quota mensile, tempi.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="contatti.html">Scrivici</Button>
          <a href="partner.html" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px", borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center" }}>Torna a Partner</a>
        </div>
      </div>
    </section>
  );
}

window.PartnerAssociazioniPage = PartnerAssociazioniPage;
