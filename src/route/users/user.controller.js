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
// Database
const database = require('../../database/database.config')

database.connect.query('USE '+database.dbconfig.database)
//임시 데이터
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
    database.connect.query("SELECT * FROM user", function(err, rows){
        if(err){
            console.log(err)
            return res.status(400).end();
        }
        else{
            res.json(rows.slice(0,limit))
        }
    });
};

/**
 * @type {Function} select - user select
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const select = function (req, res) {
    
    if (!req.params.email && !req.params.password) {
        return res.status(400).end();
    }

    let email = req.params.email;
    let pw = req.params.password;

    database.connect.query("SELECT * FROM user", function(err, rows){
        if(err){
            return res.status(400).end();
        }
        else{
            let user = rows.filter(item => {
                return item.Email === email && item.Password === pw
            })[0];
        
            if (!user) {
                return res.status(404).end();
            }
            return res.json(user);
        }
    });
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
    if (
        !req.body||
        !req.body.User_id||
        !req.body.Email||
        // !req.body.Gender||
        !req.body.Password||
        // !req.body.Create_Date||
        !req.body.NickName||
        !req.body.Username||
        // !req.body.Is_delete||
        // !req.body.Account_id||
        // !req.body.Payment_id||
        // !req.body.Birth||
        !req.body.Auth
    ) {
        console.log(res.body)
        return res.status(400).end();
    };
    let User_id = parseInt(req.body.User_id)
    let Email = req.body.Email
    let Password = req.body.Password
    let NickName = req.body.NickName
    let Username = req.body.Username
    let Account_id = parseInt(req.body.Account_id)||'1'
    let Payment_id = parseInt(req.body.Payment_id)||"1"
    let Gender = req.body.Gender||"1"
    let Create_Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let Is_delete = req.body.Is_delete||"0"
    let Auth = parseInt(req.body.Auth)
    let Birth = req.body.Birth||"1900-01-01T15:00:00.000Z"
    let user = {
        User_id:User_id,
        Email:Email,
        Password:Password,
        NickName:NickName,
        Username:Username,
        Account_id:Account_id,
        Payment_id:Payment_id,
        Auth:Auth,
        Create_Date:Create_Date,
        Is_delete:Is_delete,
        Gender:Gender
    };
    console.log(user)
    database.connect.query("SELECT * FROM user WHERE Email=?",[Email], function(err, rows){
        if(err){
            return console.log(err)
        }
        if(rows.length){
            return console.log("this Email already used")
        }
        else{
            database.connect.query("INSERT INTO user (User_id,Email,Password,NickName,Username,Account_id,Payment_id,Auth,Create_Date,Is_delete,Gender) VALUES(?)",[user],function(err,row){
                if(err){
                    return console.log(err)
                }
                else{
                    res.json(rows.slice(0,limit))
                    res.status(201).end();
                }
            })
        }
    })
    res.status(400).end();
};

module.exports = {
    users:users,
    select:select,
    destory:destory, 
    update:update, 
    create:create
};
