/* FeatureGrid.jsx — three-up feature block, audience-aware. */
const FEATURES = {
  merchant: [
    {
      icon: "file-text",
      title: "Fatture elettroniche",
      desc: "Emetti, trasmetti allo SDI, archivia. La ricevuta torna nella dashboard, non in PEC.",
      bullets: ["B2B, B2C e PA", "Note di credito", "Reverse charge"],
    },
    {
      icon: "receipt",
      title: "Scontrini digitali",
      desc: "Sostituisci il registratore telematico con la cassa web Effatta. Documento commerciale, lotteria degli scontrini, corrispettivi all'AdE: tutto a bordo.",
      bullets: ["Cassa web", "App mobile", "Documento commerciale"],
    },
    {
      icon: "shield-check",
      title: "Conservazione a norma",
      desc: "10 anni di conservazione inclusa nei piani da Standard in su. Firmata, certificata, esibizione in PDF/A.",
      bullets: ["Firma digitale", "Esibizione AdE", "Export annuale"],
    },
  ],
  partner: [
    {
      icon: "code-2",
      title: "REST API",
      desc: "Due API REST coordinate, una sola autenticazione. SDK ufficiali in Node, Python, PHP, Go. OpenAPI 3.1.",
      bullets: ["API fatturazione", "API scontrino", "Sandbox dedicata"],
    },
    {
      icon: "webhook",
      title: "Webhook in tempo reale",
      desc: "Ogni transizione SDI atterra come evento firmato. Retry esponenziale automatico, niente polling da fare.",
      bullets: ["HMAC-SHA256", "Retry esponenziale", "Replay evento"],
    },
    {
      icon: "key-round",
      title: "White-label completo",
      desc: "Dominio, logo, e-mail di sistema, portale cliente: tutto firmato con il tuo brand. Effatta resta dietro le quinte.",
      bullets: ["Sotto-account", "Branding totale", "Multi-tenant"],
    },
  ],
};

function FeatureGrid({ audience, density = "spacious" }) {
  const items = FEATURES[audience];
  const pad = density === "compact" ? "64px 0" : "96px 0";
  return (
    <section
      data-screen-label={`Feature grid — ${audience}`}
      style={{
        background: audience === "partner" ? "var(--eff-paper-50)" : "#fff",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
        transition: "background var(--t-base) var(--ease-out)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--fg-3)",
              marginBottom: 16,
            }}>
              {audience === "partner" ? "Per partner · stack tecnico" : "Per esercenti · cosa fai con Effatta"}
            </div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--fg-1)",
              maxWidth: 560,
              textWrap: "balance",
            }}>
              {audience === "partner"
                ? "Un'unica piattaforma per tutti gli adempimenti italiani."
                : "Tre cose, fatte come si deve."}
            </h2>
          </div>
          <a
            href={audience === "partner" ? "partner.html" : "fatturazione.html"}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--fg-1)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              borderBottom: "1px solid var(--fg-1)",
              paddingBottom: 2,
            }}
          >
            {audience === "partner" ? "Vedi le API e gli SDK" : "Vedi tutte le funzioni"}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map((f) => (
            <div
              key={f.title}
              className="feat-card"
              style={{
                background: "#fff",
                border: "1px solid var(--border-1)",
                borderRadius: 12,
                padding: 32,
                transition: "transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out)",
              }}
            >
              <Icon name={f.icon} size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <h3 style={{
                margin: "24px 0 10px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "-0.015em",
                color: "var(--fg-1)",
              }}>{f.title}</h3>
              <p style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--fg-2)",
              }}>{f.desc}</p>
              <ul style={{ listStyle: "none", margin: "20px 0 0", padding: 0, borderTop: "1px solid var(--border-1)", paddingTop: 16 }}>
                {f.bullets.map((b) => (
                  <li key={b} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 0",
                    fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)",
                  }}>
                    <Icon name="check" size={14} strokeWidth={2} style={{ color: "var(--fg-3)" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`.feat-card:hover { border-color: var(--border-2); transform: translateY(-2px); }`}</style>
    </section>
  );
}

window.FeatureGrid = FeatureGrid;
