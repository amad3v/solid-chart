/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOLID_CHART_NAME: string;
  readonly VITE_SOLID_CHART_VER: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
