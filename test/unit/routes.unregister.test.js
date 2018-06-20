import chai from 'chai'
import chaiHttp from 'chai-http'
import { server, migrateDB, registerModel, deviceModel } from '../index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api/users/:user/tokens/:token'

describe(`routes : ${BASE_URL}`, () => {
  before(async function () {
    await migrateDB()
  })
  describe(`DELETE ${BASE_URL}`, () => {
    it('should unregister unexisting user', (done) => {
      chai.request(server)
        .delete('/api/users/user3/tokens/device1')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.status.should.eql(404)
          res.body.message.should.eql('Token not found')
          done()
        })
    })
    it('should unregister token1', (done) => {
      chai.request(server)
        .delete('/api/users/user1/tokens/device1')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('device1')
          res.body.payload.user_id.should.eql(1)
          res.body.payload.id.should.eql(1)
          done()
        })
    })
    it('should unregister token2', (done) => {
      chai.request(server)
        .delete('/api/users/user2/tokens/device2')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('device2')
          res.body.payload.user_id.should.eql(2)
          res.body.payload.id.should.eql(2)
          done()
        })
    })
    it('should unregister unexisting token', (done) => {
      chai.request(server)
        .delete('/api/users/user1/tokens/device3')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.status.should.eql(404)
          res.body.message.should.eql('Token not found')
          done()
        })
    })
  })
})
