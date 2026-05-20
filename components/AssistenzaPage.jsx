/* AssistenzaPage.jsx — centro assistenza.
 *
 * Pagina di tipo "help center": campo di ricerca, categorie,
 * articoli più letti, contatto supporto. Non promette SLA che
 * non posso garantire — solo orari supporto + canali.
 */

const HELP_CATEGORIES = [
  {
    icon: "zap",
    title: "Inizia con Effatta",
    desc: "Crea l'account, attiva il piano, configura partita IVA e regime fiscale.",
    count: 12,
  },
  {
    icon: "file-text",
    title: "Fatturazione elettronica",
    desc: "Emissione, codice destinatario, note di credito, reverse charge.",
    count: 24,
  },
  {
    icon: "receipt",
    title: "Scontrini e cassa web",
    desc: "Emettere scontrini, chiusure giornaliere, corrispettivi telematici.",
    count: 18,
  },
  {
    icon: "shield-check",
    title: "Conservazione a norma",
    desc: "Come funziona la conservazione, esibizione AdE, scaricare l'archivio.",
    count: 9,
  },
  {
    icon: "code-2",
    title: "API e webhook",
    desc: "Autenticazione, endpoint, errori, replay degli eventi.",
    count: 16,
  },
  {
    icon: "users",
    title: "Account e fatturazione",
    desc: "Cambio piano, pagamenti, dati aziendali, multi-utente.",
    count: 11,
  },
];

const POPULAR = [
  {
    cat: "Fatturazione",
    title: "Cosa devo mettere come codice destinatario se il cliente non l'ha?",
    read: "3 min",
  },
  {
    cat: "Fatturazione",
    title: "La mia fattura è stata scartata dallo SDI: cosa fare?",
    read: "4 min",
  },
  {
    cat: "Conservazione",
    title: "Per quanto tempo le fatture restano in conservazione?",
    read: "2 min",
  },
  {
    cat: "Scontrini",
    title: "Come faccio la chiusura giornaliera con la cassa web?",
    read: "3 min",
  },
  {
    cat: "API",
    title: "Differenza tra API fatturazione e API scontrino",
    read: "5 min",
  },
  {
    cat: "Account",
    title: "Cambio piano: quando viene applicato il nuovo prezzo?",
    read: "2 min",
  },
];

function AssistenzaPage() {
  return (
    <div>
      <AssistenzaHero />
      <AssistenzaCategories />
      <AssistenzaPopular />
      <AssistenzaContact />
    </div>
  );
}

function AssistenzaHero() {
  const [q, setQ] = React.useState("");
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "104px 0 80px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em",
        }}>Centro assistenza</div>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2.25rem, 4.6vw, 3.25rem)",
          lineHeight: 1.04, letterSpacing: "-0.03em",
          textWrap: "balance",
        }}>
          Tutto quello che ti serve per usare Effatta.
        </h1>
        <p style={{
          margin: "20px auto 36px", maxWidth: 540,
          fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55,
          color: "var(--fg-2)",
        }}>
          Guide passo-passo, risposte rapide, esempi di codice. Se non trovi quello che cerchi, parla con il supporto.
        </p>

        {/* Search */}
        <form onSubmit={(e) => e.preventDefault()} style={{
          display: "flex", gap: 8, justifyContent: "center", maxWidth: 560, margin: "0 auto",
        }}>
          <div style={{
            flex: 1, position: "relative",
          }}>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca: codice destinatario, conservazione, API…"
              style={{
                width: "100%", height: 52,
                border: "1px solid var(--border-1)",
                borderRadius: 999,
                padding: "0 24px 0 50px",
                fontFamily: "var(--font-sans)", fontSize: 15,
                background: "#fff", color: "var(--fg-1)",
                boxShadow: "var(--shadow-sm)",
              }}
            />
            <Icon name="scan-line" size={18} style={{
              color: "var(--fg-3)",
              position: "absolute", left: 20, top: 17,
            }} />
          </div>
          <Button variant="ink" size="lg" type="submit">Cerca</Button>
        </form>
      </div>
    </section>
  );
}

function AssistenzaCategories() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <h2 style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.625rem, 3vw, 2.125rem)",
          lineHeight: 1.1, letterSpacing: "-0.025em",
        }}>Esplora per argomento</h2>
        <p style={{
          margin: "0 0 40px",
          fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-2)",
        }}>Sei aree, oltre 90 articoli.</p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
        }}>
          {HELP_CATEGORIES.map((c) => (
            <a key={c.title} href="#" className="help-cat" style={{
              padding: 28,
              background: "#fff",
              border: "1px solid var(--border-1)",
              borderRadius: 14,
              textDecoration: "none",
              color: "var(--fg-1)",
              display: "flex", flexDirection: "column",
              transition: "border-color var(--t-base) var(--ease-out), transform var(--t-base) var(--ease-out)",
            }}>
              <Icon name={c.icon} size={26} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{
                margin: "20px 0 8px",
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
                letterSpacing: "-0.015em",
              }}>{c.title}</h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)", flex: 1,
              }}>{c.desc}</p>
              <div style={{
                marginTop: 20, paddingTop: 14,
                borderTop: "1px solid var(--border-1)",
                fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
                color: "var(--fg-3)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span>{c.count} articoli</span>
                <Icon name="arrow-right" size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`.help-cat:hover { border-color: var(--border-2) !important; transform: translateY(-2px); }`}</style>
    </section>
  );
}

function AssistenzaPopular() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 32, gap: 24, flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.625rem, 3vw, 2.125rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
            }}>I più letti questa settimana</h2>
            <p style={{
              margin: "10px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 16,
              color: "var(--fg-2)",
            }}>Le domande che gli altri clienti hanno fatto di recente.</p>
          </div>
        </div>

        <div style={{
          background: "#fff", border: "1px solid var(--border-1)",
          borderRadius: 16, overflow: "hidden",
        }}>
          {POPULAR.map((a, i) => (
            <a key={a.title} href="#" className="help-art" style={{
              display: "grid",
              gridTemplateColumns: "130px 1fr auto",
              alignItems: "center",
              gap: 24,
              padding: "20px 28px",
              borderTop: i === 0 ? "none" : "1px solid var(--border-1)",
              textDecoration: "none",
              color: "var(--fg-1)",
              transition: "background var(--t-base) var(--ease-out)",
            }}>
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11,
                color: "var(--eff-blue-700)",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{a.cat}</span>
              <span style={{
                fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 16,
                color: "var(--fg-1)",
              }}>{a.title}</span>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: 13,
                color: "var(--fg-3)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {a.read}
                <Icon name="arrow-right" size={14} style={{ color: "var(--fg-3)" }} />
              </span>
            </a>
          ))}
        </div>
      </div>
      <style>{`.help-art:hover { background: var(--eff-paper-100); }`}</style>
    </section>
  );
}

function AssistenzaContact() {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          background: "var(--eff-ink-900)", color: "#fff",
          borderRadius: 20, padding: "48px 56px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
          alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden style={{
            position: "absolute", right: -120, top: -120,
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(47,128,237,0.18), transparent 60%)",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
              color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em",
              textTransform: "uppercase", marginBottom: 16,
            }}>Non hai trovato la risposta?</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: 32, letterSpacing: "-0.025em", lineHeight: 1.1,
            }}>Scrivi al supporto.</h2>
            <p style={{
              margin: "16px 0 0", maxWidth: 380,
              fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
              color: "rgba(255,255,255,0.72)",
            }}>
              Rispondiamo alle e-mail dal lunedì al venerdì, 9:00 – 18:00. Per i clienti dei piani Premium, Best e Scontrino c'è una corsia prioritaria.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
            <ContactRow icon="users" line="supporto@effatta.it" sub="Per i clienti già attivi" />
            <ContactRow icon="briefcase" line="vendite@effatta.it" sub="Per chi vuole un preventivo" />
            <ContactRow icon="code-2" line="docs.effatta.it" sub="Documentazione API e SDK" />
            <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button variant="blue" trailingIcon="arrow-right" as="a" href="contatti.html">
                Vai al modulo contatti
              </Button>
              <Button variant="secondary" as="a" href="api.html">
                Documentazione API
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, line, sub }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 16px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999,
        background: "rgba(255,255,255,0.08)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "rgba(255,255,255,0.85)",
      }}>
        <Icon name={icon} size={16} strokeWidth={1.6} />
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#fff" }}>{line}</div>
        <div style={{
          marginTop: 2,
          fontFamily: "var(--font-sans)", fontSize: 12,
          color: "rgba(255,255,255,0.55)",
        }}>{sub}</div>
      </div>
    </div>
  );
}

window.AssistenzaPage = AssistenzaPage;
