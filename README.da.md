## 🇩🇰 Alien MU/TH/UR 6000 — Komplet Guide

MU/TH/UR 6000 til Foundry VTT (ALIEN RPG): retro‑terminal fuldt synkroniseret mellem Spiller, Tilskuer og GM: skrivemaskinevisning, CRT/scanline‑æstetik, glitches, lyd, GM‑styret HACK og globalt CERBERUS‑protokol.

### 1) Vigtigste funktioner
- Retro‑interface: skrivemaskine, scanline, CRT‑tone, lette/kraftige glitches
- Spejlet tilskuertilstand: tro kopi af Spillerens visning (inkl. HACK/CERBERUS)
- Integreret lyd: tast/retur/fejl/svar med lydstyrke og begrænsning
- HACK med GM‑beslutning: SUCCESS/FAILURE via minidialog forankret til GM‑terminal
- Særlige Ordrer: 754/899/931/937/939/966 efter vellykket hack
- CERBERUS‑protokol: GM‑godkendelse, rød advarsel, spillerbekræftelse, global nedtælling, automatisk lukning
- Alarm: synkron on/off (rød overlay + sirene), STOP‑knap i GM‑header
- Miljøkontrol: døre/lys/GAS/Cryo via spillers anmodning → GM‑godkendelse → synkron eksekvering
- Træk‑og‑slip terminal (valgfrit): for GM og/eller spillere/tilskuere uden at blokere input

### 2) Spillerkommandoer
- HELP: liste over tilgængelige kommandoer
- STATUS: viser MU/TH/UR‑status (tekst konfigurerbar af GM)
- /M <besked>: direkte besked til MOTHER
- CLEAR: rydder chat (spejles til tilskuere)
- EXIT: lukker terminal (spejles til tilskuere)
- HACK: starter hacking; GM afgør SUCCESS/FAILURE; animationer/glitches synkroniseres
- ORDERS 754|899|931|937|939|966: viser Særlig Ordre (efter hack)
- CERBERUS: beder om GM‑godkendelse; hvis godkendt → rød advarsel + CONFIRM/CANCEL (kun spiller) → global nedtælling

### 3) Indstillinger
- enableTypingSounds (klient), typingSoundVolume (klient)
- enableScanline / scanlineSize (klient), enableTypewriter (klient)
- allowHack (verden)
- allowDragGM / allowDragPlayers (verden)
- currentStatusKey / customStatusText (verden)
- captainUserIds / allowCaptainSpecialOrders (verden)
- alarmSoundPath (verden)

### 4) HACK‑flow (synkron)
1. Spiller skriver HACK → GM modtager beslutningsdialog (forankret til GM‑terminal)
2. GM klikker SUCCESS/FAILURE → sendes tilbage til spiller
3. Tekstsekvenser, glitches og lyd kører synkront hos Spiller og Tilskuere
4. Ved success: nye ordrer tilgængelige; også vist hos GM

### 5) CERBERUS‑protokol
1. Spiller skriver CERBERUS → GM ser godkend/afvis + minutter
2. Hvis godkendt: Spiller ser rød advarsel; Tilskuere ser samme tekst uden knapper
3. Spiller bekræfter (CONFIRM) → global nedtælling (flydende timer + chat)
4. Ved 0: slutsekvens, oprydning, automatisk lukning af grænseflader

### 6) Alarm (global on/off)
- On: GM‑godkendelse → sirene + rød overlay for alle
- Off: GM STOP‑knap → pålidelig AudioHelper‑stop + tvungen stop
- “Alarm deaktiveret” sendes til alle, inkl. tilskuere

### 7) Miljøkontroller
- DØRE: LOCK/UNLOCK med GM‑valg/godkendelse, synkron feedback
- LYS: DIM/SHUTDOWN/RESTORE med GM‑godkendelse
- GAS: GM vælger mål; effekt synkroniseres
- CRYO POD / CRYO RELEASE: valg via dialoger forankret til GM‑terminal

### 8) Socket & Sync (vigtige events)
`muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusResponse`, `hackingAttempt/hackStream/hackGlitch/hackStopGlitch/hackComplete`, `alarmControl`, `showCerberusGlobal/stopCerberus`, `sessionStatus`, `closeMuthurChats`.

### 9) Installation & Start
1. Installer og aktiver modulet
2. Spiller åbner MU/TH/UR (knap i scene‑noter/kontroller)
3. GM godkender og vælger tilskuere
4. Skriv kommandoer i terminalen

### 10) Support
Støt udviklingen: Ko‑fi / Tipeee (links i hoved‑README)


