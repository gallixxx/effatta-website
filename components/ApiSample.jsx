/* ApiSample.jsx — banda enterprise ink-on-paper. A sinistra il
 * posizionamento per software house, gestionali e clienti enterprise;
 * a destra una scheda con le garanzie concrete della piattaforma
 * (niente snippet di codice: l'integrazione è simile per tutti, il
 * valore è l'infrastruttura sotto). */
const ENTERPRISE_SPECS = [
  { k: "Disponibilità", v: "Uptime monitorato 24/7" },
  { k: "Sicurezza", v: "ISO 27001 · dati in UE" },
  { k: "Scala", v: "Migliaia di documenti al giorno" },
  { k: "Integrazione", v: "REST API · webhook · SDK" },
  { k: "Conservazione", v: "10 anni a norma, inclusa" },
  { k: "Supporto", v: "Account manager dedicato" },
  { k: "Modello", v: "Prezzo sui volumi, su misura" },
];

function ApiSample({ density = "spacious" }) {
  const pad = density === "compact" ? "64px 0" : "96px 0";

  return (
    <section id="api" data-screen-label="Enterprise / software house" style={{ background: "var(--eff-ink-900)", padding: pad, color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 16,
              }}
            >
              Per software house, gestionali ed enterprise
            </div>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                maxWidth: 460,
              }}
            >
              L'infrastruttura fiscale che regge i tuoi volumi.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.55,
                margin: "20px 0 32px",
                maxWidth: 460,
              }}
            >
              Una sola piattaforma per fatture e scontrini, pensata per chi emette migliaia di documenti al giorno e per chi integra Effatta nel proprio gestionale. API stabili, sicurezza certificata, conservazione inclusa — e un'offerta cucita sui tuoi volumi.
            </p>

            <ul style={{ listStyle: "none", margin: "0 0 36px", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Architettura multi-tenant: un account isolato per cliente", "Sicurezza certificata ISO 27001, dati in UE", "Conservazione a norma per 10 anni, inclusa", "Account manager dedicato e offerta sui volumi"].map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Icon name="check" size={16} strokeWidth={2} style={{ color: "rgba(255,255,255,0.4)", marginTop: 3 }} />
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 12 }}>
              <Button as="a" href="contatti.html" trailingIcon="arrow-right" variant="secondary">
                Parla con noi
              </Button>
              <a
                href="api.html"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#fff",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  height: 44,
                  padding: "0 8px",
                  borderBottom: "1px solid rgba(255,255,255,0.4)",
                  alignSelf: "center",
                }}
              >
                Documentazione API
              </a>
            </div>
          </div>

          <div
            style={{
              background: "#0A0E1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Icon name="shield-check" size={18} strokeWidth={1.6} style={{ color: "rgba(255,255,255,0.7)" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                Pronta per l'enterprise
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                SLA su misura
              </span>
            </div>
            <div style={{ padding: "8px 24px 12px" }}>
              {ENTERPRISE_SPECS.map((s, i) => (
                <div
                  key={s.k}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                    {s.k}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "#fff", textAlign: "right" }}>
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ApiSample = ApiSample;
