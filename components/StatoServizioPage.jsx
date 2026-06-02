/* StatoServizioPage.jsx — pagina pubblica "Stato del servizio".
 *
 * Comunica ai clienti: lo stato attuale dei servizi, le manutenzioni
 * programmate (es. finestre di manutenzione dell'Agenzia delle Entrate
 * comunicate in anticipo) e la cronologia degli avvisi passati.
 *
 * I dati vengono letti da data/status.json (stesso dominio del sito), così
 * la pagina si aggiorna senza toccare il codice: è questo file che il
 * sistema di gestione (bot Telegram) modifica. Se il fetch fallisce, la
 * pagina mostra comunque il seed inline qui sotto.
 *
 * Lo stato complessivo (la fascia in alto) è DERIVATO: non va impostato a
 * mano, si calcola da stato dei servizi + eventuale manutenzione in corso.
 */

const STATUS_FALLBACK = {
  updatedAt: "2026-06-02T09:00:00+02:00",
  services: [
    { id: "fatturazione", name: "Fatturazione elettronica (SDI)", status: "operational" },
    { id: "scontrino", name: "Scontrino · Corrispettivi telematici", status: "operational" },
    { id: "api", name: "API", status: "operational" },
    { id: "pannello", name: "Pannello web e app", status: "operational" },
  ],
  scheduled: [],
  history: [],
};

/* Mappa stato servizio → presentazione */
const SVC_STATUS = {
  operational: { label: "Operativo", tone: "success" },
  maintenance: { label: "Manutenzione", tone: "info" },
  degraded:    { label: "Disservizio parziale", tone: "warning" },
  outage:      { label: "Non disponibile", tone: "danger" },
};

/* Mappa stato complessivo → fascia hero */
const OVERALL = {
  operational: { label: "Tutti i sistemi sono operativi", bg: "var(--eff-success-50)", bar: "var(--eff-success-500)", fg: "var(--eff-success-700)", icon: "check-circle" },
  maintenance: { label: "Manutenzione programmata in corso", bg: "var(--eff-blue-50)", bar: "var(--eff-blue-500)", fg: "var(--eff-blue-700)", icon: "circle-dot" },
  degraded:    { label: "Alcuni servizi presentano disservizi", bg: "var(--eff-warning-50)", bar: "var(--eff-warning-500)", fg: "var(--eff-warning-700)", icon: "circle-dot" },
  outage:      { label: "Disservizio in corso", bg: "var(--eff-danger-50)", bar: "var(--eff-danger-500)", fg: "var(--eff-danger-700)", icon: "x" },
};

const SEV = {
  maintenance: { label: "Manutenzione programmata", tone: "info" },
  incident:    { label: "Disservizio", tone: "warning" },
  outage:      { label: "Interruzione", tone: "danger" },
};

function fmtDateTime(iso) {
  try {
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(iso));
  } catch (e) { return iso; }
}

function fmtRange(startIso, endIso) {
  try {
    const s = new Date(startIso), e = new Date(endIso);
    const sameDay = s.toDateString() === e.toDateString();
    const dF = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" });
    const tF = new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit" });
    if (sameDay) return `${dF.format(s)} · ${tF.format(s)}–${tF.format(e)}`;
    return `${dF.format(s)} ${tF.format(s)} → ${dF.format(e)} ${tF.format(e)}`;
  } catch (err) { return ""; }
}

function StatoServizioPage() {
  const [data, setData] = React.useState(STATUS_FALLBACK);

  React.useEffect(() => {
    let alive = true;
    fetch("data/status.json?t=" + Date.now(), { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => { if (alive && json && Array.isArray(json.services)) setData(json); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const services = data.services || [];
  const scheduled = data.scheduled || [];
  const history = data.history || [];
  const now = new Date();

  // Manutenzione attiva = finestra che contiene "adesso"
  const activeMaint = scheduled.find((s) => new Date(s.start) <= now && now <= new Date(s.end));

  let overall = "operational";
  if (services.some((s) => s.status === "outage")) overall = "outage";
  else if (activeMaint) overall = "maintenance";
  else if (services.some((s) => s.status === "degraded" || s.status === "maintenance")) overall = "degraded";

  // Programmate = finestre non ancora concluse, ordinate per inizio
  const upcoming = scheduled
    .filter((s) => new Date(s.end) >= now)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  // Cronologia = archivio + finestre programmate già concluse, più recenti prima
  const past = [
    ...history,
    ...scheduled.filter((s) => new Date(s.end) < now).map((s) => ({ ...s, status: "resolved" })),
  ].sort((a, b) => new Date(b.start || b.date) - new Date(a.start || a.date));

  return (
    <div>
      <StatusHero overall={overall} updatedAt={data.updatedAt} activeMaint={activeMaint} />

      <section style={{ background: "#fff", padding: "56px 0 24px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
          <SectionTitle>Stato dei servizi</SectionTitle>
          <div style={{ border: "1px solid var(--border-1)", borderRadius: 14, overflow: "hidden" }}>
            {services.map((s, i) => {
              const cfg = SVC_STATUS[s.status] || SVC_STATUS.operational;
              return (
                <div key={s.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: i < services.length - 1 ? "1px solid var(--border-1)" : "none",
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--fg-1)" }}>{s.name}</span>
                  <Pill tone={cfg.tone}>{cfg.label}</Pill>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {upcoming.length > 0 && (
        <section style={{ background: "#fff", padding: "32px 0 24px" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
            <SectionTitle>Manutenzioni e avvisi programmati</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {upcoming.map((item) => <CommCard key={item.id} item={item} services={services} active={item === activeMaint} />)}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "#fff", padding: "32px 0 80px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
          <SectionTitle>Cronologia</SectionTitle>
          {past.length === 0 ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-3)" }}>Nessuna comunicazione recente.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {past.map((item) => <CommCard key={item.id} item={item} services={services} resolved />)}
            </div>
          )}
        </div>
      </section>

      <SubscribeBand />
    </div>
  );
}

function StatusHero({ overall, updatedAt, activeMaint }) {
  const o = OVERALL[overall];
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "64px 0 40px", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--fg-3)", marginBottom: 16, letterSpacing: "0.02em",
        }}>Stato del servizio</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          background: o.bg, borderLeft: `4px solid ${o.bar}`,
          borderRadius: 12, padding: "20px 24px",
        }}>
          <span style={{ color: o.bar, display: "inline-flex", flex: "none" }}><Icon name={o.icon} size={26} strokeWidth={2.2} /></span>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", color: o.fg }}>{o.label}</div>
            {updatedAt && (
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)", marginTop: 4 }}>
                Ultimo aggiornamento: {fmtDateTime(updatedAt)}
              </div>
            )}
          </div>
        </div>
        {activeMaint && (
          <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" }}>
            {activeMaint.body}
          </p>
        )}
      </div>
    </section>
  );
}

function CommCard({ item, services, active, resolved }) {
  const sev = SEV[item.severity] || SEV.maintenance;
  const names = (item.services || [])
    .map((id) => { const s = services.find((x) => x.id === id); return s ? s.name : id; });
  return (
    <article style={{
      border: "1px solid var(--border-1)", borderRadius: 14, padding: "20px 24px",
      background: active ? "var(--eff-blue-50)" : "#fff",
      borderColor: active ? "var(--eff-blue-300)" : "var(--border-1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        <Pill tone={resolved ? "neutral" : sev.tone}>{resolved ? "Risolto" : sev.label}</Pill>
        {active && <Pill tone="info">In corso</Pill>}
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)" }}>
          {item.start && item.end ? fmtRange(item.start, item.end) : fmtDateTime(item.start || item.date)}
        </span>
      </div>
      <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.015em", color: "var(--fg-1)" }}>{item.title}</h3>
      {item.body && <p style={{ margin: "0 0 12px", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)" }}>{item.body}</p>}
      {names.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: item.updates && item.updates.length ? 14 : 0 }}>
          {names.map((n) => (
            <span key={n} style={{
              fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
              color: "var(--fg-2)", background: "var(--eff-paper-100)",
              border: "1px solid var(--border-1)", borderRadius: 999, padding: "3px 10px",
            }}>{n}</span>
          ))}
        </div>
      )}
      {item.updates && item.updates.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border-1)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {item.updates.map((u, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)", flex: "none", minWidth: 124 }}>{fmtDateTime(u.at)}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.55 }}>{u.text}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      margin: "0 0 20px", fontFamily: "var(--font-sans)", fontWeight: 700,
      fontSize: 22, letterSpacing: "-0.02em", color: "var(--fg-1)",
    }}>{children}</h2>
  );
}

function SubscribeBand() {
  return (
    <section style={{ background: "var(--eff-paper-50)", padding: "48px 0", borderTop: "1px solid var(--border-1)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 32px", display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--fg-1)", letterSpacing: "-0.015em" }}>Vuoi essere avvisato in anticipo?</div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--fg-2)", marginTop: 4, maxWidth: 520 }}>
            Le manutenzioni programmate dell'Agenzia delle Entrate vengono pubblicate qui appena comunicate. Per assistenza su un disservizio in corso, contatta il supporto.
          </div>
        </div>
        <Button as="a" href="assistenza.html" variant="secondary" trailingIcon="arrow-right">Assistenza</Button>
      </div>
    </section>
  );
}

window.StatoServizioPage = StatoServizioPage;
