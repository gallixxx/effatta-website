# Bot Telegram — gestione "Stato del servizio"

Questo bot ti permette di gestire la pagina **stato.html** dal telefono, via
Telegram, senza scrivere codice. Modifica direttamente `data/status.json` sul
server SiteGround, quindi le modifiche sono **immediate**.

## Come funziona

```
Tu (Telegram)  →  bot  →  telegram.php (su SiteGround)  →  data/status.json  →  stato.html
```

Il bot mostra un menu a pulsanti:

- **🟢 Tutto operativo** — segna tutti i servizi come operativi
- **🛠 Stato di un servizio** — cambia lo stato di un singolo servizio (operativo / manutenzione / disservizio parziale / non disponibile)
- **🔵 Nuovo avviso / manutenzione** — crea una comunicazione (titolo, servizi, inizio, fine, testo) — es. una manutenzione AdE annunciata in anticipo
- **📋 Gestisci avvisi attivi** — risolvi (sposta in cronologia) o elimina un avviso
- **↻ Mostra stato attuale**

Comandi rapidi: `/menu`, `/stato`, `/annulla`.

---

## Installazione (una tantum)

### 1. Crea il bot su Telegram
1. Apri Telegram, cerca **@BotFather**.
2. `/newbot` → scegli nome e username. BotFather ti dà un **token** (es. `123456:ABC...`).

### 2. Crea `config.php` sul server
Da SiteGround **Site Tools → File Manager**, vai in `/public_html/bot/`, copia
`config.sample.php` in **`config.php`** e compila:

```php
return [
    'bot_token'        => 'IL_TUO_TOKEN_BOTFATHER',
    'webhook_secret'   => 'una-stringa-segreta-a-tua-scelta',
    'allowed_chat_ids' => [],   // lascia vuoto per ora
];
```

> `config.php` non è in git e non viene toccato dai deploy: vive solo sul server.

### 3. Collega il webhook
Apri questo indirizzo nel browser (sostituisci `TOKEN`, `dominio` e `SEGRETO`
con i tuoi; `SEGRETO` = lo stesso `webhook_secret` del passo 2):

```
https://api.telegram.org/botTOKEN/setWebhook?url=https://TUO_DOMINIO/bot/telegram.php&secret_token=SEGRETO
```

Deve rispondere `{"ok":true,...}`.

### 4. Autorizzati
1. Scrivi `/start` al tuo bot.
2. Risponderà che non sei autorizzato e ti darà il tuo **chat ID**.
3. Inserisci quel numero in `allowed_chat_ids` dentro `config.php`, es. `[123456789]`.
4. Scrivi di nuovo `/start`: ora vedi il menu. ✅

Puoi autorizzare più persone aggiungendo più ID: `[123, 456]`.

---

## Note

- I dati live (`data/status.json`) e i file del bot (`config.php`, `state.json`)
  sono **esclusi dal deploy FTP** (vedi `.github/workflows/deploy.yml`): un push
  su `main` non sovrascrive lo stato corrente.
- La pagina pubblica legge `data/status.json` con cache disabilitata, quindi
  riflette le modifiche al ricaricamento.
- La fascia di stato in cima alla pagina è **derivata** automaticamente: se un
  servizio è "non disponibile" mostra disservizio; se c'è una manutenzione la cui
  finestra contiene l'ora attuale mostra "manutenzione in corso"; altrimenti
  "tutti i sistemi operativi". Non devi impostarla a mano.
- Sicurezza: il webhook verifica l'header secret di Telegram e una allowlist di
  chat ID. `config.php`, `state.json` e questo README sono protetti via `.htaccess`.
