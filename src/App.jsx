import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import win1 from "./assets/imgs/lose-wins/wins1.png";
import win2 from "./assets/imgs/lose-wins/wins2.png";
import win3 from "./assets/imgs/lose-wins/wins3.png";
import win4 from "./assets/imgs/lose-wins/wins4.png";
import win5 from "./assets/imgs/lose-wins/wins5.png";
import lose1 from "./assets/imgs/lose-wins/lose1.png";
import lose2 from "./assets/imgs/lose-wins/lose2.png";
import lose3 from "./assets/imgs/lose-wins/lose3.png";
import lose4 from "./assets/imgs/lose-wins/lose4.png";
import lose5 from "./assets/imgs/lose-wins/lose5.png";
import Header from './components/Header';
import DealerZone from './components/DealerZone';
import HistoryPopup from './components/HistoryPopup';
import PlayerHand from "./components/PlayerHand";
import SlotZone from "./components/SlotZone";
import ControlsZone from './components/ControlsZone';
import ChipsZone from './components/ChipsZone';
import BetZone from './components/BetZone';
import ScoreZone from './components/ScoreZone';
import Popups from './components/Popups';

let historyIdCounter = 0;

const getUniqueId = () => {
  historyIdCounter += 1;
  return `${Date.now()}-${historyIdCounter}`;
};

function App() {
  const [deckData, setDeckData] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [hand, setHand] = useState([]);
  const [handScore, setHandScore] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerRevealed, setDealerRevealed] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [history, setHistory] = useState([]);
  const [doubleActive, setDoubleActive] = useState(false);
  const [standDisabled, setStandDisabled] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [endResult, setEndResult] = useState(null);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showBetError, setShowBetError] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [gameOverPopup, setGameOverPopup] = useState(false);
  const prevBalanceRef = useRef(balance); // conserve le précédent solde
  const gameOverRef = useRef(false);
  // * les const pour l'historique)
  const HISTORY_PAGE_SIZE = 5;
  const [historyPage, setHistoryPage] = useState(1);
  // Nombre total de pages
  const totalHistoryPages = Math.max(1, Math.ceil(history.length / HISTORY_PAGE_SIZE));
  // Partie visible du tableau
  const paginatedHistory = history.slice(
    (historyPage - 1) * HISTORY_PAGE_SIZE,
    historyPage * HISTORY_PAGE_SIZE
  );
  // Navigation pages
  const goToPage = (p) => {
    const page = Math.min(Math.max(1, p), totalHistoryPages);
    setHistoryPage(page);
  };
  // ***************************************


  // ** animation contenu popup A Propos **
const [typedText, setTypedText] = useState("");
const typingIntervalRef = useRef(null);

// texte memorisé
const aproposText = useMemo(() => `
** 21 Jake ** est un projet personnel visant à recréer l'expérience classique du blackjack
avec une touche moderne et immersive. L'objectif était de combiner gameplay stratégique,
design néon élégant et interface fluide pour offrir une expérience captivante aux joueurs.

Ce projet met en avant :
 - Une interface réactive et intuitive grâce à React.
 - Une vitesse de développement optimale avec Vite.
 - Des assets visuels créés avec Daz3D et Photoshop.
 - L'utilisation de l'API deckofcardsapi pour gérer les cartes en temps réel.

  
  © 2025 MagicAres. Tous droits réservés.
`, []);


// Animation machine à écrire
const startTyping = useCallback(() => {
  let i = 0;

  if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

  const interval = setInterval(() => {
    i++;
    setTypedText(aproposText.slice(0, i));

    if (i >= aproposText.length) {
      clearInterval(interval);
      typingIntervalRef.current = null;
    }
  }, 25);

  typingIntervalRef.current = interval;
}, [aproposText]);

// Stop → afficher tout le texte immédiatement
const stopTyping = useCallback(() => {
  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current);
    typingIntervalRef.current = null;
  }

  setTypedText(aproposText);
}, [aproposText]);


const closeAPropos = () => {
  stopTyping();
  setShowDropDown(false);
};

useEffect(() => {
  if (showDropDown) {
    setTypedText("");
    startTyping();
  } else {
    stopTyping();
  }

  return () => stopTyping();
}, [showDropDown, startTyping, stopTyping]);
  // ***************************************
  // gestion du canvas
  const getRandomResultImage = (win) => {
    const winImages = [win1, win2, win3, win4, win5];
    const loseImages = [lose1, lose2, lose3, lose4, lose5];
    const arr = win ? winImages : loseImages;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // *********************
  // !!! Les useEffect !!!
  // *********************
  // ----- Détecter le Game Over -----
  useEffect(() => {
    const prev = prevBalanceRef.current;
    // transition  >0  ->  <=0  (on déclenche une seule fois grâce au ref)
    if (prev > 0 && balance <= 0 && !gameOverRef.current) {
      gameOverRef.current = true; 
      const timer = setTimeout(() => {
        setGameOverPopup(true);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  
    prevBalanceRef.current = balance;
  
  }, [balance]);
  const handleRestartFromGameOver = () => {
    setGameOverPopup(false);
    // remettre à zéro le flag Game Over
    gameOverRef.current = false;
    setResultImage(null);
    // réinitialiser le solde
    setBalance(1000); 
    //resetGame();
  };


  // ??? Pour débugger dans la console ???
 // useEffect(() => console.log('balance', balance), [balance])

// ----- Gérer le canvas de résultat -----
const easeOutQuad = (t) => t * (2 - t);
// ------ animation glide + fade  -----
const animateCanvas = (imageSrc, fromX, toX, fromOpacity, toOpacity, duration = 1200, callback) => {
  const canvas = document.getElementById("resultCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const desiredCssWidth = 600;
  const desiredCssHeight = 600;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(desiredCssWidth * dpr);
  canvas.height = Math.floor(desiredCssHeight * dpr);
  canvas.style.width = `${desiredCssWidth}px`;
  canvas.style.height = `${desiredCssHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;

  img.onload = () => {
    const iw = img.width;
    const ih = img.height;
    const ratio = iw / ih;
    let w = desiredCssWidth;
    let h = w / ratio;
    if (h > desiredCssHeight) {
      h = desiredCssHeight;
      w = h * ratio;
    }
    const y = (desiredCssHeight - h) / 2;

    const startTime = performance.now();

    const step = time => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutQuad(t);

      const currentX = fromX + (toX - fromX) * easedT;
      const currentOpacity = fromOpacity + (toOpacity - fromOpacity) * easedT;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = currentOpacity;
      const glowColor = "rgba(0,255,200,0.9)";
      const glowSize = 60;
      ctx.filter = `drop-shadow(0px 0px ${glowSize}px ${glowColor})`;
      ctx.drawImage(img, currentX, y, w, h);
      ctx.filter = "none";
      ctx.globalAlpha = 1;

      if (t < 1) requestAnimationFrame(step);
      else if (callback) callback();
    };

    requestAnimationFrame(step);
  };

  img.onerror = e => console.error("Erreur chargement image canvas:", e);
};

// ------ useEffect pour afficher immédiatement l'image -----
useEffect(() => {
  const easeOutQuad = t => t * (2 - t);

  const animateCanvas = (imageSrc, fromX, toX, fromOpacity, toOpacity, duration = 800) => {
    const canvas = document.getElementById("resultCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const desiredCssWidth = 600;
    const desiredCssHeight = 600;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(desiredCssWidth * dpr);
    canvas.height = Math.floor(desiredCssHeight * dpr);
    canvas.style.width = `${desiredCssWidth}px`;
    canvas.style.height = `${desiredCssHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const iw = img.width;
      const ih = img.height;
      const ratio = iw / ih;
      let w = desiredCssWidth;
      let h = w / ratio;
      if (h > desiredCssHeight) {
        h = desiredCssHeight;
        w = h * ratio;
      }
      const y = (desiredCssHeight - h) / 2;

      const startTime = performance.now();

      const step = time => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = easeOutQuad(t);

        const currentX = fromX + (toX - fromX) * easedT;
        const currentOpacity = fromOpacity + (toOpacity - fromOpacity) * easedT;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = currentOpacity;
        const glowColor = "rgba(0,255,200,0.9)";
        const glowSize = 60;
        ctx.filter = `drop-shadow(0px 0px ${glowSize}px ${glowColor})`;
        ctx.drawImage(img, currentX, y, w, h);
        ctx.filter = "none";
        ctx.globalAlpha = 1;

        if (t < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    img.onerror = e => console.error("Erreur chargement image canvas:", e);
  };

  if (resultImage) {
    // Glide-in + fade-in depuis la droite
    animateCanvas(resultImage, -300, 0, 0, 1, 400);
  }
}, [resultImage]);

  // ***** calcul mise et gestion du jeu *****
  // ------ ajouter la mise -----
  const addBet = (amount) => {
    if (gameActive) return;
    setBet(prev => prev + amount);
  };

  // ------ reset la mise -----
  const clearBet = () => {
    if (gameActive) return;
    resetGame();
    setBet(0);
  };

  // ------ calcul du score -----
  const calculateScore = (cards) => {
    let total = 0;
    let aces = 0;
    cards.forEach(card => {
      const value = card.value;
      if (value === "ACE") {
        aces += 1;
        total += 11;
      } else if (["KING", "QUEEN", "JACK"].includes(value)) total += 10;
      else total += parseInt(value, 10);
    });
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  };

  // ------ calcul des mises secondaires -----
  const calculateSideBets = (cardsPlayer, dealerCard) => {
    let sideBetResult = { perfectPair: false, hot3: false, twentyOnePlusThree: false };
    if (cardsPlayer.length >= 2) {
      const [c1, c2] = cardsPlayer;
      if (c1.value === c2.value && c1.suit === c2.suit) sideBetResult.perfectPair = true;
    }
    if (cardsPlayer.length >= 2 && dealerCard) {
      const all3 = [cardsPlayer[0], cardsPlayer[1], dealerCard];
      const suits = all3.map(c => c.suit);
      const isFlush = suits.every(s => s === suits[0]);
      const valuesMap = { 'ACE': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13 };
      const vals = all3.map(c => valuesMap[c.value]).sort((a, b) => a - b);
      const isStraight = (vals[1] === vals[0] + 1 && vals[2] === vals[1] + 1);
      const isThreeOfKind = (all3[0].value === all3[1].value && all3[1].value === all3[2].value);
      sideBetResult.twentyOnePlusThree = isFlush || isStraight || isThreeOfKind;
      sideBetResult.hot3 = isFlush || isStraight || isThreeOfKind;
    }
    return sideBetResult;
  };

  // ------ ajouter a l'historique -----
  const addToHistory = (entry) => {
    // Toujours forcer playerCards et dealerCards
    setHistory(prev => [
      ...prev,
      {
        id: getUniqueId(),
        playerCards: entry.playerCards || [],
        dealerCards: entry.dealerCards || [],
        bet: entry.bet || 0,
        score: entry.score || 0,
        result: entry.result || "",
        balanceAfter: entry.balanceAfter || 0,
        sideBets: entry.sideBets || null
      }
    ]);
  };

    // ------ Reset mise -----
const resetBetOnly = () => {
  setBet(0);
};

  // ------ fin du jeu -----
const endGame = (
  finalPlayerCards,
  finalScore,
  result,
  finalBet,
  sideBets = null,
  finalDealerCards
) => {

  const newBalance = result === "GAGNÉ"
    ? balance + finalBet
    : balance - finalBet;

  setBalance(newBalance);

  addToHistory({
    id: getUniqueId(),
    playerCards: [...finalPlayerCards],
    dealerCards: [...finalDealerCards],
    bet: finalBet,
    score: finalScore,
    result,
    balanceAfter: newBalance,
    sideBets
  });

  setEndResult(result);
  // Si solde = 0 => game over
  if (newBalance <= 0) {
    setGameOverPopup(true);
  } else {
    setShowEndPopup(true);
  }
  setGameActive(false);
   resetBetOnly();
};

  // ------ réinitialiser le jeu -----
  const resetGame = () => {
    setCardsInHand([]);
    setHand([]);
    setHandScore(0);
    setDealerHand([]);
    setDealerRevealed(false);
    setGameActive(false);
    setDoubleActive(false);
    setStandDisabled(false);
    setBet(0);
  };

  // ------ nouveau jeu -----
  const handleNewDeck = () => {
    if (bet === 0) return;
    if (bet > balance) { setShowBetError(true); return; }

    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => {
        setDeckData(res.data);
        axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=4`)
          .then(res2 => {
            const all = res2.data.cards;
            const playerCards = [all[0], all[1]];
            const dealerCards = [all[2], all[3]];
            setCardsInHand(playerCards);
            setDealerHand(dealerCards);
            setDealerRevealed(false);
            setHand([]);
            setHandScore(calculateScore(playerCards));
            const playerScore = calculateScore(playerCards);
const dealerScore = calculateScore(dealerCards);

// Détection du blackjack naturel
const playerBJ = playerScore === 21 && playerCards.length === 2;
const dealerBJ = dealerScore === 21 && dealerCards.length === 2;

if (playerBJ || dealerBJ) {
  setDealerRevealed(true);

  if (playerBJ && dealerBJ) {
    setTimeout(() => {

      setResultImage(getRandomResultImage(true));
      endGame(playerCards, playerScore, "ÉGALITÉ", bet, null, dealerCards);
    }, 50);
  } 
  else if (playerBJ) {
    setTimeout(() => {

      setResultImage(getRandomResultImage(true));
      endGame(playerCards, playerScore, "GAGNÉ", Math.floor(bet * 1.5), null, dealerCards);
    }, 50);
  } 
  else if (dealerBJ) {
    setTimeout(() => {

      setResultImage(getRandomResultImage(false));
      endGame(playerCards, playerScore, "PERDU", bet, null, dealerCards);
    }, 50);
  }

  // Arrêter la partie et ne pas permettre de jouer
  setGameActive(false);
  return;
}


            setGameActive(true);
            setDoubleActive(false);
            setStandDisabled(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    const canvas = document.getElementById("resultCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setResultImage(null);
  };

  // ------ tour du croupier -----
 const dealerTurn = async (finalBet, forcedPlayerCards = null) => {
  if (!deckData) return;

  setDealerRevealed(true);

  let currentDealer = [...dealerHand];
  const playerFinalCards = forcedPlayerCards || [...cardsInHand, ...hand];
  let dealerScore = calculateScore(currentDealer);

  while (dealerScore < 17) {
    try {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`
      );
      const newCard = res.data.cards[0];
      currentDealer.push(newCard);
      dealerScore = calculateScore(currentDealer);
      setDealerHand([...currentDealer]);
    } catch (e) {
      console.log(e);
      break;
    }
  }

  const playerScore = calculateScore(playerFinalCards);

  let result;
  if (playerScore > 21) result = "PERDU";
  else if (dealerScore > 21) result = "GAGNÉ";
  else if (playerScore > dealerScore) result = "GAGNÉ";
  else if (playerScore < dealerScore) result = "PERDU";
  else result = "ÉGALITÉ";

  const sideBets = calculateSideBets(cardsInHand, currentDealer[0]);

  let sideBetGain = 0;
  if (sideBets.perfectPair) sideBetGain += finalBet * 25;
  if (sideBets.hot3) sideBetGain += finalBet * 10;
  if (sideBets.twentyOnePlusThree) sideBetGain += finalBet * 5;

  const totalGain = result === "GAGNÉ"
    ? finalBet + sideBetGain
    : -finalBet;

  setBalance(b => b + totalGain);
  setResultImage(getRandomResultImage(totalGain > 0));

  endGame(playerFinalCards, playerScore, result, finalBet, sideBets, currentDealer);
};

  // ------ Double Stand -----
const handleDoubleStand = () => {
  if (!gameActive) return;

  const playerCardsNow = [...cardsInHand, ...hand];
  if (playerCardsNow.length !== 2) return;

  setDoubleActive(true);
  setStandDisabled(true);



  axios
    .get(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`)
    .then(res => {
      const newCard = res.data.cards[0];
      const newHand = [...hand, newCard];

      const finalPlayerCards = [...cardsInHand, ...newHand];
      const score = calculateScore(finalPlayerCards);

      setHand(newHand);
      setHandScore(score);

      // Fin immédiate du joueur
      dealerTurn(bet * 2, finalPlayerCards);
    });
};

  // ------ Tirer une carte -----
const drawCard = () => {
  if (!deckData || !gameActive || hand.length >= 7) return;

  axios.get(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`)
    .then(res => {
      const newCard = res.data.cards[0];
      const newHand = [...hand, newCard];
      setHand(newHand);

      const totalPlayerCards = [...cardsInHand, ...newHand];
      const score = calculateScore(totalPlayerCards);
      setHandScore(score);


      if (doubleActive) {
        const finalBet = bet * 2;
        setTimeout(() => dealerTurn(finalBet), 600);
        return;
      }

      if (score > 21) {
        setResultImage(getRandomResultImage(false));
        endGame(
          totalPlayerCards,
          score,
          "PERDU",
          bet,
          null,
          [...dealerHand]   // cartes du dealer du moment
        );
        // resetGame(); // optionnel selon flux
      } else if (newHand.length >= 7) {
        setResultImage(getRandomResultImage(true));
        endGame(totalPlayerCards, score, "GAGNÉ", bet);
        // resetGame(); // optionnel selon flux
      }
    })
    .catch(err => console.log(err));
};

  // ------ Stand  -----
  const handleStand = () => {
    if (!gameActive || standDisabled) return;
    
    const finalBet = doubleActive ? bet * 2 : bet;
    dealerTurn(finalBet);
  };

  // ------ commande fermer popup -----
const closePopup = () => {
  setShowEndPopup(false);
  if (!resultImage) return;

  animateCanvas(resultImage, 0, -300, 1, 0, 1200, () => {
    setResultImage(null);
  });
};

  // ----- Le render -----
  return (
    <div className="px-0 casino-bg">
      {/* Header */}
      <Header openHistory={() => setShowHistoryPopup(true)}
        openDropdown={() => setShowDropDown(true)}
      />
      {/* POPUP HISTORIQUE */}
      <HistoryPopup
        show={showHistoryPopup}
        history={history}
        paginatedHistory={paginatedHistory}
        historyPage={historyPage}
        totalHistoryPages={totalHistoryPages}
        goToPage={goToPage}
        onClose={() => {
          setShowHistoryPopup(false);
          setHistoryPage(1);
        }}
      />
      {/* grid du jeu */}
      <div className="game-grid mt-4">
        {/* le croupier */}
        <DealerZone dealerHand={dealerHand} dealerRevealed={dealerRevealed} />
        {/* les 7 emplacements de la donne */}
        <SlotZone hand={hand} />
        {/* La main du joueur */}
        <PlayerHand cardsInHand={cardsInHand} />
      </div>
      <div className="actions-grid overlay-parent">
        <canvas
          id="resultCanvas"
          width={600}
          height={600}
          className="result-overlay"
          style={{ display: resultImage ? "block" : "none" }}
        />
        {/* Ligne 1 */}
        {/* colonne gauche vide */}
        <div />
        {/* zone de contrôle du jeu*/}
        <ControlsZone
          gameActive={gameActive}
          standDisabled={standDisabled}
          doubleActive={doubleActive}
          drawCard={drawCard}
          handleStand={handleStand}
          handleDoubleStand={handleDoubleStand}
          handScore={handScore}
        />
        {/* zone affichage solde et mise */}
        <ScoreZone balance={balance} bet={bet} />
        {/* Ligne 2 */}
        {/* colonne gauche vide */}
        {/* zone de la mise */}
        <BetZone
          bet={bet}
          clearBet={clearBet}
          handleNewDeck={handleNewDeck}
          gameActive={gameActive}
        />
        {/* Ligne 3 */}
        <ChipsZone addBet={addBet} gameActive={gameActive} />
      </div>
      {/* Popup gagné - Perdu */}
      <Popups
        showEndPopup={showEndPopup}
        endResult={endResult}
        closePopup={closePopup}
        showBetError={showBetError}
        setShowBetError={setShowBetError}
        gameOverPopup={gameOverPopup}
        handleRestartFromGameOver={handleRestartFromGameOver}
      />
      {/* A Propos */}
      {showDropDown && (
        <div className="popup-overlay" onClick={stopTyping}>
          <div className="popup-wrapper">
            <div className="popup-apropos" onClick={(e) => e.stopPropagation()}>
              <h1 className="apropos-title">A Propos</h1>
              <div className="apropos-animated">
                <pre className="apropos-typewriter">
                  {typedText.split("\n").map((line, i) => (
                    <div
                      key={i}
                      className={line.startsWith("  ") ? "line-centered" : ""}
                    >
                      {line.replace(" © ", "     © ")}
                    </div>
                  ))}
                </pre>
              </div>
              <button onClick={closeAPropos} className="btn-close-apropos  ">Ok</button>
            </div>
          </div>
        </div>
)}
    </div>
  );
}

export default App;


