export type ColumnInfo = {
  id: string;
  title: string;
  cards: CardInfo[] | [];
};

export type CardInfo = {
  id: string;
  text: string;
  columnId: string;
};
