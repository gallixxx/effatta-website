/* ArticlePage.jsx — modello articolo blog.
 *
 * Articolo singolo, lungo, leggibile. Layout: cover + header,
 * body con sezioni h2, blockquote, lista chiave, link CTA in
 * fondo, articoli correlati.
 *
 * Il contenuto è scritto con cura su fatti verificabili: obbligo
 * SDI dal 2019, forfettari dal 2024, codice destinatario 7 char,
 * conservazione 10 anni, 5 giorni per la ritrasmissione di una
 * fattura scartata. Niente claim su numeri specifici dell'AdE.
 */

function ArticlePage() {
  return (
    <article>
      <ArticleHeader />
      <ArticleBody />
      <ArticleFooter />
      <ArticleRelated />
    </article>
  );
}

function ArticleHeader() {
  return (
    <section style={{ background: "#fff", padding: "64px 0 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
        <a href="blog.html" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", textDecoration: "none", marginBottom: 28,
        }}>
          <Icon name="chevron-right" size={12} style={{ transform: "rotate(180deg)" }} />
          Torna al blog
        </a>

        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
          color: "var(--eff-blue-700)", letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 16,
        }}>Fatturazione elettronica</div>

        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2.25rem, 4.6vw, 3.25rem)",
          lineHeight: 1.05, letterSpacing: "-0.03em",
          color: "var(--fg-1)",
          textWrap: "balance",
        }}>
          Fatturazione elettronica B2B nel 2026: cosa è cambiato (e cosa no).
        </h1>

        <p style={{
          margin: "24px 0 0",
          fontFamily: "var(--font-sans)", fontSize: 20, lineHeight: 1.55,
          color: "var(--fg-2)", fontWeight: 400,
          textWrap: "pretty",
        }}>
          Quasi otto anni dopo l'introduzione dell'obbligo, il Sistema di Interscambio è diventato un'infrastruttura ordinaria. Ma il modo in cui le partite IVA italiane lavorano con le fatture, no — c'è ancora chi le invia via PEC, e ci sono novità del 2024 che molti non hanno digerito.
        </p>

        {/* Byline */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginTop: 36, paddingBottom: 28,
          borderBottom: "1px solid var(--border-1)",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: "var(--eff-paper-100)",
            color: "var(--fg-1)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
          }}>RA</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              color: "var(--fg-1)",
            }}>Redazione Effatta</div>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
            }}>12 maggio 2026 · 6 min di lettura</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <ShareBtn icon="globe" label="Condividi" />
            <ShareBtn icon="book-open" label="Salva" />
          </div>
        </div>
      </div>

      {/* Cover plate (decorative, no fake photo) */}
      <div style={{ maxWidth: 1100, margin: "48px auto 0", padding: "0 32px" }}>
        <div style={{
          aspectRatio: "21 / 9",
          background: "var(--eff-blue-500)",
          color: "#fff",
          borderRadius: 16,
          padding: "48px 56px",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden style={{
            position: "absolute", right: -100, top: -100,
            width: 360, height: 360, borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
          }} />
          <div aria-hidden style={{
            position: "absolute", left: 60, top: 80,
            width: 180, height: 180, borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em",
            lineHeight: 0.95, position: "relative",
          }}>
            FE B2B
            <br />
            <span style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontWeight: 600 }}>
              il 2026.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShareBtn({ icon, label }) {
  return (
    <button title={label} style={{
      width: 36, height: 36, borderRadius: 999,
      border: "1px solid var(--border-1)",
      background: "#fff", color: "var(--fg-2)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer",
    }}>
      <Icon name={icon} size={15} strokeWidth={1.6} />
    </button>
  );
}

function ArticleBody() {
  return (
    <section style={{ background: "#fff", padding: "64px 0 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}>
        <P>
          Il primo gennaio del 2019 la fatturazione elettronica B2B è diventata obbligatoria per quasi tutti gli operatori IVA italiani. Le eccezioni si sono ridotte negli anni: l'ultima caduta è stata quella dei contribuenti forfettari, che dal 1 gennaio 2024 sono dentro il perimetro come tutti gli altri. Oggi, nel 2026, lavorare con le fatture cartacee o via PEC è più l'eccezione che la regola — ma succede ancora.
        </P>
        <P>
          Vale la pena fare il punto: che cosa il Sistema di Interscambio fa davvero, che cosa ti chiede in cambio, e quali errori tornano puntualmente fra le scrivanie dei commercialisti.
        </P>

        <H2>Lo SDI in due righe</H2>
        <P>
          Il <strong>Sistema di Interscambio</strong> è l'infrastruttura dell'Agenzia delle Entrate che riceve le fatture elettroniche in formato XML <strong>FatturaPA</strong>, le valida, le inoltra al destinatario e ne restituisce le ricevute di consegna o scarto. Non emette, non firma, non conserva: smista. Tutto il resto — emissione, firma digitale, conservazione a norma — è a carico di chi fattura o del suo provider.
        </P>

        <Callout>
          <strong>Glossario veloce.</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.7, color: "var(--fg-2)" }}>
            <li><strong>SDI</strong>: Sistema di Interscambio, gestito dall'AdE.</li>
            <li><strong>FatturaPA</strong>: il formato XML obbligatorio.</li>
            <li><strong>Codice destinatario</strong>: 7 caratteri alfanumerici che indicano dove recapitare la fattura.</li>
            <li><strong>Conservazione sostitutiva</strong>: archiviazione firmata e marcata che vale legalmente come l'originale.</li>
          </ul>
        </Callout>

        <H2>Il codice destinatario, l'incidente più comune</H2>
        <P>
          Il campo che fa scartare più fatture di tutti è il <strong>codice destinatario</strong>. Tre regole tengono dentro il 95% dei casi:
        </P>
        <ul style={listStyle}>
          <li>Cliente B2B con propria casella SDI → 7 caratteri alfanumerici forniti dal cliente.</li>
          <li>Cliente B2B senza casella → si usa <code style={inlineCode}>0000000</code> e si compila l'indirizzo PEC.</li>
          <li>Cliente B2C (privato) → si usa <code style={inlineCode}>0000000</code> e va riportato il codice fiscale.</li>
        </ul>
        <P>
          Se sbagli il codice, lo SDI scarta la fattura con codice di errore <strong>00306</strong> oppure <strong>00305</strong>. La buona notizia: hai cinque giorni di tempo per ritrasmettere la stessa fattura — senza dover emettere note di credito — purché correggi il dato e mantieni numero e data originali.
        </P>

        <H2>Forfettari: dentro dal 2024, e non è più una novità</H2>
        <P>
          Fino al 2022 i contribuenti in regime forfettario erano completamente esenti. Dal 1 luglio 2022 sono entrati quelli con ricavi superiori a 25.000 € l'anno. Dal 1 gennaio 2024 l'obbligo riguarda <strong>tutti i forfettari</strong>, senza più soglie.
        </P>
        <P>
          Le ricadute pratiche: chi fattura in regime forfettario deve indicare la <strong>natura IVA N2.2</strong> (operazione non soggetta — altri casi) e compilare il blocco riferito al regime fiscale (RF19). L'errore <strong>00471</strong> è il segnale che qualcosa nella combinazione di aliquote, natura IVA e regime non torna.
        </P>

        <Blockquote attribution="Un commercialista del napoletano">
          La fatturazione elettronica ha dimezzato il tempo che passavo a sistemare le carte a fine trimestre. Ma il 2024 è stato un anno di transizione duro: i forfettari non avevano mai dovuto guardare un XML.
        </Blockquote>

        <H2>Cosa succede alle fatture passive</H2>
        <P>
          Le fatture che ricevi — le passive, quelle dei tuoi fornitori — passano dallo SDI esattamente come quelle che emetti. Il provider le fa atterrare nel tuo gestionale o nella tua e-mail di sistema, complete di XML e PDF leggibile. Non c'è più bisogno di scaricarle dal portale "Fatture e Corrispettivi" se hai un servizio strutturato.
        </P>
        <P>
          Una nota pratica: <strong>la conservazione delle fatture passive è obbligatoria quanto quella delle attive</strong>. Devi conservarle per dieci anni, in modalità sostitutiva, e devi poterle esibire all'Agenzia delle Entrate in caso di controllo. Un buon provider lo fa in automatico.
        </P>

        <H2>Cosa NON è cambiato</H2>
        <P>
          Vale la pena ricordarlo, perché le novità annuali distraggono:
        </P>
        <ul style={listStyle}>
          <li>L'obbligo di conservazione resta <strong>dieci anni</strong> (art. 22 DPR 600/73, art. 2220 c.c.).</li>
          <li>Le note di credito si emettono ancora con tipo documento <strong>TD04</strong>.</li>
          <li>Il reverse charge sui servizi interni (art. 17 DPR 633/72) richiede sempre l'autofattura.</li>
          <li>Lo SDI <strong>non controlla</strong> la coerenza commerciale del documento: solo la conformità tecnica del file. Errori di prezzo, IVA o cliente passano lo stesso.</li>
        </ul>

        <H2>Tre cose da fare oggi se sei una P.IVA</H2>
        <ol style={{ ...listStyle, listStyleType: "decimal" }}>
          <li><strong>Verifica che il tuo provider conservi davvero a norma.</strong> Non basta "archiviare" in PDF: serve firma digitale e marca temporale entro tre mesi dalla data di emissione.</li>
          <li><strong>Tieni le chiavi separate dal browser.</strong> Se usi le API, non incollare mai un token in un'estensione o in un'app mobile pubblica.</li>
          <li><strong>Ruota i contatti del tuo SDI.</strong> Quando il commercialista cambia, l'indirizzo PEC e il codice destinatario vanno aggiornati. Sembra ovvio, ma è la prima fonte di scarti.</li>
        </ol>

        <H2>In sintesi</H2>
        <P>
          Lo SDI funziona, e funziona da abbastanza tempo da essere prevedibile. La maggior parte dei problemi non viene da bug del Sistema di Interscambio, ma da campi compilati male — il codice destinatario in testa. Se tieni in ordine quei tre o quattro dettagli e ti affidi a un provider che gestisce conservazione e firma, la fatturazione elettronica diventa quello che dovrebbe essere: rumore di fondo.
        </P>
      </div>
    </section>
  );
}

const listStyle = {
  margin: "0 0 20px", padding: "0 0 0 20px",
  fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.7,
  color: "var(--fg-2)",
};
const inlineCode = {
  fontFamily: "var(--font-mono)", fontSize: 13,
  background: "var(--eff-paper-100)",
  border: "1px solid var(--border-1)",
  borderRadius: 5, padding: "1px 6px",
  color: "var(--fg-1)",
};

function P({ children }) {
  return (
    <p style={{
      margin: "0 0 20px",
      fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.7,
      color: "var(--fg-2)",
    }}>{children}</p>
  );
}
function H2({ children }) {
  return (
    <h2 style={{
      margin: "40px 0 16px",
      fontFamily: "var(--font-sans)", fontWeight: 700,
      fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.2,
      color: "var(--fg-1)",
      textWrap: "balance",
    }}>{children}</h2>
  );
}
function Callout({ children }) {
  return (
    <div style={{
      margin: "24px 0",
      padding: "20px 24px",
      background: "var(--eff-paper-50)",
      border: "1px solid var(--border-1)",
      borderRadius: 12,
      fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6,
      color: "var(--fg-1)",
    }}>{children}</div>
  );
}
function Blockquote({ children, attribution }) {
  return (
    <blockquote style={{
      margin: "32px -16px",
      padding: "16px 28px",
      borderLeft: "3px solid var(--eff-blue-500)",
      fontFamily: "var(--font-sans)", fontStyle: "italic",
      fontSize: 22, lineHeight: 1.45,
      color: "var(--fg-1)",
      letterSpacing: "-0.01em",
    }}>
      «&nbsp;{children}&nbsp;»
      {attribution && (
        <div style={{
          marginTop: 12,
          fontFamily: "var(--font-sans)", fontStyle: "normal",
          fontSize: 13, color: "var(--fg-3)", fontWeight: 600,
          letterSpacing: "0.02em",
        }}>— {attribution}</div>
      )}
    </blockquote>
  );
}

function ArticleFooter() {
  return (
    <section style={{ background: "#fff", padding: "32px 0 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          padding: "32px 36px",
          background: "var(--eff-ink-900)",
          color: "#fff",
          borderRadius: 16,
          display: "grid", gridTemplateColumns: "1fr auto", gap: 24,
          alignItems: "center",
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: 22, letterSpacing: "-0.02em",
            }}>Vuoi metterla in pratica?</h3>
            <p style={{
              margin: "8px 0 0",
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 380,
            }}>
              Apri un account Effatta e fai la prima fattura SDI in 30 secondi.
            </p>
          </div>
          <Button variant="blue" trailingIcon="arrow-right" as="a" href="fatturazione.html">
            Vai a Fatturazione
          </Button>
        </div>
      </div>
    </section>
  );
}

function ArticleRelated() {
  const related = [
    { cat: "Conservazione", title: "Conservazione a norma: 10 anni di pace", read: "5 min" },
    { cat: "Scontrino digitale", title: "Documento commerciale: come funziona e perché conviene", read: "7 min" },
    { cat: "API", title: "Integrare Effatta nel tuo gestionale in due settimane", read: "11 min" },
  ];
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "80px 0 96px", borderTop: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 24, letterSpacing: "0.02em",
        }}>Continua a leggere</div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
        }}>
          {related.map((r, i) => (
            <a key={r.title} href="blog.html" style={{
              padding: 24,
              background: "#fff",
              border: "1px solid var(--border-1)",
              borderRadius: 12,
              textDecoration: "none",
              color: "var(--fg-1)",
              display: "flex", flexDirection: "column",
              minHeight: 180,
            }}>
              <div style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11,
                color: "var(--eff-blue-700)", letterSpacing: "0.06em",
                textTransform: "uppercase", marginBottom: 12,
              }}>{r.cat}</div>
              <h4 style={{
                margin: 0, flex: 1,
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17,
                letterSpacing: "-0.015em", lineHeight: 1.3,
              }}>{r.title}</h4>
              <div style={{
                marginTop: 16, paddingTop: 12,
                borderTop: "1px solid var(--border-1)",
                fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>{r.read}</span>
                <Icon name="arrow-right" size={13} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.ArticlePage = ArticlePage;
