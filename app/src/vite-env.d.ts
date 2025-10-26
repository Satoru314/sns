/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  // 他の環境変数があればここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
