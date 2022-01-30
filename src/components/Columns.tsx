import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnInfo } from "../types";
import Column from "./Column";

type ColumnsProps = {
  columns: ColumnInfo[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnInfo[]>>;
};

const Columns: React.VFC<ColumnsProps> = React.memo(
  ({ columns, setColumns }) => {
    const onClick = (e: any) => {
      const newColumn: ColumnInfo = {
        id: uuidv4(),
        title: `Column ${columns.length + 1}`,
        cards: [],
      };
      setColumns([...columns, newColumn]);
    };

    const addCard = (id: string, text: string, columnId: string) => {
      setColumns(
        columns.map((column) =>
          column.id === columnId
            ? {
                id: columnId,
                title: column.title,
                cards: [...column.cards, { id, text, columnId }],
              }
            : column
        )
      );
    };

    const setColumnTitle = (id: string, title: string) => {
      setColumns(
        columns.map((column) =>
          column.id === id ? { id, title, cards: column.cards } : column
        )
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
          />
        ))}
        <button className="column add-column-btn" onClick={onClick}>
          +
        </button>
      </div>
    );
  }
);

export default Columns;
