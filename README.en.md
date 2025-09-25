## 🇬🇧 Alien MU/TH/UR 6000 — Complete Guide

MU/TH/UR 6000 for Foundry VTT (ALIEN RPG) — Retro terminal fully synchronized across Player, Spectator, and GM: typewriter display, CRT/scanline aesthetics, glitch effects, audio cues, GM‑driven HACK, and global CERBERUS protocol.

### 1) Major Features
- Retro interface: typewriter, scanline, CRT tint, subtle/major glitches
- Mirror Spectator mode: faithful copy of the Player’s display (incl. HACK/CERBERUS)
- Integrated audio: typing/return/error/reply with volume and throttling
- HACK with GM decision: SUCCESS/FAILURE via a mini dialog anchored to GM terminal
- Special Orders: 754/899/931/937/939/966 after a successful hack
- CERBERUS protocol: GM approval, red warning, player confirm, global countdown, auto close
- Alarm control: synchronized activation/stop (red overlay + siren), STOP button on GM header
- Environment control: doors/lights/GAS/Cryo via player request → GM approval → synced execution
- Terminal dragging (optional): for GM and/or players/spectators, without blocking input

### 2) Player Commands
- HELP: list available commands
- STATUS: show MU/TH/UR status (text configurable by GM)
- /M <message>: direct message to MOTHER
- CLEAR: clear chat (mirrored to spectators)
- EXIT: close terminal (mirrored to spectators)
- HACK: start hacking; GM decides SUCCESS/FAILURE; animations/glitches are synced
- ORDERS 754|899|931|937|939|966: show the Special Order (post‑hack)
- CERBERUS: request GM approval; if approved → red warning + CONFIRM/CANCEL (player only) → global countdown

### 3) Settings
- enableTypingSounds (client), typingSoundVolume (client)
- enableScanline / scanlineSize (client), enableTypewriter (client)
- allowHack (world)
- allowDragGM / allowDragPlayers (world)
- currentStatusKey / customStatusText (world)
- captainUserIds / allowCaptainSpecialOrders (world)
- alarmSoundPath (world)

### 4) HACK Flow (synchronized)
1. Player types HACK → GM receives decision dialog (anchored to GM terminal)
2. GM clicks SUCCESS/FAILURE → sent back to player
3. Text sequences, glitches, and sounds run in sync on Player and Spectators
4. On success: new orders available; also displayed to GM

### 5) CERBERUS Protocol
1. Player types CERBERUS → GM sees approve/refuse + minutes
2. If approved: Player sees a red warning; Spectators see the same text without buttons
3. Player confirms (CONFIRM) → global countdown (floating timer + chat)
4. At 0: end sequence, cleanup, automatic close of interfaces

### 6) Alarm (global on/off)
- On: GM approval → siren + red overlay for all
- Off: GM STOP button → reliable AudioHelper stop + force stop any matching instances
- “Alarm deactivated” message broadcast to all, including spectators

### 7) Environment Controls
- DOORS: LOCK/UNLOCK with GM selection/approval, synced feedback
- LIGHTS: DIM/SHUTDOWN/RESTORE with GM approval
- GAS: GM picks targets; effect is synchronized
- CRYO POD / CRYO RELEASE: selection via dialogs anchored to GM terminal

### 8) Sockets & Sync (main events)
`muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusResponse`, `hackingAttempt/hackStream/hackGlitch/hackStopGlitch/hackComplete`, `alarmControl`, `showCerberusGlobal/stopCerberus`, `sessionStatus`, `closeMuthurChats`.

### 9) Install & Start
1. Install and enable the module
2. Player opens MU/TH/UR (button in scene notes/controls)
3. GM approves and selects spectators
4. Type commands in the terminal

### 10) Support
Support development: Ko‑fi / Tipeee (links in main README)


