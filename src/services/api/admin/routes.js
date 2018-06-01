import AdminController from './controller'

export default {
  init: function (router) {
    router.post('/api/admin/send', AdminController.send)
  }
}
