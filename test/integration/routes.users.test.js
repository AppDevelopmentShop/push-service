import chai from 'chai'
import chaiHttp from 'chai-http'
import { server, migrateDB, registerModel, deviceModel, devicesModel, tokenModel } from '../index'

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
          done()
        })
    })
    it('get user1 devices', (done) => {
      chai.request(server)
        .get('/api/users/user1/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(2)
          res.body.tokens[0].should.include.keys(tokenModel)
          res.body.tokens[0].token.should.eql('device1')
          res.body.tokens[1].token.should.eql('token')
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
          done()
        })
    })
    it('get user2 devices', (done) => {
      chai.request(server)
        .get('/api/users/user2/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(3)
          res.body.tokens[0].should.include.keys(tokenModel)
          res.body.tokens[0].token.should.eql('device2')
          res.body.tokens[1].token.should.eql('device22')
          res.body.tokens[2].token.should.eql('token')
          done()
        })
    })
    it('get user1 devices', (done) => {
      chai.request(server)
        .get('/api/users/user1/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(1)
          res.body.tokens[0].should.include.keys(tokenModel)
          res.body.tokens[0].token.should.eql('device1')
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
          done()
        })
    })
    it('get user3 devices', (done) => {
      chai.request(server)
        .get('/api/users/user3/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(1)
          res.body.tokens[0].should.include.keys(tokenModel)
          res.body.tokens[0].token.should.eql('token1')
          done()
        })
    })
    it('should unregister token1 user3', (done) => {
      chai.request(server)
        .delete('/api/users/user3/tokens/token1')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('token1')
          res.body.payload.user_id.should.eql(3)
          done()
        })
    })
    it('get user3 devices', (done) => {
      chai.request(server)
        .get('/api/users/user3/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(0)
          done()
        })
    })
    it('404 should unregister token user1', (done) => {
      chai.request(server)
        .delete('/api/users/user3/tokens/token')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.status.should.eql(404)
          done()
        })
    })
    it('should unregister token user2', (done) => {
      chai.request(server)
        .delete('/api/users/user2/tokens/token')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(registerModel)
          res.body.payload.should.include.keys(deviceModel)
          res.body.status.should.eql('success')
          res.body.payload.token.should.eql('token')
          res.body.payload.user_id.should.eql(2)
          done()
        })
    })
    it('get user2 devices', (done) => {
      chai.request(server)
        .get('/api/users/user2/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(2)
          done()
        })
    })
  })
})
