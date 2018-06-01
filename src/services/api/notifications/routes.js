import NotificationsController from './controller'

export default {
  init: function (router) {
    router.post('/api/notifications/register', NotificationsController.register)
    router.post('/api/notifications/unregister', NotificationsController.unregister)
    router.post('/api/notifications/confirm', NotificationsController.confirm)
  }
}
