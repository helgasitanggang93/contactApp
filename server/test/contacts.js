const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../app");
const { deleteAllUser, deleteAllContact } = require("../helpers/clear");

chai.use(chaiHttp);

let expect = chai.expect;

let token = "";
let contactId = "";
let contactId2 = "";
let wrongToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVzQG1haWwuY29tIiwiaWF0IjoxNTgwODkwNTQ4fQ.pU8C04i9Fp4Gp_0c_z7N2m_7p42zZvfAiaOZbqyfY3s";

describe("POST /api/Contacts, create contact Success and Fail", () => {
  before(function() {
    deleteAllContact();
  });
  after(function() {
    deleteAllUser();
  });
  it("Create User before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("user@mail.com");
        done();
      });
  });

  it("Login User and receive Token before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        token = res.body.token;
        done();
      });
  });

  it("success create contact without upload image", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumadi",
        address: "jl. nangka no.31",
        phoneNumber: "+627755344"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("image");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("createdBy");
        expect(res.body.fullName).to.equal("jumadi");
        expect(res.body.image).to.equal(
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
        );
        expect(res.body.address).to.equal("jl. nangka no.31");
        expect(res.body.phoneNumber).to.equal("+627755344");
        done();
      });
  });

  it("success create contact with upload image", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        address: "jl. mangga no.31",
        phoneNumber: "+62775534555",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("image");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("createdBy");
        expect(res.body.fullName).to.equal("malika");
        expect(res.body.image).to.equal(
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
        );
        expect(res.body.address).to.equal("jl. mangga no.31");
        expect(res.body.phoneNumber).to.equal("+62775534555");
        done();
      });
  });

  it("error create contact, FullName contain not alphabetic", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "89009malika",
        address: "jl. mangga no.31",
        phoneNumber: "+62775534555",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: fullName: Full name only contain alphabetic"
        );
        done();
      });
  });

  it("error create contact, Length of Address should be Greater then 3", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        address: "jl",
        phoneNumber: "+62775534555",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: address: Length of Address should be greater then 3 and less then 101"
        );
        done();
      });
  });

  it("error create contact, Length of Address should be less then 150", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        address:
          "jl. mmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmkmaa",
        phoneNumber: "+62775534555",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: address: Length of Address should be greater then 3 and less then 101"
        );
        done();
      });
  });

  it("error create contact, PhoneNumber only Contain Number and +", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        address: "jl. berkah dalem",
        phoneNumber: "+627755345j",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: phoneNumber: Phone Number only contain Number and +"
        );
        done();
      });
  });

  it("error create contact, FullName must be required", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        address: "jl. berkah dalem",
        phoneNumber: "+627755345",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: fullName: Name must be required"
        );
        done();
      });
  });

  it("error create contact, Address must be required", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        phoneNumber: "+627755345",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: address: Address must be required"
        );
        done();
      });
  });

  it("error create contact, PhoneNumber must be required", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "malika",
        address: "jl. berkah dalem",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal(
          "Contact validation failed: phoneNumber: Phone Number must be required"
        );
        done();
      });
  });

  it("error create contact, Create without token", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .send({
        fullName: "malika",
        address: "jl. berkah dalem",
        phoneNumber: "+627755345",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Not Authentication");
        done();
      });
  });
});

describe("GET /api/Contacts, read contact Success and Fail", () => {
  before(function() {
    deleteAllContact();
  });
  after(function() {
    deleteAllUser();
  });

  it("Create User before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("user@mail.com");
        done();
      });
  });

  it("Login User and receive Token before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        token = res.body.token;
        done();
      });
  });

  it("Create first Contact before Read Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumadi",
        address: "jl. nangka no.31",
        phoneNumber: "+627755344"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        done();
      });
  });

  it("Create Second Contact before Read Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumirah",
        address: "jl. nangka no.32",
        phoneNumber: "+627755345"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        done();
      });
  });

  it("Success Read All Contacts", done => {
    chai
      .request(app)
      .get("/api/contacts")
      .set("token", token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
        done();
      });
  });

  it("Error Read All Contacts, request without token", done => {
    chai
      .request(app)
      .get("/api/contacts")
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Not Authentication");
        done();
      });
  });
});

describe("GET api/Contacts/:id, readOne Contact success and fail", () => {
  before(function() {
    deleteAllContact();
  });
  after(function() {
    deleteAllUser();
  });

  it("Create User before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("user@mail.com");
        done();
      });
  });

  it("Login User and receive Token before Create Contact", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        token = res.body.token;
        done();
      });
  });

  it("Create Contact before Read One Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumirah",
        address: "jl. nangka no.32",
        phoneNumber: "+627755345"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        contactId = res.body._id;
        done();
      });
  });

  it("Success Read One Contact", done => {
    chai
      .request(app)
      .get("/api/contacts/" + contactId)
      .set("token", token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("image");
        expect(res.body.fullName).to.equal("jumirah");
        expect(res.body.address).to.equal("jl. nangka no.32");
        expect(res.body.phoneNumber).to.equal("+627755345");
        expect(res.body.image).to.equal(
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
        );
        done();
      });
  });

  it("Error Read One Contact, request without token", done => {
    chai
      .request(app)
      .get("/api/contacts" + contactId)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe("PATCH api/Contacts/:id, Update Contact Success and Fail", () => {
  before(function() {
    deleteAllContact();
  });
  after(function() {
    deleteAllUser();
  });
  it("Create User before Update Contact", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("user@mail.com");
        done();
      });
  });

  it("Login User and receive Token before Update Contact", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        token = res.body.token;
        done();
      });
  });

  it("Create Contact before Update Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumirah",
        address: "jl. nangka no.32",
        phoneNumber: "+627755345"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        contactId = res.body._id;
        done();
      });
  });

  it("Success Update Contact, only one of property", done => {
    chai
      .request(app)
      .patch("/api/contacts/" + contactId)
      .set("token", token)
      .send({
        fullName: "Markonah"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("image");
        expect(res.body.fullName).to.equal("Markonah");
        expect(res.body.address).to.equal("jl. nangka no.32");
        expect(res.body.phoneNumber).to.equal("+627755345");
        expect(res.body.image).to.equal(
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
        );
        done();
      });
  });
  it("Success Update Contact, all of property except _id", done => {
    chai
      .request(app)
      .patch("/api/contacts/" + contactId)
      .set("token", token)
      .send({
        fullName: "zomer",
        address: "jl damai",
        phoneNumber: "+6288889",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("image");
        expect(res.body.fullName).to.equal("zomer");
        expect(res.body.address).to.equal("jl damai");
        expect(res.body.phoneNumber).to.equal("+6288889");
        expect(res.body.image).to.equal(
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
        );
        done();
      });
  });

  it("Error Update Contact, without token", done => {
    chai
      .request(app)
      .patch("/api/contacts/" + contactId)
      .send({
        fullName: "zomer",
        address: "jl damai",
        phoneNumber: "+6288889",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Not Authentication");
        done();
      });
  });

  it("Error Update Contact, Authorization, Wrong Token", done => {
    chai
      .request(app)
      .patch("/api/contacts/" + contactId)
      .set("token", wrongToken)
      .send({
        fullName: "zomer",
        address: "jl damai",
        phoneNumber: "+6288889",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1580972228/j5jr4ies2qyrghnol9fe.jpg"
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Forbidden Access");
        done();
      });
  });
});

describe("DELETE /api/contacts/:id Success and Fail Test", () => {
  before(function() {
    deleteAllContact();
  });
  after(function() {
    deleteAllUser();
  });

  it("Create User before delete Contact", done => {
    chai
      .request(app)
      .post("/api/users/signup")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal("user@mail.com");
        done();
      });
  });

  it("Login User and receive Token before delete Contact", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "user@mail.com", password: "naruto" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");

        token = res.body.token;
        done();
      });
  });

  it("Create first Contact before delete Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumadi",
        address: "jl. nangka no.31",
        phoneNumber: "+627755344"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        contactId = res.body._id;
        done();
      });
  });

  it("Create Second Contact before delete Data", done => {
    chai
      .request(app)
      .post("/api/contacts")
      .set("token", token)
      .send({
        fullName: "jumirah",
        address: "jl.mangga bosok no.32",
        phoneNumber: "+627755345"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an("object");
        expect(res.status).to.equal(201);
        contactId2 = res.body._id;
        done();
      });
  });

  it("Success Delete First Contact", done => {
    chai
      .request(app)
      .delete("/api/contacts/" + contactId)
      .set("token", token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("fullName");
        expect(res.body).to.have.property("address");
        expect(res.body).to.have.property("phoneNumber");
        expect(res.body).to.have.property("image");
        expect(res.body.fullName).to.equal("jumadi");
        expect(res.body.address).to.equal("jl. nangka no.31");
        expect(res.body.phoneNumber).to.equal("+627755344");
        expect(res.body.image).to.equal(
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
        );
        done();
      });
  });

  it("Error Delete second Contact, request without token", done => {
    chai
      .request(app)
      .delete("/api/contacts/" + contactId2)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Not Authentication");
        done();
      });
  });

  it("Error Delete second Contact, Wrong token", done => {
    chai
      .request(app)
      .delete("/api/contacts/" + contactId2)
      .set("token", wrongToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res).to.have.property("text");
        expect(res.body).to.equal("Forbidden Access");
        done();
      });
  });
});
