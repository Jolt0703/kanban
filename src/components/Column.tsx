import React, { useEffect } from "react";
import Cards from "./Cards";

type ColumnProps = {
  id: string;
  title: string;
  setTitle: (id: string, title: string) => void;
};

type ColumnTitleProps = Pick<ColumnProps, "title" | "setTitle">;

const ColumnTitle: React.FC<ColumnProps> = ({ id, title, setTitle }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [titleInput, setTitleInput] = React.useState(title);
  const inputElement = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing) {
      inputElement.current!.focus();
    }
  }, [isEditing]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(id, e.target.value);

    setTitleInput(e.target.value);
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
  const onClick = () => {
    setIsEditing(true);
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
        onKeyPress={handleKeyPress}
        ref={inputElement}
        style={{ display: isEditing ? "block" : "none" }}
      />
    </div>
  );
};

const Column: React.VFC<ColumnProps> = ({ id, title, setTitle }) => {
  return (
    <div className="column">
      <ColumnTitle id={id} title={title} setTitle={setTitle} />
      <Cards />
    </div>
  );
};

export default Column;
