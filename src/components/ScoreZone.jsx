const ScoreZone = ({ balance, bet }) => {
  return (
    <div className="score-zone">
      <h5 className="neon-text">
        💰 Solde : {balance}{" "}
        <img
          src="/src/assets/imgs/j-coin.png"
          alt="Jake Coins"
          width="24"
          height="24"
        />
      </h5>
      <h5 className="neon-text">
        🎯 Mise : {bet}{" "}
        <img
          src="/src/assets/imgs/j-coin.png"
          alt="Jake Coins"
          width="24"
          height="24"
        />
      </h5>
    </div>
  );
};

export default ScoreZone;
