/* PricingTeaser.jsx — five-plan retail pricing strip.
 *
 * Effatta retail listino:
 *   Free 0 € / Standard 1,99 € / Premium 4,99 € (più scelto) /
 *   Best 6,99 € / Scontrino 8,25 €  — tutti "+ IVA / mese".
 *
 * Il pricing partner è sempre su misura e NON è esposto qui:
 * vive nella pagina /partner.
 *
 * Tutti i piani hanno la stessa struttura visiva: stessa altezza,
 * 4 bullet, bottone in basso allineato. Il piano "più scelto"
 * è il piano di mezzo (Premium), evidenziato in ink con badge
 * d'angolo che NON sposta il contenuto.
 */
const PLANS = [
  {
    name: "Free",
    tier: "Per provare la piattaforma",
    price: "0",
    bullets: [
      "Programma online e app mobile",
      "Esplora dashboard e funzioni",
      "Nessuna carta richiesta",
      "Senza emissione allo SDI",
    ],
    cta: "Crea account",
  },
  {
    name: "Standard",
    tier: "Per chi parte adesso",
    price: "1,99",
    bullets: [
      "Fino a 200 fatture all'anno",
      "Invio fatture allo SDI",
      "Personalizzazione grafica",
      "Conservazione a norma 10 anni",
    ],
    cta: "Scegli Standard",
  },
  {
    name: "Premium",
    tier: "Per la maggior parte delle PIVA",
    price: "4,99",
    bullets: [
      "Fino a 1.000 fatture all'anno",
      "Notifiche stato SDI in tempo reale",
      "Multi-account e collaboratori",
      "Assistenza tecnica prioritaria",
    ],
    cta: "Scegli Premium",
    featured: true,
    badge: "Il più scelto",
  },
  {
    name: "Best",
    tier: "Per chi fattura tanto",
    price: "6,99",
    bullets: [
      "Documenti annui illimitati",
      "Rubrica fino a 1.000 contatti",
      "Modulo API REST",
      "Sincronizzazione Google Calendar",
    ],
    cta: "Scegli Best",
  },
  {
    name: "Scontrino",
    tier: "Per chi emette anche scontrini",
    price: "8,25",
    bullets: [
      "10.000 scontrini all'anno",
      "Cassa web + app mobile",
      "Conforme corrispettivi telematici",
      "Pagamenti integrati",
    ],
    cta: "Scegli Scontrino",
  },
];

function PricingTeaser({ density = "spacious" }) {
  const pad = density === "compact" ? "64px 0" : "96px 0";
  return (
    <section
      id="prezzi"
      data-screen-label="Pricing teaser"
      style={{ background: "#fff", padding: pad, borderBottom: "1px solid var(--border-1)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 48, alignItems: "flex-end" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 16,
            }}>
              Prezzi · Esercenti
            </div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              maxWidth: 560,
              textWrap: "balance",
            }}>
              Cinque piani, niente costi nascosti.
            </h2>
          </div>
          <div style={{
            padding: "16px 20px",
            border: "1px solid var(--border-1)",
            borderRadius: 12,
            background: "var(--eff-paper-50)",
            fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5,
            color: "var(--fg-1)",
          }}>
            <strong style={{ display: "block", marginBottom: 4 }}>
              Offerta del mese · piano Standard
            </strong>
            <span style={{ color: "var(--fg-2)" }}>
              Gratis il primo anno fino a 100 fatture, poi prezzo bloccato da{" "}
              <strong style={{ color: "var(--fg-1)" }}>1,99 € + IVA / mese</strong> per sempre.{" "}
              <span style={{ color: "var(--fg-3)" }}>Si applicano condizioni.</span>
            </span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
          border: "1px solid var(--border-1)",
          borderRadius: 16,
          overflow: "hidden",
          alignItems: "stretch",
        }}>
          {PLANS.map((p, i) => (
            <PlanCard key={p.name} {...p} divider={i > 0} />
          ))}
        </div>

        <div style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: 13,
            color: "var(--fg-3)",
          }}>
            Prezzi IVA esclusa, pagamento anticipato annuo. Conservazione a norma inclusa dal piano Standard.
          </div>
          <a href="pricing.html" style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
            color: "var(--fg-1)", textDecoration: "none",
            borderBottom: "1px solid var(--fg-1)", paddingBottom: 2,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            Confronta tutti i piani
            <Icon name="arrow-right" size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}

/* ── PlanCard ──
 * Tutti i piani usano la stessa struttura: header (nome + tier),
 * prezzo, divider, bullets, bottone. Tutti gli elementi sono in
 * un flex column, il bottone usa margin-top: auto per ancorarsi
 * in basso. La grid parent ha align-items: stretch, quindi tutte
 * le card hanno la stessa altezza.
 *
 * Il piano "più scelto" ha sfondo ink + badge d'angolo che non
 * sposta il layout (position: absolute, dimensione fissa).
 */
function PlanCard({ name, tier, price, bullets, cta, featured, badge, divider }) {
  const fg = featured ? "#fff" : "var(--fg-1)";
  const fgSub = featured ? "rgba(255,255,255,0.6)" : "var(--fg-3)";
  const fgBullet = featured ? "rgba(255,255,255,0.85)" : "var(--fg-2)";
  const check = featured ? "rgba(255,255,255,0.45)" : "var(--fg-3)";
  const divLine = featured ? "rgba(255,255,255,0.1)" : "var(--border-1)";

  return (
    <div style={{
      background: featured ? "var(--eff-ink-900)" : "#fff",
      color: fg,
      padding: "28px 22px 24px",
      borderLeft: divider ? `1px solid ${featured ? "transparent" : "var(--border-1)"}` : "none",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Corner badge — absolute, doesn't displace content */}
      {featured && (
        <div style={{
          position: "absolute",
          top: 12, right: 12,
          padding: "4px 10px",
          borderRadius: 999,
          background: "var(--eff-blue-500)",
          color: "#fff",
          fontFamily: "var(--font-sans)",
          fontWeight: 700, fontSize: 10,
          letterSpacing: "0.06em", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          {badge}
        </div>
      )}

      {/* Header */}
      <h3 style={{
        margin: 0,
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: 20, letterSpacing: "-0.015em",
        color: fg,
      }}>{name}</h3>
      <div style={{
        marginTop: 4,
        fontFamily: "var(--font-sans)", fontSize: 12,
        color: fgSub, lineHeight: 1.4,
        minHeight: 32, // reserve height so all tiers align even with 1- or 2-line tiers
      }}>{tier}</div>

      {/* Price */}
      <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: 36, letterSpacing: "-0.025em",
          color: fg,
          fontVariantNumeric: "tabular-nums",
        }}>
          {price === "0" ? "0 €" : `${price} €`}
        </span>
      </div>
      <div style={{
        fontFamily: "var(--font-sans)", fontSize: 12,
        color: fgSub, marginTop: 2,
      }}>+ IVA / mese</div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: divLine,
        margin: "22px 0 18px",
      }} />

      {/* Bullets */}
      <ul style={{
        listStyle: "none", margin: 0, padding: 0,
        display: "flex", flexDirection: "column", gap: 10,
        marginBottom: 24,
      }}>
        {bullets.map((b) => (
          <li key={b} style={{
            display: "flex", alignItems: "flex-start", gap: 8,
            fontFamily: "var(--font-sans)", fontSize: 13,
            color: fgBullet, lineHeight: 1.4,
          }}>
            <Icon
              name="check"
              size={14}
              strokeWidth={2}
              style={{ color: check, marginTop: 2, flexShrink: 0 }}
            />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA, anchored to bottom */}
      <Button
        variant={featured ? "blue" : "secondary"}
        size="sm"
        style={{ width: "100%", marginTop: "auto" }}
        as="a"
        href="#signup"
      >
        {cta}
      </Button>
    </div>
  );
}

window.PricingTeaser = PricingTeaser;
