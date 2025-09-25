## 🇳🇱 Alien MU/TH/UR 6000 — Complete Gids

MU/TH/UR 6000 voor Foundry VTT (ALIEN RPG): retro‑terminal volledig gesynchroniseerd tussen Speler, Toeschouwer en GM: typemachine‑weergave, CRT/scanline‑look, glitches, audio, door GM aangestuurd HACK en globaal CERBERUS‑protocol.

### 1) Belangrijkste functies
- Retro‑interface: typemachine, scanline, CRT‑tint, lichte/zware glitches
- Spiegel‑toeschouwermodus: getrouwe kopie van de Spelerweergave (incl. HACK/CERBERUS)
- Geïntegreerde audio: typen/return/fout/antwoord met volume en throttling
- HACK met GM‑beslissing: SUCCES/MISLUKT via minidialoog aan GM‑terminal
- Speciale Orders: 754/899/931/937/939/966 na geslaagde hack
- CERBERUS‑protocol: GM‑goedkeuring, rode waarschuwing, spelerbevestiging, globale countdown, automatisch sluiten
- Alarm: synchroon aan/uit (rood overlay + sirene), STOP‑knop in GM‑header
- Omgeving: deuren/licht/GAS/Cryo via spelersverzoek → GM‑goedkeuring → gesynchroniseerde uitvoering
- Terminal slepen (optioneel): voor GM en/of spelers/toeschouwers, zonder input te blokkeren

### 2) Spelercommando’s
- HELP: lijst met beschikbare commando’s
- STATUS: toont MU/TH/UR‑status (tekst door GM instelbaar)
- /M <bericht>: bericht rechtstreeks naar MOTHER
- CLEAR: chat wissen (gespiegeld naar toeschouwers)
- EXIT: terminal sluiten (gespiegeld naar toeschouwers)
- HACK: start hack; GM beslist SUCCES/MISLUKT; animaties/glitches gesynchroniseerd
- ORDERS 754|899|931|937|939|966: toont de Speciale Order (na hack)
- CERBERUS: vraag GM‑goedkeuring; bij goedkeuring → rode waarschuwing + CONFIRM/CANCEL (alleen speler) → globale countdown

### 3) Instellingen
- enableTypingSounds (client), typingSoundVolume (client)
- enableScanline / scanlineSize (client), enableTypewriter (client)
- allowHack (wereld)
- allowDragGM / allowDragPlayers (wereld)
- currentStatusKey / customStatusText (wereld)
- captainUserIds / allowCaptainSpecialOrders (wereld)
- alarmSoundPath (wereld)

### 4) HACK‑flow (gesynchroniseerd)
1. Speler typt HACK → GM ontvangt beslisvenster (aan GM‑terminal verankerd)
2. GM klikt SUCCES/MISLUKT → terug naar speler
3. Tekst, glitches en geluid lopen synchroon bij Speler en Toeschouwers
4. Bij succes: nieuwe orders beschikbaar; ook zichtbaar bij GM

### 5) CERBERUS‑protocol
1. Speler typt CERBERUS → GM ziet goedkeuren/weigeren + minuten
2. Bij goedkeuring: Speler ziet rode waarschuwing; Toeschouwers zien dezelfde tekst zonder knoppen
3. Speler bevestigt (CONFIRM) → globale countdown (zwevende timer + chat)
4. Bij 0: eindsequentie, opschonen, automatisch sluiten

### 6) Alarm (globaal aan/uit)
- Aan: GM‑goedkeuring → sirene + rood overlay voor iedereen
- Uit: GM STOP‑knop → betrouwbaar AudioHelper‑stop + geforceerde stops
- “Alarm uitgeschakeld” naar iedereen, incl. toeschouwers

### 7) Omgevingsbediening
- DEUREN: LOCK/UNLOCK met GM‑selectie/goedgekeuring, gesynchroniseerde feedback
- LICHT: DIM/SHUTDOWN/RESTORE met GM‑goedkeuring
- GAS: GM kiest doelen; effect gesynchroniseerd
- CRYO POD / CRYO RELEASE: selectie via vensters aan GM‑terminal

### 8) Sockets & Sync (belangrijkste events)
`muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusResponse`, `hackingAttempt/hackStream/hackGlitch/hackStopGlitch/hackComplete`, `alarmControl`, `showCerberusGlobal/stopCerberus`, `sessionStatus`, `closeMuthurChats`.

### 9) Installeren & Starten
1. Installeer en activeer de module
2. Speler opent MU/TH/UR (knop in scenenotities/bediening)
3. GM keurt goed en selecteert toeschouwers
4. Typ commando’s in de terminal

### 10) Support
Steun de ontwikkeling: Ko‑fi / Tipeee (links in de hoofd‑README)


