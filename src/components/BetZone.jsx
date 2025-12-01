const BetZone = ({ bet, clearBet, handleNewDeck, gameActive }) => {
  return (
    <>
      <div></div>
      <div className="bet-zone">
        <button
          className="btn-ui-4"
          onClick={clearBet}
          disabled={gameActive || bet === 0}
        >
          Reset
        </button>
        <input
          type="number"
          readOnly
          value={bet}
          className="bet-input-neon"
        />
        <button
          className="btn-ui-5"
          onClick={handleNewDeck}
          disabled={bet === 0 || gameActive}
        >
          Nouveau Jeu
        </button>
      </div>
      <div></div>
    </>
  );
};

export default BetZone;
