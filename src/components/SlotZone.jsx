import caseCarte from "../assets/imgs/caseCarte.png"; 

const SlotZone = ({ hand = [] }) => {
  return (
    <div className="slots-zone">
      {Array.from({ length: 7 }).map((_, i) => (
        <img
          key={i}
          src={hand[i] ? hand[i].image : caseCarte}
          className="slot-card"
        />
      ))}
    </div>
  );
};

export default SlotZone;
