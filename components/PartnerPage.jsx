/* PartnerPage.jsx — Business Enterprise page.
 *
 * Single page that introduces the three partner archetypes
 * and links into deeper-dive sections. The "API box" at the
 * bottom is the entry point for software-house technical
 * details (sandbox, API scontrino, API fatturazione). */

const PARTNER_TARGETS = [
  {
    id: "software-house",
    eyebrow: "Software house",
    title: "Integri Effatta nel tuo gestionale.",
    desc: "REST API e webhook. Mantieni il tuo brand davanti, la fatturazione e gli scontrini girano dietro. Sandbox sempre disponibile.",
    bullets: [
      "API fatturazione + API scontrino",
      "OpenAPI 3.1 e SDK ufficiali",
      "Sotto-account per ogni cliente",
      "Pricing per volume",
    ],
    cta: "Approfondisci per software house",
    href: "software-house.html",
    icon: "code-2",
  },
  {
    id: "commercialisti",
    eyebrow: "Commercialisti",
    title: "Offri Effatta ai tuoi clienti.",
    desc: "Portale white-label con il tuo logo e i tuoi colori. I clienti emettono in autonomia, tu vedi tutto e decidi tu il margine.",
    bullets: [
      "White-label con logo e colori dello studio",
      "Pannello del commercialista",
      "Esportazione massiva per la contabilità",
      "Margine commerciale a tua discrezione",
    ],
    cta: "Approfondisci per commercialisti",
    href: "commercialisti.html",
    icon: "briefcase",
  },
  {
    id: "associazioni",
    eyebrow: "Associazioni di categoria",
    title: "Una piattaforma per tutti gli iscritti.",
    desc: "Onboarding di massa, pricing convenzionato, dashboard dedicata per il consorzio. Un'unica integrazione, migliaia di partite IVA.",
    bullets: [
      "Onboarding via CSV o SSO",
      "Pricing convenzionato",
      "Dashboard consorzio",
      "Account manager dedicato",
    ],
    cta: "Approfondisci per associazioni",
    href: "associazioni.html",
    icon: "building-2",
  },
];

function PartnerPage() {
  return (
    <div>
      <PartnerHeader />
      <PartnerTargets />
      <PartnerAPI />
      <PartnerCTA />
    </div>
  );
}

function PartnerHeader() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "104px 0 96px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 24,
            }}>Business · Enterprise</div>
            <h1 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(2.5rem, 4.8vw, 3.75rem)", lineHeight: 1.02,
              letterSpacing: "-0.03em", color: "var(--fg-1)",
            }}>Vendi Effatta con la tua firma.</h1>
            <p style={{
              margin: "24px 0 0", maxWidth: 540,
              fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.5,
              color: "var(--fg-2)",
            }}>
              Software house, associazioni, commercialisti: tre modi di portare la fatturazione elettronica e gli scontrini digitali ai tuoi clienti, sempre con il tuo brand davanti.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingBottom: 8 }}>
            <SBlock value="100M+" label="fatture gestite sulla piattaforma" />
            <SBlock value="10M+"  label="scontrini emessi con Effatta" />
            <SBlock value="10.000+" label="clienti attivi" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SBlock({ value, label }) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 32,
        letterSpacing: "-0.025em", color: "var(--fg-1)",
        fontVariantNumeric: "tabular-nums", lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 8, fontFamily: "var(--font-sans)", fontSize: 13,
        color: "var(--fg-3)", lineHeight: 1.4,
      }}>{label}</div>
    </div>
  );
}

function PartnerTargets() {
  return (
    <section style={{ background: "#fff", padding: "96px 0", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", flexDirection: "column", gap: 24 }}>
        {PARTNER_TARGETS.map((t, i) => (
          <div key={t.id} id={t.id} style={{
            background: "#fff", border: "1px solid var(--border-1)", borderRadius: 16,
            padding: 40,
            display: "grid", gridTemplateColumns: "44px 1.2fr 1fr", gap: 32,
            alignItems: "start",
          }}>
            <Icon name={t.icon} size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)", marginTop: 4 }} />
            <div>
              <div style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                color: "var(--fg-3)", marginBottom: 12,
              }}>{t.eyebrow}</div>
              <h2 style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 28,
                lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--fg-1)",
              }}>{t.title}</h2>
              <p style={{
                margin: "14px 0 24px",
                fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
                color: "var(--fg-2)", maxWidth: 540,
              }}>{t.desc}</p>
              <Button variant="ink" trailingIcon="arrow-right" as="a" href={t.href}>{t.cta}</Button>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {t.bullets.map((b) => (
                <li key={b} style={{
                  display: "flex", alignItems: "center", gap: 10,
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
    </section>
  );
}

/* -------- API section (sandbox + endpoints) -------- */
function PartnerAPI() {
  return (
    <section style={{ background: "var(--eff-ink-900)", color: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "rgba(255,255,255,0.55)", marginBottom: 16,
            }}>Per software house</div>
            <h2 style={{
              margin: 0, color: "#fff",
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(2rem, 3.6vw, 2.5rem)", lineHeight: 1.1,
              letterSpacing: "-0.025em", maxWidth: 460,
            }}>Sandbox, API fatturazione e API scontrino.</h2>
            <p style={{
              color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-sans)",
              fontSize: 17, lineHeight: 1.55, margin: "20px 0 32px", maxWidth: 440,
            }}>Due API REST coordinate, una sandbox sempre disponibile, retry esponenziale sui webhook. Tutto quello che ti serve per integrare Effatta nel tuo software.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="secondary" trailingIcon="arrow-right" as="a" href="api.html">Vai alla documentazione</Button>
              <a href="contatti.html" style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
                color: "#fff", textDecoration: "none",
                display: "inline-flex", alignItems: "center", height: 44, padding: "0 8px",
                borderBottom: "1px solid rgba(255,255,255,0.4)", alignSelf: "center",
              }}>Parla con noi</a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ApiTile path="POST /v1/invoices" desc="Emette una fattura, trasmette allo SDI." />
            <ApiTile path="POST /v1/receipts" desc="Emette un documento commerciale (scontrino)." />
            <ApiTile path="GET /v1/invoices/:id" desc="Stato SDI, ricevute, conservazione." />
            <ApiTile path="POST /v1/webhooks" desc="Eventi firmati con retry esponenziale." />
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiTile({ path, desc }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12, padding: "16px 20px",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <code style={{
          fontFamily: "var(--font-mono)", fontSize: 14, color: "#fff", fontWeight: 600,
        }}>{path}</code>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{desc}</span>
      </div>
      <Icon name="arrow-up-right" size={16} style={{ color: "rgba(255,255,255,0.55)" }} />
    </div>
  );
}

function PartnerCTA() {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <h2 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)", lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}>Una proposta su misura in 48 ore.</h2>
        <p style={{
          margin: "16px auto 32px", maxWidth: 560,
          fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--fg-2)",
        }}>Raccontaci il tuo caso d'uso. Ti rispondiamo con un piano commerciale, una sandbox attiva e un account manager dedicato.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button trailingIcon="arrow-right" as="a" href="contatti.html">Richiedi un contatto</Button>
          <Button variant="secondary" as="a" href="api.html">Documentazione API</Button>
        </div>
      </div>
    </section>
  );
}

window.PartnerPage = PartnerPage;
