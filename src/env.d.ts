declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    DATABASE_URL?: string
    SERVER_URL?: string
    PORT?: string | number
    JWT_SECRET?: string
    EXPIRES_IN?: string
    REFRESH_EXPIRES_IN?: string
    EMAIL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_KEY: string
    BROKER_URL: string
  }
}