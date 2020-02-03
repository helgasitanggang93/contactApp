const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const deleteAllUser = require('../helpers/clearAfter').deleteAllUser
chai.use(chaiHttp)
const expect = chai.expect;

after(()=> {
  deleteAllUser()
})

describe('users crud', () => {
  describe('POST /users/signup', ()=>{
    it('send an object with code status 201', (done) =>{
      
    })
  })
})

