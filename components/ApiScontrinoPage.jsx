/* ApiScontrinoPage.jsx — documentazione completa API Scontrino Digitale.
 *
 * Fedele alla reference Effatta (API Documento Commerciale): base
 * /api/v1/ade, autenticazione Bearer ottenuta dal login, esempi cURL presi
 * dalla documentazione ufficiale. Le risposte non sono dettagliate nella
 * reference originale, quindi qui vengono descritte senza inventarne lo
 * schema esatto.
 */

const SCON_TOC = [
  { id: "intro",     label: "Introduzione" },
  { id: "ambienti",  label: "Ambienti" },
  { id: "login",     label: "Login" },
  { id: "logout",    label: "Logout" },
  { id: "crea",      label: "Crea documento" },
  { id: "annulla",   label: "Annulla / reso" },
  { id: "lista",     label: "Elenco documenti" },
  { id: "pdf",       label: "Download PDF" },
  { id: "iva",       label: "Codici IVA" },
];

function ApiScontrinoPage() {
  return (
    <div>
      <DocsHeader
        eyebrow="API · Scontrino Digitale"
        title="API Scontrino Digitale."
        lede="Emetti documenti commerciali e trasmetti i corrispettivi telematici all'Agenzia delle Entrate senza registratore di cassa. Resi, elenco documenti e PDF dello scontrino."
        chips={["REST", "JSON", "Bearer auth", "Corrispettivi telematici"]}
        back={{ href: "api.html", label: "Tutte le API" }}
      />
      <DocsLayout
        toc={SCON_TOC}
        sandbox={{ title: "Sandbox", url: "https://sandboxscontrino.effatta.it/api/v1", cta: "Richiedi le credenziali" }}
      >
        <DocSection id="intro" eyebrow="01 · Panoramica" title="Cos'è l'API Scontrino">
          <DocPara>
            L'API documento commerciale permette di emettere scontrini elettronici e trasmettere i <strong>corrispettivi telematici</strong> all'Agenzia delle Entrate, gestire resi e annullamenti, consultare i documenti emessi e scaricare il PDF dello scontrino — senza registratore telematico.
          </DocPara>
          <DocPara>
            È un'API REST: le richieste usano <DocCode>application/json</DocCode> e, dopo il login, vanno autenticate con l'header <DocCode>Authorization: Bearer &lt;token&gt;</DocCode>.
          </DocPara>
          <DocCallout tone="info">
            <strong>Base degli endpoint.</strong> Sandbox <DocCode>https://sandboxscontrino.effatta.it/api/v1</DocCode>, produzione <DocCode>https://scontrino.effatta.it/api/v1</DocCode>. Gli esempi seguenti usano la sandbox.
          </DocCallout>
        </DocSection>

        <DocSection id="ambienti" eyebrow="02 · Configurazione" title="Ambienti e convenzioni">
          <DocList>
            <li><strong>Autenticazione:</strong> header <DocCode>Authorization: Bearer &lt;token&gt;</DocCode> su tutte le chiamate dopo il login.</li>
            <li><strong>Importi:</strong> numeri decimali con punto (es. <DocCode>0.01</DocCode>).</li>
            <li><strong>Formato date</strong> (filtri elenco): <DocCode>MM/GG/AA</DocCode> — es. 1 marzo 2026 → <DocCode>03/01/26</DocCode>.</li>
            <li><strong>IVA per riga:</strong> campo <DocCode>vat</DocCode> con il codice aliquota (vedi <DocCode>Codici IVA</DocCode>).</li>
          </DocList>
        </DocSection>

        <DocSection id="login" eyebrow="03 · Autenticazione" title="Login">
          <EndpointBlock method="POST" path="/api/v1/ade/login" />
          <DocPara>
            Esegue il login all'interfaccia degli scontrini e restituisce il token da usare come Bearer nelle chiamate successive.
          </DocPara>
          <ParamTable rows={[
            { name: "fiscalCode", type: "string", required: true, desc: "Codice fiscale dell'utente." },
            { name: "password", type: "string", required: true, desc: "Password dell'account." },
            { name: "pin", type: "string", required: true, desc: "PIN dell'utente." },
            { name: "vat", type: "string", required: true, desc: "Partita IVA." },
          ]} />
          <CodeBlock title="cURL">
{`curl --location --request POST 'https://sandboxscontrino.effatta.it/api/v1/ade/login' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{
    "fiscalCode": "<CODICE FISCALE>",
    "password": "<PASSWORD>",
    "pin": "<PIN>",
    "vat": "<PARTITA IVA>"
  }'`}
          </CodeBlock>
          <DocPara>La risposta contiene il <DocCode>token</DocCode> di sessione da riutilizzare come <DocCode>Bearer</DocCode>.</DocPara>
        </DocSection>

        <DocSection id="logout" eyebrow="04 · Autenticazione" title="Logout">
          <EndpointBlock method="GET" path="/api/v1/ade/logout" />
          <DocPara>Termina la sessione e revoca il token corrente.</DocPara>
          <CodeBlock title="cURL">
{`curl --location --request GET 'https://sandboxscontrino.effatta.it/api/v1/ade/logout' \\
  --header 'Authorization: Bearer {{token}}'`}
          </CodeBlock>
        </DocSection>

        <DocSection id="crea" eyebrow="05 · Emissione" title="Crea documento commerciale">
          <EndpointBlock method="POST" path="/api/v1/ade/docs" />
          <DocPara>
            Emette uno scontrino con le righe vendute e il pagamento. Il calcolo dell'IVA per aliquota è incluso. Indicando <DocCode>lotteryCode</DocCode> si associa il codice lotteria degli scontrini.
          </DocPara>
          <ParamTable rows={[
            { name: "lotteryCode", type: "string", desc: "Codice lotteria del cliente (facoltativo)." },
            { name: "items", type: "array", required: true, desc: "Righe: qty (quantità), amount (importo), description, vat (codice IVA)." },
            { name: "payment", type: "object", required: true, desc: "Pagamento, es. { \"cash\": 0.01 }." },
          ]} />
          <CodeBlock title="cURL">
{`curl --location --request POST 'https://sandboxscontrino.effatta.it/api/v1/ade/docs' \\
  --header 'Authorization: Bearer {{token}}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{
    "lotteryCode": "",
    "items": [
      { "qty": 1, "amount": 0.01, "description": "test", "vat": "4" }
    ],
    "payment": { "cash": 0.01 }
  }'`}
          </CodeBlock>
          <DocPara>
            La risposta restituisce l'esito dell'emissione e l'identificativo del documento, da usare per l'annullamento o per scaricare il PDF.
          </DocPara>
        </DocSection>

        <DocSection id="annulla" eyebrow="06 · Resi" title="Annulla documento / reso">
          <EndpointBlock method="POST" path="/api/v1/ade/docs/{documentId}" />
          <DocPara>
            Esegue il reso o l'annullamento di un documento esistente. Il campo <DocCode>type</DocCode> indica l'operazione (<DocCode>refund</DocCode>) e <DocCode>items</DocCode> elenca gli indici delle righe da stornare.
          </DocPara>
          <ParamTable rows={[
            { name: "documentId", type: "path", required: true, desc: "Identificativo del documento da annullare." },
            { name: "type", type: "string", required: true, desc: "Tipo di operazione, es. \"refund\"." },
            { name: "items", type: "array", required: true, desc: "Indici delle righe interessate, es. [ 1 ]." },
          ]} />
          <CodeBlock title="cURL">
{`curl --location -g --request POST 'https://sandboxscontrino.effatta.it/api/v1/ade/docs/{{documentId}}' \\
  --header 'Authorization: Bearer {{token}}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{
    "type": "refund",
    "items": [ 1 ]
  }'`}
          </CodeBlock>
        </DocSection>

        <DocSection id="lista" eyebrow="07 · Documenti" title="Elenco documenti">
          <EndpointBlock method="GET" path="/api/v1/ade/docs" />
          <DocPara>
            Restituisce l'elenco dei documenti. Si può paginare con <DocCode>offset</DocCode> oppure filtrare per intervallo di date con <DocCode>startDate</DocCode> / <DocCode>endDate</DocCode> e numero di risultati con <DocCode>pagination</DocCode>.
          </DocPara>
          <CodeBlock title="Paginazione semplice">
{`curl --location --request GET 'https://sandboxscontrino.effatta.it/api/v1/ade/docs?offset=1' \\
  --header 'Authorization: Bearer {{token}}'`}
          </CodeBlock>
          <CodeBlock title="Filtro per data (MM/GG/AA)">
{`curl --location --request GET \\
  'https://scontrino.effatta.it/api/v1/ade/docs?startDate=03/01/26&endDate=03/08/26&pagination=100' \\
  --header 'Authorization: Bearer {{token}}'`}
          </CodeBlock>
        </DocSection>

        <DocSection id="pdf" eyebrow="08 · Documenti" title="Download PDF">
          <EndpointBlock method="GET" path="/api/v1/ade/pdf/{pdfId}" />
          <DocPara>Scarica il PDF di uno scontrino specifico, identificato dal suo <DocCode>pdfId</DocCode>.</DocPara>
          <CodeBlock title="cURL">
{`curl --location --request GET 'https://sandboxscontrino.effatta.it/api/v1/ade/pdf/<pdfId>' \\
  --header 'Authorization: Bearer <token>'`}
          </CodeBlock>
        </DocSection>

        <DocSection id="iva" eyebrow="09 · Riferimento" title="Codici IVA">
          <DocPara>Valori ammessi per il campo <DocCode>vat</DocCode> delle righe.</DocPara>
          <CodeTable codeHeader="Valore" descHeader="Descrizione" rows={[
            ["2", "2% — perc. compensazione agricoltura"],
            ["4", "4%"],
            ["5", "5%"],
            ["6", "6% — perc. compensazione agricoltura"],
            ["7.3", "7,3% — perc. compensazione agricoltura"],
            ["7.5", "7,5% — perc. compensazione agricoltura"],
            ["7.65", "7,65% — perc. compensazione agricoltura"],
            ["7.95", "7,95% — perc. compensazione agricoltura"],
            ["8.3", "8,3% — perc. compensazione agricoltura"],
            ["8.5", "8,5% — perc. compensazione agricoltura"],
            ["8.8", "8,8% — perc. compensazione agricoltura"],
            ["10", "10%"],
            ["12.3", "12,3% — perc. compensazione agricoltura"],
            ["22", "22%"],
          ]} />
          <DocSubtitle>Operazioni con IVA a 0</DocSubtitle>
          <DocPara>Per le operazioni con IVA pari a 0 usare una delle seguenti codifiche nel campo <DocCode>vat</DocCode>.</DocPara>
          <CodeTable codeHeader="Codice" descHeader="Natura" rows={[
            ["N1", "Escluse ex art. 15"],
            ["N2", "Non soggette"],
            ["N3", "Non imponibili"],
            ["N4", "Esenti"],
            ["N5", "Regime del margine"],
            ["N6", "Altro non IVA"],
          ]} />
        </DocSection>
      </DocsLayout>
    </div>
  );
}

window.ApiScontrinoPage = ApiScontrinoPage;
