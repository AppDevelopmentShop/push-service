import fs from 'fs'
import appRoot from 'app-root-path'
import * as admin from 'firebase-admin/lib/index'
import {
  FIREBASE_DB,
  FIREBASE_COLOR,
  FIREBASE_DRYRUN,
  FIREBASE_TTL,
  FIREBASE_ACC
} from '../config/env.config'

const serviceAccount = FIREBASE_ACC ? FIREBASE_ACC :fs.readFileSync(`${appRoot}/src/config/serviceAccountKey.json`);

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: FIREBASE_DB
})

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
          badge: 42,
        },
      },
    },
    token: token
  }
  if (info.payload) {
    message.data = info.payload
  }
  return admin.messaging().send(message, FIREBASE_DRYRUN)
}

export default {
  send
}
