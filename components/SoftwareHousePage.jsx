/* SoftwareHousePage.jsx — pagina dedicata all'archetipo
 * "software house" del canale partner.
 *
 * Più tecnica e meno commerciale rispetto a partner.html:
 * scenario d'uso → architettura → come si integra Effatta →
 * pricing-modello (non listino) → CTA verso API docs/sandbox.
 */

function SoftwareHousePage() {
  return (
    <div>
      <SHHeader />
      <SHArchitecture />
      <SHWhy />
      <SHPricing />
      <SHCta />
    </div>
  );
}

function SHHeader() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0 80px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <Crumb href="partner.html" label="Partner · Software house" />
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center", marginTop: 24 }}>
          <div>
            <h1 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(2.5rem, 4.8vw, 3.75rem)", lineHeight: 1.02,
              letterSpacing: "-0.03em", color: "var(--fg-1)",
              textWrap: "balance",
            }}>
              Effatta dentro il tuo gestionale, con il tuo brand davanti.
            </h1>
            <p style={{
              margin: "24px 0 0", maxWidth: 540,
              fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.55,
              color: "var(--fg-2)",
              textWrap: "pretty",
            }}>
              Due API REST coordinate, sandbox sempre disponibile, webhook firmati. Tu mantieni la UX, Effatta gestisce gli adempimenti italiani.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Button variant="blue" trailingIcon="arrow-right" as="a" href="api.html">
                Documentazione API
              </Button>
              <Button variant="secondary" as="a" href="contatti.html">Parla con noi</Button>
            </div>
          </div>
          <SHHeaderVisual />
        </div>
      </div>
    </section>
  );
}

function Crumb({ href, label }) {
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
      color: "var(--fg-3)", textDecoration: "none",
    }}>
      <Icon name="chevron-right" size={12} style={{ transform: "rotate(180deg)" }} />
      {label}
    </a>
  );
}

/* A schematic "your app ↔ Effatta ↔ SDI" diagram */
function SHHeaderVisual() {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--border-1)",
      borderRadius: 16,
      padding: 28,
      boxShadow: "var(--shadow-md)",
    }}>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
        color: "var(--fg-3)", letterSpacing: "0.06em",
        textTransform: "uppercase", marginBottom: 20,
      }}>Architettura · in breve</div>

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
    tone === "brand" ? { background: "var(--eff-blue-50)",  border: "1px solid var(--eff-blue-300)", color: "var(--fg-1)" } :
    tone === "ink"   ? { background: "var(--eff-ink-900)",  border: "1px solid var(--eff-ink-900)",  color: "#fff" } :
                       { background: "var(--eff-paper-50)", border: "1px solid var(--border-1)",     color: "var(--fg-1)" };
  return (
    <div style={{ ...styles, borderRadius: 10, padding: "14px 18px" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.005em" }}>{label}</div>
      <div style={{
        marginTop: 2,
        fontFamily: "var(--font-sans)", fontSize: 12,
        color: tone === "ink" ? "rgba(255,255,255,0.6)" : "var(--fg-3)",
      }}>{sub}</div>
    </div>
  );
}

function ArchArrow({ code }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 18 }}>
      <span style={{
        width: 1, height: 16, background: "var(--border-2)",
      }} />
      <code style={{
        fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)",
        background: "var(--eff-paper-50)",
        border: "1px solid var(--border-1)", borderRadius: 6,
        padding: "2px 8px",
      }}>{code}</code>
    </div>
  );
}

/* -------- "Why integrate" -------- */
const WHY_POINTS = [
  {
    icon: "code-2",
    title: "Due API, una sola autenticazione",
    desc: "Stessa chiave Bearer per fatturazione e scontrino. OpenAPI 3.1, SDK ufficiali in Node, Python, PHP, Go.",
  },
  {
    icon: "webhook",
    title: "Eventi firmati, retry esponenziale",
    desc: "Ogni transizione SDI atterra come webhook HMAC-SHA256. Niente polling, niente eventi persi.",
  },
  {
    icon: "key-round",
    title: "Sotto-account per ogni cliente",
    desc: "Ogni partita IVA è un sotto-account isolato con quote e fatturazione separate. Il rendiconto resta uno solo: il tuo.",
  },
  {
    icon: "shield-check",
    title: "Conservazione gestita da Effatta",
    desc: "10 anni di conservazione sostitutiva firmata. Esibizione AdE generata in PDF/A dalla API.",
  },
  {
    icon: "users",
    title: "White-label completo",
    desc: "Dominio cliente, logo, e-mail di sistema, portale di assistenza: tutto sotto il tuo brand.",
  },
  {
    icon: "zap",
    title: "Ambiente sandbox sempre attivo",
    desc: "Endpoint sandbox.effatta.it gemello del live. Restituisce tutti i codici di errore SDI reali per testare i casi limite.",
  },
];

function SHWhy() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 600, marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Cosa ti porti a casa</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            textWrap: "balance",
          }}>Gli adempimenti italiani, smessi di essere il tuo problema.</h2>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden",
        }}>
          {WHY_POINTS.map((p, i) => (
            <div key={p.title} style={{
              padding: 32,
              borderLeft: i % 3 === 0 ? "none" : "1px solid var(--border-1)",
              borderTop: i >= 3 ? "1px solid var(--border-1)" : "none",
            }}>
              <Icon name={p.icon} size={26} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{
                margin: "20px 0 8px",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
                letterSpacing: "-0.015em",
              }}>{p.title}</h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)",
              }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Architecture / endpoints panel -------- */
function SHArchitecture() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "flex-start" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "rgba(255,255,255,0.55)", marginBottom: 16,
              letterSpacing: "0.02em",
            }}>Endpoint principali</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#fff", maxWidth: 460,
              textWrap: "balance",
            }}>Quattro chiamate, e l'integrazione è in piedi.</h2>
            <p style={{
              margin: "20px 0 36px", maxWidth: 460,
              fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
            }}>
              Una versione semplificata: nella documentazione trovi tutti i parametri, gli errori SDI gestiti e le note di credito.
            </p>
            <Button variant="secondary" trailingIcon="arrow-right" as="a" href="api.html">
              Vai alla documentazione
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Endpoint method="POST" path="/v1/invoices" desc="Emette una fattura, la trasmette allo SDI." />
            <Endpoint method="POST" path="/v1/receipts" desc="Emette un documento commerciale (scontrino)." />
            <Endpoint method="GET"  path="/v1/invoices/:id" desc="Stato SDI, ricevute, conservazione." />
            <Endpoint method="POST" path="/v1/webhooks" desc="Registra l'endpoint per gli eventi firmati." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Endpoint({ method, path, desc }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12, padding: "16px 20px",
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: 24, padding: "0 8px",
        borderRadius: 6,
        background: method === "POST" ? "var(--eff-blue-500)" : "rgba(255,255,255,0.12)",
        color: "#fff",
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.04em",
      }}>{method}</span>
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#fff", fontWeight: 600, flex: 1 }}>
        {path}
      </code>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "right", maxWidth: 280 }}>
        {desc}
      </span>
    </div>
  );
}

/* -------- Pricing model (no list, only logic) -------- */
function SHPricing() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 16,
            }}>Modello commerciale</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              textWrap: "balance",
            }}>Pricing per volume, sempre su misura.</h2>
            <p style={{
              margin: "20px 0 0", maxWidth: 480,
              fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
              color: "var(--fg-2)",
            }}>
              Non c'è un listino esposto per le software house. Il prezzo dipende dai volumi annui, dal numero di sotto-account e da quanto white-label vuoi spingerti. Definiamo tutto su un'unica offerta scritta.
            </p>
          </div>
          <div style={{
            background: "#fff", border: "1px solid var(--border-1)",
            borderRadius: 16, padding: 32,
          }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["Volume annuo di fatture / scontrini", "fascia a scaglioni decrescenti"],
                ["Numero di sotto-account", "incluso fino a una soglia"],
                ["White-label", "dominio + logo + e-mail di sistema"],
                ["SLA scritta", "su richiesta, dal piano enterprise"],
                ["Account manager", "incluso per tutti i partner attivi"],
              ].map(([k, v]) => (
                <li key={k} style={{
                  display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16,
                  paddingBottom: 14, borderBottom: "1px solid var(--border-1)",
                  fontFamily: "var(--font-sans)",
                }}>
                  <span style={{ fontWeight: 500, fontSize: 14, color: "var(--fg-1)" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "var(--fg-3)", textAlign: "right" }}>{v}</span>
                </li>
              ))}
            </ul>
            <p style={{
              margin: "20px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.5,
              color: "var(--fg-3)",
            }}>
              Risposta scritta in 48 ore lavorative dalla prima e-mail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SHCta() {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em",
          textWrap: "balance",
        }}>Apri la sandbox in 5 minuti.</h2>
        <p style={{
          margin: "16px auto 32px", maxWidth: 560,
          fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)",
        }}>
          Registra un account sandbox, genera una chiave, fai la prima POST. La proposta commerciale arriva in parallelo, senza bloccare l'integrazione.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="blue" trailingIcon="arrow-right" as="a" href="api.html">Documentazione API</Button>
          <Button variant="secondary" as="a" href="contatti.html">Richiedi un contatto</Button>
        </div>
      </div>
    </section>
  );
}

window.SoftwareHousePage = SoftwareHousePage;
