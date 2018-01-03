const request = require("supertest");
const should = require("should");
const app = require("../../../");

// GET /
describe("GET /", () => {
  describe("success -", () => {
    it("타입이 배열 인가 - ", done => {
      request(app)
        .get("/diarys")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
  describe("fail -", () => {
    it("limit 이 숫자가 아닐 경우", done => {
      request(app)
        .get("/diarys/?limit=test")
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
        .get("/diarys/1")
        .end((err, res) => {
          res.body.should.be.property("diarycode", 1);
          res.body.should.be.property("title", "testtitle1");
          res.body.should.be.property("content", "testcontent1");
          res.body.should.be.property("price", 10000);
          res.body.should.be.property("comment", [1]);
          res.body.should.be.property("userid", 1);
          done();
        });
    });
  });
  describe("fail -", () => {
    it("게시물을 찾지 못 할 경우 404", done => {
      request(app)
        .get("/diarys/test")
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
        .post("/diarys")
        .send({
          title: "test",
          diarycode: 5,
          content: "test",
          comment: [7],
          price: 120000,
          userid: 12
        })
        .expect(201)
        .end(done);
    });
  });

  describe("fail -", () => {
    it("파라메터 누락", done => {
      request(app)
        .post("/diarys")
        .send({})
        .expect(400)
        .end(done);
    });
  });
});
