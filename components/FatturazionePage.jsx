/* FatturazionePage.jsx — dedicated product page for
 * Fatturazione Elettronica. Greenfield: shows the "result"
 * (clean mockups, status cards, flow) without exposing the
 * actual product UI. */

function FatturazionePage() {
  return (
    <div>
      <FatturazioneHero />
      <FatturazioneFlow />
      <FatturazioneFeatures />
      <FatturazionePromo />
    </div>
  );
}

function FatturazioneHero() {
  return (
    <section style={{ background: "#fff", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 24,
          }}>Prodotto · Fatturazione elettronica</div>

          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "var(--fg-1)", maxWidth: 580,
          }}>
            Fatture B2B e B2C, emesse e trasmesse allo SDI.
          </h1>

          <p style={{
            margin: "24px 0 0", maxWidth: 500,
            fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
            color: "var(--fg-2)",
          }}>
            Una piattaforma online, un'app per iOS e Android e il primo anno gratis fino a 100 fatture.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button trailingIcon="arrow-right">Inizia gratis</Button>
            <Button variant="secondary" as="a" href="pricing.html">Vedi i prezzi</Button>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "100 fatture gratis il primo anno",
              "Poi 1,99 € + IVA al mese, bloccato per sempre",
              "Conservazione a norma per 10 anni inclusa da Standard in su",
            ].map((b) => (
              <div key={b} style={{
                display: "flex", alignItems: "center", gap: 10,
                fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)",
              }}>
                <Icon name="check" size={14} strokeWidth={2} style={{ color: "var(--fg-3)" }} />
                {b}
              </div>
            ))}
          </div>
        </div>

        <FatturaMock />
      </div>
    </section>
  );
}

function FatturaMock() {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-1)",
      borderRadius: 16, padding: 28,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>
          IT001-2026-00193
        </div>
        <Pill tone="success">Trasmesso allo SDI</Pill>
      </div>
      <div style={{
        marginTop: 14,
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20,
        letterSpacing: "-0.015em", color: "var(--fg-1)",
      }}>Bar Caffè dei Vicoli SRL</div>
      <div style={{ height: 1, background: "var(--border-1)", margin: "20px 0" }} />
      <KV label="Codice destinatario" value="X2K8R1L" mono />
      <KV label="Imponibile" value="€ 1.250,00" mono />
      <KV label="IVA 22%" value="€ 275,00" mono />
      <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--fg-2)" }}>Totale</div>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
          color: "var(--fg-1)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em",
        }}>€ 1.525,00</div>
      </div>
    </div>
  );
}

function KV({ label, value, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
      <span style={{ color: "var(--fg-3)" }}>{label}</span>
      <span style={{
        color: "var(--fg-1)", fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        fontWeight: 500, fontVariantNumeric: "tabular-nums",
      }}>{value}</span>
    </div>
  );
}

window.FatturazionePage = FatturazionePage;
window.FatturazioneHero = FatturazioneHero;

/* -------- The "how it works" flow -------- */
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
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16,
        }}>Come funziona</div>
        <h2 style={{
          margin: "0 0 56px",
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em", maxWidth: 560,
        }}>Dalla fattura alla conservazione, in quattro passi.</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {FLOW.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)",
                marginBottom: 14,
              }}>{s.n}</div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22,
                letterSpacing: "-0.02em", color: "var(--fg-1)",
              }}>{s.title}</h3>
              <p style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)",
              }}>{s.desc}</p>
              {i < FLOW.length - 1 && (
                <div style={{
                  position: "absolute", top: 8, right: -12, width: 24, height: 1,
                  background: "var(--border-2)",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Feature grid (fatturazione-specific) -------- */
const FATT_FEATURES = [
  { icon: "file-text",    title: "B2B, B2C e PA",          desc: "Tutti i flussi SDI gestiti: privati, pubblica amministrazione, reverse charge, note di credito." },
  { icon: "key-round",    title: "Firma e invio automatici",  desc: "Effatta firma il documento e lo invia allo SDI. Nessuna PEC da configurare." },
  { icon: "webhook",      title: "Notifiche in tempo reale",  desc: "Webhook e dashboard ti dicono se la fattura è accettata, scartata o ricevuta. Niente polling." },
  { icon: "shield-check", title: "Conservazione a norma",     desc: "10 anni di conservazione firmata, inclusa nei piani da Standard in su. Esibizione veloce per AdE." },
  { icon: "users",        title: "Multi-utente",              desc: "Inviti commercialisti, collaboratori, soci. Ognuno con il suo accesso e i suoi permessi." },
  { icon: "code-2",       title: "Importa ed esporta",        desc: "Sincronizzazione con i principali gestionali, export annuale per il commercialista." },
];

function FatturazioneFeatures() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
                      border: "1px solid var(--border-1)", borderRadius: 16, overflow: "hidden" }}>
          {FATT_FEATURES.map((f, i) => (
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

/* -------- Promo strip + final CTA -------- */
function FatturazionePromo() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 32px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          padding: "4px 10px", borderRadius: 999,
          background: "var(--eff-blue-500)", color: "#fff",
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: 24,
        }}>Offerta del mese</div>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em", color: "#fff",
        }}>Gratis il primo anno fino a 100 fatture.<br />Poi 1,99 €&nbsp;+&nbsp;IVA al mese, bloccato per sempre.</h2>
        <p style={{
          margin: "20px auto 0", maxWidth: 580,
          fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
          color: "rgba(255,255,255,0.7)",
        }}>Niente sorprese, niente aumenti silenziosi: il prezzo resta lo stesso finché vuoi usare Effatta. Si applicano condizioni.</p>
        <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="secondary" trailingIcon="arrow-right">Attiva la promo</Button>
          <a href="pricing.html" style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
            color: "#fff", textDecoration: "none",
            display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px",
            borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center",
          }}>Vedi i prezzi</a>
        </div>
      </div>
    </section>
  );
}

window.FatturazioneFlow = FatturazioneFlow;
window.FatturazioneFeatures = FatturazioneFeatures;
window.FatturazionePromo = FatturazionePromo;
