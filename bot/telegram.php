<?php
/**
 * telegram.php — webhook del bot Telegram per gestire la pagina "Stato del servizio".
 *
 * Riceve gli aggiornamenti da Telegram, mostra un menu guidato a pulsanti e
 * scrive direttamente data/status.json sul server: la pagina stato.html si
 * aggiorna all'istante, senza deploy.
 *
 * Sicurezza: verifica l'header secret di Telegram e una allowlist di chat ID.
 * Configurazione e segreti in config.php (non versionato).
 *
 * Vedi README.md per l'installazione.
 */

header('Content-Type: application/json; charset=utf-8');

$cfg = @include __DIR__ . '/config.php';
if (!is_array($cfg) || empty($cfg['bot_token'])) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config mancante']);
    exit;
}

define('BOT_TOKEN', $cfg['bot_token']);
define('WEBHOOK_SECRET', isset($cfg['webhook_secret']) ? $cfg['webhook_secret'] : '');
$ALLOWED = isset($cfg['allowed_chat_ids']) ? array_map('strval', $cfg['allowed_chat_ids']) : [];

$STATUS_FILE = __DIR__ . '/../data/status.json';
$STATE_FILE  = __DIR__ . '/state.json';

// Servizi noti (id => nome mostrato). Allineati a data/status.json.
$SERVICES = [
    'fatturazione' => 'Fatturazione elettronica (SDI)',
    'scontrino'    => 'Scontrino · Corrispettivi telematici',
    'api'          => 'API',
    'pannello'     => 'Pannello web e app',
];

$SVC_STATUS_LABELS = [
    'operational' => '🟢 Operativo',
    'maintenance' => '🔵 Manutenzione',
    'degraded'    => '🟠 Disservizio parziale',
    'outage'      => '🔴 Non disponibile',
];

/* ------------------------------------------------------------------ *
 * Verifica della provenienza
 * ------------------------------------------------------------------ */
if (WEBHOOK_SECRET !== '') {
    $hdr = isset($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN']) ? $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] : '';
    if (!hash_equals(WEBHOOK_SECRET, $hdr)) {
        http_response_code(403);
        echo json_encode(['ok' => false]);
        exit;
    }
}

$raw = file_get_contents('php://input');
$update = json_decode($raw, true);
if (!is_array($update)) { echo json_encode(['ok' => true]); exit; }

/* ------------------------------------------------------------------ *
 * Helper Telegram
 * ------------------------------------------------------------------ */
function tg($method, $params) {
    $ch = curl_init("https://api.telegram.org/bot" . BOT_TOKEN . "/$method");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($params),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 15,
    ]);
    $res = curl_exec($ch);
    curl_close($ch);
    return json_decode($res, true);
}

function sendMessage($chatId, $text, $keyboard = null) {
    $p = ['chat_id' => $chatId, 'text' => $text, 'parse_mode' => 'HTML', 'disable_web_page_preview' => true];
    if ($keyboard !== null) $p['reply_markup'] = ['inline_keyboard' => $keyboard];
    return tg('sendMessage', $p);
}

function editMessage($chatId, $msgId, $text, $keyboard = null) {
    $p = ['chat_id' => $chatId, 'message_id' => $msgId, 'text' => $text, 'parse_mode' => 'HTML', 'disable_web_page_preview' => true];
    if ($keyboard !== null) $p['reply_markup'] = ['inline_keyboard' => $keyboard];
    return tg('editMessageText', $p);
}

function answerCb($cbId, $text = '') {
    return tg('answerCallbackQuery', ['callback_query_id' => $cbId, 'text' => $text]);
}

/* ------------------------------------------------------------------ *
 * Stato (draft conversazione) + dati status.json
 * ------------------------------------------------------------------ */
function loadJson($file, $default) {
    if (!file_exists($file)) return $default;
    $d = json_decode(@file_get_contents($file), true);
    return is_array($d) ? $d : $default;
}

function saveJson($file, $data) {
    $dir = dirname($file);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

function defaultStatus() {
    global $SERVICES;
    $services = [];
    foreach ($SERVICES as $id => $name) $services[] = ['id' => $id, 'name' => $name, 'status' => 'operational'];
    return ['updatedAt' => nowIso(), 'services' => $services, 'scheduled' => [], 'history' => []];
}

function loadStatus() {
    global $STATUS_FILE;
    $s = loadJson($STATUS_FILE, null);
    if ($s === null || !isset($s['services'])) { $s = defaultStatus(); saveJson($STATUS_FILE, $s); }
    foreach (['scheduled', 'history'] as $k) if (!isset($s[$k]) || !is_array($s[$k])) $s[$k] = [];
    return $s;
}

function saveStatus($s) {
    global $STATUS_FILE;
    $s['updatedAt'] = nowIso();
    saveJson($STATUS_FILE, $s);
}

function nowIso() {
    $dt = new DateTime('now', new DateTimeZone('Europe/Rome'));
    return $dt->format('c');
}

function getState($chatId) {
    global $STATE_FILE;
    $all = loadJson($STATE_FILE, []);
    return isset($all[$chatId]) ? $all[$chatId] : null;
}

function setState($chatId, $state) {
    global $STATE_FILE;
    $all = loadJson($STATE_FILE, []);
    if ($state === null) unset($all[$chatId]); else $all[$chatId] = $state;
    saveJson($STATE_FILE, $all);
}

function parseDateIt($s) {
    $s = trim($s);
    $dt = DateTime::createFromFormat('d/m/Y H:i', $s, new DateTimeZone('Europe/Rome'));
    if (!$dt) {
        $dt = DateTime::createFromFormat('d/m/Y', $s, new DateTimeZone('Europe/Rome'));
        if ($dt) $dt->setTime(0, 0);
    }
    return $dt ? $dt->format('c') : null;
}

function fmtIt($iso) {
    try {
        $dt = new DateTime($iso);
        $dt->setTimezone(new DateTimeZone('Europe/Rome'));
        return $dt->format('d/m/Y H:i');
    } catch (Exception $e) { return $iso; }
}

/* ------------------------------------------------------------------ *
 * Menu e viste
 * ------------------------------------------------------------------ */
function mainMenuKb() {
    return [
        [['text' => '🟢 Tutto operativo', 'callback_data' => 'allok']],
        [['text' => '🛠 Stato di un servizio', 'callback_data' => 'svcstatus']],
        [['text' => '🔵 Nuovo avviso / manutenzione', 'callback_data' => 'new']],
        [['text' => '📋 Gestisci avvisi attivi', 'callback_data' => 'manage']],
        [['text' => '↻ Mostra stato attuale', 'callback_data' => 'show']],
    ];
}

function showMainMenu($chatId, $msgId = null) {
    setState($chatId, null);
    $text = "<b>Stato del servizio Effatta</b>\nCosa vuoi fare?";
    if ($msgId) editMessage($chatId, $msgId, $text, mainMenuKb());
    else sendMessage($chatId, $text, mainMenuKb());
}

function statusSummary() {
    global $SVC_STATUS_LABELS;
    $s = loadStatus();
    $lines = ["<b>Stato attuale</b>", "Aggiornato: " . fmtIt($s['updatedAt']), ""];
    foreach ($s['services'] as $svc) {
        $lbl = isset($SVC_STATUS_LABELS[$svc['status']]) ? $SVC_STATUS_LABELS[$svc['status']] : $svc['status'];
        $lines[] = "• " . $svc['name'] . " — " . $lbl;
    }
    $active = array_filter($s['scheduled'], function ($x) { return true; });
    if (count($active)) {
        $lines[] = "";
        $lines[] = "<b>Avvisi attivi:</b> " . count($active);
        foreach ($s['scheduled'] as $a) $lines[] = "• " . $a['title'] . " (" . fmtIt($a['start']) . ")";
    }
    return implode("\n", $lines);
}

/* ------------------------------------------------------------------ *
 * Estrazione chat / autorizzazione
 * ------------------------------------------------------------------ */
$cb = isset($update['callback_query']) ? $update['callback_query'] : null;
$msg = isset($update['message']) ? $update['message'] : null;

$chatId = null;
if ($cb)  $chatId = strval($cb['message']['chat']['id']);
elseif ($msg) $chatId = strval($msg['chat']['id']);

if ($chatId === null) { echo json_encode(['ok' => true]); exit; }

if (!empty($ALLOWED) && !in_array($chatId, $ALLOWED, true)) {
    // Non autorizzato: rispondi col chat id così l'utente può aggiungerlo in config.
    if ($cb) answerCb($cb['id'], 'Non autorizzato.');
    else sendMessage($chatId, "⛔️ Non sei autorizzato.\nIl tuo chat ID è: <code>$chatId</code>\nAggiungilo in config.php per abilitarti.");
    echo json_encode(['ok' => true]);
    exit;
}

/* ------------------------------------------------------------------ *
 * Routing — callback (pulsanti)
 * ------------------------------------------------------------------ */
if ($cb) {
    $data = $cb['data'];
    $msgId = $cb['message']['message_id'];
    answerCb($cb['id']);

    // menu principale
    if ($data === 'menu') { showMainMenu($chatId, $msgId); echo json_encode(['ok' => true]); exit; }

    // tutto operativo
    if ($data === 'allok') {
        $s = loadStatus();
        foreach ($s['services'] as &$svc) $svc['status'] = 'operational';
        unset($svc);
        saveStatus($s);
        editMessage($chatId, $msgId, "✅ Tutti i servizi segnati come <b>operativi</b>.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    // mostra stato
    if ($data === 'show') {
        editMessage($chatId, $msgId, statusSummary(), [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    // scegli servizio di cui cambiare stato
    if ($data === 'svcstatus') {
        $kb = [];
        foreach ($SERVICES as $id => $name) $kb[] = [['text' => $name, 'callback_data' => "svc:$id"]];
        $kb[] = [['text' => '← Menu', 'callback_data' => 'menu']];
        editMessage($chatId, $msgId, "Quale servizio vuoi aggiornare?", $kb);
        echo json_encode(['ok' => true]); exit;
    }

    // scelto un servizio → mostra stati possibili
    if (strpos($data, 'svc:') === 0) {
        $id = substr($data, 4);
        $name = isset($SERVICES[$id]) ? $SERVICES[$id] : $id;
        $kb = [];
        foreach ($SVC_STATUS_LABELS as $st => $lbl) $kb[] = [['text' => $lbl, 'callback_data' => "setsvc:$id:$st"]];
        $kb[] = [['text' => '← Indietro', 'callback_data' => 'svcstatus']];
        editMessage($chatId, $msgId, "Nuovo stato per <b>$name</b>:", $kb);
        echo json_encode(['ok' => true]); exit;
    }

    // applica stato servizio
    if (strpos($data, 'setsvc:') === 0) {
        list(, $id, $st) = explode(':', $data, 3);
        $s = loadStatus();
        $found = false;
        foreach ($s['services'] as &$svc) { if ($svc['id'] === $id) { $svc['status'] = $st; $found = true; } }
        unset($svc);
        if (!$found && isset($SERVICES[$id])) { $s['services'][] = ['id' => $id, 'name' => $SERVICES[$id], 'status' => $st]; }
        saveStatus($s);
        $lbl = isset($SVC_STATUS_LABELS[$st]) ? $SVC_STATUS_LABELS[$st] : $st;
        $name = isset($SERVICES[$id]) ? $SERVICES[$id] : $id;
        editMessage($chatId, $msgId, "✅ <b>$name</b> → $lbl", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    // nuovo avviso: scegli tipo
    if ($data === 'new') {
        $kb = [
            [['text' => '🔧 Manutenzione programmata', 'callback_data' => 'newtype:maintenance']],
            [['text' => '⚠️ Disservizio', 'callback_data' => 'newtype:incident']],
            [['text' => '← Menu', 'callback_data' => 'menu']],
        ];
        editMessage($chatId, $msgId, "Che tipo di avviso vuoi creare?", $kb);
        echo json_encode(['ok' => true]); exit;
    }

    if (strpos($data, 'newtype:') === 0) {
        $type = substr($data, 8);
        setState($chatId, ['flow' => 'new', 'step' => 'title', 'draft' => ['severity' => $type, 'services' => []]]);
        editMessage($chatId, $msgId, "✏️ Invia il <b>titolo</b> dell'avviso.\n(es. <i>Manutenzione programmata Agenzia delle Entrate</i>)\n\nScrivi /annulla per uscire.");
        echo json_encode(['ok' => true]); exit;
    }

    // toggle servizio nel flusso "new"
    if (strpos($data, 'nsvc:') === 0) {
        $id = substr($data, 5);
        $state = getState($chatId);
        if ($state && $state['flow'] === 'new') {
            $sel = $state['draft']['services'];
            if (in_array($id, $sel, true)) $sel = array_values(array_diff($sel, [$id]));
            else $sel[] = $id;
            $state['draft']['services'] = $sel;
            setState($chatId, $state);
            editMessage($chatId, $msgId, "Quali servizi sono interessati?\n(tocca per selezionare, poi <b>Avanti</b>)", newServicesKb($sel));
        }
        echo json_encode(['ok' => true]); exit;
    }

    if ($data === 'nsvcdone') {
        $state = getState($chatId);
        if ($state && $state['flow'] === 'new') {
            $state['step'] = 'start';
            setState($chatId, $state);
            editMessage($chatId, $msgId, "🕒 Invia data e ora di <b>inizio</b>.\nFormato: <code>GG/MM/AAAA HH:MM</code>\n(es. 14/06/2026 22:00)");
        }
        echo json_encode(['ok' => true]); exit;
    }

    // conferma pubblicazione
    if ($data === 'confirm') {
        $state = getState($chatId);
        if ($state && $state['flow'] === 'new') {
            $d = $state['draft'];
            $s = loadStatus();
            $s['scheduled'][] = [
                'id' => 'av-' . time(),
                'title' => $d['title'],
                'start' => $d['start'],
                'end' => $d['end'],
                'severity' => $d['severity'],
                'services' => array_values($d['services']),
                'body' => $d['body'],
            ];
            saveStatus($s);
            setState($chatId, null);
            editMessage($chatId, $msgId, "✅ Avviso pubblicato. È già visibile sulla pagina di stato.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        }
        echo json_encode(['ok' => true]); exit;
    }

    if ($data === 'cancel') {
        setState($chatId, null);
        editMessage($chatId, $msgId, "Operazione annullata.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    // gestisci avvisi attivi
    if ($data === 'manage') {
        $s = loadStatus();
        if (empty($s['scheduled'])) {
            editMessage($chatId, $msgId, "Nessun avviso attivo.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
            echo json_encode(['ok' => true]); exit;
        }
        $kb = [];
        foreach ($s['scheduled'] as $a) {
            $kb[] = [['text' => '📄 ' . mb_substr($a['title'], 0, 40), 'callback_data' => 'item:' . $a['id']]];
        }
        $kb[] = [['text' => '← Menu', 'callback_data' => 'menu']];
        editMessage($chatId, $msgId, "Avvisi attivi — tocca per gestire:", $kb);
        echo json_encode(['ok' => true]); exit;
    }

    if (strpos($data, 'item:') === 0) {
        $id = substr($data, 5);
        $s = loadStatus();
        $item = null;
        foreach ($s['scheduled'] as $a) if ($a['id'] === $id) $item = $a;
        if (!$item) { editMessage($chatId, $msgId, "Avviso non trovato.", [[['text' => '← Menu', 'callback_data' => 'menu']]]); echo json_encode(['ok' => true]); exit; }
        $txt = "<b>" . $item['title'] . "</b>\n" . fmtIt($item['start']) . " → " . fmtIt($item['end']) . "\n\n" . $item['body'];
        $kb = [
            [['text' => '✅ Risolvi (sposta in cronologia)', 'callback_data' => 'resolve:' . $id]],
            [['text' => '🗑 Elimina', 'callback_data' => 'del:' . $id]],
            [['text' => '← Indietro', 'callback_data' => 'manage']],
        ];
        editMessage($chatId, $msgId, $txt, $kb);
        echo json_encode(['ok' => true]); exit;
    }

    if (strpos($data, 'resolve:') === 0) {
        $id = substr($data, 8);
        $s = loadStatus();
        $keep = [];
        foreach ($s['scheduled'] as $a) {
            if ($a['id'] === $id) {
                $a['status'] = 'resolved';
                $a['updates'] = isset($a['updates']) ? $a['updates'] : [];
                $a['updates'][] = ['at' => nowIso(), 'text' => 'Risolto.'];
                array_unshift($s['history'], $a);
            } else { $keep[] = $a; }
        }
        $s['scheduled'] = $keep;
        saveStatus($s);
        editMessage($chatId, $msgId, "✅ Avviso risolto e spostato in cronologia.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    if (strpos($data, 'del:') === 0) {
        $id = substr($data, 4);
        $s = loadStatus();
        $s['scheduled'] = array_values(array_filter($s['scheduled'], function ($a) use ($id) { return $a['id'] !== $id; }));
        saveStatus($s);
        editMessage($chatId, $msgId, "🗑 Avviso eliminato.", [[['text' => '← Menu', 'callback_data' => 'menu']]]);
        echo json_encode(['ok' => true]); exit;
    }

    echo json_encode(['ok' => true]); exit;
}

/* ------------------------------------------------------------------ *
 * Routing — messaggi di testo
 * ------------------------------------------------------------------ */
if ($msg) {
    $text = isset($msg['text']) ? trim($msg['text']) : '';

    if ($text === '/start' || $text === '/menu') { showMainMenu($chatId); echo json_encode(['ok' => true]); exit; }
    if ($text === '/annulla') { setState($chatId, null); sendMessage($chatId, "Operazione annullata.", mainMenuKb()); echo json_encode(['ok' => true]); exit; }
    if ($text === '/stato') { sendMessage($chatId, statusSummary(), [[['text' => '← Menu', 'callback_data' => 'menu']]]); echo json_encode(['ok' => true]); exit; }

    // input dentro un flusso
    $state = getState($chatId);
    if ($state && $state['flow'] === 'new') {
        $step = $state['step'];
        if ($step === 'title') {
            $state['draft']['title'] = $text;
            $state['step'] = 'services';
            setState($chatId, $state);
            sendMessage($chatId, "Quali servizi sono interessati?\n(tocca per selezionare, poi <b>Avanti</b>)", newServicesKb([]));
            echo json_encode(['ok' => true]); exit;
        }
        if ($step === 'start') {
            $iso = parseDateIt($text);
            if (!$iso) { sendMessage($chatId, "⚠️ Formato non valido. Usa <code>GG/MM/AAAA HH:MM</code> (es. 14/06/2026 22:00)."); echo json_encode(['ok' => true]); exit; }
            $state['draft']['start'] = $iso;
            $state['step'] = 'end';
            setState($chatId, $state);
            sendMessage($chatId, "🕒 Invia data e ora di <b>fine</b>.\nFormato: <code>GG/MM/AAAA HH:MM</code>");
            echo json_encode(['ok' => true]); exit;
        }
        if ($step === 'end') {
            $iso = parseDateIt($text);
            if (!$iso) { sendMessage($chatId, "⚠️ Formato non valido. Usa <code>GG/MM/AAAA HH:MM</code>."); echo json_encode(['ok' => true]); exit; }
            $state['draft']['end'] = $iso;
            $state['step'] = 'body';
            setState($chatId, $state);
            sendMessage($chatId, "✏️ Invia il <b>testo</b> della comunicazione per i clienti.");
            echo json_encode(['ok' => true]); exit;
        }
        if ($step === 'body') {
            $state['draft']['body'] = $text;
            setState($chatId, $state);
            $d = $state['draft'];
            $names = [];
            foreach ($d['services'] as $id) $names[] = isset($SERVICES[$id]) ? $SERVICES[$id] : $id;
            $tipo = $d['severity'] === 'incident' ? 'Disservizio' : 'Manutenzione programmata';
            $preview = "<b>Anteprima</b>\n\n<b>$tipo</b>\n<b>" . $d['title'] . "</b>\n" . fmtIt($d['start']) . " → " . fmtIt($d['end']) . "\nServizi: " . (count($names) ? implode(', ', $names) : '—') . "\n\n" . $d['body'];
            $kb = [[['text' => '✅ Pubblica', 'callback_data' => 'confirm'], ['text' => '✖️ Annulla', 'callback_data' => 'cancel']]];
            sendMessage($chatId, $preview, $kb);
            echo json_encode(['ok' => true]); exit;
        }
    }

    // default
    showMainMenu($chatId);
    echo json_encode(['ok' => true]); exit;
}

echo json_encode(['ok' => true]);

/* ------------------------------------------------------------------ *
 * Tastiera multiselezione servizi (flusso "new")
 * ------------------------------------------------------------------ */
function newServicesKb($selected) {
    global $SERVICES;
    $kb = [];
    foreach ($SERVICES as $id => $name) {
        $mark = in_array($id, $selected, true) ? '✅ ' : '▫️ ';
        $kb[] = [['text' => $mark . $name, 'callback_data' => "nsvc:$id"]];
    }
    $kb[] = [['text' => '➡️ Avanti', 'callback_data' => 'nsvcdone']];
    $kb[] = [['text' => '✖️ Annulla', 'callback_data' => 'cancel']];
    return $kb;
}
