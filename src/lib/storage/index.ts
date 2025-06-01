import { Storage } from '@google-cloud/storage'

const options = {
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_id: process.env.GCS_SERVICE_ACCOUNT_CLIENT_ID,
    client_email: process.env.GCS_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GCS_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
}

const storage = new Storage(options)

export function getStorage() {
  return storage
}
