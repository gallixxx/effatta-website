/* ApiIntroPage.jsx — pagina di ingresso alle API (api.html).
 *
 * Non è documentazione completa: è il punto di partenza. Spiega come sono
 * organizzate le API Effatta (due API distinte, una piattaforma), il
 * modello di autenticazione, gli ambienti e la gestione delle credenziali,
 * e poi smista verso le due reference complete:
 *   - api-fatturazione.html  (fatturazione elettronica)
 *   - api-scontrino.html     (scontrino / documento commerciale)
 *
 * Tutti i pulsanti "API" generici del sito puntano qui.
 */

function ApiIntroPage() {
  return (
    <div>
      <DocsHeader
        eyebrow="Sviluppatori · API"
        title="Le API di Effatta."
        lede="Due API REST per due adempimenti: la fatturazione elettronica verso lo SDI e il documento commerciale (scontrino telematico) verso l'Agenzia delle Entrate. Da qui scegli quale documentazione consultare."
        chips={["REST", "JSON", "Sandbox dedicata", "2 API distinte"]}
      />

      <ApiChoice />
      <ApiHowOrganized />
      <ApiManagement />
      <ApiCtaBand />
    </div>
  );
}

/* Le due card di scelta — il cuore della pagina */
function ApiChoice() {
  const cards = [
    {
      icon: "file-text",
      eyebrow: "Adempimento B2B / B2C / PA",
      title: "API Fatturazione Elettronica",
      blurb: "Crea, calcola e trasmetti fatture, note di credito e documenti in formato FatturaPA verso il Sistema di Interscambio. Esiti SDI, conservazione e invio di XML già pronti.",
      points: ["Login con token di sessione", "Crea documento, nota di credito, full", "Esiti SDI e ricevute", "Invio XML FatturaPA"],
      href: "api-fatturazione.html",
    },
    {
      icon: "receipt",
      eyebrow: "Corrispettivi telematici",
      title: "API Scontrino Digitale",
      blurb: "Emetti documenti commerciali e trasmetti i corrispettivi all'Agenzia delle Entrate senza registratore telematico. Resi, ristampe e download del PDF dello scontrino.",
      points: ["Login con Bearer token", "Crea e annulla documento", "Elenco documenti per data", "Download PDF dello scontrino"],
      href: "api-scontrino.html",
    },
  ];
  return (
    <section style={{ background: "#fff", padding: "72px 0 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
        }} className="api-choice-grid">
          {cards.map((c) => (
            <a key={c.href} href={c.href} style={{
              display: "flex", flexDirection: "column",
              padding: 32,
              background: "#fff",
              border: "1px solid var(--border-1)",
              borderRadius: 18,
              textDecoration: "none",
              boxShadow: "var(--shadow-sm)",
              transition: "border-color var(--t-base) var(--ease-out), box-shadow var(--t-base) var(--ease-out), transform var(--t-fast) var(--ease-out)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--eff-blue-300)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-1)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "none"; }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--eff-blue-50)", color: "var(--eff-blue-700)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <Icon name={c.icon} size={22} />
              </div>
              <div style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
                letterSpacing: "0.04em", textTransform: "uppercase",
                color: "var(--fg-3)", marginBottom: 8,
              }}>{c.eyebrow}</div>
              <h2 style={{
                margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700,
                fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)",
              }}>{c.title}</h2>
              <p style={{
                margin: "12px 0 20px", fontFamily: "var(--font-sans)",
                fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", flex: 1,
              }}>{c.blurb}</p>
              <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.points.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>
                    <span style={{ color: "var(--eff-success-500)", display: "inline-flex" }}><Icon name="check" size={15} strokeWidth={2.5} /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                color: "var(--eff-blue-700)",
              }}>Apri la documentazione <Icon name="arrow-right" size={15} /></span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .api-choice-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* Come sono organizzate le API */
function ApiHowOrganized() {
  const facts = [
    { icon: "layers", title: "Due API distinte", body: "Fatturazione e scontrino sono servizi separati, con domini, autenticazione e modelli dati propri. Si attivano in modo indipendente." },
    { icon: "key-round", title: "Login per sessione", body: "Ogni API si autentica con le credenziali dell'account e restituisce un token da usare nelle chiamate successive." },
    { icon: "code", title: "REST + JSON", body: "Richieste e risposte sono in JSON via HTTPS. Nessun SDK obbligatorio: bastano cURL o il tuo client HTTP." },
    { icon: "globe", title: "Sandbox e produzione", body: "Ogni API ha un ambiente di test separato dalla produzione, con credenziali dedicate, per provare senza effetti reali." },
  ];
  return (
    <section style={{ background: "#fff", padding: "56px 0 24px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
        <h2 style={{
          margin: "0 0 8px", fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: 28, letterSpacing: "-0.025em", color: "var(--fg-1)",
        }}>Come sono organizzate</h2>
        <p style={{
          margin: "0 0 36px", maxWidth: 640, fontFamily: "var(--font-sans)",
          fontSize: 16, lineHeight: 1.6, color: "var(--fg-2)",
        }}>Stesso approccio per entrambe le API, così quello che impari su una vale anche per l'altra.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="api-facts-grid">
          {facts.map((f) => (
            <div key={f.title} style={{ display: "flex", gap: 16 }}>
              <div style={{
                width: 40, height: 40, flex: "none", borderRadius: 10,
                background: "var(--eff-paper-50)", border: "1px solid var(--border-1)",
                color: "var(--fg-1)", display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}><Icon name={f.icon} size={20} /></div>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--fg-1)", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" }}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .api-facts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* Gestione: ambienti, autenticazione, credenziali — con id ancora per i link esistenti */
function ApiManagement() {
  return (
    <section style={{ background: "#fff", padding: "48px 0 32px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
        <div id="ambienti" style={{ scrollMarginTop: 96, marginBottom: 48 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>Ambienti</h2>
          <DocPara>
            Ogni API espone due ambienti gemelli: una <strong>sandbox</strong> per i test, dove le operazioni non producono effetti reali verso l'Agenzia delle Entrate, e la <strong>produzione</strong>, dove le fatture vengono trasmesse e gli scontrini contabilizzati. Le credenziali dei due ambienti sono separate.
          </DocPara>
          <DocCallout tone="info">
            <strong>Inizia sempre dalla sandbox.</strong> Le basi degli endpoint sono indicate all'inizio di ciascuna documentazione. Passa alla produzione solo dopo aver verificato l'intero flusso.
          </DocCallout>
        </div>

        <div id="auth" style={{ scrollMarginTop: 96, marginBottom: 48 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>Autenticazione</h2>
          <DocPara>
            Entrambe le API partono da una chiamata di <DocCode>login</DocCode> con le credenziali dell'account, che restituisce un <strong>token di sessione</strong>. Il token va incluso nelle chiamate successive — nel corpo della richiesta per la fatturazione, come header <DocCode>Authorization: Bearer</DocCode> per lo scontrino. I dettagli esatti, con esempi, sono nelle rispettive pagine.
          </DocPara>
          <DocCallout tone="warn">
            <strong>Non esporre mai le credenziali o il token lato client</strong> (browser o app mobile). Le chiamate devono partire dal tuo backend.
          </DocCallout>
        </div>

        <div id="gestione" style={{ scrollMarginTop: 96 }}>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>Credenziali e supporto</h2>
          <DocPara>
            Le credenziali API — per sandbox e produzione — vengono rilasciate al momento dell'attivazione del servizio. Se non le hai ancora o vuoi attivare l'accesso programmatico, contattaci: configuriamo l'ambiente e ti seguiamo nella prima integrazione.
          </DocPara>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Button as="a" href="contatti.html" variant="blue" trailingIcon="arrow-right">Richiedi le credenziali</Button>
            <Button as="a" href="assistenza.html" variant="secondary">Assistenza tecnica</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiCtaBand() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "56px 0", borderTop: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px", display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, color: "var(--fg-1)", letterSpacing: "-0.015em" }}>Pronto a integrare?</div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-2)", marginTop: 4 }}>Scegli la documentazione e fai la prima chiamata in sandbox.</div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button as="a" href="api-fatturazione.html" variant="ink" trailingIcon="arrow-right">Fatturazione</Button>
          <Button as="a" href="api-scontrino.html" variant="secondary" trailingIcon="arrow-right">Scontrino</Button>
        </div>
      </div>
    </section>
  );
}

window.ApiIntroPage = ApiIntroPage;
