declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV?: 'development' | 'production' | 'test'
        PORT?: number
        SECRET?: string

        DB_HOST?: string
        DB_USER?: string
        DB_PASSWORD?: string
        DB_NAME?: string
        DB_PORT?: number

        MENVIO_URL: string
        MENVIO_TOKEN: string

        CEP: string
        STATE: string
        CITY: string

        PAGARME_API_KEY: string
        POSTBACK_URL: string

        GESTAO_URL: string
        GESTAO_ACCESS_TOKEN: string
        GESTAO_SECRET_TOKEN: string

        WEB_URL: string
        MAILER_HOST: string
        MAILER_PORT: number
        MAILER_USER: string
        MAILER_PASS: string
    }
}