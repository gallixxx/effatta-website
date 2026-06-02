/* ApiDocsShared.jsx — primitivi condivisi dalle pagine di documentazione API.
 *
 * Contiene lo scaffolding del layout docs (header + sidebar TOC con
 * scroll-spy + colonna contenuto) e tutti i piccoli componenti di
 * presentazione (callout, code block, tabelle parametri, tabelle codici,
 * blocchi endpoint). Tre pagine lo usano: ApiIntroPage non usa il layout
 * docs, mentre ApiFatturazionePage e ApiScontrinoPage sì.
 *
 * Stile ancorato a colors_and_type.css — stessa grammatica del resto del
 * sito: ink-cards per il codice, paper-50 per le superfici, blue-500 come
 * unico accento.
 */

/* -------- Header della pagina docs ---------- */
function DocsHeader({ eyebrow, title, lede, chips = [], back }) {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "72px 0 52px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {back && (
          <a href={back.href} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
            color: "var(--fg-3)", textDecoration: "none", marginBottom: 24,
          }}>
            <Icon name="arrow-left" size={14} /> {back.label}
          </a>
        )}
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--eff-blue-700)", marginBottom: 16, letterSpacing: "0.02em",
        }}>{eyebrow}</div>
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          lineHeight: 1.04, letterSpacing: "-0.03em",
          maxWidth: 760, textWrap: "balance",
        }}>{title}</h1>
        {lede && (
          <p style={{
            margin: "20px 0 0", maxWidth: 620,
            fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55,
            color: "var(--fg-2)",
          }}>{lede}</p>
        )}
        {chips.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
            {chips.map((c) => <DocChip key={c}>{c}</DocChip>)}
          </div>
        )}
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

/* -------- Layout docs: sidebar sticky con scroll-spy + contenuto ---------- */
function DocsLayout({ toc, sandbox, children }) {
  const [active, setActive] = React.useState(toc[0] && toc[0].id);

  React.useEffect(() => {
    const onScroll = () => {
      const sections = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
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
        display: "grid", gridTemplateColumns: "240px 1fr", gap: 64,
        alignItems: "flex-start",
      }}>
        <aside className="docs-toc" style={{ position: "sticky", top: 96, alignSelf: "flex-start" }}>
          <div style={{
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "var(--fg-3)", marginBottom: 16,
          }}>Sommario</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {toc.map((t) => {
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
          {sandbox && (
            <div style={{
              marginTop: 32, padding: "16px 16px",
              background: "var(--eff-paper-50)",
              border: "1px solid var(--border-1)",
              borderRadius: 12,
            }}>
              <div style={{
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                color: "var(--fg-1)", marginBottom: 6,
              }}>{sandbox.title || "Sandbox"}</div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 12,
                color: "var(--fg-2)", marginBottom: 12, wordBreak: "break-all",
              }}>{sandbox.url}</div>
              <a href={sandbox.href || "contatti.html"} style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
                color: "var(--eff-blue-700)", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>{sandbox.cta || "Richiedi le credenziali"} <Icon name="arrow-right" size={11} /></a>
            </div>
          )}
        </aside>

        <div style={{ minWidth: 0 }}>{children}</div>
      </div>

      <style>{`
        @media (max-width: 900px) { .docs-toc { display: none !important; } }
      `}</style>
    </section>
  );
}

/* -------- Sezione di documentazione ---------- */
function DocSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96, marginBottom: 64, paddingBottom: 48, borderBottom: "1px solid var(--border-1)" }}>
      {eyebrow && (
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12,
          color: "var(--eff-blue-700)", letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: 12,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-sans)", fontWeight: 700,
        fontSize: 28, letterSpacing: "-0.025em", lineHeight: 1.15,
        color: "var(--fg-1)", marginBottom: 20,
      }}>{title}</h2>
      {children}
    </section>
  );
}

function DocSubtitle({ children }) {
  return (
    <h3 style={{
      margin: "32px 0 14px",
      fontFamily: "var(--font-sans)", fontWeight: 700,
      fontSize: 18, letterSpacing: "-0.015em", color: "var(--fg-1)",
    }}>{children}</h3>
  );
}

function DocPara({ children, style }) {
  return (
    <p style={{
      margin: "0 0 16px",
      fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.65,
      color: "var(--fg-2)", maxWidth: 720, ...style,
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
      wordBreak: "break-word",
    }}>{children}</code>
  );
}

const docListStyle = {
  margin: "0 0 20px", padding: "0 0 0 20px",
  fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.7,
  color: "var(--fg-2)",
};

function DocList({ children }) {
  return <ul style={docListStyle}>{children}</ul>;
}

function DocCallout({ tone = "info", children }) {
  const styles = tone === "warn" ? {
    background: "var(--eff-warning-50)",
    borderColor: "var(--eff-warning-500)",
    color: "var(--eff-warning-700)",
  } : tone === "danger" ? {
    background: "var(--eff-danger-50)",
    borderColor: "var(--eff-danger-500)",
    color: "var(--eff-danger-700)",
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
      maxWidth: 720,
    }}>{children}</div>
  );
}

function CodeBlock({ title, children }) {
  return (
    <div style={{ margin: "0 0 16px" }}>
      {title && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.04em", textTransform: "uppercase",
          color: "var(--fg-3)", marginBottom: 8,
        }}>{title}</div>
      )}
      <pre style={{
        margin: 0,
        background: "var(--eff-ink-900)",
        color: "rgba(255,255,255,0.9)",
        borderRadius: 12,
        padding: "20px 24px",
        fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.65,
        overflow: "auto",
      }}>{children}</pre>
    </div>
  );
}

/* Riga endpoint: metodo + path + descrizione opzionale */
function EndpointBlock({ method, path, desc }) {
  const bg = method === "GET" ? "var(--eff-ink-700)"
    : method === "DELETE" ? "var(--eff-danger-500)"
    : "var(--eff-blue-500)";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 18px",
      background: "var(--eff-paper-50)",
      border: "1px solid var(--border-1)",
      borderRadius: 10,
      marginBottom: 10,
      flexWrap: "wrap",
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: 22, padding: "0 8px", borderRadius: 5,
        background: bg, color: "#fff",
        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
      }}>{method}</span>
      <code style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--fg-1)", fontWeight: 600, wordBreak: "break-all" }}>{path}</code>
      {desc && (
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: 13,
          color: "var(--fg-3)", flex: 1, minWidth: 180, textAlign: "right",
        }}>{desc}</span>
      )}
    </div>
  );
}

/* Tabella parametri: nome · tipo · descrizione */
function ParamTable({ rows }) {
  return (
    <div style={{ border: "1px solid var(--border-1)", borderRadius: 10, overflow: "hidden", margin: "0 0 16px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "200px 90px 1fr",
        background: "var(--eff-paper-50)", borderBottom: "1px solid var(--border-1)",
        padding: "10px 16px",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)",
      }}>
        <div>Campo</div><div>Tipo</div><div>Descrizione</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "200px 90px 1fr",
          padding: "12px 16px",
          borderBottom: i < rows.length - 1 ? "1px solid var(--border-1)" : "none",
          alignItems: "start",
        }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--eff-blue-700)", fontWeight: 600, wordBreak: "break-all" }}>{r.name}</code>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>{r.type}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-1)", lineHeight: 1.5 }}>
            {r.required && <strong style={{ color: "var(--eff-danger-700)", fontSize: 11, marginRight: 6 }}>obbl.</strong>}
            {r.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Tabella codici: codice · significato (per codifiche fiscali) */
function CodeTable({ rows, codeHeader = "Codice", descHeader = "Significato" }) {
  return (
    <div style={{ border: "1px solid var(--border-1)", borderRadius: 10, overflow: "hidden", margin: "0 0 16px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "120px 1fr",
        background: "var(--eff-paper-50)", borderBottom: "1px solid var(--border-1)",
        padding: "10px 16px",
        fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)",
      }}>
        <div>{codeHeader}</div><div>{descHeader}</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "120px 1fr",
          padding: "11px 16px",
          borderBottom: i < rows.length - 1 ? "1px solid var(--border-1)" : "none",
        }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-1)", fontWeight: 600 }}>{r[0]}</code>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)" }}>{r[1]}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  DocsHeader, DocChip, DocsLayout, DocSection, DocSubtitle,
  DocPara, DocCode, DocList, DocCallout, CodeBlock,
  EndpointBlock, ParamTable, CodeTable,
});
