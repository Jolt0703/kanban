import React, { useEffect } from "react";

export type Card = {
  id: string;
  text: string;
};

type InputProps = Pick<Card, "id"> & {
  addCard: (id: string, text: string) => void;
};

export const Card: React.VFC<Card> = ({ id, text }) => {
  return (
    <div className="card card-span">
      <span>{text}</span>
    </div>
  );
};

export const NewCardInput: React.VFC<InputProps> = ({ id, addCard }) => {
  const inputElement = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState("");

  useEffect(() => {
    setText("");
    inputElement.current!.focus();
  }, [id]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const s = e.currentTarget.value.trim();
      if (s) {
        inputElement.current!.blur();
        addCard(id, s);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("NewCardInput: onChange");

    setText(e.target.value);
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
};
