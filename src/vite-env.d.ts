/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_KANBAN_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
