/* Hero.jsx — three variants of the home hero.
 *
 *  A. Editorial split    — type-led left, single calm invoice card right
 *                          (the kit's original; the calmest, most fintech-trust)
 *  B. Typographic stage  — oversized headline on paper, wordmark E reveal,
 *                          dual stack of "fattura emessa / scontrino emesso"
 *                          tickets, no product UI. The most memorable.
 *  C. Dual track         — two CTA columns side-by-side, one merchant, one
 *                          partner, with a shared SDI flow strip across the
 *                          bottom. The most explicit "doppio binario" hero.
 */

function Hero({ variant = "A", headline, subtitle, audience, setAudience, density = "spacious" }) {
  const pad = density === "compact" ? "72px 0 64px" : "104px 0 96px";

  if (variant === "B") return <HeroB headline={headline} subtitle={subtitle} pad={pad} />;
  if (variant === "C") return <HeroC headline={headline} subtitle={subtitle} pad={pad}
  audience={audience} setAudience={setAudience} />;
  return <HeroA headline={headline} subtitle={subtitle} pad={pad} />;
}

/* ============================================================
 * HERO A — Editorial split (refined kit default)
 * ============================================================ */
function HeroA({ headline, subtitle, pad }) {
  return (
    <section
      id="top"
      data-screen-label="Hero — Variante A"
      style={{
        background: "#fff",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
        position: "relative",
        overflow: "hidden"
      }}>
      
      {/* subtle radial bloom in upper-right — the only allowed gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -180, right: -240,
          width: 720, height: 720,
          background: "radial-gradient(circle at 50% 50%, var(--eff-blue-50) 0%, transparent 60%)",
          pointerEvents: "none"
        }} />
      
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          gap: 80,
          alignItems: "center"
        }}>
        
        <div>
          <PromoRibbon />
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
              maxWidth: 620,
              textWrap: "pretty"
            }}>
            
            {headline}
          </h1>

          <p
            style={{
              margin: "24px 0 0",
              maxWidth: 520,
              fontFamily: "var(--font-sans)",
              fontSize: 19,
              lineHeight: 1.5,
              color: "var(--fg-2)",
              fontWeight: 400,
              textWrap: "pretty"
            }}>
            
            {subtitle}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button size="md" variant="blue" trailingIcon="arrow-right" as="a" href="#signup">
              Inizia gratis
            </Button>
            <Button size="md" variant="secondary" as="a" href="partner.html" trailingIcon="arrow-right">
              Diventa partner
            </Button>
          </div>

          <HeroProof />
        </div>

        <HeroInvoiceCard />
      </div>
    </section>);

}

/* ============================================================
 * HERO B — Typographic stage on paper
 * ============================================================ */
function HeroB({ headline, subtitle, pad }) {
  return (
    <section
      id="top"
      data-screen-label="Hero — Variante B"
      style={{
        background: "var(--eff-paper-50)",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
        position: "relative",
        overflow: "hidden"
      }}>
      
      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px"
        }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <span style={{
                width: 10, height: 10, borderRadius: 999,
                background: "var(--eff-success-500)",
                boxShadow: "0 0 0 4px rgba(46, 184, 113, 0.18)"
              }} />
              <span style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.02em",
                color: "var(--fg-2)"
              }}>
                SDI online · ultima trasmissione 14:31:08
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                color: "var(--fg-1)"
              }}>
              
              {headline.split(",")[0]},
              <br />
              <em style={{
                fontStyle: "italic",
                fontWeight: 600,
                color: "var(--eff-blue-500)",
                fontSize: "0.78em"
              }}>
                {(headline.split(",")[1] || "").trim() || "la facciamo facile."}
              </em>
            </h1>

            <p style={{
              margin: "32px 0 0",
              maxWidth: 540,
              fontFamily: "var(--font-sans)",
              fontSize: 19,
              lineHeight: 1.5,
              color: "var(--fg-2)",
              textWrap: "pretty"
            }}>
              {subtitle}
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
              <Button size="lg" variant="blue" trailingIcon="arrow-right" as="a" href="#signup">
                Inizia gratis
              </Button>
              <Button size="lg" variant="ink" as="a" href="partner.html" trailingIcon="arrow-right">
                Diventa partner
              </Button>
            </div>
          </div>

          {/* right column: stack of fiscal tickets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignSelf: "stretch", justifyContent: "flex-end" }}>
            <ReceiptTicket
              type="Fattura"
              code="IT001-2026-00193"
              total="€ 1.525,00"
              status="Trasmessa allo SDI"
              tone="success" />
            
            <ReceiptTicket
              type="Scontrino"
              code="RT-0421-08877"
              total="€ 12,40"
              status="Emesso"
              tone="info" />
            
            <ReceiptTicket
              type="Fattura"
              code="IT001-2026-00194"
              total="€ 320,00"
              status="In conservazione"
              tone="neutral" />
            
          </div>
        </div>

        <HeroProof style={{ marginTop: 64 }} />
      </div>
    </section>);

}

/* ============================================================
 * HERO C — Dual track
 * ============================================================ */
function HeroC({ headline, subtitle, pad, audience, setAudience }) {
  return (
    <section
      id="top"
      data-screen-label="Hero — Variante C"
      style={{
        background: "#fff",
        padding: pad,
        borderBottom: "1px solid var(--border-1)"
      }}>
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 56px" }}>
          <PromoRibbon centered />
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
              textWrap: "balance"
            }}>
            
            {headline}
          </h1>
          <p style={{
            maxWidth: 700,
            width: "700px",
            fontFamily: "var(--font-sans)",
            fontSize: 19,
            lineHeight: 1.5,
            color: "var(--fg-2)",
            textWrap: "pretty",
            margin: "24px 60px 0px"
          }}>
            {subtitle}
          </p>
        </div>

        {/* the dual-track choice card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            border: "1px solid var(--border-1)",
            borderRadius: 20,
            overflow: "hidden",
            background: "#fff"
          }}>
          
          <TrackColumn
            kind="merchant"
            active={audience === "merchant"}
            onHover={() => setAudience("merchant")}
            eyebrow="Per chi ha una partita IVA"
            title="Inizia gratis"
            blurb="Bar, ristorante, e-commerce, libero professionista. Emetti la prima fattura in 30 secondi."
            cta="Inizia gratis"
            ctaIcon="arrow-right" />
          
          <TrackColumn
            kind="partner"
            active={audience === "partner"}
            onHover={() => setAudience("partner")}
            eyebrow="Per software house e commercialisti"
            title="Diventa partner"
            blurb="API REST, white-label completo, sandbox dedicata. Una proposta su misura in 48 ore."
            cta="Vai alla versione business"
            ctaIcon="arrow-right" />
          
        </div>

        {/* shared SDI status strip */}
        <SdiStrip />
      </div>
    </section>);

}

function TrackColumn({ kind, active, onHover, eyebrow, title, blurb, cta, ctaIcon }) {
  const isMerchant = kind === "merchant";
  return (
    <div
      onMouseEnter={onHover}
      style={{
        cursor: "pointer",
        position: "relative",
        padding: "48px 48px 44px",
        background: active ?
        isMerchant ? "var(--eff-blue-50)" : "var(--eff-ink-900)" :
        isMerchant ? "#fff" : "var(--eff-paper-50)",
        color: active && !isMerchant ? "#fff" : "var(--fg-1)",
        borderLeft: isMerchant ? "none" : "1px solid var(--border-1)",
        transition: "background var(--t-base) var(--ease-out), color var(--t-base) var(--ease-out)",
        minHeight: 280,
        display: "flex",
        flexDirection: "column"
      }}>
      
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: active && !isMerchant ? "rgba(255,255,255,0.55)" :
        active && isMerchant ? "var(--eff-blue-700)" :
        "var(--fg-3)",
        marginBottom: 16
      }}>
        {eyebrow}
      </div>
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        color: "inherit"
      }}>
        {title}
      </h2>
      <p style={{
        margin: "14px 0 32px",
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: 1.55,
        color: active && !isMerchant ? "rgba(255,255,255,0.75)" : "var(--fg-2)",
        maxWidth: 360,
        flex: 1
      }}>
        {blurb}
      </p>
      <div>
        <Button
          variant={isMerchant ? "blue" : "secondary"}
          size="md"
          trailingIcon={ctaIcon}
          as="a"
          href={isMerchant ? "#signup" : "partner.html"}
          style={!isMerchant && active ? { background: "#fff", color: "var(--fg-1)" } : undefined}>
          
          {cta}
        </Button>
      </div>
    </div>);

}

/* ============================================================
 * Shared pieces
 * ============================================================ */

function PromoRibbon({ centered = false }) {
  return (
    <a
      href="fatturazione.html"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 12px 5px 8px",
        borderRadius: 999,
        background: "var(--eff-paper-50)",
        border: "1px solid var(--border-1)",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 500,
        color: "var(--fg-1)",
        textDecoration: "none",
        marginBottom: 28,
        ...(centered ? { margin: "0 auto 28px" } : {})
      }}>
      
      <span style={{
        padding: "2px 8px",
        borderRadius: 999,
        background: "var(--eff-blue-500)",
        color: "#fff",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.06em",
        textTransform: "uppercase"
      }}>Promo</span>
      Gratis il primo anno fino a 100 fatture
      <Icon name="arrow-right" size={14} style={{ color: "var(--fg-3)" }} />
    </a>);

}

function HeroProof({ style }) {
  const items = [
  { value: "100M+", label: "fatture gestite" },
  { value: "10M+", label: "scontrini emessi" },
  { value: "10.000+", label: "clienti attivi" },
  { value: "99,9%", label: "uptime SDI 2025" }];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, auto)",
      gap: 36,
      marginTop: 56,
      paddingTop: 28,
      borderTop: "1px solid var(--border-1)",
      ...style
    }}>
      {items.map((it) =>
      <div key={it.label}>
          <div style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: "var(--fg-1)",
          fontVariantNumeric: "tabular-nums"
        }}>{it.value}</div>
          <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          color: "var(--fg-3)",
          marginTop: 4,
          letterSpacing: "0.01em"
        }}>{it.label}</div>
        </div>
      )}
    </div>);

}

/* Invoice card on the right of Hero A */
function HeroInvoiceCard() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border-1)",
        borderRadius: 16,
        padding: 28,
        boxShadow: "var(--shadow-md)"
      }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-3)"
        }}>
          IT001-2026-00193
        </div>
        <Pill tone="success">Trasmesso allo SDI</Pill>
      </div>

      <div style={{
        marginTop: 14,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "-0.015em"
      }}>
        Bar Caffè dei Vicoli SRL
      </div>

      <div style={{ height: 1, background: "var(--border-1)", margin: "20px 0" }} />

      <Row label="Codice destinatario" value="X2K8R1L" mono />
      <Row label="Imponibile" value="€ 1.250,00" mono />
      <Row label="IVA 22%" value="€ 275,00" mono />

      <div style={{ height: 1, background: "var(--border-1)", margin: "16px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: 14,
          color: "var(--fg-2)"
        }}>Totale</div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 24,
          color: "var(--fg-1)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.01em"
        }}>€ 1.525,00</div>
      </div>

      {/* mini timeline */}
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-1)", display: "flex", gap: 8 }}>
        {[
        { lbl: "Emessa", t: "14:31:02", done: true },
        { lbl: "SDI", t: "14:31:07", done: true },
        { lbl: "Conservata", t: "—", done: false }].
        map((s, i) =>
        <div key={s.lbl} style={{ flex: 1 }}>
            <div style={{
            height: 3, borderRadius: 999,
            background: s.done ? "var(--eff-success-500)" : "var(--border-1)",
            marginBottom: 8
          }} />
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: s.done ? "var(--fg-1)" : "var(--fg-3)" }}>
              {s.lbl}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", marginTop: 2 }}>
              {s.t}
            </div>
          </div>
        )}
      </div>
    </div>);

}

function Row({ label, value, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
      <span style={{ color: "var(--fg-3)" }}>{label}</span>
      <span style={{
        color: "var(--fg-1)",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        fontWeight: 500,
        fontVariantNumeric: "tabular-nums"
      }}>{value}</span>
    </div>);

}

/* Receipt-ticket card for Hero B */
function ReceiptTicket({ type, code, total, status, tone }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--border-1)",
      borderRadius: 14,
      padding: "18px 22px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: 16,
      boxShadow: "var(--shadow-xs)"
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--fg-3)",
        width: 70
      }}>
        {type}
      </div>
      <div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-3)"
        }}>{code}</div>
        <div style={{ marginTop: 4 }}>
          <Pill tone={tone}>{status}</Pill>
        </div>
      </div>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--fg-1)",
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.01em"
      }}>{total}</div>
    </div>);

}

/* SDI strip for Hero C */
function SdiStrip() {
  const steps = [
  { label: "Emetti", done: true },
  { label: "Firma", done: true },
  { label: "Trasmetti allo SDI", done: true },
  { label: "Ricevi esito", done: true },
  { label: "Conserva 10 anni", done: true }];

  return (
    <div style={{
      marginTop: 36,
      padding: "20px 28px",
      border: "1px solid var(--border-1)",
      borderRadius: 14,
      background: "var(--eff-paper-50)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--fg-3)",
        marginRight: 12
      }}>
        Il flusso completo
      </div>
      {steps.map((s, i) =>
      <React.Fragment key={s.label}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999,
              background: s.done ? "var(--eff-success-500)" : "#fff",
              border: s.done ? "none" : "1.5px solid var(--border-2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "#fff"
            }}>
              {s.done && <Icon name="check" size={11} strokeWidth={3} />}
            </span>
            <span style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: 14,
            color: "var(--fg-1)"
          }}>{s.label}</span>
          </div>
          {i < steps.length - 1 &&
        <Icon name="chevron-right" size={14} style={{ color: "var(--fg-3)" }} />
        }
        </React.Fragment>
      )}
    </div>);

}

window.Hero = Hero;