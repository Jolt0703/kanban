import React, { useEffect } from "react";
import Columns from "./components/Columns";
import { ColumnInfo } from "./types";

const APP_KEY = "KANBAN_APP_KEY";

const App = () => {
  const appState = localStorage.getItem(APP_KEY);
  const initialState: ColumnInfo[] = appState ? JSON.parse(appState) : [];
  const [columns, setColumns] = React.useState(initialState);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(columns));
  }, [columns]);

  return (
    <>
      <Columns columns={columns} setColumns={setColumns} />
    </>
  );
};

export default App;
