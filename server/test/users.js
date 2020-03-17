const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");
const { deleteAllUser, createUser } = require("../helpers/clear");

chai.use(chaiHttp);

let expect = chai.expect;

describe("POST api/users/login Success And Fail Test Case", () => {
  after(function() {
    deleteAllUser();
  });

  it("signup success before login", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "mariono@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("mariono@mail.com");
        done();
      });
  });

  it("login success with 201 status", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "mariono@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");
        done();
      });
  });
  it("receive object with status 201 and input email uppercase", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "MARIONO@MAIL.COM", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");
        done();
      });
  });

  it("Error message wrong email", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.have.property("text");
        expect(res.text).to.equal('"Unauthorized Access"');
        done();
      });
  });

  it("Error message wrong Password", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "mariono@mail.com", password: "1234" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.have.property("text");
        expect(res.text).to.equal('"Unauthorized Access"');
        done();
      });
  });
});

describe("POST api/users/signup Success Test Case", () => {
  after(function() {
    deleteAllUser();
  });
  it("receive object with status 201", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "mar@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("mar@mail.com");
        done();
      });
  });

  it("receive object with status 201 and input email uppercase", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "MARIA@MAIL.COM", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("maria@mail.com");
        done();
      });
  });
});

describe("POST api/users/signup Error Test Case", () => {
  after(function() {
    deleteAllUser();
  });
  it("receive object with status 201", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "mariono@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("mariono@mail.com");
        done();
      });
  });
  it("Error Message for invalid format email", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "maarkitilcom", password: "naruto" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property("text");
        expect(res).to.have.property("statusCode");
        expect(res.statusCode).to.equal(400);
        expect(res.text).to.equal(
          '"User validation failed: email: Invalid format email"'
        );
        done();
      });
  });

  it("Error Message for existing Email", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "mariono@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property("text");
        expect(res).to.have.property("statusCode");
        expect(res.statusCode).to.equal(400);
        expect(res.text).to.equal(
          '"User validation failed: email: email already registered"'
        );
        done();
      });
  });

  it("Error Message for empty Email", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ password: "naruto" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property("text");
        expect(res).to.have.property("statusCode");
        expect(res.statusCode).to.equal(400);
        expect(res.text).to.equal(
          '"User validation failed: email: Email must be required"'
        );
        done();
      });
  });

  it("Error Message for empty Password", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "markonah@mail.com" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.have.property("text");
        expect(res).to.have.property("statusCode");
        expect(res.statusCode).to.equal(400);
        expect(res.text).to.equal(
          '"User validation failed: password: Password must be required"'
        );
        done();
      });
  });
});
