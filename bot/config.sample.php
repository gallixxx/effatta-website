<?php
/**
 * config.sample.php — copia questo file in "config.php" SUL SERVER e compila i valori.
 *
 * config.php NON va in git (è già in .gitignore) e non viene sovrascritto
 * dal deploy. Crealo direttamente da SiteGround (File Manager) in /public_html/bot/.
 */

return [
    // Token del bot fornito da @BotFather su Telegram.
    'bot_token' => 'INSERISCI_IL_TOKEN_DI_BOTFATHER',

    // Stringa segreta a tua scelta (lettere/numeri). Deve coincidere con il
    // secret_token usato quando imposti il webhook (vedi README).
    'webhook_secret' => 'SCEGLI_UNA_STRINGA_SEGRETA',

    // Chat ID Telegram autorizzati a gestire lo stato.
    // Se non lo conosci, lascia vuoto [] , scrivi al bot e lui ti risponderà
    // col tuo chat ID; poi inseriscilo qui. Esempio: [123456789].
    'allowed_chat_ids' => [],
];
