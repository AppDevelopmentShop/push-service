import chai from 'chai'
import chaiHttp from 'chai-http'
import { server, migrateDB, registerModel, deviceModel } from '../index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api/users/:user/tokens'

describe(`routes : ${BASE_URL}`, () => {
  before(async function () {
    await migrateDB()
  })
  describe(`POST ${BASE_URL}`, () => {
    it('should register token user1', (done) => {
      chai.request(server)
        .post('/api/users/user1/tokens')
        .send({
          token: 'token'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('token')
          res.body.payload.user_id.should.eql(1)
          res.body.payload.id.should.eql(4)
          done()
        })
    })
    it('should register token again user2', (done) => {
      chai.request(server)
        .post('/api/users/user2/tokens')
        .send({
          token: 'token'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('token')
          res.body.payload.user_id.should.eql(2)
          res.body.payload.id.should.eql(5)
          done()
        })
    })
    it('should register token user3', (done) => {
      chai.request(server)
        .post('/api/users/user3/tokens')
        .send({
          token: 'token1'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('token1')
          res.body.payload.user_id.should.eql(3)
          res.body.payload.id.should.eql(6)
          done()
        })
    })
  })
})
