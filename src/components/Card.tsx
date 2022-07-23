import React from "react";
import { CardInfo } from "../types";
import { CardsProps } from "./Cards";
import Tooltip from "./layout/Tooltip";

type InputProps = Omit<CardInfo, "text"> & Pick<CardsProps, "addCard">;

type CardProps = CardInfo & Pick<CardsProps, "swapCards" | "removeCard">;

export const Card: React.FC<CardProps> = React.memo(({ id, text, columnId, swapCards, removeCard }) => {
  const initialClassName = "card card-span";
  const [className, setClassName] = React.useState(initialClassName);
  const [isEditable, setIsEditable] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setClassName(className + " dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify({ id, text, columnId }));
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setClassName(initialClassName);
  };

  const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setClassName(initialClassName);
    const fromCard = JSON.parse(e.dataTransfer.getData("application/json"));
    if (fromCard.id !== id) {
      const toCard = { id, text, columnId };
      swapCards(fromCard, toCard);
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    setClassName(className + " card-drag-enter");
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setClassName(initialClassName);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEditable(true);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current?.querySelectorAll(".tooltip").length === 0) {
      setIsEditable(false);
    }
  };

  return (
    <div
      className={className}
      draggable="true"
      onDragStart={dragStart}
      onDrop={dragDrop}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragEnd={dragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={cardRef}
    >
      {isEditable ? <span className="translucent">{text}</span> : <span>{text}</span>}
      {isEditable && (
        <Tooltip id={id} removeCard={removeCard} setIsEditable={setIsEditable}>
          <i className="card-edit">...</i>{" "}
        </Tooltip>
      )}
    </div>
  );
});

export const NewCardInput: React.FC<InputProps> = React.memo(({ id, columnId, addCard }) => {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const s = e.currentTarget.value.trim();
      if (s) {
        inputElement.current!.blur();
        addCard(id, s, columnId);
        await setText("");
        inputElement.current!.focus();
      }
    }
  };

  return (
    <input
      className="card card-input"
      type="text"
      onChange={onChange}
      value={text}
      ref={inputElement}
      onKeyPress={handleKeyPress}
      placeholder="+ Enter a new Card"
    />
  );
});
