import dosCarte from '../assets/imgs/dosCarte.png'; 

const DealerZone = ({ dealerHand = [], dealerRevealed = false }) => {
  return (
    <div className="dealer-zone">
      <h4 className="dealer-name neon-text jake-ttf">Jake</h4>
      <div className="cards-row">
        {dealerHand.length > 0 ? (
          dealerHand.map((c, i) =>
            !dealerRevealed && i === 1 ? (
              <img key={i} src={dosCarte} className="card" alt="Carte face cachée" />
            ) : (
              <img key={i} src={c.image} className="card" alt={c.code} />
            )
          )
        ) : (
          <p>Pas de carte</p>
        )}
      </div>
    </div>
  );
};

export default DealerZone;
