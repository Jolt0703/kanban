import React from "react";
import { Card, NewCardInput } from "./Card";
import { v4 as uuidv4 } from "uuid";

const Cards = () => {
  let InitialCards: any[] | (() => any[]) = [];

  const [cards, setCards] = React.useState(InitialCards);

  const addCard = (id: string, text: string) => {
    setCards([...cards, { id, text }]);
  };

  return (
    <div className="container">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} />
      ))}
      <NewCardInput id={uuidv4()} addCard={addCard} />
    </div>
  );
};

export default Cards;
