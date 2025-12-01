const Popups = ({
  showEndPopup,
  endResult,
  closePopup,
  showBetError,
  setShowBetError,
  gameOverPopup,
  handleRestartFromGameOver
}) => {
  return (
    <>
      {/* Popup résultat */}
      {showEndPopup && (
        <div className="popup-overlay">
          <div className="popup-result">
            <h2 className={endResult === "GAGNÉ" ? "text-success" : "text-danger"}>
              {endResult === "GAGNÉ" ? "🎉 Vous avez gagné !" : "💀 Vous avez perdu !"}
            </h2>
            <button className="btn-neon" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

      {/* Popup erreur mise */}
      {showBetError && (
        <div className="popup-overlay">
          <div className="popup-error">
            <h4 className="text-danger">Montant trop élevé</h4>
            <p>Vous n'avez pas assez de solde.</p>
            <button className="btn-neon" onClick={() => setShowBetError(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Popup Game Over */}
      {gameOverPopup && (
        <div className="popup-go-overlay">
          <div className="popup-box">
            <h1>💀 Game Over 💀</h1>
            <p>Vous avez perdu et</p>
            <p>votre solde est épuisé.</p>
            <button onClick={handleRestartFromGameOver}>Nouvelle Partie</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popups;
