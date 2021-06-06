declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'test'
    PORT?: number
    SECRET?: string

    DB_TYPE: string
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    DB_PORT: number

    APP_URL: string
    STORAGE_TYPE: string

    S3_BUCKET: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
    AWS_DEFAULTT_REGION: string
  }
}
