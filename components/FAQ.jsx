/* FAQ.jsx — accordion FAQ. Two columns of categorized questions.
 *
 * Tone: short, factual, no marketing fluff. Real domain questions a
 * small SRL or commercialista actually asks before signing up.
 */

const FAQ_ITEMS = [
  {
    q: "Effatta trasmette le fatture direttamente allo SDI?",
    a: "Sì, le fatture vengono normalizzate in FatturaPA, firmate digitalmente e trasmesse al Sistema di Interscambio dell'Agenzia delle Entrate. Le ricevute (consegna, mancata consegna, scarto) tornano nella dashboard, non in PEC.",
  },
  {
    q: "Cosa succede se la fattura viene scartata?",
    a: "La dashboard ti mostra il codice errore esatto restituito dallo SDI (00200, 00305, ecc.) e il campo da correggere. Hai 5 giorni per ritrasmettere la stessa fattura senza note di credito.",
  },
  {
    q: "La conservazione a norma è davvero inclusa?",
    a: "Sì, dal piano Standard in su. 10 anni di conservazione sostitutiva firmata, conforme alle linee guida AgID. Export annuale in PDF/A scaricabile in qualsiasi momento.",
  },
  {
    q: "Posso emettere scontrini al posto del registratore telematico?",
    a: "Con il piano Scontrino emetti documenti commerciali da cassa web e da app mobile, trasmetti i corrispettivi all'Agenzia delle Entrate e gestisci la lotteria degli scontrini. Una soluzione che sostituisce il registratore telematico nel flusso di tutti i giorni.",
  },
  {
    q: "Quali linguaggi sono supportati dagli SDK?",
    a: "Node.js, Python, PHP e Go. Tutti pubblici, su GitHub, con il loro npm/pip/composer. OpenAPI 3.1 disponibile per generare client custom in altri linguaggi.",
  },
  {
    q: "Come funziona il white-label per le software house?",
    a: "Tutto sotto il tuo brand: dominio, logo, e-mail di sistema, portale cliente. Effatta resta invisibile. Ogni cliente del partner è un sotto-account isolato, con quote API e fatturazione separate.",
  },
  {
    q: "Esiste una sandbox?",
    a: "Sì, su sandbox.effatta.it. Stessa shape della produzione, dati separati, restituisce i codici di errore SDI reali per testare i casi limite (scarto, mancata consegna, codice destinatario errato).",
  },
  {
    q: "Posso pagare mensilmente o solo annualmente?",
    a: "I prezzi mostrati sono per il pagamento anticipato annuo. È disponibile anche il pagamento mensile, con un piccolo sovrapprezzo. Non ci sono permanenze: puoi disdire in qualsiasi momento.",
  },
];

function FAQ({ density = "spacious" }) {
  const pad = density === "compact" ? "72px 0" : "112px 0";
  const [open, setOpen] = React.useState(0);

  return (
    <section
      data-screen-label="FAQ"
      style={{
        background: "#fff",
        padding: pad,
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 80,
          alignItems: "flex-start",
        }}>
          <div style={{ position: "sticky", top: 96 }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
              color: "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em",
            }}>Domande frequenti</div>
            <h2 style={{
              margin: 0,
              fontFamily: "var(--font-sans)", fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.4vw, 2.5rem)",
              lineHeight: 1.08, letterSpacing: "-0.025em",
              textWrap: "balance",
            }}>
              Le cose che ci chiedono sempre.
            </h2>
            <p style={{
              margin: "20px 0 28px",
              fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55,
              color: "var(--fg-2)",
              maxWidth: 320,
            }}>
              Non hai trovato la risposta? Scrivici, ti risponde una persona vera entro 24 ore lavorative.
            </p>
            <Button variant="secondary" size="md" trailingIcon="arrow-right" as="a" href="contatti.html">
              Parla con noi
            </Button>
          </div>

          <div style={{
            border: "1px solid var(--border-1)",
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
          }}>
            {FAQ_ITEMS.map((item, i) => (
              <FAQRow
                key={i}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
                isFirst={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQRow({ item, isOpen, onToggle, isFirst }) {
  return (
    <div style={{
      borderTop: isFirst ? "none" : "1px solid var(--border-1)",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: isOpen ? "var(--eff-paper-50)" : "transparent",
          border: 0,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: "-0.015em",
          color: "var(--fg-1)",
          textAlign: "left",
          transition: "background var(--t-base) var(--ease-out)",
        }}
      >
        <span style={{ flex: 1 }}>{item.q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: 999,
          background: isOpen ? "var(--eff-ink-900)" : "var(--eff-paper-50)",
          color: isOpen ? "#fff" : "var(--fg-2)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: isOpen ? "none" : "1px solid var(--border-1)",
          transition: "all var(--t-base) var(--ease-out)",
          flex: "none",
        }}>
          <Icon name={isOpen ? "x" : "chevron-down"} size={14} strokeWidth={2.2} />
        </span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: isOpen ? 400 : 0,
        transition: "max-height var(--t-slow) var(--ease-out)",
      }}>
        <div style={{
          padding: "0 28px 28px",
          fontFamily: "var(--font-sans)",
          fontSize: 15.5,
          lineHeight: 1.6,
          color: "var(--fg-2)",
          maxWidth: 640,
        }}>{item.a}</div>
      </div>
    </div>
  );
}

window.FAQ = FAQ;
