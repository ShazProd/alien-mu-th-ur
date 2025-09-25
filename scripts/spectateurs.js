/**
 * Correction pour le mode spectateur de MU/TH/UR
 * Ce script corrige les problèmes de synchronisation entre le joueur actif et les spectateurs
 */

// Attendre que le document soit prêt
Hooks.once('ready', () => {
    console.log("MU/TH/UR | Chargement des corrections pour le mode spectateur");
    
    // Politique audio spectateur: mêmes règles que le joueur (game.settings)
    try { window.MUTHUR = window.MUTHUR || {}; window.MUTHUR.muteForSpectator = false; } catch(e) {}
    
    // Fonction pour mettre à jour les interfaces spectateurs avec un nouveau message
    window.updateSpectatorsWithMessage = function(text, prefix = '', color = '#00ff00', messageType = 'normal') {
        // Envoyer le message à tous les spectateurs via le socket
        game.socket.emit('module.alien-mu-th-ur', {
            type: 'updateSpectators',
            text: text,
            prefix: prefix,
            color: color,
            messageType: messageType
        });
    };
    
    // Fonction pour synchroniser les messages entre le joueur actif et les spectateurs
    window.syncMessageToSpectators = function(chatLog, message, prefix = '', color = '#00ff00', messageType = 'normal') {
        // Afficher le message dans le chat local
        const messageElement = displayMuthurMessage(chatLog, message, prefix, color, messageType);
        
        // Mettre à jour les interfaces spectateurs avec le même message
        updateSpectatorsWithMessage(message, prefix, color, messageType);
        
        return messageElement;
    };
    
    // Fonction pour synchroniser les résultats des commandes spéciales
    window.syncCommandResult = function(command, result) {
        // Envoyer le résultat de la commande à tous les spectateurs
        game.socket.emit('module.alien-mu-th-ur', {
            type: 'commandResult',
            command: command,
            result: result
        });
    };
    
    // Fonction pour afficher un message d'attente pendant que le GM sélectionne les spectateurs
    window.showWaitingMessage = function() {
        // Vérifier si un message d'attente existe déjà
        let waitingContainer = document.getElementById('muthur-waiting-container');
        if (waitingContainer) {
            return waitingContainer;
        }
        
        // Créer le conteneur du message d'attente
        waitingContainer = document.createElement('div');
        waitingContainer.id = 'muthur-waiting-container';
        waitingContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: black;
            border: 2px solid #00ff00;
            padding: 20px;
            z-index: 100000;
            text-align: center;
            font-family: monospace;
            min-width: 400px;
        `;
        
        // Ajouter le titre
        const title = document.createElement('h2');
        title.textContent = "MU/TH/UR 6000";
        title.style.cssText = `
            color: #00ff00;
            margin-top: 0;
            font-family: monospace;
        `;
        waitingContainer.appendChild(title);
        
        // Ajouter le message d'attente
        const message = document.createElement('p');
        message.textContent = game.i18n.localize("MUTHUR.waitingForGM");
        message.style.cssText = `
            color: #00ff00;
            font-family: monospace;
            margin-bottom: 20px;
        `;
        waitingContainer.appendChild(message);
        
        // Ajouter un indicateur de chargement (points clignotants)
        const loadingIndicator = document.createElement('div');
        loadingIndicator.style.cssText = `
            color: #00ff00;
            font-size: 24px;
            font-family: monospace;
        `;
        loadingIndicator.textContent = ".";
        waitingContainer.appendChild(loadingIndicator);
        
        // Animation des points clignotants
        let dots = 1;
        const loadingInterval = setInterval(() => {
            dots = (dots % 3) + 1;
            loadingIndicator.textContent = ".".repeat(dots);
        }, 500);
        
        // Stocker l'intervalle dans un attribut pour pouvoir le nettoyer plus tard
        waitingContainer.dataset.intervalId = loadingInterval;
        
        // Ajouter au document
        document.body.appendChild(waitingContainer);
        
        return waitingContainer;
    };
    
    // Remplacer la fonction toggleMuthurChat pour afficher un message d'attente
    const originalToggleMuthurChat = window.toggleMuthurChat;
    if (originalToggleMuthurChat) {
        window.toggleMuthurChat = function() {
            let chatContainer = document.getElementById('muthur-chat-container');

            // Si une fenêtre existe déjà, la fermer
            if (chatContainer) {
                chatContainer.remove();
                if (currentMuthurSession.userId === game.user.id) {
                    currentMuthurSession.active = false;
                    currentMuthurSession.userId = null;
                    currentMuthurSession.userName = null;

                    game.socket.emit('module.alien-mu-th-ur', {
                        type: 'sessionStatus',
                        active: false
                    });
                }
                if (!game.user.isGM) {
                    sendToGM(game.i18n.localize("MUTHUR.sessionEnded"), 'close');
                }
                return;
            }

            // Vérifier si une session est active avant d'en créer une nouvelle
            if (currentMuthurSession.active && currentMuthurSession.userId !== game.user.id) {
                ui.notifications.warn(game.i18n.format("MUTHUR.sessionActiveWarning", { userName: currentMuthurSession.userName }));
                return;
            }

            // Différencier le comportement GM/Joueur
            if (game.user.isGM) {
                showMuthurInterface();
            } else {
                // Afficher un message d'attente pendant que le GM sélectionne les spectateurs
                showWaitingMessage();
                
                // Mettre à jour l'état de la session
                currentMuthurSession.active = true;
                currentMuthurSession.userId = game.user.id;
                currentMuthurSession.userName = game.user.name;
                
                // Informer le GM qu'un joueur a lancé MU/TH/UR et attendre sa sélection de spectateurs
                game.socket.emit('module.alien-mu-th-ur', {
                    type: 'requestSpectatorSelection',
                    userId: game.user.id,
                    userName: game.user.name
                });
            }
        };
    }
    
    // Modifier la fonction showBootSequence pour gérer les spectateurs
    const originalShowBootSequence = window.showBootSequence;
    if (originalShowBootSequence) {
        window.showBootSequence = function(isSpectator = false) {
            // Fermer le message d'attente s'il existe
            const waitingContainer = document.getElementById('muthur-waiting-container');
            if (waitingContainer) {
                // Nettoyer l'intervalle
                if (waitingContainer.dataset.intervalId) {
                    clearInterval(parseInt(waitingContainer.dataset.intervalId));
                }
                waitingContainer.remove();
            }
            
            // Appeler la fonction d'origine
            return originalShowBootSequence(isSpectator);
        };
    }
    
    // Modifier la fonction showMuthurInterface pour utiliser syncMessageToSpectators
    const originalShowMuthurInterface = window.showMuthurInterface;
    if (originalShowMuthurInterface) {
        window.showMuthurInterface = function() {
            const interfaceElement = originalShowMuthurInterface();
            
            // Remplacer les appels à displayMuthurMessage par syncMessageToSpectators
            const chatLog = interfaceElement.querySelector('.muthur-chat-log');
            if (chatLog) {
                // Afficher le message de bienvenue avec syncMessageToSpectators
                chatLog.innerHTML = ''; // Vider le chat log
                syncMessageToSpectators(chatLog, game.i18n.localize("MUTHUR.welcome"), '', '#00ff00', 'reply');
            }
            
            return interfaceElement;
        };
    }
    
    // Remplacer la fonction showGMSpectatorSelectionDialog
    const originalShowGMSpectatorSelectionDialog = window.showGMSpectatorSelectionDialog;
    if (originalShowGMSpectatorSelectionDialog) {
        window.showGMSpectatorSelectionDialog = function(activeUserId, activeUserName) {
            // Appeler la fonction d'origine
            const dialog = originalShowGMSpectatorSelectionDialog(activeUserId, activeUserName);
            
            // Remplacer les gestionnaires d'événements des boutons
            const confirmButton = dialog.querySelector('button:first-child');
            const cancelButton = dialog.querySelector('button:last-child');
            
            if (confirmButton && cancelButton) {
                // Supprimer les gestionnaires existants
                const newConfirmButton = confirmButton.cloneNode(true);
                const newCancelButton = cancelButton.cloneNode(true);
                confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
                cancelButton.parentNode.replaceChild(newCancelButton, cancelButton);
                
                // Ajouter les nouveaux gestionnaires
                newConfirmButton.addEventListener('click', () => {
                    // Récupérer les joueurs sélectionnés
                    const selectedPlayers = [];
                    const checkboxes = dialog.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        if (checkbox.checked) {
                            selectedPlayers.push(checkbox.value);
                        }
                    });
                    
                    // Fermer la fenêtre de dialogue
                    dialog.remove();
                    
                    // Envoyer un signal aux joueurs sélectionnés pour ouvrir l'interface en mode spectateur
                    if (selectedPlayers.length > 0) {
                        game.socket.emit('module.alien-mu-th-ur', {
                            type: 'openSpectatorInterface',
                            spectatorIds: selectedPlayers,
                            activeUserId: activeUserId,
                            activeUserName: activeUserName
                        });
                    }
                    
                    // Envoyer un signal au joueur actif et aux spectateurs pour continuer avec la séquence de démarrage
                    game.socket.emit('module.alien-mu-th-ur', {
                        type: 'continueBootSequence',
                        targetUserId: activeUserId,
                        spectatorIds: selectedPlayers
                    });
                });
                
                newCancelButton.addEventListener('click', () => {
                    // Fermer la fenêtre de dialogue
                    dialog.remove();
                    
                    // Envoyer un signal au joueur actif pour continuer avec la séquence de démarrage (sans spectateurs)
                    game.socket.emit('module.alien-mu-th-ur', {
                        type: 'continueBootSequence',
                        targetUserId: activeUserId,
                        spectatorIds: []
                    });
                });
            }
            
            return dialog;
        };
    }
    
    // Ajouter une fonction pour synchroniser les animations de hack
    window.syncHackingAttempt = function() {
        try { console.log('MUTHUR Spectator | syncHackingAttempt demandé par initiateur'); } catch(e) {}
        // Informer les spectateurs qu'une tentative de hack est en cours
        game.socket.emit('module.alien-mu-th-ur', {
            type: 'hackingAttempt'
        });
    };
    
    // Remplacer la fonction simulateHackingAttempt pour synchroniser avec les spectateurs
    const originalSimulateHackingAttempt = window.simulateHackingAttempt;
    if (originalSimulateHackingAttempt) {
        window.simulateHackingAttempt = async function(chatLog) {
            // Synchroniser avec les spectateurs
            syncHackingAttempt();
            
            // Appeler la fonction d'origine
            return await originalSimulateHackingAttempt(chatLog);
        };
    }
    
    // Fonction pour afficher les animations de hack chez les spectateurs
    window.showSpectatorHackingAnimation = async function() {
        const spectatorChatLog = document.querySelector('.muthur-spectator-log');
        if (spectatorChatLog) {
            // Créer les fenêtres d'animation de hack
            try {
                const creator = (window.createHackingWindows || window.parent?.createHackingWindows);
                if (creator) {
                    const stopper = creator();
                    if (stopper) { window.stopHackingWindows = stopper; }
                }
            } catch (e) { console.warn('createHackingWindows not available', e); }
            
            // Ajouter la classe hacking-active au conteneur
            const container = document.getElementById('muthur-spectator-container');
            if (container) {
                container.classList.add('hacking-active');
            }
            
            // Attendre la fin de l'animation (environ 10 secondes)
            await new Promise(resolve => setTimeout(resolve, 10000));
            
            // Nettoyer les éléments de hacking
            try { if (window.stopHackingWindows) { window.stopHackingWindows(); window.stopHackingWindows = null; } } catch (e) {}
            try { (window.clearHackingElements || window.parent?.clearHackingElements)?.(); } catch (e) {}
            
            // Retirer la classe hacking-active
            if (container) {
                container.classList.remove('hacking-active');
            }
        }
    };
    
    // Écouter les événements socket pour les spectateurs
    game.socket.on('module.alien-mu-th-ur', (data) => {
        // Effacer le chat côté spectateur lorsque le joueur envoie CLEAR
        if (data.type === 'clearSpectatorChat' && !game.user.isGM) {
            try {
                const spectatorLog = document.querySelector('.muthur-spectator-log');
                if (spectatorLog) {
                    spectatorLog.innerHTML = '';
                }
            } catch(e) { /* no-op */ }
        }

        // S'assurer que les spectateurs voient la séquence de boot
        if (data.type === 'continueBootSequence' && !game.user.isGM) {
            if (data.spectatorIds && data.spectatorIds.includes(game.user.id)) {
                try { (window.showBootSequence || window.parent?.showBootSequence)?.(true); } catch (e) { console.warn('Spectator boot error:', e); }
                try { window.currentMuthurSession = window.currentMuthurSession || {}; window.currentMuthurSession.spectatorIds = data.spectatorIds; } catch(e) {}
                // Le son suit les paramètres globaux, aucun prompt d'activation
            }
        }
        
        // Gérer les tentatives de hack pour les spectateurs
        if (data.type === 'hackingAttempt' && !game.user.isGM) {
            try { console.log('MUTHUR Spectator | réception hackingAttempt'); } catch(e) {}
            try { showSpectatorHackingAnimation(); } catch (e) { console.warn('Spectator hacking animation error:', e); }
        }

        // Flux texte temps-réel du hack (séquences + mots de passe)
        if (data.type === 'hackStream' && !game.user.isGM) {
            const spectatorLog = document.querySelector('.muthur-spectator-log');
            if (spectatorLog) {
                try { displayHackMessage(spectatorLog, data.text, data.color || '#00ff00', data.msgType || 'reply', !!data.isPassword); } catch(e) { console.warn('hackStream display error', e); }
                spectatorLog.scrollTop = spectatorLog.scrollHeight;
            }
        }

        // Reproduire les glitchs ponctuels du joueur
        if (data.type === 'hackGlitch' && !game.user.isGM) {
            try {
                const container = document.getElementById('muthur-spectator-container');
                (window.createFullScreenGlitch || window.MUTHUR?.applyScreenGlitch || (()=>{}))(200);
                if (container && window.MUTHUR?.applyLightGlitch) window.MUTHUR.applyLightGlitch(container, 400);
            } catch(e) { /* no-op */ }
        }

        // Arrêt des glitchs exactement au moment AdminPrivileges
        if (data.type === 'hackStopGlitch' && !game.user.isGM) {
            try {
                const container = document.getElementById('muthur-spectator-container');
                if (container) container.classList.remove('hacking-active');
                if (window.stopHackingWindows) { window.stopHackingWindows(); window.stopHackingWindows = null; }
                const overlay = document.getElementById('muthur-glitch-overlay');
                if (overlay) overlay.remove();
            } catch(e) {}
        }

        // Fin du hack: nettoyer les fenêtres/glitches côté spectateur
        if (data.type === 'hackComplete' && !game.user.isGM) {
            try {
                const container = document.getElementById('muthur-spectator-container');
                if (container) container.classList.remove('hacking-active');
                (window.clearHackingElements || window.parent?.clearHackingElements)?.();
                const overlay = document.getElementById('muthur-glitch-overlay');
                if (overlay) overlay.remove();
                // Tuer d’éventuels timers anim
                try { if (window.stopHackingWindows) window.stopHackingWindows(); } catch(e) {}

                // Reproduire l’étape visuelle finale du joueur: vider le chat et fond rouge
                const spectatorLog = document.querySelector('.muthur-spectator-log');
                if (spectatorLog) {
                    spectatorLog.innerHTML = '';
                    spectatorLog.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                }
            } catch(e) { console.warn('Spectator hackComplete cleanup error', e); }
        }
        
        // Fermer l'interface spectateur si la session est clôturée (EXIT côté joueur)
        if (data.type === 'sessionStatus' && !data.active && !game.user.isGM) {
            try {
                const container = document.getElementById('muthur-spectator-container');
                if (container) container.remove();
            } catch(e) { /* no-op */ }
        }
        
        // Gérer les résultats des commandes spéciales pour les spectateurs
        if (data.type === 'commandResult' && !game.user.isGM) {
            try {
                if (window.currentMuthurSession && window.currentMuthurSession.spectatorIds && window.currentMuthurSession.spectatorIds.includes(game.user.id)) {
                const spectatorLog = document.querySelector('.muthur-spectator-log');
                if (spectatorLog) {
                    // Traiter différents types de résultats
                    if (data.command === 'SPECIAL_ORDER') {
                        // Afficher le résultat de l'ordre spécial
                        displayMuthurMessage(spectatorLog, data.result.text, '', data.result.color || '#00ff00', data.result.type || 'reply');
                    } else if (data.command === 'HACK') {
                        // Afficher le résultat du hack
                        displayMuthurMessage(spectatorLog, data.result.text, '', data.result.color || '#ff0000', data.result.type || 'error');
                    } else {
                        // Afficher tout autre résultat de commande
                        displayMuthurMessage(spectatorLog, data.result.text, '', data.result.color || '#00ff00', data.result.type || 'reply');
                    }
                }
            }
            } catch (e) { console.warn('Spectator commandResult sync error:', e); }
        }
        
        // Synchroniser les messages entre le joueur actif et les spectateurs
        if (data.type === 'requestCurrentMessages' && data.targetUserId === game.user.id) {
            // Le joueur actif envoie tous ses messages actuels au spectateur qui vient de se connecter
            const chatLog = document.querySelector('.muthur-chat-log');
            if (chatLog) {
                const messages = chatLog.querySelectorAll('.message');
                const messageData = [];
                
                messages.forEach(msg => {
                    messageData.push({
                        text: msg.textContent,
                        color: msg.style.color,
                        messageType: Array.from(msg.classList).find(c => c !== 'message') || 'normal'
                    });
                });
                
                game.socket.emit('module.alien-mu-th-ur', {
                    type: 'syncMessages',
                    messages: messageData,
                    targetSpectatorId: data.spectatorId
                });
            }
        }
        
        if (data.type === 'syncMessages' && data.targetSpectatorId === game.user.id) {
            // Le spectateur reçoit tous les messages actuels du joueur actif
            const spectatorLog = document.querySelector('.muthur-spectator-log');
            if (spectatorLog) {
                // Effacer les messages existants
                spectatorLog.innerHTML = '';
                
                // Ajouter tous les messages reçus
                data.messages.forEach(msg => {
                    displayMuthurMessage(spectatorLog, msg.text, '', msg.color, msg.messageType);
                });
                
                spectatorLog.scrollTop = spectatorLog.scrollHeight;
            }
        }

        // Fermer toute interface MU/TH/UR côté spectateur lorsque la session est désactivée
        if (data.type === 'sessionStatus' && !data.active && !game.user.isGM) {
            try {
                const container = document.getElementById('muthur-spectator-container');
                if (container) container.remove();
            } catch(e) { /* no-op */ }
        }
    });

    // Sons spectateurs: suivent les settings (pas de mute forcé)
    try { window.MUTHUR = window.MUTHUR || {}; window.MUTHUR.muteForSpectator = false; } catch (e) {}

    // Support d'overlay d'alarme pour spectateurs (au cas où l'overlay n'est pas déjà synchronisé)
    try {
        window.muthurSpectatorAlarmOn = function(){
            let ov = document.getElementById('muthur-alarm-overlay');
            if (!ov) {
                ov = document.createElement('div');
                ov.id = 'muthur-alarm-overlay';
                ov.style.cssText = 'position:fixed; inset:0; background:rgba(255,0,0,0.12); pointer-events:none; z-index:100002; animation: alarmPulse 1s infinite;';
                const style = document.createElement('style');
                style.textContent = '@keyframes alarmPulse { 0%{opacity:0.3} 50%{opacity:0.6} 100%{opacity:0.3} }';
                document.head.appendChild(style);
                document.body.appendChild(ov);
            }
        };
        window.muthurSpectatorAlarmOff = function(){
            const ov = document.getElementById('muthur-alarm-overlay');
            if (ov) ov.remove();
        };
    } catch(e) {}
});
