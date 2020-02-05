const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const {deleteAllContact,createUser} = require('../helpers/clear')

chai.use(chaiHttp)

let expect = chai.expect;

let token = ''

describe('Contact Crud', () => {
  describe('Signup and Login before crud Contact', () => {

    it('POST /api/users/signup', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({email:'james@mail.com', password:'naruto'})
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.have.property('email')
        expect(res.body.email).to.equal('james@mail.com')
        done()
      })
    })

    it('POST /api/users/login', done => {
      chai.request(app)
      .post('/api/users/login')
      .send({email:'james@mail.com', password: 'naruto'})
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('token')
        expect(res.body.token).to.be.a('string')
        token = (res.body.token)
        done()
      })
    })
  })
  describe('Create Contact', ()=> {
    it('POST /api/contacts', done => {
      
    })
  })
})