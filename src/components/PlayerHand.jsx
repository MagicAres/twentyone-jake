import caseCarte from "../assets/imgs/caseCarte.png"; 

const PlayerHand = ({ cardsInHand = [] }) => {
  return (
    <div className="player-zone">
      <h4 className="neon-text text-center mb-2 casino">Votre Main</h4>
      <div className="cards-row">
        {cardsInHand.length === 0 ? (
          <>
            <img src={caseCarte} className="card" />
            <img src={caseCarte} className="card" />
          </>
        ) : (
          cardsInHand.map(c => <img key={c.code} src={c.image} className="card" />)
        )}
      </div>
    </div>
  );
};

export default PlayerHand;
