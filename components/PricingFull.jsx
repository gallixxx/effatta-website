/* PricingFull.jsx — full retail pricing page.
 *
 * Includes: 5-plan headline row, full feature comparison
 * table, promo banner, FAQ teaser, partner-pricing callout.
 *
 * The plan data here is authored once and reused by both the
 * card row and the comparison table — keeps the page in sync. */
const PRICING_HEADERS = ["Free", "Standard", "Premium", "Best", "Scontrino"];
const FEATURED_INDEX = 2; // Premium

const PRICING_PRICES = [
  { price: "0", tier: "Funzionalità gratuita" },
  { price: "1,99", tier: "Funzionalità standard" },
  { price: "4,99", tier: "Funzionalità avanzate" },
  { price: "6,99", tier: "Funzionalità professional" },
  { price: "8,25", tier: "Funzionalità scontrino" },
];

const PRICING_GROUPS = [
  {
    title: "Inclusi in tutti i piani",
    rows: [
      ["Programma online",        ["•","•","•","•","•"]],
      ["App iOS e Android",       ["•","•","•","•","•"]],
      ["Conservazione a norma",   ["—","10 anni","10 anni","10 anni","10 anni"]],
    ],
  },
  {
    title: "Fatturazione elettronica",
    rows: [
      ["Personalizzazione grafica fattura",   ["—","•","•","•","•"]],
      ["Template ad-hoc per professione",     ["—","•","•","•","•"]],
      ["Creazione automatica XML",            ["—","•","•","•","•"]],
      ["Gestione attive e passive",           ["—","•","•","•","•"]],
      ["Firma automatica",                    ["—","•","•","•","•"]],
      ["Invio fatture allo SDI",              ["—","•","•","•","•"]],
      ["Dashboard, riepilogo, IVA",           ["—","•","•","•","•"]],
      ["Analisi IVA mensile / trimestrale",   ["—","•","•","•","•"]],
      ["Allegati ai documenti",               ["—","•","•","•","•"]],
      ["Esportazione documenti in PDF",       ["—","•","•","•","•"]],
      ["Controllo stato fattura",             ["—","—","•","•","•"]],
      ["Ricezione notifiche",                 ["—","—","•","•","•"]],
      ["Assistenza tecnica",                  ["—","—","•","•","•"]],
    ],
  },
  {
    title: "Limiti e volumi",
    rows: [
      ["Rubrica clienti / fornitori",   ["—","200","500","1.000","illimitata"]],
      ["Documenti annui",               ["—","200 / anno","1.000 / anno","illimitati","limitati"]],
      ["Scontrini emessi all'anno",     ["—","—","—","—","10.000"]],
      ["Multi-account",                 ["—","—","•","•","•"]],
    ],
  },
  {
    title: "Integrazioni",
    rows: [
      ["Export / import altri gestionali",  ["—","—","—","•","•"]],
      ["Sincronizzazione Google Calendar",  ["—","—","—","•","•"]],
      ["Modulo API REST",                   ["—","—","—","•","•"]],
      ["Integrazione pagamenti",            ["—","—","—","•","•"]],
    ],
  },
];

function PricingFull() {
  return (
    <div>
      {/* Page header */}
      <section style={{ background: "#fff", padding: "96px 0 56px", borderBottom: "1px solid var(--border-1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--fg-3)",
              marginBottom: 16,
            }}
          >
            Prezzi · Esercenti
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 4vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 760,
            }}
          >
            Cinque piani, tutto incluso.
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              maxWidth: 560,
              fontFamily: "var(--font-sans)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--fg-2)",
            }}
          >
            Prezzi annuali, IVA esclusa. Niente costo per fattura SDI. Conservazione a norma inclusa da Standard in su.
          </p>
        </div>
      </section>

      {/* Promo banner */}
      <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "32px 0" }}>
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
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid var(--eff-blue-500)",
              color: "#fff",
              background: "var(--eff-blue-500)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Offerta del mese
          </div>
          <div style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.5 }}>
            <strong style={{ color: "#fff" }}>Gratis il primo anno fino a 100 fatture</strong>,{" "}
            <span style={{ color: "rgba(255,255,255,0.78)" }}>poi prezzo bloccato da</span>{" "}
            <strong style={{ color: "#fff" }}>1,99 € + IVA al mese</strong>{" "}
            <span style={{ color: "rgba(255,255,255,0.78)" }}>per sempre. Si applicano condizioni.</span>
          </div>
          <Button variant="secondary" trailingIcon="arrow-right">Attiva la promo</Button>
        </div>
      </section>

      {/* Plan strip — re-uses the homepage's PricingTeaser layout */}
      <PricingTeaser />

      {/* Comparison table */}
      <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--fg-3)",
              marginBottom: 16,
            }}
          >
            Confronto completo
          </div>
          <h2
            style={{
              margin: "0 0 48px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              maxWidth: 640,
            }}
          >
            Cosa c'è in ogni piano, riga per riga.
          </h2>

          <CompareTable />
        </div>
      </section>

      {/* Partner pricing callout */}
      <section style={{ background: "var(--eff-paper-50)", padding: "72px 0", borderBottom: "1px solid var(--border-1)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 320 }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                color: "var(--fg-3)",
                marginBottom: 8,
              }}
            >
              Software house, associazioni, commercialisti
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.625rem, 2.8vw, 2rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                maxWidth: 580,
              }}
            >
              I piani partner sono sempre su misura.
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                lineHeight: 1.5,
                color: "var(--fg-2)",
                maxWidth: 580,
              }}
            >
              Volume, white-label, SLA, account manager dedicato: ne parliamo direttamente con te. Nessun listino esposto.
            </p>
          </div>
          <Button variant="ink" trailingIcon="arrow-right" as="a" href="partner.html">
            Vai alla pagina partner
          </Button>
        </div>
      </section>
    </div>
  );
}

function CompareTable() {
  return (
    <div
      style={{
        border: "1px solid var(--border-1)",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr repeat(5, 1fr)",
          background: "var(--eff-paper-50)",
          borderBottom: "1px solid var(--border-1)",
        }}
      >
        <div style={{ padding: "20px 24px" }} />
        {PRICING_HEADERS.map((h, i) => (
          <div
            key={h}
            style={{
              padding: "20px 16px",
              textAlign: "center",
              background: i === FEATURED_INDEX ? "var(--eff-ink-900)" : "transparent",
              color: i === FEATURED_INDEX ? "#fff" : "var(--fg-1)",
              borderLeft: i > 0 ? "1px solid var(--border-1)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.01em",
              }}
            >
              {h}
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {PRICING_PRICES[i].price === "0" ? "0 €" : `${PRICING_PRICES[i].price} €`}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                color: i === FEATURED_INDEX ? "rgba(255,255,255,0.6)" : "var(--fg-3)",
              }}
            >
              + IVA / mese
            </div>
          </div>
        ))}
      </div>

      {/* Groups */}
      {PRICING_GROUPS.map((g) => (
        <div key={g.title}>
          <div
            style={{
              padding: "18px 24px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--fg-3)",
              background: "#fff",
              borderBottom: "1px solid var(--border-1)",
            }}
          >
            {g.title}
          </div>
          {g.rows.map(([label, values], idx) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.7fr repeat(5, 1fr)",
                borderBottom: idx === g.rows.length - 1 ? "none" : "1px solid var(--border-1)",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--fg-1)",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
              {values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px 16px",
                    textAlign: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: v === "—" ? "var(--fg-4)" : v === "•" ? "var(--eff-blue-500)" : "var(--fg-1)",
                    fontWeight: v === "•" ? 700 : v === "—" ? 400 : 500,
                    background: i === FEATURED_INDEX ? "var(--eff-paper-50)" : "transparent",
                    borderLeft: i > 0 ? "1px solid var(--border-1)" : "none",
                  }}
                >
                  {v === "•" ? "✓" : v}
                </div>
              ))}
            </div>
          ))}
          <div style={{ height: 1, background: "var(--border-1)" }} />
        </div>
      ))}
    </div>
  );
}

window.PricingFull = PricingFull;
