import React, { useEffect } from "react";
import { CardInfo } from "../types";

type InputProps = Omit<CardInfo, "text"> & {
  addCard: (id: string, text: string, columnId: string) => void;
};

export const Card: React.VFC<CardInfo> = React.memo(({ id, text }) => {
  return (
    <div className="card card-span">
      <span>{text}</span>
    </div>
  );
});

export const NewCardInput: React.VFC<InputProps> = React.memo(
  ({ id, columnId, addCard }) => {
    const inputElement = React.useRef<HTMLInputElement>(null);
    const [text, setText] = React.useState("");

    // useEffect(() => {
    //   setText("");
    //   inputElement.current!.focus();
    // }, [id]);

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
  }
);
