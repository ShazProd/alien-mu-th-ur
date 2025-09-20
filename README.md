Welcome to the Alien-Mu-Th-Ur module for ALIEN RPG by Free league and Foundry VTT, which simulates an interface between a player and Mother.

Once activated in Foundry VTT, the module will open when a player decides to activate it or when the GM authorises it. It can be found in the notes with a ROBOT logo.

I invite you to have a look at the settings, which allow you to modify certain aspects of the module, such as whether or not hacking is allowed, or whether the hacking attempt succeeds, fails or is random. As well as the activation of the Cerberus protocol and the time remaining before explosion.

The list of complete orders is supplied to the GM when the module is opened

it allows you to type several commands on the player side with automatic responses. such as :

command visible to the player :

STATUS: the status of the Mu-Th-Ur interface

HELP: list of player commands

/M message : type the /m command followed by the message for Mother (mum can reply at this point)

CLEAR: delete the chat

EXIT : close the chat

command not visible to the player but can launch :

special order : an automatic response for all special orders such as 754, 899, 931, 937, 939, 966 indicating that the player does not have administrator rights.

Cerberus: an automatic response indicating that the player does not have administrator rights.

HACK : which triggers a hack attempt on the player's side to increase their privileges and obtain additional commands or additional responses from mum.

Once the hack has been successfully completed, the special order and cerberus commands are valid and, in the case of the special orders, they will generate automatic responses related to the Alien universe.

As for Cerberus, it triggers the base's self-destruct system, and the player must validate the order. When he does, the chosen countdown begins and at zero everyone is dead. But the GM has a button to stop the countdown.


New in 1.1.0 (Foundry VTT v13)
- Robust v13 control button injection: MUTHUR button always appears (Notes → Token → fallback group).
- GM reply UI refresh: color palette as squares + native color picker; Reply button replaced by Enter icon. Same Enter button on player side. Text areas aligned.
- STATUS rework: presets + custom text stored in settings. When a player types STATUS, the GM chooses what to send. “Degraded performance” adds light screen glitches on player (and spectator).
- Roles: optional Captain role can access Special Orders without HACK (settings to manage captain users and allow/deny).
- Spectator mirror mode: full mirroring of text, typewriter, scanline, hacking windows, glitches, Cerberus, Special Orders and final sequences. Glitches stop exactly when “Administrator privileges granted” shows. Spectator chat clears and background turns red at hack success like player. Sounds follow player settings.
- CLEAR/EXIT synchronization: CLEAR also clears spectator chat; EXIT closes spectator terminal.
- GM visibility for Special Orders after HACK: order name and description are also sent to the GM so they see the exact result.
- Internationalization: all new i18n keys added across EN/FR/DE/ES/IT/NL/SV/NO/DA.
- Audio: absolute module paths, AudioHelper usage with fallback, throttled communication ticks, clean console (logs removed).

Key Settings
- Typing sounds: enableTypingSounds (client), typingSoundVolume (client)
- Typewriter & scanline: enableTypewriter, enableScanline, scanlineSize (client)
- Hacking & Cerberus: allowHack, hackResult (random/success/failure), allowCerberus, cerberusDuration (world/GM)
- STATUS presets: currentStatusKey (world/GM), customStatusText (world/GM)
- Roles: captainUserIds (world/GM), allowCaptainSpecialOrders (world/GM)

Spectator Flow
- The GM selects spectators for a player session. All messages/effects/animations are mirrored in real time to the chosen spectators.
- Sounds on spectator follow the same client settings (no extra prompts).

Multilingual summary

Français
- Bouton MUTHUR fiable en v13. Couleurs en carrés + sélecteur, bouton Entrée. STATUS avec préréglages/texte perso, choix du MJ à la demande du joueur, “Fonctionnement dégradé” avec glitches. Rôles: Capitaines possibles pour Ordres Spéciaux. Mode spectateur miroir total (texte, effets, hack, Cerberus, sons), arrêt des glitches au moment des privilèges admin, CLEAR/EXIT synchronisés. Les Ordres Spéciaux après HACK sont aussi affichés chez le MJ. i18n et audio améliorés.

Deutsch
- Stabile v13-Schaltfläche. Farbpalette als Quadrate + Picker, Eingabetaste. STATUS mit Presets/benutzerdefiniert; SL wählt Antwort; „Eingeschränkte Leistung“ mit Glitches. Rollen: Kapitän kann Spezialbefehle ohne HACK. Vollständiges Zuschauerspiegeln (Text, Effekte, Hack, Cerberus, Sound), Glitches stoppen exakt bei Administratorrechten. CLEAR/EXIT synchron. Spezialbefehle nach HACK auch beim SL sichtbar. i18n/Audio verbessert.

Español
- Botón v13 robusto. Paleta de colores en cuadrados + selector; botón Enter. STATUS con presets/texto personalizado; el DJ elige la respuesta; “Rendimiento degradado” con glitches. Roles: Capitán accede a Órdenes Especiales sin HACK. Espejo completo para espectadores (texto, efectos, hack, Cerberus, sonido); glitches paran al conceder privilegios admin. CLEAR/EXIT sincronizados. Órdenes Especiales tras HACK también para el DJ. i18n/audio mejorados.

Italiano
- Pulsante v13 affidabile. Tavolozza colori a quadrati + picker; tasto Invio. STATUS con preset/testo personalizzato; il GM sceglie; “Prestazioni degradate” con glitch. Ruoli: Capitano può accedere agli Ordini Speciali senza HACK. Mirroring spettatore completo (testi, effetti, hack, Cerberus, suoni), stop glitch su privilegi admin. CLEAR/EXIT sincronizzati. Ordini Speciali dopo HACK anche al GM. i18n/audio migliorati.

Nederlands
- Betrouwbare v13-knop. Kleuren als vierkanten + picker; Enter-knop. STATUS met presets/aangepaste tekst; GM kiest; “Gedegradeerde prestaties” met glitches. Rollen: Kapitein kan Speciale Orders zonder HACK. Volledige spiegel voor toeschouwers (tekst, effecten, hack, Cerberus, geluid), glitches stoppen bij adminrechten. CLEAR/EXIT synchroon. Speciale Orders na HACK ook voor GM. i18n/audio verbeterd.

Svenska
- Stabil v13-knapp. Färgkvadrater + väljare; Enter-knapp. STATUS med förinställningar/egen text; SL väljer; ”Försämrad prestanda” med glitchar. Roller: Kapten kan Specialorder utan HACK. Full spegling för åskådare (text, effekter, hack, Cerberus, ljud); glitchar stoppas vid adminrättigheter. CLEAR/EXIT synkade. Specialorder efter HACK även till SL. i18n/ljud förbättrat.

Norsk
- Robust v13-knapp. Fargekvadrater + velger; Enter-knapp. STATUS med oppsett/egendefinert; GM velger; ”Redusert ytelse” med glitcher. Roller: Kaptein kan Spesialordrer uten HACK. Full speiling for tilskuer (tekst, effekter, hack, Cerberus, lyd); glitcher stopper ved adminrettigheter. CLEAR/EXIT synkroniseres. Spesialordrer etter HACK også til GM. i18n/lyd forbedret.

Dansk
- Stabil v13-knap. Farvefirkanter + vælger; Enter-knap. STATUS med presets/tilpasset; GM vælger; ”Nedsat ydeevne” med glitches. Roller: Kaptajn kan Specialordrer uden HACK. Fuld spejling til tilskuer (tekst, effekter, hack, Cerberus, lyd); glitches stopper ved adminrettigheder. CLEAR/EXIT synkroniseret. Specialordrer efter HACK også til GM. i18n/lyd forbedret.