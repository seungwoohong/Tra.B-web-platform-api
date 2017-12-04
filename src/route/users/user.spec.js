const request = require('supertest');
const should = require('should');
const app = require('../../../').default;

// GET /
describe('GET /', () => {
    describe('success -', () => {
        it('타입이 배열 인가 - ', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Araay);
                    done();
                });
        });
    });
    describe('fail -', () => {
        it('limit 이 숫자가 아닐 경우', (done) => {
            request(app)
                .get('/users/?limit=test')
                .expect(400)
                .end(done);
        });
    });
});

// GET /:id/:password
describe('GET /:id', () => {
    describe('success -', () => {
        it('모든 정보를 가지고 오든가 - ', (done) => {
            request(app)
                .get('/users/test1/testpw1')
                .end((err, res) => {
                    res.body.should.be.property('id', 'test1');
                    res.body.should.be.property('userCode', 1);
                    res.body.should.be.property('name', 'hong');
                    res.body.should.be.property('password', 'testpw1');
                    res.body.should.be.property('age', 12);
                    done();
                });
        });
    });
    describe('fail -', () => {
        it('유저를 찾지 못 할 경우 404', (done) => {
            request(app)
                .get('/users/test1/test')
                .expect(404)
                .end(done);
        });
    });
});


// POST /
describe('POST /', () => {
    describe('success -', () => {
        it('정보가 잘 생성 되었을 경우 200 - ', (done) => {
            request(app)
                .post('/users')
                .send({
                    id: 'test5',
                    userCode: 5, 
                    name: 'hong', 
                    password: 'testpw1',
                    age: 12
                })
                .expect(201)
                .end(done) ;
        });
    });

    describe('fail -', () => {
        it('파라메터 누락', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
    });
});
