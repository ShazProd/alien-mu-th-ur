## 🇮🇹 Alien MU/TH/UR 6000 — Guida Completa

MU/TH/UR 6000 per Foundry VTT (ALIEN RPG): terminale retrò completamente sincronizzato tra Giocatore, Spettatore e GM: effetto macchina da scrivere, estetica CRT/scanline, glitch, audio, HACK gestito dal GM e protocollo CERBERUS globale.

### 1) Caratteristiche principali
- Interfaccia retrò: digitazione, scanline, tinta CRT, glitch leggeri/forti
- Modalità Spettatore a specchio: copia fedele della vista del Giocatore (incl. HACK/CERBERUS)
- Audio integrato: battitura/return/errore/risposta con volume e limitazione
- HACK con decisione del GM: SUCCESSO/FALLIMENTO tramite mini‑finestra ancorata al terminale GM
- Ordini Speciali: 754/899/931/937/939/966 dopo hack riuscito
- Protocollo CERBERUS: approvazione GM, avviso rosso, conferma del giocatore, conto alla rovescia globale, chiusura automatica
- Allarme: attivazione/arresto sincronizzati (overlay rosso + sirena), pulsante STOP sull’header GM
- Controlli ambiente: porte/luci/GAS/Cryo via richiesta del giocatore → approvazione GM → esecuzione sincronizzata
- Trascinamento terminale (opzionale): per GM e/o giocatori/spettatori, senza bloccare l’input

### 2) Comandi del Giocatore
- HELP: elenca i comandi disponibili
- STATUS: mostra lo stato di MU/TH/UR (testo configurabile dal GM)
- /M <messaggio>: messaggio diretto a MOTHER
- CLEAR: pulisce la chat (riflesso agli spettatori)
- EXIT: chiude il terminale (riflesso agli spettatori)
- HACK: avvia l’hacking; il GM decide SUCCESSO/FALLIMENTO; animazioni/glitch sincronizzati
- ORDERS 754|899|931|937|939|966: mostra l’Ordine Speciale (post‑hack)
- CERBERUS: richiede approvazione GM; se approvato → avviso rosso + CONFIRM/CANCEL (solo giocatore) → conto alla rovescia globale

### 3) Impostazioni
- enableTypingSounds (client), typingSoundVolume (client)
- enableScanline / scanlineSize (client), enableTypewriter (client)
- allowHack (mondo)
- allowDragGM / allowDragPlayers (mondo)
- currentStatusKey / customStatusText (mondo)
- captainUserIds / allowCaptainSpecialOrders (mondo)
- alarmSoundPath (mondo)

### 4) Flusso HACK (sincronizzato)
1. Il giocatore digita HACK → il GM riceve la finestra di decisione (ancorata al terminale GM)
2. Il GM clicca SUCCESSO/FALLIMENTO → rimandato al giocatore
3. Sequenze di testo, glitch e suoni in sincrono su Giocatore e Spettatori
4. In caso di successo: nuovi ordini disponibili; mostrati anche al GM

### 5) Protocollo CERBERUS
1. Il giocatore digita CERBERUS → il GM vede approva/rifiuta + minuti
2. Se approvato: il giocatore vede un avviso rosso; gli spettatori vedono lo stesso testo senza pulsanti
3. Il giocatore conferma (CONFIRM) → conto alla rovescia globale (timer flottante + chat)
4. A 0: sequenza finale, pulizia, chiusura automatica delle interfacce

### 6) Allarme (globale on/off)
- On: approvazione GM → sirena + overlay rosso per tutti
- Off: pulsante STOP GM → arresto affidabile via AudioHelper + stop forzato
- “Allarme disattivato” inviato a tutti, inclusi spettatori

### 7) Controlli Ambiente
- PORTE: LOCK/UNLOCK con selezione/approvazione GM, feedback sincronizzato
- LUCI: DIM/SHUTDOWN/RESTORE con approvazione GM
- GAS: il GM sceglie i bersagli; effetto sincronizzato
- CRYO POD / CRYO RELEASE: selezione tramite finestre ancorate al terminale GM

### 8) Socket & Sync (eventi principali)
`muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusResponse`, `hackingAttempt/hackStream/hackGlitch/hackStopGlitch/hackComplete`, `alarmControl`, `showCerberusGlobal/stopCerberus`, `sessionStatus`, `closeMuthurChats`.

### 9) Installazione & Avvio
1. Installa e abilita il modulo
2. Il giocatore apre MU/TH/UR (pulsante nelle note/controlli della scena)
3. Il GM approva e seleziona gli spettatori
4. Digita i comandi nel terminale

### 10) Supporto
Supporto allo sviluppo: Ko‑fi / Tipeee (link nel README principale)


