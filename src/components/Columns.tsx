import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CardInfo, ColumnInfo } from "../types";
import Column from "./Column";

type ColumnsProps = {
  columns: ColumnInfo[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnInfo[]>>;
};

const Columns: React.FC<ColumnsProps> = React.memo(({ columns, setColumns }) => {
  const onClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newColumn: ColumnInfo = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
      cards: [],
    };
    setColumns([...columns, newColumn]);
  };

  const addCard = (card: CardInfo) => {
    setColumns(
      columns.map((column) =>
        column.id === card.columnId
          ? {
              ...column,
              cards: [...column.cards, card],
            }
          : column
      )
    );
  };

  const swapCards = (fromCard: CardInfo, toCard: CardInfo) => {
    setColumns(
      columns.map((column) => {
        return {
          id: column.id,
          title: column.title,
          cards: column.cards.map((card) => {
            if (card.id === fromCard.id) {
              return toCard;
            }
            if (card.id === toCard.id) {
              return fromCard;
            }
            return card;
          }),
        };
      })
    );
  };

  const removeCard = (id: string) => {
    setColumns(
      columns.map((column) => {
        return {
          id: column.id,
          title: column.title,
          cards: column.cards.filter((card) => card.id !== id),
        };
      })
    );
  };

  const updateCard = (card: CardInfo) => {
    setColumns(
      columns.map((column) => {
        return {
          id: column.id,
          title: column.title,
          cards: column.cards.map((c) => {
            if (c.id === card.id) return card;
            return c;
          }),
        };
      })
    );
  };

  const moveCardToColumn = (card: CardInfo, columnId: string) => {
    setColumns(
      columns.map((column) => {
        if (column.id === card.columnId) {
          return {
            id: column.id,
            title: column.title,
            cards: column.cards.filter((c) => c.id !== card.id),
          };
        }
        if (column.id === columnId) {
          return {
            id: column.id,
            title: column.title,
            cards: [...column.cards, card],
          };
        }
        return column;
      })
    );
  };

  const setColumnTitle = (id: string, title: string) => {
    setColumns(columns.map((column) => (column.id === id ? { id, title, cards: column.cards } : column)));
  };

  const removeColumn = (id: string) => {
    setColumns(
      columns.filter((column) => {
        if (column.id === id && column.cards.length === 0) return false;
        return true;
      })
    );
  };

  return (
    <div className="columns-container">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          setTitle={setColumnTitle}
          cards={column.cards}
          addCard={addCard}
          swapCards={swapCards}
          removeCard={removeCard}
          moveCardToColumn={moveCardToColumn}
          removeColumn={removeColumn}
          updateCard={updateCard}
        />
      ))}
      <button className="column add-column-btn" onClick={onClick}>
        +
      </button>
    </div>
  );
});

export default Columns;
