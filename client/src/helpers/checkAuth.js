class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb){
      this.authenticated = true
    cb()
  }

  logout(cb){
    localStorage.clear()
    this.authenticated = false
    cb()
  }

  isAuthenticated() {
    return this.authenticated
  }
}

export default new Auth()