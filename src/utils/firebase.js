import fs from 'fs'
import appRoot from 'app-root-path'
import * as admin from 'firebase-admin/lib/index'
import {
  FIREBASE_DB,
  FIREBASE_COLOR,
  FIREBASE_DRYRUN,
  FIREBASE_TTL,
  SERVICE_ACCOUNT,
  NODE_ENV,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  CLIENT_EMAIL,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL, CLIENT_ID, PRIVATE_KEY
} from '../config/env.config'



let serviceAccount
if (NODE_ENV === 'development') {
  // IN DEVELOPMENT USE SERVICE ACCOUNT FROM FILE
  serviceAccount = fs.readFileSync(`${appRoot}/src/config/serviceAccountKey.json`)
  serviceAccount = JSON.parse(serviceAccount)
} else {
  // IN PRODUCTION
  if (SERVICE_ACCOUNT) {
    // USE SERVICE ACCOUNT FROM ONE ENV VARIABLE
    serviceAccount = JSON.parse(SERVICE_ACCOUNT)
  } else {
    // OR BUILD FROM GROUP ENV VARIABLES
    serviceAccount = {
      type: TYPE,
      project_id: PROJECT_ID,
      private_key_id: PRIVATE_KEY_ID,
      private_key: PRIVATE_KEY,
      client_email: CLIENT_EMAIL,
      client_id: CLIENT_ID,
      auth_uri: AUTH_URI,
      token_uri: TOKEN_URI,
      auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: CLIENT_X509_CERT_URL
    }
  }
}


// INITIALIZE FIREBASE ADMIN BUT NOT IN TEST
if (NODE_ENV !== 'test') {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DB
  })
}



async function send (info, token) {
  const message = {
    notification: {
      title: info.title,
      body: info.body,
    },
    android: {
      ttl: info.ttl || FIREBASE_TTL,
      notification: {
        color: info.color || FIREBASE_COLOR,
      },
    },
    apns: {
      payload: {
        aps: {
          badge: 0,
        },
      },
    },
    token: token
  }
  if (info.payload) {
    message.data = info.payload
  }
  return admin.messaging().send(message, !!FIREBASE_DRYRUN)
}

export default {
  send
}
