import React, { useEffect, useState } from "react";
import GameCards from "../GameCards/GameCards";
import "./GameApp.css";
import { MemoryCard, memoryCards } from "../../data/datd";
import HomePage from "../HomePage/HomePage";
let listCards: MemoryCard[] = [];

const GameApp: React.FC = () => {
  const [mixedCards, setMixedCards] = useState<MemoryCard[]>([]);
  const [activeCards, setActiveCards] = useState<MemoryCard[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    listCards = [...memoryCards];
    console.log("first");
  }, []);

  const startNewGame = () => {
    setIsGameStarted(false);
    setUsername(username ? username : "");
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
    const newList: MemoryCard[] = listCards.slice(0, parseInt(cardNumber, 10));
    setMixedCards(shuffleArray(newList));
    resetActiveCards();
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
          prev.map((card) => {
            return card.image === firstCard.image
              ? { ...card, ifFind: true }
              : card;
          })
        );
        setActiveCards([]);
        const cardsNotFind = mixedCards.filter((card) => !card.ifFind);
        if (cardsNotFind.length === 2) {
          setIsGameOver(true);
        }
      }, 1750);
    } else {
      setTimeout(() => resetActiveCards(), 2000);
    }
  };

  const resetActiveCards = () => {
    setMixedCards((prev) =>
      prev.map((card) => {
        return card.ifFind === true
          ? { ...card, active: true }
          : { ...card, active: false };
      })
    );
    setActiveCards([]);
  };

  return (
    <div className="gameApp">
      <h1>Welcome {username} to the Game!</h1>
      {!reset && !isGameStarted ? (
        <HomePage
          startGame={startGame}
          userName={username}
          setUsername={setUsername}
        />
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
