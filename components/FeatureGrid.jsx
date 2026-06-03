/* FeatureGrid.jsx — three-up feature block, audience-aware. */
const FEATURES = {
  merchant: [
    {
      icon: "file-text",
      title: "Fatture elettroniche",
      desc: "Crei e invii la fattura in pochi secondi. Parte da sola verso lo SDI e la ricevuta torna nella tua dashboard — niente PEC da controllare.",
      bullets: ["Invio allo SDI automatico", "Verso clienti, privati e PA", "Avviso subito se viene scartata"],
    },
    {
      icon: "receipt",
      title: "Scontrini e cassa",
      desc: "Al posto del registratore telematico, la cassa web Effatta: emetti il documento commerciale da telefono, tablet o PC. Pagamento e scontrino restano collegati, come chiede la norma dal 2026.",
      bullets: ["Conforme POS-RT 2026", "Lotteria degli scontrini", "Da smartphone, tablet o PC"],
    },
    {
      icon: "smartphone",
      title: "Tutto dal telefono",
      desc: "Fatture, scontrini e incassi in un'unica app, sempre sincronizzati tra telefono e PC. La conservazione a norma per 10 anni è già inclusa: ci pensiamo noi.",
      bullets: ["App iOS e Android", "Tutto sincronizzato", "Conservazione 10 anni inclusa"],
    },
  ],
  partner: [
    {
      icon: "code-2",
      title: "API e SDK",
      desc: "Due API REST coordinate per fatture e scontrini, una sola autenticazione. SDK ufficiali, webhook firmati e sandbox sempre attiva.",
      bullets: ["Node, Python, PHP, Go", "Webhook HMAC-SHA256", "OpenAPI 3.1"],
    },
    {
      icon: "layers",
      title: "White-label e multi-tenant",
      desc: "Rivendi col tuo brand: dominio, logo, e-mail di sistema e portale cliente. Un sotto-account isolato per ogni cliente, con fatturazione separata.",
      bullets: ["Branding completo", "Sotto-account illimitati", "Effatta dietro le quinte"],
    },
    {
      icon: "users",
      title: "Gestione multi-cliente",
      desc: "Per associazioni e studi: segui tutti i tuoi clienti da un unico pannello, con permessi per i collaboratori e un rendiconto consolidato.",
      bullets: ["Pannello unico", "Permessi per collaboratori", "Report per cliente"],
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
              {audience === "partner" ? "Per partner · piattaforma e canale" : "Per esercenti · cosa fai con Effatta"}
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
            {audience === "partner" ? "Scopri il programma partner" : "Vedi tutte le funzioni"}
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
