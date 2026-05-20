/* StatsBand.jsx — full-width ink-on-paper band of headline numbers.
 *
 * Uses an IntersectionObserver-driven count-up the first time the band
 * enters the viewport. After that it stays at final value (no reset on
 * scroll-out — that's juvenile).
 */

const STATS = [
{ value: 100, suffix: "M+", label: "fatture gestite sulla piattaforma", sub: "Dal 2018 a oggi" },
{ value: 10, suffix: "M+", label: "scontrini emessi con Effatta", sub: "Cassa web + API" },
{ value: 10, suffix: "K+", label: "partite IVA che ci usano ogni giorno", sub: "Tra dirette e canale" },
{ value: 99.9, suffix: "%", label: "uptime trasmissione SDI", sub: "Misurato nel 2025" }];


function StatsBand({ density = "spacious" }) {
  const pad = density === "compact" ? "64px 0" : "96px 0";
  const [seen, setSeen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) setSeen(true);});
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);

  return (
    <section
      ref={ref}
      data-screen-label="Stats band"
      style={{
        background: "var(--eff-ink-900)",
        color: "#fff",
        padding: pad,
        borderBottom: "1px solid var(--eff-ink-800)"
      }}>
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 64,
          alignItems: "center"
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "rgba(255,255,255,0.55)", marginBottom: 16,
              letterSpacing: "0.02em"
            }}>I numeri</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3vw, 2.25rem)",
              lineHeight: 1.08, letterSpacing: "-0.025em",
              color: "#fff",
              textWrap: "balance"
            }}>
              Otto anni di trasmissioni allo SDI.
            </h2>
            <p style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 320
            }}>
              Effatta è online dal 2018, da molto prima che la fattura elettronica B2B diventasse obbligatoria.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 16,
            overflow: "hidden"
          }}>
            {STATS.map((s, i) =>
            <StatCell key={s.label} stat={s} seen={seen} index={i} />
            )}
          </div>
        </div>
      </div>
    </section>);

}

function StatCell({ stat, seen, index }) {
  const [n, setN] = React.useState(0);
  const isDecimal = !Number.isInteger(stat.value);
  React.useEffect(() => {
    if (!seen) return;
    const dur = 1100;
    const start = performance.now() + index * 80;
    let raf;
    const tick = (t) => {
      if (t < start) {raf = requestAnimationFrame(tick);return;}
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, stat.value, index]);

  const display = isDecimal ?
  n.toFixed(1).replace(".", ",") :
  Math.round(n).toString();

  const borderLeft = index % 2 === 1 ? "1px solid rgba(255,255,255,0.10)" : "none";
  const borderTop = index >= 2 ? "1px solid rgba(255,255,255,0.10)" : "none";

  return (
    <div style={{
      padding: "36px 36px 32px",
      borderLeft, borderTop
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 64, lineHeight: 1, letterSpacing: "-0.035em",
        color: "#fff",
        fontVariantNumeric: "tabular-nums", fontWeight: "700"
      }}>
        {display}<span style={{ fontSize: "40px", color: "rgb(255, 255, 255)", fontWeight: "900" }}>{stat.suffix}</span>
      </div>
      <div style={{
        marginTop: 16,
        fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 15,
        color: "rgba(255,255,255,0.85)",
        maxWidth: 260,
        lineHeight: 1.4
      }}>{stat.label}</div>
      <div style={{
        marginTop: 6,
        fontFamily: "var(--font-sans)", fontSize: 12,
        color: "rgba(255,255,255,0.45)"
      }}>{stat.sub}</div>
    </div>);

}

window.StatsBand = StatsBand;