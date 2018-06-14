import * as admin from 'firebase-admin/lib/index'
import serviceAccount from '../config/serviceAccountKey.json'
import {
  FIREBASE_DB,
  FIREBASE_COLOR,
  FIREBASE_DRYRUN,
  FIREBASE_TTL
} from '../config/env.config'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DB
})

async function send (info, token) {
  const message = {
    data: info.payload,
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
  return admin.messaging().send(message, FIREBASE_DRYRUN)
}

export default {
  send
}
