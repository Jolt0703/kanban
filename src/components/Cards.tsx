import React from "react";
import { Card, NewCardInput } from "./Card";
import { v4 as uuidv4 } from "uuid";
import { CardInfo } from "../types";

type props = {
  columnId: string;
  cards: CardInfo[];
  addCard: (id: string, text: string, columnId: string) => void;
};

const Cards: React.VFC<props> = React.memo(({ columnId, cards, addCard }) => {
  // const addCard = (id: string, text: string, columnId: string) => {
  //   setCards([...cards, { id, text, columnId }]);
  // };

  return (
    <div className="container">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} columnId={columnId} />
      ))}
      <NewCardInput id={uuidv4()} addCard={addCard} columnId={columnId} />
    </div>
  );
});

export default Cards;
