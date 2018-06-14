import chai from 'chai'
import chaiHttp from 'chai-http'
import { server, migrateDB } from '../index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api'

describe(`routes : ${BASE_URL}`, () => {
  before(async function () {
    await migrateDB()
  })
  describe(`GET ${BASE_URL}`, () => {
    it('should return basic info about api', (done) => {
      chai.request(server)
        .get(BASE_URL)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.message.should.eql('push-service')
          done()
        })
    })
  })
})
