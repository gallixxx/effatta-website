/* AudienceSplit.jsx — two treatments of the dual-audience routing.
 *
 *  "cards"  — two-column flat cards (kit's original, refined).
 *  "tabs"   — tabbed/segmented header with a shared content slab
 *             below — same content surface fades between merchant
 *             and partner. Compresses the block vertically.
 */

const AUDIENCE_DATA = {
  merchant: {
    eyebrow: "Per esercenti",
    title: "Hai una partita IVA.",
    blurb: "Bar, ristorante, negozio, e-commerce, libero professionista. Emetti fatture e scontrini in autonomia, dal browser o dall'app, senza pensare a SDI o conservazione.",
    bullets: [
      "Online in pochi minuti",
      "Promo: 100 fatture gratis il primo anno",
      "Conservazione a norma inclusa",
      "App iOS e Android",
    ],
    cta: "Scopri il piano fatturazione",
    href: "fatturazione.html",
  },
  partner: {
    eyebrow: "Per partner",
    title: "Rivendi Effatta a chi serve.",
    blurb: "Software house, associazioni di categoria, commercialisti. Integri Effatta nelle tue API o lo offri in white-label ai tuoi clienti, sempre con il tuo brand davanti.",
    bullets: [
      "API fatturazione + API scontrino",
      "White-label completo",
      "Account manager dedicato",
      "Sandbox attiva 24/7",
    ],
    cta: "Vai alla versione business",
    href: "partner.html",
  },
};

function AudienceSplit({ audience, setAudience, treatment = "cards", density = "spacious" }) {
  const pad = density === "compact" ? "64px 0" : "96px 0";

  if (treatment === "tabs") {
    return <AudienceTabs audience={audience} setAudience={setAudience} pad={pad} />;
  }
  return <AudienceCards audience={audience} setAudience={setAudience} pad={pad} />;
}

/* ----- "cards" treatment ----- */
function AudienceCards({ audience, setAudience, pad }) {
  return (
    <section
      data-screen-label="Audience split — cards"
      style={{
        background: "#fff",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeading
          eyebrow="Doppio binario"
          title="Una piattaforma, due modi di usarla."
          sub="Tu scegli da che parte entrare — il prodotto è lo stesso."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            border: "1px solid var(--border-1)",
            borderRadius: 16,
            overflow: "hidden",
            marginTop: 48,
          }}
        >
          <AudienceCol kind="merchant" data={AUDIENCE_DATA.merchant}
                       active={audience === "merchant"} onClick={() => setAudience("merchant")} />
          <AudienceCol kind="partner" data={AUDIENCE_DATA.partner}
                       active={audience === "partner"} onClick={() => setAudience("partner")} />
        </div>
      </div>
    </section>
  );
}

function AudienceCol({ kind, data, active, onClick }) {
  const isMerchant = kind === "merchant";
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "relative",
        background: isMerchant ? "#fff" : "var(--eff-paper-50)",
        borderLeft: isMerchant ? "none" : "1px solid var(--border-1)",
        padding: "48px 48px 40px",
        transition: "background var(--t-base) var(--ease-out)",
      }}
    >
      {active && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: isMerchant ? "var(--eff-blue-500)" : "var(--eff-ink-900)",
          }}
        />
      )}
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 13,
        color: "var(--fg-3)",
        marginBottom: 16,
      }}>{data.eyebrow}</div>
      <h3 style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 32,
        lineHeight: 1.1,
        letterSpacing: "-0.025em",
        color: "var(--fg-1)",
      }}>{data.title}</h3>
      <p style={{
        margin: "16px 0 28px",
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: 1.55,
        color: "var(--fg-2)",
        maxWidth: 440,
      }}>{data.blurb}</p>

      <ul style={{ listStyle: "none", margin: "0 0 36px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {data.bullets.map((b) => (
          <li key={b} style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-1)",
          }}>
            <Icon name="check" size={16} strokeWidth={2} style={{ color: "var(--fg-3)" }} />
            {b}
          </li>
        ))}
      </ul>

      <Button
        variant={isMerchant ? "blue" : "ink"}
        size="md"
        trailingIcon="arrow-right"
        as="a"
        href={data.href}
      >
        {data.cta}
      </Button>
    </div>
  );
}

/* ----- "tabs" treatment ----- */
function AudienceTabs({ audience, setAudience, pad }) {
  const data = AUDIENCE_DATA[audience];
  const isMerchant = audience === "merchant";

  return (
    <section
      data-screen-label="Audience split — tabs"
      style={{
        background: isMerchant ? "#fff" : "var(--eff-paper-50)",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
        transition: "background var(--t-base) var(--ease-out)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 40,
          gap: 32,
          flexWrap: "wrap",
        }}>
          <SectionHeading
            eyebrow="Doppio binario"
            title="Una piattaforma, due modi di usarla."
            sub="Scegli il tuo punto d'ingresso."
            noMarginBottom
          />
          {/* segmented control */}
          <div style={{
            display: "inline-flex",
            padding: 4,
            borderRadius: 999,
            background: isMerchant ? "var(--eff-paper-50)" : "#fff",
            border: "1px solid var(--border-1)",
          }}>
            {["merchant", "partner"].map((k) => {
              const sel = audience === k;
              return (
                <button
                  key={k}
                  onClick={() => setAudience(k)}
                  style={{
                    border: 0,
                    background: sel ? (k === "merchant" ? "var(--eff-blue-500)" : "var(--eff-ink-900)") : "transparent",
                    color: sel ? "#fff" : "var(--fg-2)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "10px 22px",
                    borderRadius: 999,
                    cursor: "pointer",
                    transition: "background var(--t-base) var(--ease-out), color var(--t-base) var(--ease-out)",
                  }}
                >
                  {k === "merchant" ? "Sono un esercente" : "Sono partner"}
                </button>
              );
            })}
          </div>
        </div>

        {/* shared content slab — animated key */}
        <div
          key={audience}
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 64,
            padding: "48px 56px",
            background: isMerchant ? "var(--eff-paper-50)" : "#fff",
            border: "1px solid var(--border-1)",
            borderRadius: 20,
            animation: "audFade 280ms var(--ease-out)",
          }}
        >
          <div>
            <div style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.02em",
              color: isMerchant ? "var(--eff-blue-700)" : "var(--fg-3)",
              marginBottom: 16,
            }}>{data.eyebrow}</div>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 36,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--fg-1)",
              textWrap: "balance",
            }}>{data.title}</h3>
            <p style={{
              margin: "20px 0 32px",
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--fg-2)",
              maxWidth: 480,
            }}>{data.blurb}</p>
            <Button
              variant={isMerchant ? "blue" : "ink"}
              size="md"
              trailingIcon="arrow-right"
              as="a"
              href={data.href}
            >
              {data.cta}
            </Button>
          </div>
          <ul style={{
            listStyle: "none", margin: 0, padding: 0,
            display: "flex", flexDirection: "column", gap: 0,
            alignSelf: "center",
          }}>
            {data.bullets.map((b, i) => (
              <li key={b} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--border-1)",
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "var(--fg-1)",
                fontWeight: 500,
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 999,
                  background: isMerchant ? "var(--eff-blue-50)" : "var(--eff-ink-100)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: isMerchant ? "var(--eff-blue-700)" : "var(--fg-1)",
                  flex: "none",
                }}>
                  <Icon name="check" size={14} strokeWidth={2.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`@keyframes audFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}

/* Section heading helper, reused */
function SectionHeading({ eyebrow, title, sub, noMarginBottom = false }) {
  return (
    <div style={{ maxWidth: 680, marginBottom: noMarginBottom ? 0 : 0 }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 13,
        color: "var(--fg-3)",
        marginBottom: 16,
        letterSpacing: "0.02em",
      }}>{eyebrow}</div>
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.025em",
        color: "var(--fg-1)",
        textWrap: "balance",
      }}>{title}</h2>
      {sub && (
        <p style={{
          margin: "16px 0 0",
          fontFamily: "var(--font-sans)",
          fontSize: 17,
          lineHeight: 1.55,
          color: "var(--fg-2)",
        }}>{sub}</p>
      )}
    </div>
  );
}

Object.assign(window, { AudienceSplit, SectionHeading });
