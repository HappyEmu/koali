declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_DATABASE_URL: string
      GCS_PROJECT_ID: string
      GCS_BUCKET_NAME: string
      GCS_SERVICE_ACCOUNT_PRIVATE_KEY: string
      GCS_SERVICE_ACCOUNT_CLIENT_EMAIL: string
      GCS_SERVICE_ACCOUNT_CLIENT_ID: string
    }
  }
}

export {}
