// 임시 Data
var data = [
    {
        diarycode: 1,
        title: 'testtitle1', 
        content: 'testcontent1',
        price: 10000,
        comment:[1],
        userid:1

    },
    {
        diarycode: 2,
        title: 'testtitle2', 
        content: 'testcontent2',
        price: 20000,
        comment: [2],
        userid:2

    },
    {
        diarycode: 3,
        title: 'testtitle3', 
        content: 'testcontent3',
        price: 30000,
        comment:[3,4],
        userid:3

    },
];

/**
 * 게시물 정보 조회
 * @type {Function} diary - diarys select
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const diarys = function (req, res) {
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
    if (!req.params.diarycode) {
        return res.status(400).end();
    }

    let diarycode = req.params.diarycode;
    let diary = data.filter(item => {
        //Error 발생 ===으로하면 문제발생
        return item.diarycode == diarycode
    })[0];

    if (!diary) {
        return res.status(404).end();
    }

    res.json(diary);
};

/**
 * 다이어리 삭제
 * @type {Function} destory - delete 다이어리 
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const destory = function (req, res) {
    let diaryCode = parseInt(req.params.diaryCode);
    let index = data.findIndex(item => {
        return item.diaryCode = diaryCode;
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

    let diaryCode = req.params.diaryCode;
    let title = req.body.title;
    let content = req.body.content;
    let price = req.body.price;
    let comment = req.body.comment;
    let userid = req.body.userid;
    
    //Error 발생 ===으로하면 문제발생
    let diary = data.filter(item => diaryCode == item.userCode)[0];
    
    diary.diarycode =diarycode;
    diary.content = age;
    diary.price = password;
    diary.title = title;
    diary.comment = comment;
    diary.userid = userid;

    res.status(200).json(user);
};

/**
 * 다이어리 생성
 * @type {Function} destory - delete user 
 * @param {Object} req 요청 객체   
 * @param {Object} res 응답 객체
 */
const create = function (req, res) {
    if (!req.body || 
        !req.body.diarycode || 
        !req.body.title || 
        !req.body.content || 
        !req.body.userid || 
        !req.body.price) {

        return res.status(400).end();
    };
    let diarycode = req.body.diarycode;
    let price = req.body.price;
    let title = req.body.title;
    let content = req.body.content;
    let userid = req.body.userid;
    let diary = {
        diarycode: data.length + 1, 
        title: title, 
        price:price,
        content:content,
        userid:userid
    };
    data.push(diary);
    res.status(201).end();
};

module.exports = {
    diarys:diarys,
    select:select,
    destory:destory, 
    update:update, 
    create:create
};
