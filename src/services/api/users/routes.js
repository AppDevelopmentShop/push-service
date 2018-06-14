import controller from './controller'

export default {
  init: function (router) {
    router.get('/api/users', controller.getAllUsers)
    router.get('/api/users/:user/notifications', controller.getAllUserNotifications)
    router.post('/api/users/:user/notifications', controller.send)          // SEND PUSH NOTIFICATION TO USER
    router.put('/api/users/:user/notifications', controller.confirm)        // CONFIRM NOTIFICATIONS
    router.post('/api/users/:user/tokens', controller.register)             // ADD DEVICE TO USER
    router.get('/api/users/:user/tokens', controller.getAllUserDevices)     // GET DEVICES OF USER
    router.delete('/api/users/:user/tokens/:token', controller.unregister)  // REMOVE DEVICE FROM USER
  }
}
