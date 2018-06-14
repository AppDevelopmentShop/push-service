export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 80
export const DRYRUN = process.env.DRYRUN || false
export const PG_DB = process.env.PG_DB || 'push_db'
export const PG_USER = process.env.PG_USER || 'push'
export const PG_PASSWORD = process.env.PG_PASSWORD || '12345678'
export const PG_HOST = process.env.PG_HOST || 'localhost'
export const PG_PORT = process.env.PG_PORT || '5432'
export const FIREBASE_DB = process.env.FIREBASE_DB || ''
export const FIREBASE_COLOR = process.env.FIREBASE_COLOR || '#111111'
export const FIREBASE_DRYRUN = process.env.FIREBASE_DRYRUN || false
export const FIREBASE_TTL = process.env.FIREBASE_TTL || 3600 * 1000

export const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT || false

export const TYPE = process.env.TYPE || false
export const PROJECT_ID = process.env.PROJECT_ID || false
export const PRIVATE_KEY_ID = process.env.PRIVATE_KEY_ID || false
export const PRIVATE_KEY = process.env.PRIVATE_KEY || false
export const CLIENT_EMAIL = process.env.CLIENT_EMAIL || false
export const CLIENT_ID = process.env.CLIENT_ID || false
export const AUTH_URI = process.env.AUTH_URI || false
export const TOKEN_URI = process.env.TOKEN_URI || false
export const AUTH_PROVIDER_X509_CERT_URL = process.env.AUTH_PROVIDER_X509_CERT_URL || false
export const CLIENT_X509_CERT_URL = process.env.CLIENT_X509_CERT_URL || false
