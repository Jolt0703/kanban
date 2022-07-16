import React from "react";
import { Card, NewCardInput } from "./Card";
import { v4 as uuidv4 } from "uuid";
import { CardInfo, ColumnInfo } from "../types";
import { ColumnProps } from "./Column";

export type CardsProps = {
  columnId: string;
  cards: CardInfo[];
} & Pick<ColumnProps, "addCard" | "swapCards" | "removeCard">;

const Cards: React.FC<CardsProps> = React.memo(({ columnId, cards, addCard, swapCards, removeCard }) => {
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
        />
      ))}
      <NewCardInput id={uuidv4()} addCard={addCard} columnId={columnId} />
    </div>
  );
});

export default Cards;
