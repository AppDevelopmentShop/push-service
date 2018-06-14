import chai from 'chai'
import chaiHttp from 'chai-http'
import { server, migrateDB, devicesModel, tokenModel } from '../index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api/users/:user/tokens'

describe(`routes : ${BASE_URL}`, () => {
  before(async function () {
    await migrateDB()
  })
  describe(`GET ${BASE_URL}`, () => {
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
    it('get user2 devices', (done) => {
      chai.request(server)
        .get('/api/users/user2/tokens')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.should.include.keys(devicesModel)
          res.body.tokens.length.should.eql(2)
          res.body.tokens[0].should.include.keys(tokenModel)
          res.body.tokens[0].token.should.eql('device2')
          res.body.tokens[1].token.should.eql('device22')
          done()
        })
    })
  })
})
