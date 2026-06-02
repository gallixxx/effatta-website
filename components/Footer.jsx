/* Footer.jsx — dense ink-900 footer with six columns. */
const FOOTER_COLS = [
{
  title: "Prodotto",
  links: [
  { label: "Fatturazione elettronica", href: "fatturazione.html" },
  { label: "Scontrino digitale", href: "scontrino.html" },
  { label: "Prezzi", href: "pricing.html" },
  { label: "App Mobile", href: "app-mobile.html" }]

},
{
  title: "Partner",
  links: [
  { label: "Software house", href: "software-house.html" },
  { label: "Commercialisti", href: "partner.html#commercialisti" },
  { label: "Associazioni", href: "partner.html#associazioni" },
  { label: "Diventa partner", href: "partner.html" }]

},
{
  title: "Sviluppatori",
  links: [
  { label: "API fatturazione", href: "api.html#invoices" },
  { label: "API scontrino", href: "api.html#receipts" },
  { label: "Sandbox", href: "api.html#auth" },
  { label: "Stato del servizio", href: "#" }]

},
{
  title: "Risorse",
  links: [
  { label: "Blog", href: "blog.html" },
  { label: "Manuale utente", href: "assistenza.html" },
  { label: "Assistenza", href: "assistenza.html" },
  { label: "Contatti", href: "contatti.html" }]

},
{
  title: "Azienda",
  links: [
  { label: "Chi siamo", href: "#" },
  { label: "Lavora con noi", href: "#" },
  { label: "Termini di servizio", href: "#" },
  { label: "Privacy e cookie", href: "#" }]

}];


function Footer() {
  return (
    <footer style={{ background: "var(--eff-ink-900)", color: "#fff", paddingTop: 80, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(5, 1fr)", gap: 32, paddingBottom: 56 }}>
          <div>
            <img
              src="assets/logos/effatta-logo-tagline-su-bianco.svg"
              alt="effatta. la facciamo facile"
              style={{ display: "block", height: "72px", width: "auto" }} />
            
            <p style={{
              margin: "8px 0 20px",
              fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 280
            }}>
              API italiane per fatturazione elettronica e scontrini digitali.
              Napoli, Italia.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 10px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 12, fontWeight: 500
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--eff-success-500)" }} />
                Collegato con AdE
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 10px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 12, fontWeight: 500
              }}>
                <Icon name="globe" size={12} />
                Italia
              </span>
            </div>
          </div>

          {FOOTER_COLS.map((c) =>
          <div key={c.title}>
              <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 11,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", marginBottom: 16
            }}>{c.title}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {c.links.map((l) =>
              <li key={l.label}>
                    <a
                  href={l.href}
                  style={{
                    textDecoration: "none", fontFamily: "var(--font-sans)",
                    fontSize: 14, color: "rgba(255,255,255,0.78)"
                  }}>
                  
                      {l.label}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16
        }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
            © 2026 Effatta S.r.l. · P.IVA IT08993761215 · Sede legale: Via G. Porzio, Isola C2 snc (Centro Direzionale) 80143 Napoli
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Termini di servizio", "Privacy", "Cookie", "DPA"].map((t) =>
            <a key={t} href="#"
            style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{t}</a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}

window.Footer = Footer;