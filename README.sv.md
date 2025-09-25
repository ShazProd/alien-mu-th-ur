## 🇸🇪 Alien MU/TH/UR 6000 — Komplett Guide

MU/TH/UR 6000 för Foundry VTT (ALIEN RPG): retro‑terminal helt synkad mellan Spelare, Åskådare och SL: skrivmaskinseffekt, CRT/scanline‑utseende, glitchar, ljud, SL‑styrd HACK och globalt CERBERUS‑protokoll.

### 1) Viktiga funktioner
- Retro‑gränssnitt: skrivmaskin, scanline, CRT‑ton, lätta/kraftiga glitchar
- Speglat åskådarläge: trogen kopia av Spelarvyn (inkl. HACK/CERBERUS)
- Integrerat ljud: tangent/retur/fel/svar med volym och begränsning
- HACK med SL‑beslut: FRAMGÅNG/MISSLYCKANDE via minidialog förankrad till SL‑terminalen
- Specialorder: 754/899/931/937/939/966 efter lyckad hack
- CERBERUS‑protokoll: SL‑godkännande, röd varning, spelarbekräftelse, global nedräkning, automatisk stängning
- Larm: synkat på/av (rött overlay + siren), STOPP‑knapp i SL‑huvudet
- Miljökontroller: dörrar/ljus/GAS/Cryo via spelarens begäran → SL‑godkännande → synkroniserad körning
- Dra terminal (valfritt): för SL och/eller spelare/åskådare utan att blockera input

### 2) Spelarkommando
- HELP: listar tillgängliga kommandon
- STATUS: visar MU/TH/UR‑status (text konfigurerbar av SL)
- /M <meddelande>: direktmeddelande till MOTHER
- CLEAR: rensar chatten (speglas till åskådare)
- EXIT: stänger terminalen (speglas till åskådare)
- HACK: startar hack; SL avgör FRAMGÅNG/MISSLYCKANDE; animationer/glitchar synkas
- ORDERS 754|899|931|937|939|966: visar Specialorder (efter hack)
- CERBERUS: begär SL‑godkännande; vid godkännande → röd varning + CONFIRM/CANCEL (endast spelare) → global nedräkning

### 3) Inställningar
- enableTypingSounds (klient), typingSoundVolume (klient)
- enableScanline / scanlineSize (klient), enableTypewriter (klient)
- allowHack (värld)
- allowDragGM / allowDragPlayers (värld)
- currentStatusKey / customStatusText (värld)
- captainUserIds / allowCaptainSpecialOrders (värld)
- alarmSoundPath (värld)

### 4) HACK‑flöde (synkat)
1. Spelaren skriver HACK → SL får beslutsdialog (förankrad till SL‑terminalen)
2. SL klickar FRAMGÅNG/MISSLYCKANDE → skickas till spelaren
3. Textsekvenser, glitchar och ljud körs synkroniserat hos Spelare och Åskådare
4. Vid framgång: nya order tillgängliga; visas även för SL

### 5) CERBERUS‑protokoll
1. Spelaren skriver CERBERUS → SL ser godkänn/avslå + minuter
2. Om godkänt: Spelaren ser röd varning; Åskådare ser samma text utan knappar
3. Spelaren bekräftar (CONFIRM) → global nedräkning (flytande timer + chat)
4. Vid 0: slutsekvens, städning, automatisk stängning av gränssnitt

### 6) Larm (globalt på/av)
- På: SL‑godkännande → siren + rött overlay för alla
- Av: SL STOPP‑knapp → pålitligt AudioHelper‑stopp + tvångsstopp
- ”Larm avaktiverat” skickas till alla, inklusive åskådare

### 7) Miljökontroller
- DÖRRAR: LOCK/UNLOCK med SL‑val/godkännande, synkad återkoppling
- LJUS: DIM/SHUTDOWN/RESTORE med SL‑godkännande
- GAS: SL väljer mål; effekt synkas
- CRYO POD / CRYO RELEASE: val via dialoger förankrade till SL‑terminalen

### 8) Socket & Sync (huvudhändelser)
`muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusResponse`, `hackingAttempt/hackStream/hackGlitch/hackStopGlitch/hackComplete`, `alarmControl`, `showCerberusGlobal/stopCerberus`, `sessionStatus`, `closeMuthurChats`.

### 9) Installation & Start
1. Installera och aktivera modulen
2. Spelaren öppnar MU/TH/UR (knapp i scenens anteckningar/kontroller)
3. SL godkänner och väljer åskådare
4. Skriv kommandon i terminalen

### 10) Support
Stöd utvecklingen: Ko‑fi / Tipeee (länkar i huvud‑README)


