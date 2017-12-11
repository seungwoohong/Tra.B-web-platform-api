// 임시 Data
var data = [
    {
        id: 'test1',
        userCode: 1, 
        name: 'hong', 
        password: 'testpw1',
        age: 12
    },
    {
        id: 'test2',
        userCode: 2,
        name: 'seung', 
        password: 'testpw2',
        age: 13
    },
    {
        id: 'test3',
        userCode: 3, 
        name: 'woo', 
        password: 'testpw3',
        age: 4
    },
];

/**
 * 유저들 정보 조회
 * @type {Function} users - users select
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const users = function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit);

    if (Number.isNaN(limit)) {
        return res.status(400).end();
    };

    res.json(data.slice(0, limit));
};

/**
 * @type {Function} select - user select
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const select = function (req, res) {;
    if (!req.params.id && !req.params.password) {
        return res.status(400).end();
    }

    let id = req.params.id;
    let pw = req.params.password;
    let user = data.filter(item => {
        return item.id === id && item.password === pw
    })[0];

    if (!user) {
        return res.status(404).end();
    }

    res.json(user);
};

/**
 * 유저 삭제
 * @type {Function} destory - delete user 
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const destory = function (req, res) {
    let userCode = parseInt(req.params.userCode);
    let index = data.findIndex(item => {
        return item.userCode = userCode;
    });

    if(!index) {
        return res.status(400).end();
    };

    data = data.splice(index, 1);
    res.status(204).end();
};

/**
 * 유저 정보 업데이트
 * @type {Function} update - update user info
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const update = function (req, res) {
    if(!req.params || !req.body) {
        return res.status(400).end();
    };

    let userCode = req.params.userCode;
    let id = req.body.id;
    let password = req.body.password;
    let age = req.body.age;
    let name = req.body.name;

    let user = data.filter(item => userCode === item.userCode)[0];
    
    user.age = age;
    user.id = id;
    user.password = password;
    user.name = name;

    res.status(200).json(user);
};

/**
 * 유저 생성
 * @type {Function} destory - delete user 
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const create = function (req, res) {
    if (!req.body || 
        !req.body.id || 
        !req.body.password || 
        !req.body.age || 
        !req.body.name) {

        return res.status(400).end();
    };
    let id = req.body.id;
    let pw = req.body.password;
    let age = req.body.age;
    let name = req.body.name;
    let user = {
        id: id,
        userCode: data.length + 1, 
        name: name, 
        password: pw,
        age: age
    };
    data.push(user);
    res.status(201).end();
};

module.exports = {
    users:users,
    select:select,
    destory:destory, 
    update:update, 
    create:create
};
