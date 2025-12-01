# 21 Jake 🎲

![Licence](https://img.shields.io/badge/Licence-All%20Rights%20Reserved-red)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-green)](https://vitejs.dev/)
[![Deck of Cards API](https://img.shields.io/badge/API-deckofcardsapi-yellow)](https://deckofcardsapi.com/)

---

## Description

**21 Jake** est un projet personnel visant à recréer l'expérience classique du blackjack avec une touche moderne et immersive.  
L'objectif est de combiner **gameplay stratégique**, **design néon élégant** et **interface fluide** pour offrir une expérience captivante aux joueurs.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Gestion des états](#gestion-des-états-react-hooks)
- [Flux de jeu](#flux-de-jeu)
- [Technologies utilisées](#technologies-utilisées)
- [Structure visuelle](#structure-visuelle)
- [Installation](#installation)
- [Licence](#licence)

---

## Fonctionnalités

- Jeu de blackjack interactif avec règles classiques
- Gestion du solde et des mises
- Détection automatique de Blackjack et résultats
- Mises secondaires : Perfect Pair, Hot3, 21+3
- Historique des parties avec pagination
- Popups interactifs pour résultats, erreurs ou Game Over
- Animation du résultat (glide + fade) sur canvas
- Animation machine à écrire pour la section "A Propos"
- Responsive avec menu mobile (hamburger) pour navigation
- Assets visuels personnalisés (Daz3D, Photoshop)
- Utilisation de l'API deckofcardsapi pour tirer les cartes en temps réel

---



Le projet est structuré en **composants React** :

## 📁 Architecture

```
📂 src
│
├── 📁 assets
│   ├── 📁 imgs              # Images des cartes, jetons et résultats
│   └── 📁 lose-wins         # Images de victoire/défaite
│
├── 📁 components
│   ├── 📄 Header.jsx         # Header avec liens et menu hamburger
│   ├── 📄 DealerZone.jsx     # Affichage main croupier
│   ├── 📄 PlayerHand.jsx     # Affichage main joueur
│   ├── 📄 SlotZone.jsx       # Emplacements des cartes
│   ├── 📄 ControlsZone.jsx   # Boutons actions joueur
│   ├── 📄 ChipsZone.jsx      # Jetons + mise
│   ├── 📄 BetZone.jsx        # Gestion mise
│   ├── 📄 ScoreZone.jsx      # Solde & mise
│   ├── 📄 HistoryPopup.jsx   # Historique
│   └── 📄 Popups.jsx         # Popups résultats / erreurs
│
├── 📄 App.jsx                # Composant principal
├── 📄 App.css                # Styles globaux
└── 📄 index.js               # Entrée du projet
```

---

## Gestion des états (React Hooks)

- `useState` : solde, mise, mains du joueur et du dealer, popups, animation machine à écrire, historique
- `useEffect` : effets secondaires, animations, vérification du game over
- `useRef` : conserver les valeurs précédentes (ex : solde) et références pour animation typing
- `useCallback` / `useMemo` : optimisation des fonctions et textes mémorisés pour l’animation

---

## Flux de jeu

1. Le joueur sélectionne sa mise via `ChipsZone`.
2. Cliquer sur "Nouvelle Partie" tire un deck via l’API **deckofcardsapi**.
3. Distribution des cartes au joueur et au croupier.
4. Le joueur peut **tirer**, **stand** ou **double** selon les règles.
5. Le croupier joue automatiquement sa main.
6. Calcul des résultats, mises secondaires et mise à jour du solde.
7. Résultats animés sur canvas et enregistrés dans l’historique.
8. Popups affichant les résultats, erreurs ou fin de partie.

---

## Technologies utilisées

- **React** (Hooks)
- **Axios** pour requêtes HTTP vers l’API des cartes
- **Bootstrap** pour la base des styles
- **CSS personnalisé** pour le design néon et animations
- **API deckofcardsapi.com** pour le tirage de cartes

---

## Structure visuelle

- **Header** : logo, liens GitHub/DeviantArt, menu hamburger
- **Game Grid** :
  - `DealerZone` : main du croupier
  - `SlotZone` : slots pour cartes supplémentaires
  - `PlayerHand` : main du joueur
- **Actions Grid** :
  - `ControlsZone` : boutons Jouer / Stand / Double
  - `ScoreZone` : solde et mise
  - `BetZone` : contrôle de la mise
  - `ChipsZone` : boutons de jetons
- **Popups** :
  - Résultat partie
  - Historique
  - A Propos
  - Erreur de mise / Game Over

---

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/ton-username/21-jake.git
```

2. Installer les dépendances :
```bash
cd 21-jake
npm install
```

3. Lancer l’application :
```bash
npm run dev
```
4. Ouvrir l’application dans votre navigateur :
```bash
http://localhost:5173
```
Licence
## Fonctionnalités

- Jouer au Blackjack avec un solde initial de **1000 crédits**.
- Ajouter des mises et gérer le solde.
- **Double** et **Stand** pendant le tour du joueur.
- Animation des cartes et des résultats.
- Historique des parties paginé.
- Machine à écrire pour le texte "À Propos".
- Menu hamburger responsive pour les liens et popups.

---

## Licence

© 2025 MagicAres. Tous droits réservés.

### 1. Code source

Le code source de ce projet (JavaScript, React, CSS, etc.) est protégé par des droits d'auteur.  

**Usage autorisé :**
- Étude, apprentissage ou usage personnel.
- Contributions via pull requests avec accord préalable.

**Usage interdit :**
- Redistribuer ou vendre le code.
- Utiliser le code à des fins commerciales.
- Copier ou publier le code sous un autre nom sans autorisation.

### 2. Assets et images

Toutes les images, logos et fichiers dans `src/assets/` sont protégés par la licence suivante :  

**Creative Commons Attribution – Non Commercial – No Derivatives (CC BY-NC-ND 4.0)**

**Usage autorisé :**
- Télécharger ou partager à titre personnel ou éducatif.
- Mentionner l’auteur : MagicAres.

**Usage interdit :**
- Usage commercial.
- Modification ou création d’œuvres dérivées.
- Redistribution sans mention de l’auteur.

Pour plus d’information : [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)


---

# 21 Jake 🎲

![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-green)](https://vitejs.dev/)
[![Deck of Cards API](https://img.shields.io/badge/API-deckofcardsapi-yellow)](https://deckofcardsapi.com/)

---

## Description

**21 Jake** is a personal project designed to recreate the classic blackjack experience with a **modern**, **immersive**, and **neon-styled** interface.  
The goal is to combine **strategic gameplay**, **smooth animations**, and a **polished UI** to deliver an engaging experience for players.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [State Management](#state-management-react-hooks)
- [Game Flow](#game-flow)
- [Technologies Used](#technologies-used)
- [Visual Structure](#visual-structure)
- [Installation](#installation)
- [License](#license)

---

## Features

- Interactive blackjack game using classic rules
- Balance and bet management
- Automatic Blackjack detection
- Secondary bets: Perfect Pair, Hot3, 21+3
- Full game history with pagination
- Interactive popups (results, errors, Game Over)
- Canvas animations for results (glide + fade)
- Typewriter animation for the “About” popup
- Responsive design with mobile hamburger menu
- Custom visual assets (Daz3D + Photoshop)
- Real-time card drawing via **deckofcardsapi**

---

## 📁 Architecture

The project is structured into **React components**:

```
📂 src
│
├── 📁 assets
│ ├── 📁 imgs # Card images, chips, results
│ └── 📁 lose-wins # Win/Loss graphics
│
├── 📁 components
│ ├── 📄 Header.jsx # Header with links + hamburger menu
│ ├── DealerZone.jsx # Dealer hand
│ ├── PlayerHand.jsx # Player hand
│ ├── SlotZone.jsx # Additional card slots
│ ├── ControlsZone.jsx # Player action buttons
│ ├── ChipsZone.jsx # Bet chips
│ ├── BetZone.jsx # Bet amount control
│ ├── ScoreZone.jsx # Balance + bet display
│ ├── HistoryPopup.jsx # Game history popup
│ └── Popups.jsx # Result / error / Game Over popups
│
├── App.jsx # Main game logic
├── App.css # Global styles
└── index.js # Entry point
```

---

## State Management (React Hooks)

- **`useState`** → player/dealer hands, balance, bet, game state, popups, typing animation
- **`useEffect`** → card animations, game over checks, history updates
- **`useRef`** → previous values, typing animation control
- **`useCallback` / `useMemo`** → memoized actions & typewriter text

---

## Game Flow

1. Player selects a bet via **ChipsZone**
2. Start a game → fetch a shuffled deck from **deckofcardsapi**
3. Cards dealt to player and dealer
4. Player chooses **Hit**, **Stand**, or **Double**
5. Dealer plays automatically
6. Results and side bets are calculated
7. Balance updated and game added to history
8. Result popup + canvas animation displayed

---

## Technologies Used

- **React** (Hooks)
- **Axios** for HTTP requests
- **Bootstrap** (base styles)
- **Custom CSS** (neon + animations)
- **deckofcardsapi.com** for card drawing

---

## Visual Structure

- **Header**: logo, GitHub/DeviantArt links, mobile hamburger menu
- **Game Grid**:
  - `DealerZone`: dealer hand
  - `SlotZone`: card slots
  - `PlayerHand`: player hand
- **Action Grid**:
  - `ControlsZone`: Hit / Stand / Double
  - `ScoreZone`: balance + bet
  - `BetZone`: bet control
  - `ChipsZone`: chips buttons
- **Popups**:
  - Game result
  - History
  - About
  - Error / Game Over

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/21-jake.git
```
2. Install dependencies:
```
cd 21-jake
npm install
```
3. Start the application:
```bash
npm run dev
```
4. Open the application in your browser:
```bash
http://localhost:5173
```

---

## License

© 2025 MagicAres. All rights reserved.

### 1. Code source

The code source of this project (JavaScript, React, CSS, etc.) is protected by copyright.  

**Usage allowed:**  
- Use for personal projects.
- Contributions via pull requests with prior written consent.

**Usage prohibited:**  
- Redistribution or sale of the code.
- Use of the code for commercial purposes.
- Copying or publishing the code under another name without prior written consent.

### 2. Assets and images

All images, logos, and files in `src/assets/` are protected by the following license:  

**Creative Commons Attribution – Non-Commercial – No Derivatives (CC BY-NC-ND 4.0)**

**Usage allowed:**  
- Download or share on personal projects.
- Mentioning the author: MagicAres.

**Usage prohibited:**  
- Usage for commercial purposes.
- Modification or creation of derivative works.
- Redistribution without mentioning the author.

For more information: [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)

---

