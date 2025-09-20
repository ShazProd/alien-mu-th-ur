## 🌌 Alien MU/TH/UR 6000 — Foundry VTT Module

Langues · Languages · Sprachen · Idiomas · Lingue · Talen · Språk:
[🇫🇷 Français](#fr) · [🇬🇧 English](#en) · [🇩🇪 Deutsch](#de) · [🇪🇸 Español](#es) · [🇮🇹 Italiano](#it) · [🇳🇱 Nederlands](#nl) · [🇳🇴 Norsk](#no) · [🇸🇪 Svenska](#sv) · [🇩🇰 Dansk](#da)

---

<a id="fr"></a>
## 🇫🇷 Français

Interface MU/TH/UR 6000 pour Foundry VTT (ALIEN RPG). Ce module simule un terminal rétro (texte lettre par lettre, effets de glitch, sons, animations de hack et protocole CERBERUS), totalement synchronisé entre Joueur, Spectateur et MJ.

### Points forts
- **Effets visuels**: glitchs avancés (léger + plein écran), intensifiés pour les états critiques (ex. performance dégradée).
- **Mode Spectateur miroir**: copie conforme de l’affichage Joueur (texte lettre par lettre, retours à la ligne, HACK, CERBERUS, sons, CLEAR/EXIT, statut, ordres spéciaux).
- **Sons intégrés**: frappe, retour, communication (throttling), erreur et réponse; via `AudioHelper.play` avec repli HTMLAudio; respecte `enableTypingSounds` (client). Spectateur suit les mêmes règles que le Joueur.
- **HACK synchronisé**: flux granulaires `hackStream`, `hackGlitch`, `hackStopGlitch`, `hackComplete` pour une synchro précise du texte, des glitchs, et de l’arrêt des effets au bon moment.
- **Protocole CERBERUS**: confirmation/cancel, fenêtre dédiée, compte à rebours global, synchro multi‑clients, fermeture des chats et fin de session automatisée.
- **Ordres spéciaux**: 754/899/931/937/939/966… affichés chez Joueur, Spectateur et désormais **aussi chez le MJ après hack réussi**.
- **Statuts**: réponses MJ avec glitchs pour performance dégradée; diffusion aux spectateurs incluse.
- **i18n complet**: clés harmonisées dans `lang/*.json` (FR/EN/DE/ES/IT/NL/NO/SV/DA), y compris UI spectateur et statuts/roles.
- **Console propre**: logs de debug et audio supprimés.

### Commandes (Joueur)
- **HELP**: liste des commandes
- **STATUS**: état de MU/TH/UR
- **/M message**: message direct à MOTHER
- **CLEAR**: efface le chat (se répercute côté spectateur)
- **EXIT**: ferme le terminal (se répercute côté spectateur)
- **HACK**: lance une tentative de piratage (séquences + glitchs + sons)
- **ORDRE SPÉCIAL <code>**: après hack réussi, affiche l’ordre (et sa description) et notifie le MJ
- **CERBERUS**: demande de confirmation, déclenchement global et compte à rebours

### Paramètres principaux
- **enableTypingSounds (client)**: activer les sons de texte
- **allowHack (monde)**: autoriser le hack
- **allowCerberus (monde)** et **cerberusDuration (monde)**
- **allowCaptainSpecialOrders (monde)**: le Capitaine peut lancer les ordres spéciaux
- **customStatusText (monde)**: texte de statut personnalisé

### Synchronisation & sockets
- Canal: `module.alien-mu-th-ur`
- Événements clés: `muthurCommand`, `muthurResponse`, `updateSpectators`, `requestCurrentMessages`, `syncMessages`, `statusRequest/Response`, `clearSpectatorChat`, `sessionStatus`, `hackStream`, `hackGlitch`, `hackStopGlitch`, `hackProgress`, `hackComplete`, `showCerberusGlobal`, `stopCerberus`, `closeMuthurChats`.

### Installation & utilisation
1. Installer/activer le module dans Foundry VTT.
2. Ouvrir MU/TH/UR (icône ROBOT dans les Notes/Contrôles de scène).
3. Le MJ peut autoriser l’ouverture côté joueur et sélectionner les spectateurs.
4. Le joueur saisit les commandes; le MJ voit les tentatives/retours utiles; les spectateurs suivent en temps réel.

### Support
Soutien au développement:
`[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="en"></a>
## 🇬🇧 English

MU/TH/UR 6000 terminal for Foundry VTT (ALIEN RPG). Retro typewriter display, glitch effects, synchronized HACK/CERBERUS, sounds, and full spectator mirroring. Special Orders now also display to the GM after a successful hack.

### Highlights
- Advanced glitch visuals (light + full-screen), stronger on degraded performance
- Spectator mirror view (text, line breaks, hack/cerberus, sounds, CLEAR/EXIT)
- Audio via `AudioHelper` with HTMLAudio fallback, throttled comms, respects `enableTypingSounds`
- Granular hack sync: `hackStream`, `hackGlitch`, `hackStopGlitch`, `hackComplete`
- CERBERUS: confirm/cancel UI, global countdown, synchronized close
- Special Orders shown to Player, Spectator, and GM (post‑hack)
- Consistent i18n across FR/EN/DE/ES/IT/NL/NO/SV/DA

### Key commands
HELP, STATUS, /M, CLEAR, EXIT, HACK, SPECIAL ORDER <code>, CERBERUS

### Settings
enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="de"></a>
## 🇩🇪 Deutsch

MU/TH/UR 6000 Terminal für Foundry VTT (ALIEN RPG). Retro‑Schreibmaschinen‑Effekt, Glitches, synchronisiertes HACK/CERBERUS, Sounds und Spiegelansicht für Zuschauer. Spezialbefehle erscheinen nach erfolgreichem Hack auch beim SL.

**Befehle**: HELP, STATUS, /M, CLEAR, EXIT, HACK, SPEZIALBEFEHL <Code>, CERBERUS

**Einstellungen**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="es"></a>
## 🇪🇸 Español

Terminal MU/TH/UR 6000 para Foundry VTT (ALIEN RPG). Texto progresivo retro, glitches, HACK/CERBERUS sincronizados, sonidos y modo espectador en espejo. Órdenes especiales también al DJ tras hack exitoso.

**Comandos**: HELP, STATUS, /M, CLEAR, EXIT, HACK, ORDEN ESPECIAL <código>, CERBERUS

**Ajustes**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="it"></a>
## 🇮🇹 Italiano

Terminale MU/TH/UR 6000 per Foundry VTT (ALIEN RPG). Testo a macchina, effetti glitch, HACK/CERBERUS sincronizzati, audio e vista spettatore specchiata. Ordini speciali mostrati anche al GM dopo hack riuscito.

**Comandi**: HELP, STATUS, /M, CLEAR, EXIT, HACK, ORDINE SPECIALE <codice>, CERBERUS

**Impostazioni**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Supporto: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="nl"></a>
## 🇳🇱 Nederlands

MU/TH/UR 6000‑terminal voor Foundry VTT (ALIEN RPG). Typemachine‑effect, glitches, gesynchroniseerde HACK/CERBERUS, audio en spiegelende kijkersmodus. Speciale orders ook bij de GM na geslaagde hack.

**Commando’s**: HELP, STATUS, /M, CLEAR, EXIT, HACK, SPECIALE ORDER <code>, CERBERUS

**Instellingen**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="no"></a>
## 🇳🇴 Norsk

MU/TH/UR 6000‑terminal for Foundry VTT (ALIEN RPG). Skrivemaskin‑tekst, glitch‑effekter, synkronisert HACK/CERBERUS, lyd og speilet tilskuer‑visning. Spesialordre vises også til SL etter vellykket hack.

**Kommandoer**: HELP, STATUS, /M, CLEAR, EXIT, HACK, SPESIALORDRE <kode>, CERBERUS

**Innstillinger**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="sv"></a>
## 🇸🇪 Svenska

MU/TH/UR 6000‑terminal för Foundry VTT (ALIEN RPG). Skrivmaskinseffekt, glitchar, synkat HACK/CERBERUS, ljud och speglat åskådarläge. Specialorder visas även för SL efter lyckad hack.

**Kommandon**: HELP, STATUS, /M, CLEAR, EXIT, HACK, SPECIALORDER <kod>, CERBERUS

**Inställningar**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`

---

<a id="da"></a>
## 🇩🇰 Dansk

MU/TH/UR 6000‑terminal til Foundry VTT (ALIEN RPG). Skrivemaskinetekst, glitch‑effekter, synkroniseret HACK/CERBERUS, lyd og spejlet tilskuervisning. Særlige ordrer vises også for GM efter vellykket hack.

**Kommandoer**: HELP, STATUS, /M, CLEAR, EXIT, HACK, SÆRLIG ORDRE <kode>, CERBERUS

**Indstillinger**: enableTypingSounds, allowHack, allowCerberus, cerberusDuration, allowCaptainSpecialOrders, customStatusText

Support: `[Ko‑fi](https://ko-fi.com/shazprod)` · `[Tipeee](https://fr.tipeee.com/shaz-prod)`
