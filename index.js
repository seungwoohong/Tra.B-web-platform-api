const express = require('express'); // 모듈 인젝션
const app = express(); // 객체 주입 , 역할 - 미들웨어추가, 라우팅 설정
const morgan = require('morgan'); // 타개발자 미들웨어
const bodyParser = require('body-parser'); // body 사용시 미들웨어
var user = require('./src/route/users');

/**
 * middeware example
 * @type {function} logger
 * @param {Array} req 요청 정보
 */
function logger(req, res, next) {
    console.log('i am logger');
    next(); // 미들웨어는 항상 next 함수를 호출해야한다. 
};

function logger2(req, res, next) {
    console.log('i am logger2');
    next();
};

function commonMiddle(req, res, next) {
    console.log('common');
    next(new Error('error ouccered'));
};

/**
 *  Error MiddleWare example
 * @type {Funtion} commonMiddle  
 */
function errormw(err, req, res, next) {
    console.log(err.message);
    next();
    // 에러를 처리하거나 다음 미들웨어 에게 에러 던짐
};

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger);
app.use(logger2);
app.use(commonMiddle);
app.use(errormw);
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
};

// Routing
app.use('/users', user);

// REST API
// Routing Setting => HTTP 요청
/**
 * Test Routing Function req => 요청 객체, res => 응답 객체
 */

 /**
  * 1xx: 처리중
  * 2xx: 이상 없음
  * 3xx: 
  * 4xx: 요청이 잘못 됨
  * 5xx: 서버 에러
  */
app.get('/', function (req, res) {
    res.send('Hello World');
    // '/' 경로로 get메소드를 들어 온 요청을 콜백함수로 응답 한다. 
    // http 모듈의 객체를 한번 모듈 한 것
    // req,parmas, req.query, req.body
    // res.send, res.status, req.json
});

app.get('/user', function () {
    res.send('user info');
});

app.post('/user', function () {
    res.send('user info');
});

// TODO: Test code 작성 필요 - Test Driven Develop

// server 
app.listen(3000, function() {
    console.log('server is running port 3000!');
});