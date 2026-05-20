/* BlogPage.jsx — placeholder blog index. Six fake articles
 * covering the three topic areas the team mentioned:
 * fatturazione elettronica, scontrino digitale, POS-RT. */

const ARTICLES = [
  {
    cat: "Fatturazione elettronica",
    title: "Fatturazione elettronica B2B nel 2026: cosa è cambiato (e cosa no)",
    excerpt: "Quasi otto anni dopo l'introduzione dell'obbligo, lo SDI è infrastruttura ordinaria. Ma il modo in cui si lavora con le fatture, no — e c'è il nodo forfettari dal 2024.",
    date: "12 maggio 2026",
    read: "6 min",
    href: "articolo.html",
  },
  {
    cat: "POS-RT",
    title: "POS-RT: la nuova normativa, spiegata bene",
    excerpt: "Scontrino e pagamento elettronico legati nello stesso flusso. Quando entra in vigore, chi deve adeguarsi, come Effatta gestisce il tutto.",
    date: "8 maggio 2026",
    read: "9 min",
  },
  {
    cat: "Scontrino digitale",
    title: "Documento commerciale: come funziona e perché conviene",
    excerpt: "Differenze rispetto allo scontrino classico, regole sulla lotteria, casi pratici per bar, ristoranti ed e-commerce con punto vendita.",
    date: "30 aprile 2026",
    read: "7 min",
  },
  {
    cat: "Conservazione",
    title: "Conservazione a norma: 10 anni di pace",
    excerpt: "Cosa significa davvero conservare a norma una fattura elettronica, chi è responsabile, cosa succede se non lo fai.",
    date: "22 aprile 2026",
    read: "5 min",
  },
  {
    cat: "API",
    title: "Integrare Effatta nel tuo gestionale in due settimane",
    excerpt: "Guida concreta per software house: come strutturare la migrazione, gestire i sotto-account, evitare i tre errori più comuni.",
    date: "15 aprile 2026",
    read: "11 min",
  },
  {
    cat: "Commercialisti",
    title: "Effatta white-label: come ho dato la mia firma alla fatturazione",
    excerpt: "Uno studio commerciale del napoletano racconta come ha integrato Effatta sotto il proprio brand e cosa è cambiato per i clienti.",
    date: "3 aprile 2026",
    read: "8 min",
  },
];

function BlogPage() {
  return (
    <div>
      <BlogHeader />
      <BlogGrid />
    </div>
  );
}

function BlogHeader() {
  return (
    <section style={{ background: "#fff", padding: "96px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16,
        }}>Risorse · Blog</div>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2.25rem, 4vw, 3rem)", lineHeight: 1.05,
          letterSpacing: "-0.03em", maxWidth: 760,
        }}>Guide, normativa, casi d'uso.</h1>
        <p style={{
          margin: "20px 0 0", maxWidth: 580,
          fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55,
          color: "var(--fg-2)",
        }}>Scritti dal team Effatta per esercenti, software house e commercialisti. Niente clickbait, niente AI slop: solo le cose che servono.</p>

        {/* Filter chips */}
        <div style={{ marginTop: 28, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Tutti", "Fatturazione elettronica", "Scontrino digitale", "POS-RT", "API", "Commercialisti"].map((c, i) => (
            <button key={c} style={{
              padding: "6px 14px", borderRadius: 999, border: 0, cursor: "pointer",
              background: i === 0 ? "var(--eff-ink-900)" : "var(--eff-paper-50)",
              color: i === 0 ? "#fff" : "var(--fg-1)",
              border: i === 0 ? "1px solid var(--eff-ink-900)" : "1px solid var(--border-1)",
              fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13,
            }}>{c}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section style={{ background: "#fff", padding: "32px 0 96px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {ARTICLES.map((a, i) => (
            <a
              key={a.title}
              href={a.href || "#"}
              style={{
                textDecoration: "none", color: "inherit",
                background: "#fff", border: "1px solid var(--border-1)", borderRadius: 12,
                overflow: "hidden", display: "flex", flexDirection: "column",
                transition: "border-color var(--t-base) var(--ease-out), transform var(--t-base) var(--ease-out)",
              }}
              className="blog-card"
            >
              <CoverPlate index={i} cat={a.cat} />
              <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
                  color: "var(--fg-3)", letterSpacing: "-0.005em", marginBottom: 10,
                }}>{a.cat}</div>
                <h3 style={{
                  margin: 0,
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18,
                  letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--fg-1)",
                }}>{a.title}</h3>
                <p style={{
                  margin: "10px 0 0",
                  fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5,
                  color: "var(--fg-2)", flex: 1,
                }}>{a.excerpt}</p>
                <div style={{
                  marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border-1)",
                  display: "flex", justifyContent: "space-between",
                  fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--fg-3)",
                }}>
                  <span>{a.date}</span>
                  <span>{a.read}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Editorial cover plate — a typographic placeholder. The team
 * has no real cover images yet, so each article gets a calm
 * monogram tile instead of an "AI hero image". */
function CoverPlate({ index, cat }) {
  const palettes = [
    { bg: "var(--eff-blue-500)", fg: "#fff" },
    { bg: "var(--eff-ink-900)",  fg: "#fff" },
    { bg: "var(--eff-paper-200)",fg: "var(--fg-1)" },
    { bg: "var(--eff-blue-50)",  fg: "var(--eff-blue-700)" },
    { bg: "var(--eff-ink-100)",  fg: "var(--fg-1)" },
    { bg: "var(--eff-paper-100)",fg: "var(--fg-1)" },
  ];
  const p = palettes[index % palettes.length];
  return (
    <div style={{
      aspectRatio: "16 / 9", background: p.bg, color: p.fg,
      display: "flex", alignItems: "flex-end", padding: 20,
      borderBottom: "1px solid var(--border-1)",
    }}>
      <span style={{
        fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 28,
        letterSpacing: "-0.02em", lineHeight: 1,
      }}>{cat}.</span>
    </div>
  );
}

window.BlogPage = BlogPage;

// Hover styles for blog cards
if (typeof document !== "undefined" && !document.getElementById("__blog-card-hover")) {
  const s = document.createElement("style");
  s.id = "__blog-card-hover";
  s.textContent = `.blog-card:hover { border-color: var(--border-2) !important; transform: translateY(-2px); }`;
  document.head.appendChild(s);
}