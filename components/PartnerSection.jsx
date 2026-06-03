/* PartnerSection.jsx — partner deep-dive without stats
 * (stats now live in their own StatsBand). Three archetype
 * columns + dark CTA band. */
const PARTNER_TYPES = [
  {
    tag: "Software house",
    title: "Integri Effatta nel tuo gestionale.",
    desc: "API REST per fatture e scontrini e un sotto-account isolato per ogni cliente. Dominio, logo ed e-mail di sistema restano i tuoi.",
    proof: "Pricing per volume, su misura. Il tuo brand davanti, Effatta dietro.",
    icon: "code-2",
  },
  {
    tag: "Associazione di categoria",
    title: "Un benefit concreto per i tuoi iscritti.",
    desc: "Listino convenzionato e onboarding co-brandizzato con l'ente. Lo stesso strumento per fatture e scontrini, assistenza in italiano.",
    proof: "Più valore alla quota e una rendita ricorrente per ogni iscritto attivo.",
    icon: "users",
  },
  {
    tag: "Commercialista",
    title: "Tutti i clienti dello studio, in un pannello.",
    desc: "Un sotto-account per ogni P.IVA, permessi per i collaboratori ed export compatibile coi gestionali contabili. Il portale parla col tuo dominio.",
    proof: "Tu sei il referente. Tu fissi il prezzo, sempre.",
    icon: "briefcase",
  },
];

function PartnerSection({ density = "spacious" }) {
  const pad = density === "compact" ? "72px 0" : "112px 0";
  return (
    <section
      id="partner"
      data-screen-label="Partner section"
      style={{
        background: "var(--eff-paper-50)",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em",
          }}>Canale partner</div>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-sans)", fontWeight: 700,
            fontSize: "clamp(2rem, 3.8vw, 2.75rem)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: "var(--fg-1)",
            textWrap: "balance",
          }}>
            Vendi Effatta con la tua firma.
          </h2>
          <p style={{
            margin: "20px 0 0",
            fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55,
            color: "var(--fg-2)", maxWidth: 560,
          }}>
            Tre modi di portare fatture e scontrini ai tuoi clienti — o ai tuoi iscritti — sempre con il tuo brand davanti.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          background: "#fff",
          border: "1px solid var(--border-1)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {PARTNER_TYPES.map((p, i) => (
            <div
              key={p.tag}
              style={{
                padding: "36px 32px 32px",
                borderLeft: i === 0 ? "none" : "1px solid var(--border-1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Icon name={p.icon} size={28} strokeWidth={1.4} style={{ color: "var(--fg-1)" }} />
              <div style={{
                marginTop: 24,
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
                color: "var(--fg-3)", letterSpacing: "0.06em",
                textTransform: "uppercase", marginBottom: 12,
              }}>{p.tag}</div>
              <h3 style={{
                margin: 0,
                fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}>{p.title}</h3>
              <p style={{
                margin: "12px 0 0",
                fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
                color: "var(--fg-2)",
                flex: 1,
              }}>{p.desc}</p>
              <div style={{
                marginTop: 24, paddingTop: 16,
                borderTop: "1px solid var(--border-1)",
                fontFamily: "var(--font-sans)", fontSize: 13,
                color: "var(--fg-1)", fontWeight: 500,
                fontStyle: "italic",
              }}>
                « {p.proof} »
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          background: "var(--eff-ink-900)",
          color: "#fff",
          borderRadius: 20,
          padding: "44px 48px",
          display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* subtle texture */}
          <div aria-hidden style={{
            position: "absolute", right: -80, top: -80,
            width: 360, height: 360,
            background: "radial-gradient(circle, rgba(47,128,237,0.18), transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{ flex: 1, minWidth: 320, position: "relative" }}>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: 28, letterSpacing: "-0.02em",
            }}>
              Una proposta su misura in 48 ore.
            </h3>
            <p style={{
              margin: "10px 0 0",
              color: "rgba(255,255,255,0.72)",
              fontSize: 16, lineHeight: 1.55,
              maxWidth: 540,
            }}>
              Raccontaci il tuo caso d'uso. Ti rispondiamo con un piano commerciale, una sandbox attiva e un account manager dedicato.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, position: "relative" }}>
            <Button trailingIcon="arrow-right" variant="secondary" as="a" href="contatti.html">Richiedi un contatto</Button>
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
              Vedi le API
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.PartnerSection = PartnerSection;
