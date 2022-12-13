declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'dev' | 'production'
      readonly API_BASE_URL: string
      readonly IGNORE_SERVICE_WORKER: 'true' | 'false'
    }
  }
