import React from "react";
import { Card, CardInputArea } from "./Card";
import { v4 as uuidv4 } from "uuid";
import { CardInfo } from "../types";
import { ColumnProps } from "./Column";

export type CardsProps = {
  columnId: string;
  cards: CardInfo[];
} & Pick<ColumnProps, "addCard" | "swapCards" | "removeCard" | "updateCard">;

const Cards: React.FC<CardsProps> = React.memo(({ columnId, cards, addCard, swapCards, removeCard, updateCard }) => {
  return (
    <div className="container">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          columnId={columnId}
          swapCards={swapCards}
          removeCard={removeCard}
          updateCard={updateCard}
        />
      ))}
      <CardInputArea id={uuidv4()} columnId={columnId} text="" addCard={addCard} updateCard={updateCard} />
    </div>
  );
});

export default Cards;
