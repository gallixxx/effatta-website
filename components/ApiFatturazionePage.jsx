/* ApiFatturazionePage.jsx — documentazione completa API Fatturazione Elettronica.
 *
 * Fedele alla reference Effatta (Interfaccia API REST): endpoint su
 * RestAPI.asmx, autenticazione con token + idMittente nel corpo della
 * richiesta, risposte avvolte nell'oggetto "d". Esempi presi dalla
 * documentazione ufficiale.
 */

const FATT_TOC = [
  { id: "intro",        label: "Introduzione" },
  { id: "ambienti",     label: "Ambienti" },
  { id: "login",        label: "Login" },
  { id: "anagrafica",   label: "Dati utente" },
  { id: "lista",        label: "Lista fatture" },
  { id: "crea",         label: "Crea fattura" },
  { id: "calcola",      label: "Calcola totale" },
  { id: "esiti",        label: "Esiti e ricevute" },
  { id: "note-credito", label: "Note di credito" },
  { id: "full",         label: "Documento full" },
  { id: "xml",          label: "Invio XML" },
  { id: "codifiche",    label: "Codifiche" },
];

function ApiFatturazionePage() {
  return (
    <div>
      <DocsHeader
        eyebrow="API · Fatturazione Elettronica"
        title="API Fatturazione Elettronica."
        lede="Crea, calcola, trasmetti e conserva fatture elettroniche in formato FatturaPA verso il Sistema di Interscambio. Endpoint REST, risposte JSON."
        chips={["REST", "JSON", "FatturaPA", "Token di sessione"]}
        back={{ href: "api.html", label: "Tutte le API" }}
      />
      <DocsLayout
        toc={FATT_TOC}
        sandbox={{ title: "Endpoint", url: "https://<dominio>/webservice/RestAPI.asmx", cta: "Richiedi le credenziali" }}
      >
        <DocSection id="intro" eyebrow="01 · Panoramica" title="Cos'è l'API Fatturazione">
          <DocPara>
            L'API di fatturazione elettronica permette di creare documenti (fatture, note di credito, parcelle) in formato <strong>FatturaPA</strong>, calcolarne i totali con imposte e ritenute, trasmetterli al <strong>Sistema di Interscambio</strong> dell'Agenzia delle Entrate e seguirne gli esiti fino alla conservazione a norma.
          </DocPara>
          <DocPara>
            Tutti gli endpoint usano il metodo <DocCode>POST</DocCode>, accettano e restituiscono <DocCode>application/json</DocCode>. Per convenzione della piattaforma, il payload di risposta è contenuto nell'oggetto <DocCode>d</DocCode>.
          </DocPara>
          <DocCallout tone="info">
            <strong>Base degli endpoint.</strong> <DocCode>https://&lt;dominio&gt;/webservice/RestAPI.asmx/&lt;metodo&gt;</DocCode> — <DocCode>&lt;dominio&gt;</DocCode> è il dominio assegnato al tuo account in fase di attivazione (sandbox e produzione hanno domini distinti).
          </DocCallout>
        </DocSection>

        <DocSection id="ambienti" eyebrow="02 · Configurazione" title="Ambienti e convenzioni">
          <DocList>
            <li><strong>Formato date:</strong> <DocCode>GG/MM/AAAA</DocCode> nelle richieste (es. <DocCode>01/03/2024</DocCode>).</li>
            <li><strong>Importi:</strong> stringhe o numeri decimali con punto come separatore (es. <DocCode>"50.00"</DocCode>).</li>
            <li><strong>Risposte:</strong> sempre avvolte in <DocCode>{`{ "d": { ... } }`}</DocCode>.</li>
            <li><strong>Esito operazione:</strong> <DocCode>errCode</DocCode> = <DocCode>"0"</DocCode> indica successo; <DocCode>errMsg</DocCode> contiene l'eventuale messaggio di errore.</li>
          </DocList>
        </DocSection>

        <DocSection id="login" eyebrow="03 · Autenticazione" title="Login">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/login" />
          <DocPara>
            Autentica l'utente e restituisce il <DocCode>token</DocCode> di sessione e lo <DocCode>userId</DocCode> da usare come <DocCode>idMittente</DocCode> nelle chiamate successive.
          </DocPara>
          <ParamTable rows={[
            { name: "username", type: "string", required: true, desc: "Email dell'account." },
            { name: "password", type: "string", required: true, desc: "Password dell'account." },
            { name: "source", type: "string", desc: "Identificativo dell'applicazione chiamante." },
          ]} />
          <CodeBlock title="Richiesta">
{`POST /webservice/RestAPI.asmx/login

{
  "username": "usertest@test.com",
  "password": "test123",
  "source": "App_name"
}`}
          </CodeBlock>
          <CodeBlock title="Risposta">
{`{
  "d": {
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "userId": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    "email": "usertest@test.com",
    "appTemplate": "ESERCENTE",
    "qrCode": {
      "anag": { "naz": "IT", "cf": "...", "piva": "...", "denom": "USER TEST", "domFisc": { "prov": "NA", "cap": "80121", "com": "NAPOLI", "ind": "via roma", "naz": "IT" } },
      "SDI": { "cod": "0000000", "pec": "usertest@pec.it" }
    }
  }
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="anagrafica" eyebrow="04 · Anagrafica" title="Dati intestazione utente">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/getUserData" />
          <DocPara>Restituisce i dati anagrafici dell'utente (denominazione, partita IVA, indirizzo).</DocPara>
          <ParamTable rows={[
            { name: "token", type: "string", required: true, desc: "Token di sessione ottenuto dal login." },
            { name: "idMittente", type: "string", required: true, desc: "Identificativo del mittente (userId)." },
            { name: "dataUserId", type: "string", desc: "Identificativo dei dati utente." },
          ]} />
          <CodeBlock title="Risposta">
{`{
  "d": "[{
    \\"Denominazione\\": \\"MARIO ROSSI\\",
    \\"PartitaIVA\\": \\"12345678901\\",
    \\"Indirizzo\\": \\"via col Vento, 36 - NAPOLI (NA) - 80133\\"
  }]"
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="lista" eyebrow="05 · Documenti" title="Lista fatture di un utente">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/getUserDocuments" />
          <DocPara>Elenca i documenti dell'utente con tipo, stato corrente, numero, data e importo totale.</DocPara>
          <ParamTable rows={[
            { name: "token", type: "string", required: true, desc: "Token di sessione." },
            { name: "idMittente", type: "string", required: true, desc: "Identificativo del mittente." },
            { name: "dataUserId", type: "string", desc: "Identificativo dei dati utente." },
          ]} />
          <CodeBlock title="Risposta (estratto)">
{`{
  "d": "[{
    \\"Tipo\\": \\"I\\",
    \\"IdFattura\\": \\"105\\",
    \\"CurrentState\\": \\"10\\",
    \\"StatoDocumento\\": \\"Invio in corso...\\",
    \\"Denominazione\\": \\"Università Suor Orsola Benincasa\\",
    \\"fgen_TipoDocumento\\": \\"TD01\\",
    \\"fgen_DataDocumento\\": \\"2015-12-30\\",
    \\"fgen_Numero\\": \\"1\\",
    \\"fgen_ImportoTotaleDocumento\\": \\"1.07\\",
    \\"fgen_Causale\\": \\"\\"
  }]"
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="crea" eyebrow="06 · Emissione" title="Crea fattura">
          <DocPara>
            Due varianti a seconda del livello di dettaglio. <DocCode>creaDocumento</DocCode> per il caso esercente/professionista (destinatario + righe). <DocCode>creaDocumentoV2</DocCode> per il controllo completo di dati generali, pagamenti e anagrafica via QR code.
          </DocPara>

          <DocSubtitle>Esercente / professionista</DocSubtitle>
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/creaDocumento" />
          <ParamTable rows={[
            { name: "token", type: "string", required: true, desc: "Token di sessione." },
            { name: "idMittente", type: "string", required: true, desc: "Identificativo del mittente." },
            { name: "idDestinatario", type: "string", required: true, desc: "Email del privato o codice univoco della PA." },
            { name: "isPrivato", type: "string", desc: "\"1\" se il destinatario è un privato." },
            { name: "modalitaPagamento", type: "string", desc: "Codice modalità di pagamento (es. MP01)." },
            { name: "causale", type: "string", desc: "Causale del documento." },
            { name: "list", type: "array", required: true, desc: "Righe: numeroLinea, descrizione, quantita, prezzoUnitario, prezzoTotale, aliquotaIVA." },
            { name: "qrCode", type: "object", desc: "Dati anagrafici e SDI del mittente." },
          ]} />
          <CodeBlock title="Richiesta (estratto)">
{`POST /webservice/RestAPI.asmx/creaDocumento

{
  "token": "xxxxx",
  "idMittente": "yyyyy",
  "idDestinatario": "g.perillo@effatta.it",
  "isPrivato": "1",
  "modalitaPagamento": "MP01",
  "causale": "test fattura",
  "list": [{
    "numeroLinea": "1",
    "descrizione": "descrizione 1",
    "quantita": "1",
    "prezzoUnitario": "10.00",
    "prezzoTotale": "10.00",
    "aliquotaIVA": "22.00"
  }],
  "qrCode": {
    "anag": { "naz": "IT", "cf": "...", "piva": "05058331215", "denom": "EFFATTA",
              "domFisc": { "prov": "CE", "cap": "81054", "com": "SAN PRISCO", "ind": "VIA AGOSTINO STELLATO 78", "naz": "IT" } },
    "SDI": { "cod": "0000000", "pec": "giuseppeciro.perillo@pec.it" }
  }
}`}
          </CodeBlock>
          <CodeBlock title="Risposta">
{`{ "d": { "errCode": "0", "errMsg": "", "idFattura": "xxxxx" } }`}
          </CodeBlock>

          <DocSubtitle>Documento generico (V2)</DocSubtitle>
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/creaDocumentoV2" />
          <DocPara>
            Versione estesa: <DocCode>datiGeneraliDocumento</DocCode> (causale, numero, data, bollo, tipo documento, sconti, ritenute), <DocCode>datiPagamento.list</DocCode>, <DocCode>prodList.list</DocCode> e <DocCode>qrCode</DocCode>. Con <DocCode>sendDoc: 1</DocCode> il documento viene trasmesso allo SDI; <DocCode>retFileType</DocCode> controlla il formato restituito.
          </DocPara>
          <CodeBlock title="Risposta (estratto)">
{`{
  "d": {
    "errCode": "0",
    "errMsg": "",
    "idDocumento": "238000",
    "fileContent": "<base64>",
    "fileName": "IT12345678901_A2345.xml",
    "numeroDocumento": "10",
    "docInfo": {
      "idDocumento": "238000",
      "Tipo": "I",
      "CurrentState": "10",
      "StatoDocumento": "Preso in Carico",
      "fgen_TipoDocumento": "TD01",
      "fgen_ImportoTotaleDocumento": "190.32"
    }
  }
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="calcola" eyebrow="07 · Calcolo" title="Calcola totale documento">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/calcolaTotaleDocumento" />
          <DocPara>
            Determina il totale di un documento a partire dalla lista prodotti, tenendo conto del profilo fiscale dell'utente: imposte, cassa previdenziale e ritenuta d'acconto. Utile per anteprime e conferme prima dell'emissione.
          </DocPara>
          <CodeBlock title="Richiesta">
{`{
  "token": "xxxxx",
  "idMittente": "yyyyy",
  "idDestinatario": "demo@gmail.com",
  "isPrivato": "1",
  "prodList": { "list": [{ "quantita": "1", "prezzoUnitario": "1000.00" }] }
}`}
          </CodeBlock>
          <CodeBlock title="Risposta">
{`{
  "d": {
    "TotaleDocumento": "819.67",
    "CPA": "0.00",
    "Imponibile": "819.67",
    "IVA": "180.33",
    "RA": "0.00",
    "NettoAPagare": "1000.00"
  }
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="esiti" eyebrow="08 · Esiti SDI" title="Ricevute e stato documento">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/getEsitoDocument" />
          <DocPara>
            Restituisce lo stato del documento e l'elenco delle ricevute ricevute dal Sistema di Interscambio: invio, consegna, eventuali notifiche di scarto o mancata consegna.
          </DocPara>
          <ParamTable rows={[
            { name: "token", type: "string", required: true, desc: "Token di sessione." },
            { name: "idMittente", type: "string", required: true, desc: "Identificativo del mittente." },
            { name: "idFattura", type: "string", required: true, desc: "Identificativo della fattura." },
          ]} />
          <CodeBlock title="Risposta (estratto)">
{`{
  "d": {
    "Stato_Documento": "OK",
    "Lista_Esiti": [{
      "Titolo": "INVIO SDI",
      "Stato_Documento": "OK",
      "Identificativo_SdI": "1614054",
      "Nome_File": "IT05058331215_000EI.xml.p7m",
      "Errore_SDI": "Nessuno",
      "Descrizione_Esito_SdI": "Invio al Sistema di Interscambio avvenuto con successo",
      "Data_Ora_Ricezione_SdI": "28/08/2018 15:18:27"
    }]
  }
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="note-credito" eyebrow="09 · Rettifiche" title="Note di credito">
          <DocPara>
            Per rettificare o annullare una fattura emessa. <DocCode>creaNotaCredito</DocCode> consente di specificare le righe; <DocCode>creaNotaCreditoTotale</DocCode> genera una nota che copre l'intero importo di una fattura esistente.
          </DocPara>

          <DocSubtitle>Nota di credito</DocSubtitle>
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/creaNotaCredito" />
          <DocPara>
            Stessa struttura di <DocCode>creaDocumento</DocCode> (<DocCode>idDestinatario</DocCode>, <DocCode>prodList.list</DocCode>, <DocCode>qrCode</DocCode>). Richiede un modello di fattura già definito nell'applicazione web.
          </DocPara>
          <CodeBlock title="Risposta">
{`{ "d": { "errCode": "0", "errMsg": "", "idNotaCredito": "xxxxx" } }`}
          </CodeBlock>

          <DocSubtitle>Nota di credito totale</DocSubtitle>
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/creaNotaCreditoTotale" />
          <CodeBlock title="Richiesta">
{`{ "token": "xxxxx", "idMittente": "yyyyy", "idFattura": "y" }`}
          </CodeBlock>
          <CodeBlock title="Risposta">
{`{ "d": { "errCode": "0", "errMsg": "", "idNotaCredito": "xxxxx" } }`}
          </CodeBlock>
        </DocSection>

        <DocSection id="full" eyebrow="10 · Avanzato" title="Crea documento full">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/creaDocumentoFullRound" />
          <DocPara>
            Emissione completa con controllo su arrotondamento, modalità e condizioni di pagamento, sconti, penali, bollo e allegati. Indicata per gestionali ed ERP che generano documenti dettagliati.
          </DocPara>
          <CodeBlock title="Richiesta (estratto)">
{`{
  "token": "xxxxx",
  "idMittente": "yyyyy",
  "arrotondamento": "0.00",
  "idDestinatario": "",
  "isPrivato": "1",
  "causale": "round rit 1",
  "numeroDocumento": "661 / 18",
  "dataDocumento": "20/01/2019",
  "importoBollo": "0.00",
  "datiPagamento": { "list": [{ "condizioniPagamento": "TP02", "modalitaPagamento": "MP01" }] },
  "prodList": { "list": [{ "numeroLinea": "1", "descrizione": "descrizione 1",
    "quantita": "1.00", "prezzoUnitario": "31.75", "prezzoTotale": "31.75", "aliquotaIVA": "22.00" }] },
  "qrCode": { "anag": { "naz": "IT", "piva": "00000000000", "denom": "xxxxxxxx" }, "SDI": { "cod": "UF5D7W", "pec": "" } }
}`}
          </CodeBlock>
          <CodeBlock title="Risposta (estratto)">
{`{
  "d": {
    "errCode": "0",
    "errMsg": "",
    "idDocumento": "6190",
    "fileName": "IT12345678901_004RY.xml",
    "numeroDocumento": "661 / 18",
    "docInfo": { "idDocumento": "6190", "Tipo": "I", "CurrentState": "10", "StatoDocumento": "Invio in corso..." }
  }
}`}
          </CodeBlock>
        </DocSection>

        <DocSection id="xml" eyebrow="11 · Integrazione" title="Invio XML">
          <EndpointBlock method="POST" path="/webservice/RestAPI.asmx/sendXML" />
          <DocPara>
            Invia una fattura già pronta in formato XML FatturaPA, codificata in Base64. Pensata per chi genera l'XML dal proprio gestionale e vuole solo trasmetterlo tramite Effatta.
          </DocPara>
          <ParamTable rows={[
            { name: "token", type: "string", required: true, desc: "Token di sessione." },
            { name: "idMittente", type: "string", required: true, desc: "Identificativo del mittente." },
            { name: "dataUserId", type: "string", desc: "Identificativo dei dati utente." },
            { name: "nomeFile", type: "string", required: true, desc: "Nome del file XML (es. IT12345678901_2zzz.xml)." },
            { name: "base64File", type: "string", required: true, desc: "Contenuto del file XML codificato in Base64." },
          ]} />
          <CodeBlock title="Risposta">
{`{ "d": { "errCode": "0", "errMsg": "", "idDocumento": "12345" } }`}
          </CodeBlock>
        </DocSection>

        <DocSection id="codifiche" eyebrow="12 · Riferimento" title="Codifiche">
          <DocPara>Valori ammessi per i campi codificati, secondo le specifiche FatturaPA.</DocPara>

          <DocSubtitle>Tipo documento</DocSubtitle>
          <CodeTable rows={[
            ["TD01", "Fattura"],
            ["TD02", "Acconto / anticipo su fattura"],
            ["TD03", "Acconto / anticipo su parcella"],
            ["TD04", "Nota di credito"],
            ["TD05", "Nota di debito"],
            ["TD06", "Parcella"],
            ["TD16", "Integrazione fattura reverse charge interno"],
            ["TD17", "Integrazione/autofattura per acquisto servizi dall'estero"],
            ["TD18", "Integrazione per acquisto beni intracomunitari"],
            ["TD19", "Integrazione/autofattura per acquisto beni ex art.17 c.2"],
            ["TD24", "Fattura differita (art. 21 c.4 lett. a)"],
          ]} />

          <DocSubtitle>Modalità di pagamento</DocSubtitle>
          <CodeTable rows={[
            ["MP01", "Contanti"],
            ["MP02", "Assegno"],
            ["MP03", "Assegno circolare"],
            ["MP05", "Bonifico"],
            ["MP08", "Carta di pagamento"],
            ["MP12", "RIBA"],
            ["MP19", "SEPA Direct Debit"],
            ["MP23", "PagoPA"],
          ]} />

          <DocSubtitle>Natura (IVA non esposta)</DocSubtitle>
          <CodeTable rows={[
            ["N1", "Escluse ex art. 15"],
            ["N2", "Non soggette"],
            ["N3", "Non imponibili"],
            ["N4", "Esenti"],
            ["N5", "Regime del margine / IVA non esposta"],
            ["N6", "Inversione contabile (reverse charge)"],
          ]} />

          <DocSubtitle>Regime fiscale (principali)</DocSubtitle>
          <CodeTable rows={[
            ["RF01", "Ordinario"],
            ["RF02", "Contribuenti minimi (art.1 c.96-117, L.244/07)"],
            ["RF19", "Regime forfettario (art.1 c.54-89, L.190/2014)"],
            ["RF18", "Altro"],
          ]} />

          <DocCallout tone="info">
            <strong>Ritenute e casse.</strong> I campi <DocCode>aliquotaRitenuta</DocCode> e <DocCode>applicaAltreRitenute</DocCode> gestiscono ritenuta d'acconto e contributi (INPS, ENASARCO, ENPAM, casse previdenziali). Le aliquote effettive dipendono dal profilo fiscale dell'account.
          </DocCallout>
        </DocSection>
      </DocsLayout>
    </div>
  );
}

window.ApiFatturazionePage = ApiFatturazionePage;
