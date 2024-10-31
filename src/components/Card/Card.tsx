import React from "react";
import "./Card.css";
import { MemoryCard } from "../../data/datd";

interface CardProps {
  card: MemoryCard;
  IfActiveCard: (card: MemoryCard) => void;
}

const Card: React.FC<CardProps> = ({ card, IfActiveCard }) => {
  const handleClick = () => {
    IfActiveCard(card);
  };

  return (
    <div className="card" onClick={()=>{card.ifFind && handleClick}}>
      {card.active ? (
        <img src={card.image} alt={`Card with image ${card.image}`} />
      ) : (
        <div className="card-back"> 🤠 </div>
      )}
    </div>
  );
};

export default Card;
