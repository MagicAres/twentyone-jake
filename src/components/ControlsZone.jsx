const ControlsZone = ({ gameActive, standDisabled, doubleActive, drawCard, handleStand, handleDoubleStand, handScore }) => {
  return (
    <div className="controls-zone">
      <div className="btn-row">
        <button className="btn-ui-1" disabled={!gameActive} onClick={drawCard}>
          Carte 🤛🏻
        </button>
        <button className="btn-ui-2" disabled={!gameActive || standDisabled} onClick={handleStand}>
          Stand
        </button>
        <button className="btn-ui-3" disabled={!gameActive || doubleActive} onClick={handleDoubleStand}>
          Double
        </button>
      </div>
      <h5 className="neon-text">🂡 Score : {handScore}</h5>
    </div>
  );
};

export default ControlsZone;
