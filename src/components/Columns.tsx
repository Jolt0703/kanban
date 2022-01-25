import React from "react";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";

const Columns = () => {
  let initialColumns: any[] | (() => any[]) = [
    // {
    //   id: uuidv4(),
    //   title: "Column 1",
    // },
  ];
  const [columns, setColumns] = React.useState(initialColumns);
  const onClick = (e: any) => {
    const newColumn = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const setColumnTitle = (id: string, title: string) => {
    columns.map((column) => (column.id === id ? { id, title } : column));
  };

  return (
    <div className="columns-container">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          setTitle={setColumnTitle}
        />
      ))}
      <button className="column add-column-btn" onClick={onClick}>
        +
      </button>
      {/* <button onClick={onClick}>＋</button> */}
    </div>
  );
};

export default Columns;
