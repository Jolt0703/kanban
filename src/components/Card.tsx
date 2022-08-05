import React from "react";
import { CardInfo } from "../types";
import { CardsProps } from "./Cards";
import Tooltip from "./layout/Tooltip";

type InputProps = CardInfo &
  Partial<CardsProps> & {
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  };
type CardProps = CardInfo & Pick<CardsProps, "swapCards" | "removeCard" | "updateCard">;

export const Card: React.FC<CardProps> = React.memo(({ id, text, columnId, swapCards, removeCard, updateCard }) => {
  const initialClassName = "card card-span";
  const [className, setClassName] = React.useState(initialClassName);
  const [showToolTip, setShowToolTip] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
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
    setShowToolTip(true);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current?.querySelectorAll(".tooltip").length === 0) {
      setShowToolTip(false);
    }
  };

  return isEditing ? (
    <CardInputArea id={id} columnId={columnId} text={text} updateCard={updateCard} setIsEditing={setIsEditing} />
  ) : (
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
      {showToolTip ? <pre className="translucent">{text}</pre> : <pre>{text}</pre>}
      {showToolTip && (
        <Tooltip id={id} removeCard={removeCard} setShowToolTip={setShowToolTip} setIsEditing={setIsEditing}>
          <i className="card-edit">...</i>{" "}
        </Tooltip>
      )}
    </div>
  );
});

export const CardInputArea: React.FC<InputProps> = React.memo(
  ({ id, columnId, text, addCard, updateCard, setIsEditing }) => {
    const textAreaElem = React.useRef<HTMLTextAreaElement>(null);
    const [inputText, setInputText] = React.useState(text);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(e.target.value);
    };

    const initializeTextArea = () => {
      setInputText("");
      textAreaElem.current!.style.height = "15px";
    };

    const editCardText = (newText: string) => {
      const newCard = { id, columnId, text: newText };
      if (newCard.text && addCard) {
        textAreaElem.current!.blur();
        addCard(newCard);
        initializeTextArea();
        textAreaElem.current!.focus();
      } else if (updateCard && setIsEditing) {
        setIsEditing(false);
        updateCard(newCard);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        textAreaElem.current!.style.height = "15px";
        editCardText(e.currentTarget.value);
      }
    };

    const autoGrowHeight = () => {
      if (inputText) {
        textAreaElem.current!.style.height = "15px";
        textAreaElem.current!.style.height = `${textAreaElem.current!.scrollHeight - 15}px`;
      }
    };

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      editCardText(inputText);
      initializeTextArea();
    };

    React.useEffect(() => {
      autoGrowHeight();
      if (setIsEditing) textAreaElem.current!.focus();
    }, []);

    return (
      <textarea
        className="card-input"
        onChange={onChange}
        onInput={autoGrowHeight}
        onBlur={onBlur}
        value={inputText}
        ref={textAreaElem}
        onKeyPress={handleKeyPress}
        {...(!setIsEditing && { placeholder: "+ Enter a new Card" })}
      />
    );
  }
);
