const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const {deleteAllUser,createUser} = require('../helpers/clear')

chai.use(chaiHttp)

let expect = chai.expect;

describe('users crud', ()=> {
  describe('POST api/users/signup Success Test Case', () =>{
    after(() => {
      deleteAllUser()
    })
    it('receive object with status 201', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({email: 'mar@mail.com', password: 'naruto'})
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.have.property('email')
        expect(res.body.email).to.equal('mar@mail.com')
        done()
      })
    })

    it('receive object with status 201 and input email lowercase', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({email: 'MARIA@MAIL.COM', password: 'naruto'})
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res).to.be.an('object')
        expect(res.body).to.have.property('email')
        expect(res.body.email).to.equal('maria@mail.com')
        done()
      })
    })
   
  })
  describe('POST api/users/signup Error Test Case', () => {
    before(()=>{
      createUser({email: 'mariono@mail.com',
      password: 'naruto'})
    })
    after(() => {
      deleteAllUser()
    })
    it('Error Message for invalid format email', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({ email: 'maarkitilcom',
              password: 'naruto'})
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res).to.have.property('text')
        expect(res).to.have.property('statusCode')
        expect(res.statusCode).to.equal(400)
        expect(res.text).to.equal('"User validation failed: email: Invalid format email"')
        done()
      })
    })
    it('Error Message for existing Email', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({ email: 'mariono@mail.com',
              password: 'naruto'})
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res).to.have.property('text')
        expect(res).to.have.property('statusCode')
        expect(res.statusCode).to.equal(400)
        expect(res.text).to.equal('"User validation failed: email: email already registered"')
        done()
      })
    })
    it('Error Message for empty Email', done => {
      chai.request(app)
      .post('/api/users/signup')
      .send({password: 'naruto'})
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res).to.have.property('text')
        expect(res).to.have.property('statusCode')
        expect(res.statusCode).to.equal(400)
        expect(res.text).to.equal('"User validation failed: email: Email must be required"')
        done()
      })
    })
  })
  describe('POST api/users/login Success Test Case', () => {
    
  })
})

