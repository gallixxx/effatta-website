/* atoms.jsx — shared low-level pieces used by every section.
 * Anchored on tokens from colors_and_type.css.
 */

const buttonBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  whiteSpace: "nowrap",
  borderRadius: "var(--r-pill)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  letterSpacing: "-0.005em",
  border: "1px solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  transition:
    "background var(--t-base) var(--ease-out)," +
    "color var(--t-base) var(--ease-out)," +
    "border-color var(--t-base) var(--ease-out)," +
    "transform var(--t-fast) var(--ease-out)",
  userSelect: "none",
};

const buttonSizes = {
  sm: { height: 36, padding: "0 14px", fontSize: 14 },
  md: { height: 44, padding: "0 22px", fontSize: 15 },
  lg: { height: 56, padding: "0 28px", fontSize: 17 },
};

const buttonVariants = {
  // Note: NO glowing brand shadow on the primary. Flat, confident,
  // not "AI demo". One color, one border, done.
  primary: {
    background: "var(--eff-ink-900)",
    color: "#fff",
  },
  secondary: {
    background: "#fff",
    color: "var(--fg-1)",
    borderColor: "var(--border-2)",
  },
  blue: { background: "var(--eff-blue-500)", color: "#fff" },
  ink: { background: "var(--eff-ink-900)", color: "#fff" },
  ghost: { background: "transparent", color: "var(--fg-1)" },
  link: {
    background: "transparent",
    color: "var(--eff-blue-500)",
    height: "auto",
    padding: 0,
    border: 0,
    fontWeight: 600,
  },
};

function Button({
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  children,
  as = "button",
  href,
  style,
  ...rest
}) {
  const Tag = as === "a" || href ? "a" : "button";
  const composed = {
    ...buttonBase,
    ...buttonSizes[size],
    ...buttonVariants[variant],
    ...(style || {}),
  };
  const props = Tag === "a" ? { href: href || "#", ...rest } : rest;
  return (
    <Tag style={composed} {...props}>
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
      {trailingIcon ? <Icon name={trailingIcon} size={16} /> : null}
    </Tag>
  );
}

/* -------- Eyebrow ---------- */
function Eyebrow({ children, tone = "brand", style }) {
  const color = tone === "brand" ? "var(--eff-blue-500)" : "var(--fg-3)";
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* -------- Pill (status) ---------- */
const pillTones = {
  success: { bg: "var(--eff-success-50)", fg: "var(--eff-success-700)", dot: "var(--eff-success-500)" },
  warning: { bg: "var(--eff-warning-50)", fg: "var(--eff-warning-700)", dot: "var(--eff-warning-500)" },
  danger:  { bg: "var(--eff-danger-50)",  fg: "var(--eff-danger-700)",  dot: "var(--eff-danger-500)"  },
  info:    { bg: "var(--eff-blue-50)",    fg: "var(--eff-blue-700)",    dot: "var(--eff-blue-500)"    },
  neutral: { bg: "var(--eff-ink-100)",    fg: "var(--eff-ink-700)",     dot: "var(--eff-ink-500)"     },
};
function Pill({ tone = "info", children, withDot = true }) {
  const c = pillTones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: withDot ? "3px 10px 3px 8px" : "3px 10px",
        borderRadius: "var(--r-pill)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "-0.005em",
        background: "transparent",
        border: `1px solid ${c.dot}`,
        color: c.fg,
      }}
    >
      {withDot && (
        <span style={{ width: 6, height: 6, borderRadius: 999, background: c.dot }} />
      )}
      {children}
    </span>
  );
}

/* -------- Tag ---------- */
function Tag({ children, variant = "filled" }) {
  const styles =
    variant === "filled"
      ? { background: "var(--eff-blue-50)", color: "var(--eff-blue-700)", border: "1px solid transparent" }
      : variant === "ink"
      ? { background: "var(--eff-ink-900)", color: "#fff", border: "1px solid transparent" }
      : { background: "transparent", color: "var(--fg-2)", border: "1px solid var(--border-2)" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "var(--r-pill)",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: 12,
        ...styles,
      }}
    >
      {children}
    </span>
  );
}

/* -------- Card ---------- */
const cardVariants = {
  default:  { background: "#fff", border: "1px solid var(--border-1)", color: "var(--fg-1)" },
  paper:    { background: "var(--eff-paper-50)", border: "1px solid var(--border-1)", color: "var(--fg-1)" },
  inverse:  { background: "var(--eff-ink-900)", color: "#fff" },
  brand:    { background: "var(--eff-blue-500)", color: "#fff", boxShadow: "var(--shadow-brand)" },
};
function Card({ variant = "default", padding = 28, radius = "var(--r-lg)", style, children }) {
  return (
    <div
      style={{
        borderRadius: radius,
        padding,
        ...cardVariants[variant],
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
}

/* -------- Stat ---------- */
function Stat({ value, label, tone = "ink" }) {
  const fg = tone === "brand" ? "var(--fg-on-brand)" : "var(--fg-1)";
  const sub = tone === "brand" ? "rgba(255,255,255,0.78)" : "var(--fg-3)";
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          fontSize: 48,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          color: fg,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 14,
          color: sub,
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* -------- Section (consistent vertical rhythm) ---------- */
function Section({ background = "0", children, style }) {
  const bg =
    background === "ink" ? "var(--eff-ink-900)"
    : background === "paper" ? "var(--eff-paper-50)"
    : background === "blue" ? "var(--eff-blue-500)"
    : "#fff";
  return (
    <section
      style={{
        background: bg,
        padding: "96px 0",
        ...(style || {}),
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {children}
      </div>
    </section>
  );
}

Object.assign(window, { Button, Eyebrow, Pill, Tag, Card, Stat, Section });
