import React from "react";
import Card from "../Card/Card";
import "./GameCards.css";
import { MemoryCard } from "../../data/datd";

interface GameCardsProps {
  mixedCards: MemoryCard[];
  IfActiveCard: (card: MemoryCard) => void;
  startNewGame: () => void;
}

const GameCards: React.FC<GameCardsProps> = ({
  mixedCards,
  IfActiveCard,
  startNewGame,
}) => {
  return (
    <div>
      <div className="GameCards">
        {mixedCards.map((card) => (
          <Card key={card.id} card={card} IfActiveCard={IfActiveCard} />
        ))}
      </div>
      <button className="card-button" onClick={startNewGame}>
        Home screen
      </button>
    </div>
  );
};

export default GameCards;
