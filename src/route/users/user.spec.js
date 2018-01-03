const request = require("supertest");
const should = require("should");
const app = require("../../../");

// GET /
describe("GET /", () => {
  describe("success -", () => {
    it("타입이 배열 인가 - ", done => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
  describe("fail -", () => {
    it("limit 이 숫자가 아닐 경우", done => {
      request(app)
        .get("/users/?limit=test")
        .expect(400)
        .end(done);
    });
  });
});

// GET /:id/:password
describe("GET /:id", () => {
  describe("success -", () => {
    it("모든 정보를 가지고 오든가 - ", done => {
      request(app)
        .get("/users/test@test.com/1234")
        .end((err, res) => {
          res.body.should.be.property("User_id", 1);
          res.body.should.be.property("Email", "test@test.com");
          res.body.should.be.property("Gender", { type: "Buffer", data: [1] });
          res.body.should.be.property("Password", "1234");
          res.body.should.be.property(
            "Create_Date",
            "2017-12-26T15:00:00.000Z"
          );
          res.body.should.be.property("NickName", "nickname");
          res.body.should.be.property("Username", "username");
          res.body.should.be.property("Is_delete", {
            type: "Buffer",
            data: [1]
          });
          res.body.should.be.property("Account_id", 1);
          res.body.should.be.property("Payment_id", 1);
          res.body.should.be.property("Birth", "2010-10-09T15:00:00.000Z");
          res.body.should.be.property("Auth", 1);
          done();
        });
    });
  });
  describe("fail -", () => {
    it("유저를 찾지 못 할 경우 404", done => {
      request(app)
        .get("/users/test1/test")
        .expect(404)
        .end(done);
    });
  });
});

// POST /
describe("POST /", () => {
  describe("success -", () => {
    it("정보가 잘 생성 되었을 경우 200 - ", done => {
      request(app)
        .post("/users")
        .send({
          User_id: 106,
          Email: "testew@test.net",
          Password: "Password",
          NickName: "NickName",
          Username: "Username",
          Account_id: 1,
          Payment_id: 1,
          Auth: 1
        })
        .expect(201)
        .end(done);
    });
  });

  describe("fail -", () => {
    it("파라메터 누락", done => {
      request(app)
        .post("/users")
        .send({})
        .expect(400)
        .end(done);
    });
  });
});
// TODO: test code 추가 필요
