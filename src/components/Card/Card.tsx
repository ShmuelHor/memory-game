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
    <div
      style={{ border: card.ifFind ? "2px solid #6B8E23" : " " }}
      className={card.ifFind ? "card-find" : "card"}
      onClick={() => {
        !card.ifFind ? handleClick() : null;
      }}
    >
      {card.active ? (
        <img src={card.image} alt={`Card with image ${card.image}`} />
      ) : (
        <div className="card-back"> 🤠 </div>
      )}
    </div>
  );
};

export default Card;
