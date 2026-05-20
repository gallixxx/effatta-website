/* PartnerAssociazioniPage.jsx — landing for trade associations.
 *
 * Rewrite focused on three editorial moments:
 *   (1) a tight hero that names the dual value prop in one line,
 *   (2) a "revenue math" card that makes the second-income
 *       story concrete, and
 *   (3) a white-label portal mockup that shows what members
 *       actually see.
 * Less filler, fewer sections, more punch. */

function PartnerAssociazioniPage() {
  return (
    <div>
      <AssHero />
      <AssMath />
      <AssTwoSides />
      <AssPortalMock />
      <AssSteps />
      <AssCTA />
    </div>
  );
}

/* -------- 1. Hero -------- */
function AssHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 88px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px" }}>
        <a href="partner.html" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", textDecoration: "none", marginBottom: 28,
        }}>
          <Icon name="arrow-right" size={12} style={{ transform: "rotate(180deg)" }} />
          Partner · Associazioni di categoria
        </a>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.02,
          letterSpacing: "-0.03em", color: "var(--fg-1)",
        }}>
          Un servizio essenziale per i tuoi iscritti.<br />
          <span style={{ color: "var(--fg-3)" }}>Una nuova entrata per l'associazione.</span>
        </h1>
        <p style={{
          margin: "28px 0 0", maxWidth: 640,
          fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
          color: "var(--fg-2)",
        }}>
          Offri Effatta agli iscritti con il logo dell'associazione e a un prezzo convenzionato. Per ogni iscritto attivo, l'associazione riceve una quota mensile concordata a contratto.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          <Button trailingIcon="arrow-right">Diventa partner</Button>
          <Button variant="secondary">Scarica la presentazione</Button>
        </div>
      </div>
    </section>
  );
}

/* -------- 2. The revenue math (the second-income moment) -------- */
function AssMath() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "88px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "rgba(255,255,255,0.55)", marginBottom: 16,
        }}>La matematica del partner program</div>
        <h2 style={{
          margin: 0, color: "#fff", maxWidth: 700,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}>
          Più iscritti attivano Effatta, più cresce la voce di entrata dell'associazione.
        </h2>

        <div style={{
          marginTop: 48,
          display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr",
          gap: 0, alignItems: "stretch",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <MathCell big="3.000" small="iscritti attivi sul totale dell'associazione" />
          <MathOp>×</MathOp>
          <MathCell big={<>Quota <em style={{ fontStyle: "normal", color: "rgba(255,255,255,0.65)" }}>X</em></>} small="concordata per iscritto attivo / mese" />
          <MathOp>=</MathOp>
          <MathCell highlight big="Una rendita mensile" small="che ritorna all'associazione, ogni mese." />
        </div>

        <div style={{
          marginTop: 20,
          fontFamily: "var(--font-sans)", fontSize: 13,
          color: "rgba(255,255,255,0.55)", maxWidth: 720, lineHeight: 1.55,
        }}>
          La quota per iscritto si definisce caso per caso: dipende dalla dimensione dell'associazione, dal listino convenzionato e dalla complessità dell'onboarding. Te la formalizziamo nella prima call.
        </div>
      </div>
    </section>
  );
}

function MathCell({ big, small, highlight }) {
  return (
    <div style={{
      padding: "28px 28px",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      gap: 14,
      background: highlight ? "var(--eff-blue-500)" : "transparent",
    }}>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.025em",
        color: "#fff", fontVariantNumeric: "tabular-nums",
      }}>{big}</div>
      <div style={{
        fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.45,
        color: highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
      }}>{small}</div>
    </div>
  );
}
function MathOp({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 56,
      fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 28,
      color: "rgba(255,255,255,0.45)",
    }}>{children}</div>
  );
}

/* -------- 3. Two sides: members + association -------- */
function AssTwoSides() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Per chi è la partnership</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}>Vince l'iscritto. Vince l'associazione.</h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden",
        }}>
          <SideCol
            label="Per gli iscritti"
            title="Un benefit concreto, non un PDF in archivio."
            bullets={[
              "Listino convenzionato dedicato",
              "Onboarding co-brandizzato con l'associazione",
              "Assistenza in italiano, riconosce la tessera",
              "Stesso strumento per fatture e scontrini",
            ]}
          />
          <SideCol
            divider
            label="Per l'associazione"
            title="Più valore alla quota, una rendita ricorrente."
            bullets={[
              "Quota ricorrente per iscritto attivo",
              "Pannello associazione con metriche reali",
              "Rendiconto e fattura mensile a tuo favore",
              "Posizionamento moderno verso i soci",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function SideCol({ label, title, bullets, divider }) {
  return (
    <div style={{
      padding: 40,
      borderLeft: divider ? "1px solid var(--border-1)" : "none",
      background: divider ? "var(--eff-paper-50)" : "#fff",
    }}>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.06em", textTransform: "uppercase",
        color: "var(--fg-3)", marginBottom: 16,
      }}>{label}</div>
      <h3 style={{
        margin: 0,
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24,
        lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)",
      }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: "24px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {bullets.map((b) => (
          <li key={b} style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-1)",
          }}>
            <Icon name="check" size={16} strokeWidth={2} style={{ color: "var(--eff-blue-500)" }} />
            {b}
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
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 16,
            }}>White-label, davvero.</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
              letterSpacing: "-0.025em", maxWidth: 460,
            }}>L'iscritto vede il tuo logo. Non vede Effatta.</h2>
            <p style={{
              margin: "20px 0 28px", maxWidth: 460,
              fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
              color: "var(--fg-2)",
            }}>
              Dominio dedicato, logo e colori dell'associazione, e-mail di sistema firmate dal tuo dominio. Anche la fattura del servizio porta l'intestazione dell'associazione.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Dominio",  "fatture.tuaassociazione.it"],
                ["Logo",     "Il tuo asset, applicato ovunque"],
                ["E-mail",   "noreply@tuaassociazione.it"],
                ["Fattura",  "Intestazione e CF dell'associazione"],
              ].map(([k, v]) => (
                <li key={k} style={{
                  display: "grid", gridTemplateColumns: "100px 1fr", gap: 16,
                  alignItems: "center", padding: "10px 0",
                  borderBottom: "1px solid var(--border-1)",
                  fontFamily: "var(--font-sans)", fontSize: 14,
                }}>
                  <span style={{ color: "var(--fg-3)" }}>{k}</span>
                  <span style={{
                    color: "var(--fg-1)", fontWeight: 500,
                    fontFamily: k === "Dominio" || k === "E-mail" ? "var(--font-mono)" : "var(--font-sans)",
                  }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <PortalMock />
        </div>
      </div>
    </section>
  );
}

function PortalMock() {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-1)",
      borderRadius: 16, overflow: "hidden",
    }}>
      {/* Browser bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 14px", background: "var(--eff-paper-100)",
        borderBottom: "1px solid var(--border-1)",
      }}>
        <Icon name="globe" size={14} style={{ color: "var(--fg-3)" }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)",
        }}>fatture.ristoratoritalia.it</span>
        <div style={{ flex: 1 }} />
        <Pill tone="success">Live</Pill>
      </div>

      {/* Header */}
      <div style={{
        padding: "20px 28px",
        background: "#7A1F1F", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(255,255,255,0.15)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 12,
          }}>RI</div>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>Ristoratori Italia</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>portale convenzionato per gli associati</div>
          </div>
        </div>
        <div style={{
          padding: "5px 10px", borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.25)",
          fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
        }}>Mario Rossi · attivato</div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
          letterSpacing: "-0.02em", color: "var(--fg-1)",
        }}>Le tue fatture, semplici.</div>
        <p style={{
          margin: "8px 0 22px", maxWidth: 360,
          fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
          color: "var(--fg-3)",
        }}>Sei un associato di Ristoratori Italia: hai il <strong style={{ color: "var(--fg-1)" }}>prezzo convenzionato</strong> incluso nella tua quota.</p>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        }}>
          <FtCard
            icon="file-text" title="Fatturazione"
            line="Emetti la prossima fattura"
            bg="#fff" iconBg="var(--eff-paper-100)"
          />
          <FtCard
            icon="receipt" title="Scontrino"
            line="Apri la cassa web"
            bg="#fff" iconBg="var(--eff-paper-100)"
          />
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button style={{
            padding: "10px 18px", borderRadius: 999, border: 0, cursor: "pointer",
            background: "#7A1F1F", color: "#fff",
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
          }}>Nuova fattura</button>
          <button style={{
            padding: "10px 18px", borderRadius: 999, border: "1px solid var(--border-2)", cursor: "pointer",
            background: "#fff", color: "var(--fg-1)",
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
          }}>Storico</button>
        </div>

        <div style={{
          marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--border-1)",
          fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--fg-4)",
          letterSpacing: "0.02em",
        }}>Servizio offerto in convenzione · CF associazione 80012345678</div>
      </div>
    </div>
  );
}

function FtCard({ icon, title, line, iconBg }) {
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 12,
      border: "1px solid var(--border-1)", background: "#fff",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--fg-1)",
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
          letterSpacing: "-0.005em", color: "var(--fg-1)",
        }}>{title}</div>
        <div style={{
          marginTop: 2,
          fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
        }}>{line}</div>
      </div>
    </div>
  );
}

/* -------- 5. Steps -------- */
function AssSteps() {
  const steps = [
    { n: "01", t: "Una call con il commerciale", d: "Definiamo perimetro, listino convenzionato e quota per iscritto." },
    { n: "02", t: "Apriamo l'istanza white-label", d: "Dominio, logo e colori dell'associazione. Online in pochi giorni." },
    { n: "03", t: "Lanciamo insieme agli iscritti", d: "Annuncio co-brandizzato, webinar, materiali pronti. Niente fai-da-te." },
    { n: "04", t: "Rendiconto mensile", d: "Ricevi report e fattura per la quota ricorrente. Ogni mese, puntuale." },
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Come si attiva</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.625rem, 3vw, 2.25rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}>Una partnership, non un'integrazione qualsiasi.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {steps.map((s) => (
            <div key={s.n}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)", marginBottom: 14,
              }}>{s.n}</div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
                letterSpacing: "-0.015em", color: "var(--fg-1)",
              }}>{s.t}</h3>
              <p style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)",
              }}>{s.d}</p>
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
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}>Mezz'ora per capire se ha senso per la tua associazione.</h2>
        <p style={{
          margin: "16px auto 32px", maxWidth: 560,
          fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)",
        }}>Scrivici quanti iscritti hai e in che settore operate. Torniamo con una proposta concreta — prezzo, quota mensile, tempi.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button trailingIcon="arrow-right" as="a" href="contatti.html">Scrivici</Button>
          <Button variant="secondary" as="a" href="partner.html">Torna a Partner</Button>
        </div>
      </div>
    </section>
  );
}

window.PartnerAssociazioniPage = PartnerAssociazioniPage;
