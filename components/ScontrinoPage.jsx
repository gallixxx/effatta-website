/* ScontrinoPage.jsx — Scontrino digitale fiscale product page.
 *
 * The visual moment is a redesigned mockup of "cassa web" — the
 * concept, not the live product UI (which the team plans to
 * rebrand). The mockup is intentionally simplified: a typical
 * day at a bar, mid-transaction. */

function ScontrinoPage() {
  return (
    <div>
      <ScontrinoHero />
      <CassaMockShowcase />
      <ScontrinoFeatures />
      <ScontrinoApps />
    </div>
  );
}

function ScontrinoHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 24,
            }}>Prodotto · Scontrino digitale fiscale</div>
            <h1 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)", lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "var(--fg-1)",
            }}>
              Una cassa digitale che vive nel tuo browser.
            </h1>
            <p style={{
              margin: "24px 0 0", maxWidth: 500,
              fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
              color: "var(--fg-2)",
            }}>
              Sostituisci il registratore telematico con Effatta Scontrino: una cassa web e un'app mobile, già in linea con l'obbligo di trasmissione telematica dei corrispettivi.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Button trailingIcon="arrow-right">Prova la cassa web</Button>
              <Button variant="secondary" as="a" href="pricing.html">Vedi il piano Scontrino</Button>
            </div>

            <div style={{ marginTop: 36, display: "flex", gap: 32, flexWrap: "wrap" }}>
              <MiniStat value="10.000" label="scontrini / anno nel piano Scontrino" />
              <MiniStat value="200" label="fatture incluse / anno" />
              <MiniStat value="AdE" label="corrispettivi telematici inviati ogni giorno" />
            </div>
          </div>

          <ReceiptMock />
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
        letterSpacing: "-0.015em", color: "var(--fg-1)",
        fontVariantNumeric: "tabular-nums",
      }}>{value}</div>
      <div style={{
        marginTop: 4, fontFamily: "var(--font-sans)", fontSize: 12,
        color: "var(--fg-3)", maxWidth: 140, lineHeight: 1.4,
      }}>{label}</div>
    </div>
  );
}

function ReceiptMock() {
  const rows = [
    ["1×", "Espresso",      "€ 1,20"],
    ["2×", "Cappuccino",    "€ 3,00"],
    ["1×", "Pizza margherita","€ 8,00"],
    ["1×", "Coperto",       "€ 2,00"],
  ];
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16,
        padding: 28, maxWidth: 420, margin: "0 0 0 auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
            color: "var(--fg-1)",
          }}>Documento commerciale</div>
          <Pill tone="success">Emesso</Pill>
        </div>
        <div style={{
          marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)",
        }}>0001-0193 · 19/05/2026 · 14:30</div>

        <div style={{ height: 1, background: "var(--border-1)", margin: "18px 0" }} />

        {rows.map(([q, n, p]) => (
          <div key={n} style={{
            display: "grid", gridTemplateColumns: "32px 1fr auto",
            padding: "6px 0", fontFamily: "var(--font-sans)", fontSize: 14,
          }}>
            <span style={{ color: "var(--fg-3)", fontVariantNumeric: "tabular-nums" }}>{q}</span>
            <span style={{ color: "var(--fg-1)" }}>{n}</span>
            <span style={{ color: "var(--fg-1)", fontFamily: "var(--font-mono)",
                           fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{p}</span>
          </div>
        ))}

        <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--fg-2)" }}>Totale EUR</span>
          <span style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
            color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em",
          }}>14,20</span>
        </div>
        <div style={{
          marginTop: 12, padding: "10px 14px",
          background: "var(--eff-paper-50)", borderRadius: 10,
          fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Icon name="check-circle" size={14} style={{ color: "var(--eff-success-500)" }} />
          Trasmesso all'Agenzia delle Entrate
        </div>
      </div>
    </div>
  );
}

window.ScontrinoPage = ScontrinoPage;

/* -------- Cassa-web showcase (redesigned mockup) -------- */
function CassaMockShowcase() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 56, maxWidth: 640 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Cassa web</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}>Una cassa che apri da un browser. Niente da installare.</h2>
        </div>

        <CassaFrame />
      </div>
    </section>
  );
}

const CATS = [
  { id: "tutti", label: "Tutti",      count: 24, active: true },
  { id: "bar",   label: "Bar",        count: 8 },
  { id: "ali",   label: "Alimentari", count: 6 },
  { id: "piz",   label: "Pizzeria",   count: 5 },
  { id: "vin",   label: "Vini",       count: 3 },
  { id: "alc",   label: "Alcolici",   count: 2 },
];

const PRODUCTS = [
  { name: "Espresso",        price: "1,20", cat: "bar" },
  { name: "Cappuccino",      price: "1,80", cat: "bar" },
  { name: "Cornetto",        price: "1,50", cat: "bar" },
  { name: "Acqua naturale",  price: "1,00", cat: "bar" },
  { name: "Pizza margherita",price: "8,00", cat: "piz" },
  { name: "Pizza marinara",  price: "6,00", cat: "piz" },
  { name: "Pizza capricciosa", price: "12,00", cat: "piz" },
  { name: "Pizza ripieno",   price: "11,00", cat: "piz" },
  { name: "Calice rosso",    price: "4,50", cat: "vin" },
  { name: "Calice bianco",   price: "4,50", cat: "vin" },
  { name: "Birra media",     price: "5,00", cat: "alc" },
  { name: "Coperto",         price: "2,00", cat: "bar" },
];

function CassaFrame() {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-1)",
      borderRadius: 16, overflow: "hidden",
    }}>
      {/* App chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "14px 20px", borderBottom: "1px solid var(--border-1)",
        background: "var(--eff-paper-50)",
      }}>
        <img src="assets/logos/effatta-mark-blue.svg" style={{ height: 22, display: "block" }} alt="" />
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-1)",
        }}>Cassa · Bar dei Vicoli</div>
        <div style={{ flex: 1 }} />
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--eff-success-500)" }} />
          Cassa attiva
        </div>
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)",
        }}>22 SRL</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 320px", minHeight: 480 }}>
        {/* Categories */}
        <div style={{
          borderRight: "1px solid var(--border-1)", background: "#fff",
          padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {CATS.map((c) => (
            <button key={c.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", borderRadius: 8, border: 0, cursor: "pointer",
              background: c.active ? "var(--eff-ink-900)" : "transparent",
              color: c.active ? "#fff" : "var(--fg-1)",
              fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13,
              textAlign: "left",
            }}>
              <span>{c.label}</span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11,
                color: c.active ? "rgba(255,255,255,0.5)" : "var(--fg-3)",
              }}>{c.count}</span>
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ padding: 20, background: "var(--eff-paper-50)" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
          }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--fg-3)",
            }}>Prodotti</div>
            <Button size="sm" variant="secondary" icon="check">Aggiungi prodotto</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {PRODUCTS.map((p) => (
              <div key={p.name} style={{
                background: "#fff", border: "1px solid var(--border-1)", borderRadius: 10,
                padding: 14, aspectRatio: "1 / 1",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div style={{
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                  color: "var(--fg-1)", lineHeight: 1.25,
                }}>{p.name}</div>
                <div style={{
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15,
                  color: "var(--fg-1)", fontVariantNumeric: "tabular-nums",
                }}>€&nbsp;{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart panel */}
        <div style={{
          borderLeft: "1px solid var(--border-1)", padding: 20, background: "#fff",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            background: "var(--eff-ink-900)", color: "#fff", borderRadius: 10,
            padding: "16px 18px",
          }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.6)",
            }}>Totale EUR</div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 32,
              letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums",
            }}>14,20</div>
          </div>

          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {[["Espresso × 1", "1,20"],["Cappuccino × 2", "3,00"],["Pizza margherita", "8,00"],["Coperto", "2,00"]].map(([n, p]) => (
              <div key={n} style={{
                display: "flex", justifyContent: "space-between",
                fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)",
              }}>
                <span style={{ color: "var(--fg-1)" }}>{n}</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-1)",
                               fontVariantNumeric: "tabular-nums" }}>€&nbsp;{p}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            <button style={{
              padding: "10px 0", borderRadius: 8, border: "1px solid var(--border-2)",
              background: "var(--eff-paper-50)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-1)", cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}><Icon name="check" size={14} />Cash</button>
            <button style={{
              padding: "10px 0", borderRadius: 8, border: "1px solid var(--border-1)",
              background: "#fff", fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13,
              color: "var(--fg-2)", cursor: "pointer",
            }}>Electronic</button>
          </div>

          <Button variant="blue" size="md" style={{ width: "100%", marginTop: 12 }}>
            Emetti scontrino
          </Button>
        </div>
      </div>
    </div>
  );
}

window.CassaMockShowcase = CassaMockShowcase;

/* -------- Features (scontrino-specific) -------- */
const SCONTR_FEATURES = [
  { icon: "scan-line",    title: "Conforme POS-RT",     desc: "In linea con la normativa: scontrino e pagamento elettronico legati nello stesso flusso." },
  { icon: "receipt",      title: "Documento commerciale", desc: "Mostrato a video, inviato per e-mail o SMS al cliente. Lotteria degli scontrini integrata." },
  { icon: "code-2",       title: "Reso e storno",       desc: "Gestione di resi totali e parziali, storni con causale, ricostruzione corrispettivi giornaliera." },
  { icon: "webhook",      title: "Trasmissione AdE",    desc: "Corrispettivi giornalieri inviati all'Agenzia delle Entrate. Nessuna chiavetta, nessun servizio tecnico." },
  { icon: "users",        title: "Multi-postazione",    desc: "Più casse contemporanee, gli scontrini si sincronizzano in tempo reale sotto la stessa P.IVA." },
  { icon: "building-2",   title: "Bar, ristoranti, retail", desc: "Catalogo per reparto, prodotti per colore, varianti: pensata per chi vende al banco." },
];

function ScontrinoFeatures() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
                      border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden" }}>
          {SCONTR_FEATURES.map((f, i) => (
            <div key={f.title} style={{
              padding: 32,
              borderLeft: i % 3 === 0 ? "none" : "1px solid var(--border-1)",
              borderTop: i >= 3 ? "1px solid var(--border-1)" : "none",
            }}>
              <Icon name={f.icon} size={26} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{
                margin: "20px 0 8px",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
                letterSpacing: "-0.015em", color: "var(--fg-1)",
              }}>{f.title}</h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)",
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- App split (web + mobile) -------- */
function ScontrinoApps() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
                      border: "1px solid var(--border-1)", borderRadius: 16,
                      overflow: "hidden", background: "#fff" }}>
          <div style={{ padding: "44px 40px" }}>
            <Icon name="globe" size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
            <h3 style={{
              margin: "20px 0 10px",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24,
              letterSpacing: "-0.02em",
            }}>Cassa web</h3>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
              color: "var(--fg-2)", maxWidth: 380,
            }}>Apri il browser e sei al banco. Catalogo, lotteria degli scontrini, resi: tutto già pronto. Funziona anche da tablet.</p>
          </div>
          <div style={{ padding: "44px 40px", borderLeft: "1px solid var(--border-1)" }}>
            <Icon name="briefcase" size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
            <h3 style={{
              margin: "20px 0 10px",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24,
              letterSpacing: "-0.02em",
            }}>App mobile</h3>
            <p style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
              color: "var(--fg-2)", maxWidth: 380,
            }}>iOS e Android. Tasca, banco, eventi all'aperto: emetti scontrini ovunque ci sia rete.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ScontrinoFeatures = ScontrinoFeatures;
window.ScontrinoApps = ScontrinoApps;
