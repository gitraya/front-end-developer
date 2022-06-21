import "./Cards.css";
import Card from "./Card";

const Cards = ({ stays }) => {
  return (
    <div className="cards grid-container">
      {stays.map((stay) => (
        <Card stay={stay} key={stay.id} />
      ))}
    </div>
  );
};

export default Cards;
