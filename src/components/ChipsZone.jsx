import chip10 from '../assets/imgs/chip-10.png';
import chip100 from '../assets/imgs/chip-100.png';
import chip1000 from '../assets/imgs/chip-1000.png';
import chip10000 from '../assets/imgs/chip-10000.png';

const ChipsZone = ({ addBet, gameActive }) => {
  const chips = [
    { value: 10, src: chip10 },
    { value: 100, src: chip100 },
    { value: 1000, src: chip1000 },
    { value: 10000, src: chip10000 },
  ];

  return (
    <>
    <div></div>
    <div className="chips-zone">
      {chips.map((chip) => (
        <button
          key={chip.value}
          className="chip-btn"
          onClick={() => addBet(chip.value)}
          disabled={gameActive}
        >
          <img src={chip.src} width={32} alt={`chip-${chip.value}`} />
          <span>+{chip.value}</span>
        </button>
      ))}
    </div>
    <div></div>
    </>
  );
};

export default ChipsZone;

