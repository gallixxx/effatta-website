/* ApiSample.jsx — ink-on-paper code sample. No macOS traffic-
 * light chrome. Just a request/response toggle on a clean dark
 * frame. Syntax highlight reduced to two muted colors. */
function ApiSample({ density = "spacious" }) {
  const pad = density === "compact" ? "64px 0" : "96px 0";
  const [tab, setTab] = React.useState("request");
  const code = tab === "request" ? REQ : RES;

  return (
    <section id="api" data-screen-label="API sample" style={{ background: "var(--eff-ink-900)", padding: pad, color: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 16,
              }}
            >
              Per software house e gestionali
            </div>
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                maxWidth: 460,
              }}
            >
              Una fattura in una chiamata. Uno scontrino nella successiva.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.55,
                margin: "20px 0 32px",
                maxWidth: 460,
              }}
            >
              Due API REST coordinate. Effatta normalizza in FatturaPA, firma, trasmette allo SDI e ti restituisce il numero univoco — il tuo gestionale resta in primo piano.
            </p>

            <ul style={{ listStyle: "none", margin: "0 0 36px", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["API fatturazione + API scontrino", "Sandbox dedicata, sempre attiva", "SDK Node, Python, PHP, Go"].map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <Icon name="check" size={16} strokeWidth={2} style={{ color: "rgba(255,255,255,0.4)" }} />
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 12 }}>
              <Button as="a" href="api.html" trailingIcon="arrow-right" variant="secondary">
                Documentazione
              </Button>
              <a
                href="api.html#auth"
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
                Prova in sandbox
              </a>
            </div>
          </div>

          <div
            style={{
              background: "#0A0E1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <CodeTab active={tab === "request"} onClick={() => setTab("request")}>Request</CodeTab>
              <CodeTab active={tab === "response"} onClick={() => setTab("response")}>Response</CodeTab>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                /v1/invoices
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "20px 24px",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.82)",
                overflow: "auto",
                maxHeight: 460,
                whiteSpace: "pre",
              }}
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeTab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: 0,
        background: "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.45)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 13,
        padding: "4px 8px",
        cursor: "pointer",
        borderBottom: active ? "1px solid #fff" : "1px solid transparent",
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  );
}

// Restrained two-tone highlight: dim keys, plain values.
function hl(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span style="color:rgba(255,255,255,0.5);">$1</span>$2')
    .replace(/^(POST|GET|PUT|DELETE) ([^\s]+)/m,
      '<span style="color:#fff;font-weight:700;">$1</span> $2');
}

const REQ = hl(`POST /v1/invoices
Authorization: Bearer eff_live_…
Content-Type: application/json

{
  "cliente": {
    "ragione_sociale": "Bar Caffè dei Vicoli SRL",
    "partita_iva": "IT01234567890",
    "codice_destinatario": "X2K8R1L"
  },
  "righe": [
    {
      "descrizione": "Caffetteria — maggio 2026",
      "quantita": 1,
      "prezzo_unitario": 1250.00,
      "aliquota_iva": 22
    }
  ],
  "trasmetti_subito": true
}`);

const RES = hl(`HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "inv_01HQX...",
  "numero": "IT001-2026-00193",
  "stato_sdi": "trasmesso",
  "totale": 1525.00,
  "emessa_il": "2026-05-19T14:30:11Z",
  "conservazione": {
    "stato": "in_coda",
    "scadenza": "2036-05-19"
  }
}`);

window.ApiSample = ApiSample;
