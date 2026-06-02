/* NavBar.jsx — sticky top navigation, audience-aware. */
function NavBar({ audience, setAudience, colorRegister = "light" }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isInk = colorRegister === "ink";

  // Active link is based on current pathname
  const here = React.useMemo(() => {
    if (typeof window === "undefined") return "";
    const p = window.location.pathname.split("/").pop() || "index.html";
    return p;
  }, []);

  const links = [
  { href: "fatturazione.html", label: "Fatturazione" },
  { href: "scontrino.html", label: "Scontrino" },
  { href: "pricing.html", label: "Prezzi" },
  { href: "partner.html", label: "Partner" },
  { href: "blog.html", label: "Risorse" }];


  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: isInk ?
        scrolled ? "rgba(14, 19, 32, 0.85)" : "var(--eff-ink-900)" :
        scrolled ? "rgba(255,255,255,0.92)" : "#fff",
        color: isInk ? "#fff" : "var(--fg-1)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: isInk ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-1)",
        transition: "background var(--t-base) var(--ease-out)"
      }}>
      
      <div
        style={{
          maxWidth: 1200, margin: "0 auto",
          height: 72, padding: "0 32px",
          display: "flex", alignItems: "center", gap: 32
        }}>
        
        <a href="index.html" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="assets/logos/effatta-mark-blue.svg"
            alt="effatta."
            style={{ display: "block", height: "40px", width: "40px" }} />
        </a>

        <nav className="nav-links" style={{ display: "flex", gap: 24, marginLeft: 8 }}>
          {links.map((l) => {
            const active = here === l.href || l.href === "partner.html" && (here === "commercialisti.html" || here === "associazioni.html");
            return (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  color: active ?
                  isInk ? "#fff" : "var(--fg-1)" :
                  isInk ? "rgba(255,255,255,0.75)" : "var(--fg-2)",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: 2,
                  borderBottom: active ?
                  isInk ? "1px solid #fff" : "1px solid var(--fg-1)" :
                  "1px solid transparent",
                  transition: "color var(--t-fast) var(--ease-out)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = isInk ? "#fff" : "var(--fg-1)"}
                onMouseLeave={(e) => e.currentTarget.style.color = active ?
                isInk ? "#fff" : "var(--fg-1)" :
                isInk ? "rgba(255,255,255,0.75)" : "var(--fg-2)"}>
              {l.label}
            </a>);

          })}
        </nav>

        <div style={{ flex: 1 }} />

        {/* compact audience pivot — hidden under 1100px to avoid CTA overflow */}
        <div className="nav-aud-pivot" style={{
          display: "inline-flex",
          padding: 3,
          borderRadius: 999,
          background: isInk ? "rgba(255,255,255,0.08)" : "var(--eff-paper-50)",
          border: isInk ? "1px solid rgba(255,255,255,0.10)" : "1px solid var(--border-1)",
          marginRight: 8
        }}>
          {[
          { k: "merchant", lbl: "Esercenti" },
          { k: "partner", lbl: "Partner" }].
          map((it) => {
            const on = audience === it.k;
            return (
              <button
                key={it.k}
                onClick={() => setAudience(it.k)}
                style={{
                  border: 0,
                  background: on ?
                  isInk ? "#fff" : "var(--eff-ink-900)" :
                  "transparent",
                  color: on ?
                  isInk ? "var(--fg-1)" : "#fff" :
                  isInk ? "rgba(255,255,255,0.7)" : "var(--fg-2)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 12,
                  padding: "6px 12px",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "background var(--t-fast) var(--ease-out), color var(--t-fast) var(--ease-out)"
                }}>
                
                {it.lbl}
              </button>);

          })}
        </div>

        <div className="nav-cta-cluster" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="https://fattura.effatta.it/Account/Login"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              color: isInk ? "#fff" : "var(--fg-1)", textDecoration: "none"
            }}>
            Accedi
          </a>
          <Button size="sm" variant={isInk ? "secondary" : "blue"} trailingIcon="arrow-right" as="a" href="#signup">
            Inizia gratis
          </Button>
        </div>

        <button
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 40, height: 40, borderRadius: 10, cursor: "pointer",
            alignItems: "center", justifyContent: "center", padding: 0,
            background: "transparent",
            border: isInk ? "1px solid rgba(255,255,255,0.18)" : "1px solid var(--border-1)",
            color: isInk ? "#fff" : "var(--fg-1)",
          }}>
          <Icon name={open ? "x" : "menu"} size={20} />
        </button>
      </div>

      {open && (
        <div className="nav-mobile-panel" style={{
          borderTop: isInk ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border-1)",
          background: isInk ? "var(--eff-ink-900)" : "#fff",
          padding: "8px 20px 20px",
        }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
                color: isInk ? "rgba(255,255,255,0.9)" : "var(--fg-1)",
                textDecoration: "none", padding: "13px 0",
                borderBottom: isInk ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--border-1)",
              }}>{l.label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            <a href="https://fattura.effatta.it/Account/Login" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
              color: isInk ? "#fff" : "var(--fg-1)", textDecoration: "none", padding: "4px 0",
            }}>Accedi</a>
            <Button variant={isInk ? "secondary" : "blue"} trailingIcon="arrow-right" as="a" href="#signup" style={{ width: "100%" }}>
              Inizia gratis
            </Button>
          </div>
        </div>
      )}
      <style>{`
        .nav-burger { display: none; }
        @media (max-width: 1100px) { .nav-aud-pivot { display: none !important; } }
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta-cluster { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>);

}
window.NavBar = NavBar;