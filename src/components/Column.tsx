import React, { useEffect } from "react";
import { ColumnInfo } from "../types";
import Cards from "./Cards";

type ColumnProps = ColumnInfo & {
  addCard: (id: string, text: string, columnId: string) => void;
  setTitle: (id: string, title: string) => void;
};

type ColumnTitleProps = Omit<ColumnProps, "cards" | "addCard">;

// type ColumnTitleProps = Pick<ColumnProps, "title" | "setTitle">;

const ColumnTitle: React.FC<ColumnTitleProps> = React.memo(
  ({ id, title, setTitle }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(title);
    const inputElement = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isEditing) {
        inputElement.current!.focus();
      }
    }, [isEditing]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleInput(e.target.value);
    };

    const onClick = () => {
      setIsEditing(true);
    };

    const onBlur = () => {
      const s = inputElement.current!.value.trim();
      if (s) {
        setTitle(id, s);
        setIsEditing(false);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const s = e.currentTarget.value.trim();
        if (s) {
          setTitle(id, s);
          setIsEditing(false);
        }
      }
    };

    return (
      <div className="column-title">
        <h2 style={{ display: isEditing ? "none" : "block" }} onClick={onClick}>
          {titleInput}
        </h2>
        <input
          type="text"
          value={titleInput}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={handleKeyPress}
          ref={inputElement}
          style={{ display: isEditing ? "block" : "none" }}
        />
      </div>
    );
  }
);

const Column: React.VFC<ColumnProps> = React.memo(
  ({ id, title, cards, setTitle, addCard }) => {
    return (
      <div className="column">
        <ColumnTitle id={id} title={title} setTitle={setTitle} />
        <Cards columnId={id} cards={cards} addCard={addCard} />
      </div>
    );
  }
);

export default Column;
