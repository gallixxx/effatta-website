import { defineConfig, transformWithEsbuild } from 'vite'
import { readFileSync, readdirSync, existsSync, cpSync, mkdirSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/* --------------------------------------------------------------------------
 * Perché un plugin custom invece di @vitejs/plugin-react?
 *
 * Il sito nasce con Babel standalone: ogni pagina .html carica React/ReactDOM
 * da CDN e poi una lista ordinata di componenti come <script type="text/babel">.
 * Quei componenti vivono nello SCOPE GLOBALE — non hanno import/export, si
 * referenziano tra loro per nome (NavBar, Footer, useTweaks, ...) e usano la
 * variabile globale `React`. Vincolo del task: lasciarli INVARIATI.
 *
 * Un import ESM normale isolerebbe ogni file nel suo modulo, rompendo i
 * riferimenti incrociati. La soluzione fedele è ricreare lo "scope condiviso"
 * degli <script>: per ogni pagina leggiamo dalla sua .html la lista dei
 * componenti + il bootstrap inline, li CONCATENIAMO in un unico modulo (così
 * le dichiarazioni top-level si vedono tra loro come prima), in testa
 * importiamo React/ReactDOM, e lasciamo che esbuild compili il JSX classico
 * (React.createElement). I file .jsx su disco non vengono toccati.
 *
 * I tag CDN (react/react-dom/babel da unpkg) e gli <script type="text/babel">
 * vengono rimossi dall'HTML servito/buildato e sostituiti da un singolo
 * <script type="module"> che Vite bundla e minifica.
 * ------------------------------------------------------------------------ */

const ENTRY_PREFIX = '/__effatta-entry__/'
const VIRTUAL_ID = '\0effatta-entry:'

// Mappa: chiave pagina (es. "index") -> { srcs: [...], inlines: [...] }
const pageScripts = new Map()

// CDN React/ReactDOM/Babel: vanno rimossi, li sostituiamo con npm + bundle.
const CDN_SCRIPT_RE =
  /<script\b[^>]*\bsrc=["'][^"']*unpkg\.com[^"']*["'][^>]*>\s*<\/script>\s*/gi

// Qualsiasi <script type="text/babel"> (sia con src= esterno sia inline).
const BABEL_SCRIPT_RE =
  /<script\b([^>]*\btype=["']text\/babel["'][^>]*)>([\s\S]*?)<\/script>\s*/gi

function srcAttr(attrs) {
  const m = attrs.match(/\bsrc=["']([^"']+)["']/i)
  return m ? m[1] : null
}

function classicJsxPages() {
  return {
    name: 'effatta-classic-jsx-pages',
    enforce: 'pre',

    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const key = basename(ctx.path || ctx.filename, '.html') || 'index'

        const srcs = []
        const inlines = []
        let m
        BABEL_SCRIPT_RE.lastIndex = 0
        while ((m = BABEL_SCRIPT_RE.exec(html)) !== null) {
          const src = srcAttr(m[1])
          if (src) srcs.push(src)        // componente esterno
          else inlines.push(m[2])        // bootstrap inline (App + render)
        }

        if (srcs.length === 0 && inlines.length === 0) return html
        pageScripts.set(key, { srcs, inlines })

        // Via i tag CDN e tutti i type="text/babel"; iniettiamo l'entry modulo.
        const cleaned = html
          .replace(CDN_SCRIPT_RE, '')
          .replace(BABEL_SCRIPT_RE, '')
          .replace(
            /<\/body>/i,
            `  <script type="module" src="${ENTRY_PREFIX}${key}.jsx"></script>\n</body>`
          )
        return cleaned
      },
    },

    resolveId(id) {
      if (id.startsWith(ENTRY_PREFIX)) {
        const key = basename(id, '.jsx')
        return VIRTUAL_ID + key
      }
      return null
    },

    async load(id) {
      if (!id.startsWith(VIRTUAL_ID)) return null
      const key = id.slice(VIRTUAL_ID.length)
      const entry = pageScripts.get(key)
      if (!entry) return null

      const parts = [
        "import React from 'react'",
        "import * as ReactDOM from 'react-dom/client'",
        // Insurance: qualche componente potrebbe leggere i globali su window.
        'if (typeof window !== "undefined") { window.React = React; window.ReactDOM = ReactDOM; }',
      ]

      for (const src of entry.srcs) {
        const file = resolve(root, src)
        parts.push(`/* ---- ${src} ---- */`)
        parts.push(readFileSync(file, 'utf8'))
      }
      for (const code of entry.inlines) {
        parts.push('/* ---- bootstrap inline ---- */')
        parts.push(code)
      }

      const source = parts.join('\n')

      // Compiliamo il JSX classico (React.createElement) mantenendo gli import
      // ESM: ci pensa Rollup a risolvere react / react-dom dal node_modules.
      const result = await transformWithEsbuild(source, `${key}.jsx`, {
        loader: 'jsx',
        jsx: 'transform',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      })
      return { code: result.code, map: result.map }
    },
  }
}

/* Copia verbatim le cartelle che il sito referenzia come stringhe runtime
 * (non passano dal grafo dei moduli, quindi Vite non le includerebbe):
 *   - assets/logos : <img src="assets/logos/...svg"> nei componenti
 *   - data         : fetch("data/status.json") in StatoServizioPage
 *   - bot          : codice PHP del bot Telegram, servito sullo stesso dominio
 * I path restano identici a quelli attuali.
 */
function copyVerbatim() {
  const dirs = ['assets/logos', 'data', 'bot']
  let outDir = 'dist'
  return {
    name: 'effatta-copy-verbatim',
    apply: 'build',
    configResolved(cfg) {
      outDir = cfg.build.outDir
    },
    closeBundle() {
      for (const d of dirs) {
        const from = resolve(root, d)
        if (!existsSync(from)) continue
        const to = resolve(root, outDir, d)
        mkdirSync(dirname(to), { recursive: true })
        cpSync(from, to, { recursive: true })
      }
    },
  }
}

// Input multipagina: tutte le .html nella root del progetto.
const htmlInputs = Object.fromEntries(
  readdirSync(root)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [basename(f, '.html'), resolve(root, f)])
)

export default defineConfig({
  appType: 'mpa',
  plugins: [classicJsxPages(), copyVerbatim()],
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
})
