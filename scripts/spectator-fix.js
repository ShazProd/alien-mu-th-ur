/**
 * Correction pour le mode spectateur de MU/TH/UR
 * Ce script corrige les problèmes de synchronisation entre le joueur actif et les spectateurs
 */

// Attendre que le document soit prêt
Hooks.once('ready', () => {
    console.log("MU/TH/UR | Chargement des corrections pour le mode spectateur");
    
    // Fonction pour afficher un message d'attente pendant que le GM sélectionne les spectateurs
    if (typeof showWaitingMessage !== 'function') {
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
    }
    
    // Fonction pour mettre à jour les interfaces spectateurs avec un nouveau message
    if (typeof updateSpectatorsWithMessage !== 'function') {
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
    }
    
    // Fonction pour synchroniser les messages entre le joueur actif et les spectateurs
    if (typeof syncMessageToSpectators !== 'function') {
        window.syncMessageToSpectators = function(chatLog, message, prefix = '', color = '#00ff00', messageType = 'normal') {
            // Afficher le message dans le chat local
            const messageElement = displayMuthurMessage(chatLog, message, prefix, color, messageType);
            
            // Mettre à jour les interfaces spectateurs avec le même message
            updateSpectatorsWithMessage(message, prefix, color, messageType);
            
            return messageElement;
        };
    }
    
    // Modifier la fonction toggleMuthurChat pour afficher un message d'attente
    const originalToggleMuthurChat = toggleMuthurChat;
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
    const originalShowBootSequence = showBootSequence;
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
    const originalShowMuthurInterface = showMuthurInterface;
    if (originalShowMuthurInterface) {
        window.showMuthurInterface = function() {
            const interface = originalShowMuthurInterface();
            
            // Remplacer les appels à displayMuthurMessage par syncMessageToSpectators
            const chatLog = interface.querySelector('.muthur-chat-log');
            if (chatLog) {
                // Afficher le message de bienvenue avec syncMessageToSpectators
                chatLog.innerHTML = ''; // Vider le chat log
                syncMessageToSpectators(chatLog, game.i18n.localize("MUTHUR.welcome"), '', '#00ff00', 'reply');
            }
            
            return interface;
        };
    }
    
    // S'assurer que les spectateurs voient la séquence de boot
    Hooks.on('ready', () => {
        // Écouter les événements socket
        game.socket.on('module.alien-mu-th-ur', (data) => {
            if (data.type === 'continueBootSequence' && !game.user.isGM) {
                if (data.spectatorIds && data.spectatorIds.includes(game.user.id)) {
                    // Les spectateurs voient aussi la séquence de boot
                    showBootSequence(true);
                }
            }
        });
    });
}); 

// Remplacez les appels à displayMuthurMessage par syncMessageToSpectators dans l'interface du joueur actif
// pour que les spectateurs voient les mêmes messages

// Modifiez la fonction showGMSpectatorSelectionDialog pour inclure les spectateurs dans la séquence de boot
Hooks.once('ready', () => {
    // Remplacer la fonction showGMSpectatorSelectionDialog d'origine
    const originalShowGMSpectatorSelectionDialog = window.showGMSpectatorSelectionDialog;
    
    window.showGMSpectatorSelectionDialog = function(activeUserId, activeUserName) {
        // Appeler la fonction d'origine
        const dialog = originalShowGMSpectatorSelectionDialog(activeUserId, activeUserName);
        
        // Remplacer les gestionnaires d'événements des boutons
        const confirmButton = dialog.querySelector('button:first-child');
        const cancelButton = dialog.querySelector('button:last-child');
        
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
        
        return dialog;
    };
    
    // Remplacer la fonction updateSpectatorsWithMessage pour qu'elle fonctionne correctement
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
    
    // Remplacer la fonction showMuthurInterface pour utiliser syncMessageToSpectators
    const originalShowMuthurInterface = window.showMuthurInterface;
    
    window.showMuthurInterface = function() {
        const interface = originalShowMuthurInterface();
        
        // Remplacer les appels à displayMuthurMessage par syncMessageToSpectators
        const chatLog = interface.querySelector('.muthur-chat-log');
        const input = interface.querySelector('.muthur-input');
        
        // Remplacer le gestionnaire d'événements de l'entrée
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);
        
        newInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && newInput.value.trim()) {
                const command = newInput.value.trim().toUpperCase();
                newInput.value = '';
                await syncMessageToSpectators(chatLog, command, '> ');
                chatLog.scrollTop = chatLog.scrollHeight;
                
                // Le reste du code reste inchangé...
                // Vous devrez adapter cette partie en fonction de votre code existant
            }
        });
        
        return interface;
    };
});
