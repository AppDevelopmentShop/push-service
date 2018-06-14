import notifications from '../../../../db/queries/notifications'
import firebase from '../../../../utils/firebase'
import logger from '../../../../config/winston'

export default async function (user, info) {
  for (let i = 0; i < user.tokens.length; i++) {
    const token = user.tokens[i].token
    try {
      const response = await firebase.send(info, token)
      await notifications.add(user.id, info, 'sent')
      logger.info('Successfully sent message', {
        user,
        response
      })
      user.tokens[i].sent = true
    } catch (err) {
      await notifications.add(user.id, info, 'error')
      logger.error('Error sending message', {
        user,
        err
      })
      user.tokens[i].sent = false
    }
  }
}
