import React, { useState } from "react";
import GameCards from "../GameCards/GameCards";
import "./GameApp.css";
import { MemoryCard, memoryCards } from "../../data/datd";
import HomePage from "../HomePage/HomePage";

const GameApp: React.FC = () => {
  const [mixedCards, setMixedCards] = useState<MemoryCard[]>([]);
  const [activeCards, setActiveCards] = useState<MemoryCard[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false); 

  const startNewGame = () => {
    setIsGameStarted(false);
    setUsername("");
    setMixedCards([]);
    setActiveCards([]);
    setAttempts(0);
    setIsGameOver(false); 
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1);
  };

  const startGame = (username: string, cardNumber: string) => {
    setUsername(username);
    const newList = memoryCards.slice(0, parseInt(cardNumber, 10));
    setMixedCards(shuffleArray(newList));
    setIsGameStarted(true);
  };

  function shuffleArray(array: MemoryCard[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const IfActiveCard = (card: MemoryCard) => {
    if (!card.active && activeCards.length < 2) {
      setActiveCards((prev) => [...prev, card]);
      card.active = true;
      setMixedCards((prev) => [...prev]);
      setAttempts(attempts + 1);
      if (activeCards.length === 1) {
        checkManyCardsActive(card);
      }
    }
  };

  const checkManyCardsActive = (newCard: MemoryCard) => {
    const [firstCard] = activeCards;
    if (firstCard.image === newCard.image) {
      setTimeout(() => {
        setMixedCards((prev) =>
          prev.filter((card) => card.image !== firstCard.image)
        );
        setActiveCards([]);

        if (mixedCards.length === 2) {
          setIsGameOver(true); 
        }
      }, 1750);
    } else {
      setTimeout(() => resetActiveCards(), 2000);
    }
  };

  const resetActiveCards = () => {
    setMixedCards((prev) =>
      prev.map((card) => ({
        ...card,
        active: false,
      }))
    );
    setActiveCards([]);
  };

  return (
    <div className="gameApp">
      <h1>Welcome {username} to the Game!</h1>
      {!reset && !isGameStarted ? (
        <HomePage aa={startGame} />
      ) : isGameOver ? (
        <div className="game-over">
          <h2>You Wen!</h2>
          <p>Total Attempts: {attempts}</p>
          <button onClick={startNewGame}>Play Again</button>
        </div>
      ) : (
        <GameCards
          mixedCards={mixedCards}
          IfActiveCard={IfActiveCard}
          startNewGame={startNewGame}
        />
      )}
    </div>
  );
};

export default GameApp;
