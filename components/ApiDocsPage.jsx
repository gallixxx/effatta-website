/* ApiDocsPage.jsx — pagina documentazione API.
 *
 * Layout classico da docs: sidebar a sinistra con TOC, contenuto
 * a destra. Quickstart, autenticazione, endpoint principali,
 * errori, webhook. Esempi cURL + risposte JSON in ink-cards.
 *
 * Niente claim su SLA tecniche specifiche (latenza, uptime API)
 * che non sono stati confermati: solo i fatti del protocollo SDI
 * e della normativa, e ciò che si vede chiaramente nelle API REST.
 */

const TOC = [
  { id: "intro",        label: "Introduzione" },
  { id: "quickstart",   label: "Quickstart" },
  { id: "auth",         label: "Autenticazione" },
  { id: "invoices",     label: "API fatturazione" },
  { id: "receipts",     label: "API scontrino" },
  { id: "webhooks",     label: "Webhook" },
  { id: "errors",       label: "Errori SDI" },
  { id: "sdks",         label: "SDK ufficiali" },
];

function ApiDocsPage() {
  return (
    <div>
      <DocsHeader />
      <DocsBody />
    </div>
  );
}

function DocsHeader() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "80px 0 56px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em",
        }}>Sviluppatori · API reference</div>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          lineHeight: 1.04, letterSpacing: "-0.03em",
          maxWidth: 720,
          textWrap: "balance",
        }}>Documentazione API v1.</h1>
        <p style={{
          margin: "20px 0 0", maxWidth: 580,
          fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55,
          color: "var(--fg-2)",
        }}>
          Due API REST coordinate, una sola autenticazione. OpenAPI 3.1, SDK ufficiali in Node, Python, PHP e Go. Sandbox sempre attiva.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
          <DocChip>REST</DocChip>
          <DocChip>OpenAPI 3.1</DocChip>
          <DocChip>JSON</DocChip>
          <DocChip>Bearer auth</DocChip>
          <DocChip>HMAC-SHA256 webhooks</DocChip>
          <DocChip>Versione corrente: v1</DocChip>
        </div>
      </div>
    </section>
  );
}

function DocChip({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "5px 12px",
      background: "#fff",
      border: "1px solid var(--border-1)",
      borderRadius: 999,
      fontFamily: "var(--font-mono)", fontSize: 12,
      color: "var(--fg-1)",
    }}>{children}</span>
  );
}

function DocsBody() {
  const [active, setActive] = React.useState("intro");

  React.useEffect(() => {
    const onScroll = () => {
      const sections = TOC.map((t) => document.getElementById(t.id)).filter(Boolean);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          setActive(sections[i].id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ background: "#fff", padding: "64px 0 96px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 32px",
        display: "grid", gridTemplateColumns: "220px 1fr", gap: 64,
        alignItems: "flex-start",
      }}>
        {/* Sidebar TOC */}
        <aside style={{ position: "sticky", top: 96, alignSelf: "flex-start" }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "var(--fg-3)", marginBottom: 16,
          }}>Sommario</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {TOC.map((t) => {
              const on = active === t.id;
              return (
                <li key={t.id}>
                  <a href={`#${t.id}`} style={{
                    display: "block",
                    padding: "7px 12px",
                    borderRadius: 8,
                    background: on ? "var(--eff-paper-50)" : "transparent",
                    fontFamily: "var(--font-sans)",
                    fontWeight: on ? 600 : 500, fontSize: 13,
                    color: on ? "var(--fg-1)" : "var(--fg-2)",
                    textDecoration: "none",
                    borderLeft: on ? "2px solid var(--eff-blue-500)" : "2px solid transparent",
                    paddingLeft: 14,
                    transition: "background var(--t-fast) var(--ease-out)",
                  }}>{t.label}</a>
                </li>
              );
            })}
          </ul>
          <div style={{
            marginTop: 32, padding: "16px 16px",
            background: "var(--eff-paper-50)",
            border: "1px solid var(--border-1)",
            borderRadius: 12,
          }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
              color: "var(--fg-1)", marginBottom: 6,
            }}>Sandbox</div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 12,
              color: "var(--fg-2)", marginBottom: 12, wordBreak: "break-all",
            }}>https://sandbox.effatta.it/v1</div>
            <a href="contatti.html" style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
              color: "var(--eff-blue-700)", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 4,
            }}>Richiedi una chiave <Icon name="arrow-right" size={11} /></a>
          </div>
        </aside>

        {/* Content */}
        <div style={{ minWidth: 0 }}>
          <DocSection id="intro" eyebrow="01 · Panoramica" title="Cos'è l'API Effatta">
            <DocPara>
              Effatta espone due API REST coordinate — <DocCode>/v1/invoices</DocCode> per la fatturazione elettronica e <DocCode>/v1/receipts</DocCode> per gli scontrini — accessibili dalla stessa autenticazione Bearer. Tutte le risposte sono in formato JSON.
            </DocPara>
            <DocPara>
              Le richieste vengono normalizzate in FatturaPA, firmate e trasmesse al Sistema di Interscambio dell'Agenzia delle Entrate. La conservazione a norma per dieci anni è inclusa.
            </DocPara>
            <DocCallout tone="info">
              <strong>Ambienti.</strong> <DocCode>https://api.effatta.it/v1</DocCode> per la produzione, <DocCode>https://sandbox.effatta.it/v1</DocCode> per i test. Le due basi sono gemelle: stessi endpoint, stessi codici di errore, dati separati.
            </DocCallout>
          </DocSection>

          <DocSection id="quickstart" eyebrow="02 · Inizia" title="Quickstart">
            <DocPara>
              Tre passi minimi: prendi la chiave dal pannello, fai la prima POST, gestisci il webhook.
            </DocPara>
            <CodeBlock>
{`# 1 — Esporta la chiave
export EFFATTA_KEY=eff_test_…

# 2 — Emetti la prima fattura in sandbox
curl -X POST https://sandbox.effatta.it/v1/invoices \\
  -H "Authorization: Bearer $EFFATTA_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cliente": {
      "ragione_sociale": "Bar Caffè dei Vicoli SRL",
      "partita_iva": "IT01234567890",
      "codice_destinatario": "X2K8R1L"
    },
    "righe": [{
      "descrizione": "Caffetteria — maggio 2026",
      "quantita": 1,
      "prezzo_unitario": 1250.00,
      "aliquota_iva": 22
    }],
    "trasmetti_subito": true
  }'`}
            </CodeBlock>
          </DocSection>

          <DocSection id="auth" eyebrow="03 · Sicurezza" title="Autenticazione">
            <DocPara>
              Ogni richiesta deve portare un header <DocCode>Authorization: Bearer ...</DocCode>. Le chiavi sono di due tipi:
            </DocPara>
            <ul style={docListStyle}>
              <li><DocCode>eff_test_…</DocCode> — sandbox, non producono effetti sullo SDI.</li>
              <li><DocCode>eff_live_…</DocCode> — produzione, le fatture vengono trasmesse all'AdE.</li>
            </ul>
            <DocPara>
              Le chiavi possono essere revocate dal pannello in qualsiasi momento. Per la massima sicurezza, ruotale almeno una volta all'anno e non condividerle in repository pubblici.
            </DocPara>
            <DocCallout tone="warn">
              <strong>Mai includere la chiave nel codice client (browser / mobile).</strong> Le chiamate devono partire dal tuo backend, oppure proxytate attraverso una funzione lambda controllata.
            </DocCallout>
          </DocSection>

          <DocSection id="invoices" eyebrow="04 · Endpoint" title="API fatturazione">
            <EndpointBlock
              method="POST" path="/v1/invoices"
              desc="Crea una fattura. Se trasmetti_subito è true, parte la trasmissione allo SDI nello stesso istante."
            />
            <EndpointBlock
              method="GET" path="/v1/invoices/:id"
              desc="Stato della fattura: trasmessa, accettata, scartata, in conservazione."
            />
            <EndpointBlock
              method="POST" path="/v1/invoices/:id/note-credito"
              desc="Emette una nota di credito (TD04) collegata alla fattura."
            />
            <DocPara style={{ marginTop: 24 }}>
              Risposta tipica dopo una trasmissione riuscita:
            </DocPara>
            <CodeBlock>
{`{
  "id": "inv_01HQX…",
  "numero": "IT001-2026-00193",
  "stato_sdi": "trasmesso",
  "totale": 1525.00,
  "emessa_il": "2026-05-19T14:30:11Z",
  "conservazione": {
    "stato": "in_coda",
    "scadenza": "2036-05-19"
  }
}`}
            </CodeBlock>
          </DocSection>

          <DocSection id="receipts" eyebrow="05 · Endpoint" title="API scontrino">
            <DocPara>
              Endpoint dedicato all'emissione di documenti commerciali e alla trasmissione dei corrispettivi telematici all'Agenzia delle Entrate.
            </DocPara>
            <EndpointBlock
              method="POST" path="/v1/receipts"
              desc="Emette un documento commerciale. Calcolo IVA per aliquota incluso."
            />
            <EndpointBlock
              method="POST" path="/v1/receipts/chiusura"
              desc="Chiusura di cassa giornaliera. Restituisce il riepilogo per la dichiarazione."
            />
          </DocSection>

          <DocSection id="webhooks" eyebrow="06 · Eventi" title="Webhook firmati">
            <DocPara>
              Ogni transizione SDI (trasmessa, accettata, scartata, ricevuta, conservata) atterra come webhook firmato HMAC-SHA256. Niente polling.
            </DocPara>
            <CodeBlock>
{`POST https://tuo-dominio.it/effatta-webhook
X-Effatta-Signature: t=1716123011,v1=a8f5c1…
Content-Type: application/json

{
  "event": "invoice.accepted",
  "invoice_id": "inv_01HQX…",
  "numero": "IT001-2026-00193",
  "timestamp": "2026-05-19T14:31:08Z"
}`}
            </CodeBlock>
            <DocPara>
              Verifica la firma calcolando <DocCode>{"HMAC_SHA256(secret, t + '.' + payload)"}</DocCode> e confrontandola con il valore <DocCode>v1</DocCode>. Effatta esegue retry esponenziale fino a 24 ore se non riceve un <DocCode>2xx</DocCode> entro 5 secondi.
            </DocPara>
          </DocSection>

          <DocSection id="errors" eyebrow="07 · Errori" title="Codici di scarto SDI">
            <DocPara>
              Quando il Sistema di Interscambio scarta una fattura, l'API restituisce il codice esatto. Esempi tra i più frequenti:
            </DocPara>
            <ErrorTable>
              <ErrRow code="00200" desc="File non conforme al formato. Verifica gli elementi obbligatori." />
              <ErrRow code="00305" desc="Codice destinatario non valido. Controlla i 7 caratteri." />
              <ErrRow code="00306" desc="Codice destinatario uguale a 0000000 ma fattura B2B." />
              <ErrRow code="00400" desc="Aliquote IVA e codice IVA non coerenti." />
              <ErrRow code="00471" desc="Cedente prestatore in regime forfettario, ma compilato natura IVA." />
            </ErrorTable>
            <DocPara style={{ marginTop: 16 }}>
              L'elenco completo è gestito automaticamente: ogni risposta API ti dice se la fattura va ritrasmessa o se serve una nota di credito.
            </DocPara>
          </DocSection>

          <DocSection id="sdks" eyebrow="08 · SDK" title="SDK ufficiali">
            <DocPara>
              Tutti gli SDK sono open source, manutenuti dal team Effatta. Stessa shape, stessi metodi, traduzione idiomatica per ogni linguaggio.
            </DocPara>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16,
            }}>
              {[
                ["Node.js", "npm i effatta"],
                ["Python", "pip install effatta"],
                ["PHP",     "composer require effatta/effatta-php"],
                ["Go",      "go get go.effatta.it/effatta"],
              ].map(([lang, cmd]) => (
                <div key={lang} style={{
                  padding: 18,
                  background: "var(--eff-paper-50)",
                  border: "1px solid var(--border-1)",
                  borderRadius: 12,
                }}>
                  <div style={{
                    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
                    color: "var(--fg-1)",
                  }}>{lang}</div>
                  <div style={{
                    marginTop: 8,
                    fontFamily: "var(--font-mono)", fontSize: 12,
                    color: "var(--fg-2)", wordBreak: "break-all",
                  }}>{cmd}</div>
                </div>
              ))}
            </div>
          </DocSection>
        </div>
      </div>
    </section>
  );
}

const docListStyle = {
  margin: "0 0 20px", padding: "0 0 0 20px",
  fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.7,
  color: "var(--fg-2)",
};

function DocSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96, marginBottom: 64, paddingBottom: 48, borderBottom: "1px solid var(--border-1)" }}>
      <div style={{
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
        color: "var(--eff-blue-700)", letterSpacing: "0.06em",
        textTransform: "uppercase", marginBottom: 12,
      }}>{eyebrow}</div>
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: 28, letterSpacing: "-0.025em", lineHeight: 1.15,
        color: "var(--fg-1)",
        marginBottom: 20,
      }}>{title}</h2>
      {children}
    </section>
  );
}

function DocPara({ children, style }) {
  return (
    <p style={{
      margin: "0 0 16px",
      fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.65,
      color: "var(--fg-2)",
      maxWidth: 720,
      ...style,
    }}>{children}</p>
  );
}

function DocCode({ children }) {
  return (
    <code style={{
      fontFamily: "var(--font-mono)", fontSize: 13.5,
      background: "var(--eff-paper-100)",
      color: "var(--fg-1)",
      padding: "2px 6px",
      borderRadius: 5,
      border: "1px solid var(--border-1)",
    }}>{children}</code>
  );
}

function DocCallout({ tone = "info", children }) {
  const styles = tone === "warn" ? {
    background: "var(--eff-warning-50)",
    borderColor: "var(--eff-warning-500)",
    color: "var(--eff-warning-700)",
  } : {
    background: "var(--eff-blue-50)",
    borderColor: "var(--eff-blue-300)",
    color: "var(--fg-1)",
  };
  return (
    <div style={{
      padding: "14px 18px",
      borderLeft: `3px solid ${styles.borderColor}`,
      background: styles.background,
      color: styles.color,
      borderRadius: 6,
      margin: "20px 0",
      fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6,
    }}>{children}</div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre style={{
      margin: "0 0 16px",
      background: "var(--eff-ink-900)",
      color: "rgba(255,255,255,0.9)",
      borderRadius: 12,
      padding: "20px 24px",
      fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.65,
      overflow: "auto",
    }}>{children}</pre>
  );
}

function EndpointBlock({ method, path, desc }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 18px",
      background: "var(--eff-paper-50)",
      border: "1px solid var(--border-1)",
      borderRadius: 10,
      marginBottom: 10,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: 22, padding: "0 8px",
        borderRadius: 5,
        background: method === "POST" ? "var(--eff-blue-500)" : "var(--eff-ink-700)",
        color: "#fff",
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
      }}>{method}</span>
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--fg-1)", fontWeight: 600 }}>{path}</code>
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: 13,
        color: "var(--fg-3)", flex: 1, textAlign: "right",
      }}>{desc}</span>
    </div>
  );
}

function ErrorTable({ children }) {
  return (
    <div style={{
      border: "1px solid var(--border-1)", borderRadius: 10,
      overflow: "hidden", marginBottom: 12,
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "120px 1fr",
        background: "var(--eff-paper-50)",
        borderBottom: "1px solid var(--border-1)",
        padding: "10px 16px",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.06em", textTransform: "uppercase",
        color: "var(--fg-3)",
      }}>
        <div>Codice</div>
        <div>Significato</div>
      </div>
      {children}
    </div>
  );
}

function ErrRow({ code, desc }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "120px 1fr",
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-1)",
    }}>
      <code style={{
        fontFamily: "var(--font-mono)", fontSize: 13,
        color: "var(--eff-danger-700)", fontWeight: 600,
      }}>{code}</code>
      <div style={{
        fontFamily: "var(--font-sans)", fontSize: 14,
        color: "var(--fg-1)",
      }}>{desc}</div>
    </div>
  );
}

window.ApiDocsPage = ApiDocsPage;
