import * as admin from 'firebase-admin/lib/index'
import serviceAccount from '../../../config/serviceAccountKey.json'
import conf from '../../config'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB || conf.get('firebase:db')
})

export async function send (info, token) {
  const message = {
    data: {
      destination: info.destination
    },
    notification: {
      title: info.title,
      body: info.body,
    },
    android: {
      ttl: info.ttl || 3600 * 1000,
      notification: {
        // icon: info.icon || 'stock_ticker_update',
        color: info.color || '#76BB2B',
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
  let dryRun = conf.get('dryRun')
  if (process.env.NODE_ENV === 'production') {
    dryRun = false
  }
  return admin.messaging().send(message, dryRun)
}
