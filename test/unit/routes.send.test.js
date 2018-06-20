import chai from 'chai'
import chaiHttp from 'chai-http'
import sinon from 'sinon'
import { server, migrateDB, tokenSentModel, tokenModel, devicesModel } from '../index'
import firebase from '../../src/utils/firebase'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api/users/:user/notifications'

describe(`routes : ${BASE_URL}`, () => {
  let push
  before(async function () {
    await migrateDB()
    push = sinon.stub(firebase, 'send').callsFake((item) => item)
  })
  after(async function () {
    push.restore()
  })
  describe(`POST ${BASE_URL}`, () => {
    it('should send push to user1', (done) => {
      chai.request(server)
        .post('/api/users/user1/notifications')
        .send({
          title: 'hello',
          body: 'dddfdfdfgdfg'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(1)
          res.body.tokens[0].should.include.keys(tokenSentModel)
          done()
        })
    })
    it('should send push to user2', (done) => {
      chai.request(server)
        .post('/api/users/user2/notifications')
        .send({
          title: 'hello',
          body: 'dddfdfdfgdfg'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(201)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(2)
          res.body.tokens[0].should.include.keys(tokenSentModel)
          done()
        })
    })
  })
})
