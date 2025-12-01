const ChipsZone = ({ addBet, gameActive }) => {
  const chipValues = [10, 100, 1000, 10000];

  return (
    <>
      <div></div>
      <div className="chips-zone">
        {chipValues.map((v) => (
          <button
            key={v}
            className="chip-btn"
            onClick={() => addBet(v)}
            disabled={gameActive}
          >
            <img src={`/src/assets/imgs/chip-${v}.png`} width={32} alt={`chip-${v}`} />
            <span>+{v}</span>
          </button>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default ChipsZone;
