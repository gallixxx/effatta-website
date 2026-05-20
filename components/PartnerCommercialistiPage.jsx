/* PartnerCommercialistiPage.jsx — dedicated landing for the
 * commercialista target.
 *
 * Angle: low-cost tool to offer clients, time saved (Pannello
 * Studio: scarica tutte le fatture di un cliente con un click),
 * recurring revenue + retention, white-label. */

function PartnerCommercialistiPage() {
  return (
    <div>
      <CommHero />
      <CommROI />
      <CommPannelloStudio />
      <CommWhiteLabel />
      <CommFeatures />
      <CommSteps />
      <CommCTA />
    </div>
  );
}

/* -------- Hero -------- */
function CommHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center",
      }}>
        <div>
          <Crumb href="partner.html" label="Partner · Commercialisti" />
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)", lineHeight: 1.02,
            letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 620,
          }}>
            Uno strumento per i tuoi clienti. Tempo e margine per il tuo studio.
          </h1>
          <p style={{
            margin: "24px 0 0", maxWidth: 520,
            fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
            color: "var(--fg-2)",
          }}>
            Effatta white-label è il pannello di fatturazione che porta il <strong>logo del tuo studio</strong>. I tuoi clienti emettono in autonomia, tu controlli tutto da un unico cruscotto.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button trailingIcon="arrow-right">Diventa partner</Button>
            <Button variant="secondary">Richiedi una demo</Button>
          </div>
        </div>

        <CommBenefitCard />
      </div>
    </section>
  );
}

function Crumb({ href, label }) {
  return (
    <a href={href} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
      color: "var(--fg-3)", textDecoration: "none", marginBottom: 24,
    }}>
      <Icon name="arrow-right" size={12} style={{ transform: "rotate(180deg)" }} />
      {label}
    </a>
  );
}

/* Right-hand visual: three numbered benefits stacked */
function CommBenefitCard() {
  const items = [
    { n: "01", t: "Tempo recuperato", d: "Niente più fatture da raccogliere via PEC, e-mail o WhatsApp. Tutto già sul pannello." },
    { n: "02", t: "Margine ricorrente", d: "Fissi tu il prezzo finale del servizio. Effatta ti applica un costo convenzionato per cliente." },
    { n: "03", t: "Fidelizzazione", d: "Il cliente trova un servizio in più dentro lo studio. Niente concorrenza, più ragioni per restare." },
  ];
  return (
    <div style={{
      background: "var(--eff-paper-50)", border: "1px solid var(--border-1)",
      borderRadius: 16, padding: 8,
    }}>
      {items.map((it, i) => (
        <div key={it.n} style={{
          padding: "20px 22px",
          borderTop: i === 0 ? "none" : "1px solid var(--border-1)",
          display: "grid", gridTemplateColumns: "44px 1fr", gap: 16,
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)", paddingTop: 2,
          }}>{it.n}</div>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17,
              letterSpacing: "-0.015em", color: "var(--fg-1)",
            }}>{it.t}</div>
            <p style={{
              margin: "6px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
              color: "var(--fg-2)",
            }}>{it.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

window.PartnerCommercialistiPage = PartnerCommercialistiPage;

/* -------- ROI strip (three big numbers + tiny captions) -------- */
function CommROI() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "72px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 56 }}>
          <ROIBlock big="Un click" small="per scaricare le fatture di un cliente, anziché chiederle." />
          <ROIBlock big="Una sola login" small="per vedere lo stato fiscale di centinaia di partite IVA." />
          <ROIBlock big="Un canone unico" small="che paghi tu, fatturi tu, gestisci tu. Il margine lo decidi tu." />
        </div>
      </div>
    </section>
  );
}
function ROIBlock({ big, small }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 36,
        letterSpacing: "-0.025em", color: "#fff", lineHeight: 1.05,
      }}>{big}</div>
      <p style={{
        margin: "12px 0 0",
        fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
        color: "rgba(255,255,255,0.65)",
      }}>{small}</p>
    </div>
  );
}

/* -------- Pannello Studio (the killer feature) -------- */
function CommPannelloStudio() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px",
                    display: "grid", gridTemplateColumns: "0.95fr 1.1fr", gap: 72, alignItems: "center" }}>
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Pannello Studio</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em", maxWidth: 460,
          }}>Tutte le fatture di un cliente, scaricabili con un click.</h2>
          <p style={{
            margin: "20px 0 28px", maxWidth: 480,
            fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
            color: "var(--fg-2)",
          }}>
            Da un'unica vista hai l'elenco di tutti i tuoi clienti, lo stato delle loro fatture, gli scartati dello SDI e l'export per la contabilità. Scarichi un anno intero in CSV, XML o PDF, ordinato per cliente — in <strong>un click</strong>.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Vista d'insieme su tutte le P.IVA dello studio",
              "Filtri per stato SDI, periodo, regime fiscale",
              "Export massivo CSV / XML / PDF / ZIP",
              "Permessi granulari per collaboratori",
            ].map((b) => (
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

        <PannelloMock />
      </div>
    </section>
  );
}

/* Pannello-studio mockup */
function PannelloMock() {
  const rows = [
    ["Bar Caffè dei Vicoli SRL", "IT01234567890", 47, "Maggio 2026", "success"],
    ["Studio Esposito Geom.",    "IT09876543210", 12, "Maggio 2026", "success"],
    ["Pizzeria Da Salvatore",    "IT04561237890", 31, "Maggio 2026", "warning"],
    ["Ristorante Marechiaro",    "IT07654321098", 24, "Maggio 2026", "success"],
    ["Forno Mattei & C. snc",    "IT02468013579", 8,  "Maggio 2026", "success"],
    ["Boutique Materdei",        "IT13579246801",  5, "Maggio 2026", "danger"],
  ];
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-1)",
      borderRadius: 16, overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px", background: "var(--eff-paper-50)",
        borderBottom: "1px solid var(--border-1)",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "var(--eff-ink-900)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 13,
        }}>SE</div>
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-1)",
          }}>Pannello Studio · Studio Esposito</div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
          }}>132 clienti · 4.218 fatture nel 2026</div>
        </div>
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="ink" icon="check">Scarica tutto</Button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 0.5fr 0.8fr 0.8fr",
        padding: "12px 20px",
        borderBottom: "1px solid var(--border-1)",
        background: "#fff",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.04em", textTransform: "uppercase",
        color: "var(--fg-3)",
      }}>
        <span>Cliente</span><span>Partita IVA</span><span style={{ textAlign: "right" }}>Fatture</span><span>Periodo</span><span style={{ textAlign: "right" }}>Stato</span>
      </div>

      {rows.map(([n, p, c, m, s], i) => (
        <div key={n} style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 0.5fr 0.8fr 0.8fr",
          padding: "14px 20px",
          borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-1)",
          alignItems: "center",
          fontFamily: "var(--font-sans)", fontSize: 13,
        }}>
          <span style={{ fontWeight: 600, color: "var(--fg-1)" }}>{n}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>{p}</span>
          <span style={{ fontVariantNumeric: "tabular-nums", textAlign: "right", color: "var(--fg-1)" }}>{c}</span>
          <span style={{ color: "var(--fg-3)" }}>{m}</span>
          <span style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pill tone={s}>{s === "success" ? "OK" : s === "warning" ? "In attesa" : "Scartato"}</Pill>
          </span>
        </div>
      ))}
    </div>
  );
}

window.CommROI = CommROI;
window.CommPannelloStudio = CommPannelloStudio;

/* -------- White-label section: same UI, different brand -------- */
function CommWhiteLabel() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>White-label</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}>Il pannello porta il logo del tuo studio. Effatta resta dietro le quinte.</h2>
          <p style={{
            margin: "20px 0 0", maxWidth: 580,
            fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
            color: "var(--fg-2)",
          }}>
            Il tuo cliente entra su <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em", padding: "1px 6px", background: "#fff", border: "1px solid var(--border-1)", borderRadius: 6 }}>fatture.studioesposito.it</code>. Vede il tuo logo, i tuoi colori, riceve e-mail con il tuo dominio. Non sa che Effatta esiste, sotto.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <BrandTile
            label="Senza white-label"
            brandTitle="effatta."
            host="fatture.effatta.it"
            barBg="var(--eff-blue-500)"
            buttonBg="var(--eff-blue-500)"
            secondary
          />
          <BrandTile
            label="Con white-label · Studio Esposito"
            brandTitle="Studio Esposito"
            host="fatture.studioesposito.it"
            barBg="#1F4D3A"
            buttonBg="#1F4D3A"
          />
        </div>
      </div>
    </section>
  );
}

function BrandTile({ label, brandTitle, host, barBg, buttonBg, secondary }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
        color: "var(--fg-3)", marginBottom: 10,
        letterSpacing: "0.02em", textTransform: "uppercase",
      }}>{label}</div>
      <div style={{
        background: "#fff", border: "1px solid var(--border-1)",
        borderRadius: 14, overflow: "hidden",
      }}>
        <div style={{
          padding: "12px 18px", background: barBg, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {secondary ? (
              <img src="assets/logos/effatta-mark-white.svg" alt="" style={{ height: 20 }} />
            ) : (
              <div style={{
                width: 22, height: 22, borderRadius: 5,
                background: "rgba(255,255,255,0.18)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 11,
              }}>SE</div>
            )}
            <span style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
            }}>{brandTitle}</span>
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.7)",
          }}>{host}</div>
        </div>
        <div style={{ padding: "20px 22px" }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
            color: "var(--fg-1)", letterSpacing: "-0.015em",
          }}>Le tue fatture</div>
          <p style={{
            margin: "8px 0 18px",
            fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)",
          }}>Emetti, scarica, conserva. Tutto da un'unica pagina.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              padding: "9px 16px", borderRadius: 999, border: 0, cursor: "pointer",
              background: buttonBg, color: "#fff",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            }}>Nuova fattura</button>
            <button style={{
              padding: "9px 16px", borderRadius: 999, border: "1px solid var(--border-2)", cursor: "pointer",
              background: "#fff", color: "var(--fg-1)",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            }}>Storico</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CommWhiteLabel = CommWhiteLabel;

/* -------- Features grid -------- */
const COMM_FEATURES = [
  { icon: "users",        title: "Multi-cliente da subito",  desc: "Crea sotto-account per ogni tua P.IVA in pochi secondi, o importali in massa via CSV." },
  { icon: "shield-check", title: "Permessi per collaboratori", desc: "Apri il pannello ai tuoi praticanti con permessi granulari su singolo cliente o intero studio." },
  { icon: "code-2",       title: "Esportazione contabile",   desc: "Tracciato compatibile con i principali gestionali contabili italiani. Export annuale, mensile o on-demand." },
  { icon: "key-round",    title: "Dominio e e-mail tuoi",    desc: "Il portale risponde a un sottodominio del tuo studio. Le e-mail di sistema escono dal tuo dominio." },
  { icon: "receipt",      title: "Scontrini inclusi",        desc: "Se il tuo cliente ha bisogno anche degli scontrini, glieli proponi senza un'altra integrazione." },
  { icon: "briefcase",    title: "Reportistica per cliente", desc: "Per ogni P.IVA: stato SDI, scartati, andamento mensile, conservazione. Pronto per l'F24 e per la dichiarazione." },
];

function CommFeatures() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Funzioni per lo studio</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.625rem, 3vw, 2.25rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}>Pensato per chi gestisce decine — o centinaia — di clienti.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
                      border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden" }}>
          {COMM_FEATURES.map((f, i) => (
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

window.CommFeatures = CommFeatures;

/* -------- How it works steps -------- */
function CommSteps() {
  const steps = [
    { n: "01", t: "Parli con il commerciale", d: "Definiamo insieme white-label, pricing convenzionato, dominio. In una call." },
    { n: "02", t: "Apriamo il tuo Pannello Studio", d: "Logo, colori e dominio applicati. Sei online entro pochi giorni lavorativi." },
    { n: "03", t: "Importi o crei i tuoi clienti", d: "Via CSV o uno alla volta. Ognuno avrà il proprio accesso e i propri dati." },
    { n: "04", t: "Fatturi tu, marginiamo insieme", d: "Tu fissi il prezzo al cliente, paghi Effatta a canone convenzionato. La differenza è il tuo margine." },
  ];
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16,
          }}>Come si attiva</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(1.625rem, 3vw, 2.25rem)", lineHeight: 1.1,
            letterSpacing: "-0.025em", maxWidth: 560,
          }}>Dalla call alla messa in produzione, in poche settimane.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map((s) => (
            <div key={s.n}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)", marginBottom: 14 }}>{s.n}</div>
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

/* -------- Final CTA -------- */
function CommCTA() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{
          margin: 0, color: "#fff",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}>Una demo del Pannello Studio in 30 minuti.</h2>
        <p style={{
          margin: "16px auto 32px", maxWidth: 580,
          fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
          color: "rgba(255,255,255,0.7)",
        }}>Ti facciamo vedere come gestire i tuoi clienti con un click, come applichiamo il tuo brand e quali sono i numeri reali.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right" as="a" href="contatti.html">Prenota la demo</Button>
          <a href="partner.html" style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
            color: "#fff", textDecoration: "none",
            display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px",
            borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center",
          }}>Torna a Partner</a>
        </div>
      </div>
    </section>
  );
}

window.CommSteps = CommSteps;
window.CommCTA = CommCTA;
