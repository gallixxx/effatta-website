/* TrustStrip.jsx — trust signals row.
 *
 * Real Effatta trust signals (no customer logos — Effatta's
 * clients prefer not to be publicly listed):
 *   1) Piattaforma fiscale autorizzata
 *   2) ISO 27001
 *   3) Integrazione diretta con SDI */
function TrustStrip() {
  const trust = [
    { icon: "shield-check", label: "Piattaforma fiscale" },
    { icon: "key-round",    label: "Certificazione ISO 27001" },
    { icon: "webhook",      label: "Integrazione con SDI" },
  ];
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--border-1)",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: 13,
            color: "var(--fg-3)",
          }}
        >
          Una piattaforma fiscale italiana, fatta come si deve.
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          {trust.map((t) => (
            <span
              key={t.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                color: "var(--fg-1)",
              }}
            >
              <Icon name={t.icon} size={16} strokeWidth={1.6} style={{ color: "var(--fg-3)" }} />
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
window.TrustStrip = TrustStrip;
