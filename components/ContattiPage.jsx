/* ContattiPage.jsx — pagina contatti.
 *
 * Tre canali separati per audience: commerciale, supporto, partner.
 * Form contatto a destra, info coordinate a sinistra, mappa-card
 * di Napoli in fondo. Niente claim su SLA che non abbiamo
 * verificato: i tempi di risposta sono espressi in ore lavorative.
 */

const CONTACTS = [
  {
    icon: "users",
    title: "Vendite",
    desc: "Voglio capire se Effatta fa al caso mio, vorrei una demo o un preventivo.",
    addr: "vendite@effatta.it",
    chip: "Risposta entro 24 h lavorative",
  },
  {
    icon: "shield-check",
    title: "Supporto clienti",
    desc: "Sono già cliente Effatta e ho bisogno di aiuto su fatture, scontrini, conservazione.",
    addr: "supporto@effatta.it",
    chip: "Lun – Ven · 9:00 – 18:00",
  },
  {
    icon: "briefcase",
    title: "Partner & integrazioni",
    desc: "Sono una software house, un commercialista o un'associazione e voglio integrare Effatta.",
    addr: "partner@effatta.it",
    chip: "Account manager dedicato",
  },
];

function ContattiPage() {
  return (
    <div>
      <ContattiHero />
      <ContattiChannels />
      <ContattiForm />
      <ContattiOffice />
    </div>
  );
}

function ContattiHero() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0 72px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16,
        }}>Parla con noi</div>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2.25rem, 4.6vw, 3.25rem)",
          lineHeight: 1.04, letterSpacing: "-0.03em",
          maxWidth: 720,
          textWrap: "balance",
        }}>
          Una sola Effatta, tre porte d'ingresso.
        </h1>
        <p style={{
          margin: "20px 0 0", maxWidth: 540,
          fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
          color: "var(--fg-2)",
        }}>
          Scegli il canale giusto e ti risponde la persona giusta — non un bot, non un ticket smistato a caso.
        </p>
      </div>
    </section>
  );
}

function ContattiChannels() {
  return (
    <section style={{ background: "#fff", padding: "80px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden",
        }}>
          {CONTACTS.map((c, i) => (
            <div key={c.title} style={{
              padding: "36px 32px 32px",
              borderLeft: i === 0 ? "none" : "1px solid var(--border-1)",
              display: "flex", flexDirection: "column",
            }}>
              <Icon name={c.icon} size={26} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{
                margin: "20px 0 8px",
                fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: 20, letterSpacing: "-0.015em", color: "var(--fg-1)",
              }}>{c.title}</h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)", flex: 1,
              }}>{c.desc}</p>
              <a href={`mailto:${c.addr}`} style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)", fontSize: 14,
                color: "var(--eff-blue-700)",
                textDecoration: "none",
                borderBottom: "1px solid var(--eff-blue-300)",
                paddingBottom: 2, alignSelf: "flex-start",
              }}>{c.addr}</a>
              <div style={{
                marginTop: 16,
                fontFamily: "var(--font-sans)", fontSize: 12,
                color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--eff-success-500)" }} />
                {c.chip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContattiForm() {
  const [sent, setSent] = React.useState(false);
  const [topic, setTopic] = React.useState("vendite");

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64,
          background: "#fff", border: "1px solid var(--border-1)",
          borderRadius: 20, overflow: "hidden",
        }}>
          <div style={{ padding: "48px 40px", borderRight: "1px solid var(--border-1)" }}>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>Scrivici in un campo solo.</h2>
            <p style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
              color: "var(--fg-2)",
            }}>
              Raccontaci di cosa hai bisogno. Ti rispondiamo dalla casella giusta entro 24 ore lavorative.
            </p>

            <div style={{
              marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border-1)",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <Mini icon="globe" line="Napoli (NA), Italia" />
              <Mini icon="users" line="P.IVA IT 08123456789" />
              <Mini icon="shield-check" line="Stato del servizio: operativo" />
            </div>
          </div>

          <div style={{ padding: "48px 40px" }}>
            {sent ? (
              <SentState onReset={() => setSent(false)} />
            ) : (
              <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Nome e cognome" placeholder="Maria Rossi" />
                <Field label="E-mail" placeholder="maria@bardeivicoli.it" type="email" />
                <Field label="Azienda (opzionale)" placeholder="Bar Caffè dei Vicoli SRL" />
                <div>
                  <div style={{
                    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                    color: "var(--fg-2)", marginBottom: 8,
                  }}>Argomento</div>
                  <div style={{
                    display: "inline-flex", padding: 3, borderRadius: 999,
                    background: "var(--eff-paper-50)", border: "1px solid var(--border-1)",
                  }}>
                    {[
                      { k: "vendite", lbl: "Vendite" },
                      { k: "supporto", lbl: "Supporto" },
                      { k: "partner", lbl: "Partner" },
                    ].map((o) => {
                      const on = topic === o.k;
                      return (
                        <button key={o.k} type="button" onClick={() => setTopic(o.k)} style={{
                          border: 0,
                          background: on ? "var(--eff-ink-900)" : "transparent",
                          color: on ? "#fff" : "var(--fg-2)",
                          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                          padding: "8px 16px", borderRadius: 999,
                          cursor: "pointer",
                          transition: "background var(--t-fast) var(--ease-out), color var(--t-fast) var(--ease-out)",
                        }}>{o.lbl}</button>
                      );
                    })}
                  </div>
                </div>
                <Field label="Messaggio" placeholder="Cosa ti serve?" textarea />
                <label style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  fontFamily: "var(--font-sans)", fontSize: 13,
                  color: "var(--fg-2)", lineHeight: 1.5, cursor: "pointer",
                }}>
                  <input type="checkbox" required style={{ marginTop: 4 }} />
                  Acconsento al trattamento dei dati personali secondo la <a href="#" style={{color:"var(--eff-blue-700)"}}>privacy policy</a>.
                </label>
                <div>
                  <Button variant="blue" trailingIcon="arrow-right" type="submit">
                    Invia richiesta
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text", textarea = false }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
        color: "var(--fg-2)", marginBottom: 8,
      }}>{label}</div>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          style={{
            width: "100%",
            border: "1px solid var(--border-1)", borderRadius: 10,
            padding: "12px 14px",
            fontFamily: "var(--font-sans)", fontSize: 15,
            background: "#fff", color: "var(--fg-1)", resize: "vertical",
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={{
            width: "100%", height: 44,
            border: "1px solid var(--border-1)", borderRadius: 10,
            padding: "0 14px",
            fontFamily: "var(--font-sans)", fontSize: 15,
            background: "#fff", color: "var(--fg-1)",
          }}
        />
      )}
    </div>
  );
}

function Mini({ icon, line }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)",
    }}>
      <Icon name={icon} size={16} strokeWidth={1.6} style={{ color: "var(--fg-3)" }} />
      {line}
    </div>
  );
}

function SentState({ onReset }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
      height: "100%", minHeight: 320,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 999,
        background: "var(--eff-success-50)",
        color: "var(--eff-success-700)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        <Icon name="check" size={22} strokeWidth={2.5} />
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
        letterSpacing: "-0.02em",
      }}>Grazie, ci sentiamo presto.</h3>
      <p style={{
        margin: "10px 0 24px",
        fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
        color: "var(--fg-2)", maxWidth: 360,
      }}>
        Abbiamo ricevuto la tua richiesta. Ti rispondiamo dalla casella giusta entro 24 ore lavorative.
      </p>
      <Button variant="secondary" size="sm" onClick={onReset}>Invia un'altra richiesta</Button>
    </div>
  );
}

function ContattiOffice() {
  return (
    <section style={{ background: "#fff", padding: "80px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 16,
            }}>Sede</div>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 28,
              letterSpacing: "-0.02em",
            }}>Napoli, Italia</h3>
            <p style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
              color: "var(--fg-2)", maxWidth: 380,
            }}>
              Siamo nati al centro storico di Napoli e lavoriamo da qui ogni giorno. Se passi in zona, scrivici prima — il caffè lo offriamo noi.
            </p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <Mini icon="globe" line="Via Toledo · Napoli (NA)" />
              <Mini icon="users" line="Sede legale: Napoli (NA)" />
            </div>
          </div>
          {/* Decorative map-ish panel */}
          <div style={{
            background: "var(--eff-paper-50)",
            borderLeft: "1px solid var(--border-1)",
            minHeight: 280,
            position: "relative",
            overflow: "hidden",
          }}>
            <MapDecor />
          </div>
        </div>
      </div>
    </section>
  );
}

function MapDecor() {
  // Schematic decorative "map" — abstract grid of paper streets,
  // not a real cartography. Marks Napoli with a blue pin.
  return (
    <svg viewBox="0 0 600 320" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
         style={{ display: "block" }}>
      <defs>
        <pattern id="paperGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#paperGrid)" />
      {/* curving "streets" */}
      <path d="M 0 220 Q 200 120 600 200" stroke="rgba(0,0,0,0.08)" strokeWidth="20" fill="none" />
      <path d="M 80 0 Q 280 150 280 320" stroke="rgba(0,0,0,0.08)" strokeWidth="16" fill="none" />
      <path d="M 360 0 Q 360 100 600 130" stroke="rgba(0,0,0,0.06)" strokeWidth="12" fill="none" />
      {/* pin */}
      <g transform="translate(298 158)">
        <circle r="36" fill="rgba(47,128,237,0.18)" />
        <circle r="14" fill="var(--eff-blue-500)" />
        <circle r="5" fill="#fff" />
      </g>
      <text x="320" y="166" fill="var(--fg-1)" fontFamily="var(--font-sans)" fontWeight="700" fontSize="16">Napoli</text>
    </svg>
  );
}

window.ContattiPage = ContattiPage;
