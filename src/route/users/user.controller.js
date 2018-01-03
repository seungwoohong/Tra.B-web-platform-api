// Database
const database = require("../../database/database.config");

database.connect.query("USE " + database.dbconfig.database);
/**
 * 유저들 정보 조회
 * @type {Function} users - users select
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const users = function(req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  database.connect.query("SELECT * FROM user", function(err, rows) {
    if (err) {
      console.log(err);
      return res.status(400).end();
    } else {
      res.json(rows.slice(0, limit));
    }
  });
};

/**
 * @type {Function} select - user select
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const select = function(req, res) {
  if (!req.params.email && !req.params.password) {
    return res.status(400).end();
  }

  let email = req.params.email;
  let pw = req.params.password;

  database.connect.query("SELECT * FROM user", function(err, rows) {
    if (err) {
      return res.status(400).end();
    } else {
      let user = rows.filter(item => {
        return item.Email === email && item.Password === pw;
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
const destory = function(req, res) {
  if (!req.params.email) {
    return res.status(400).end();
  }
  let email = req.params.email;
  database.connect.query(
    "SELECT * FROM user WHERE user.email=?",
    [email],
    function(err, rows) {
      if (err) {
        console.log(err);
        console.log("can not find user such as email:" + email);
        return res.status(400).end();
      } else {
        //TODO: 삭제된거가 다시 삭제됨
        database.connect.query(
          "DELETE FROM user WHERE user.email=?",
          [email],
          function(err, results, rows) {
            if (err) {
              console.log(err);
            } else {
              console.log(email + " delete complete!");
              res.status(204).end();
            }
          }
        );
      }
    }
  );
};

/**
 * 유저 정보 업데이트
 * @type {Function} update - update user info
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const update = function(req, res) {
  if (!req.params.email) {
    console.log("body err" + res.params.email);
    return res.status(400).end();
  }
  let email = req.params.email;
  database.connect.query(
    "SELECT * FROM user WHERE user.email=?",
    [email],
    function(err, rows) {
      if (err) {
        console.log("Email did not found");
        return res.status(400).end();
      }
      let DB_user = rows[0];
      let User_id = parseInt(req.body.User_id) || DB_user["User_id"];
      let Password = req.body.Password || DB_user["Password"];
      let NickName = req.body.NickName || DB_user["NickName"];
      let Username = req.body.Username || DB_user["Username"];
      let Account_id = parseInt(req.body.Account_id) || DB_user["Account_id"];
      let Payment_id = parseInt(req.body.Payment_id) || DB_user["Payment_id"];
      let Gender = req.body.Gender || DB_user["Gender"];
      let Create_Date =
        new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ") || DB_user["Create_Date"];
      let Is_delete = req.body.Is_delete || DB_user["Is_delete"];
      let Auth = parseInt(req.body.Auth) || DB_user["Auth"];
      let Birth = req.body.Birth || DB_user["Birth"];
      let user = {
        User_id: User_id,
        Email: email,
        Password: Password,
        NickName: NickName,
        Username: Username,
        Account_id: Account_id,
        Payment_id: Payment_id,
        Auth: Auth,
        Create_Date: Create_Date,
        Is_delete: Is_delete,
        Gender: Gender,
        Birth: Birth
      };
      database.connect.query(
        "UPDATE user SET NickName=? WHERE email=?",
        [NickName, email],
        function(err, rows) {
          if (err) {
            console.log(err);
            console.log("UPDATE ERR");
            res.status(400).end();
          } else {
            console.log("Success to Update");
            res.status(200).json(user);
          }
        }
      );
    }
  );
};

/**
 * 유저 생성
 * @type {Function} destory - delete user
 * @param {Object} req 요청 객체
 * @param {Object} res 응답 객체
 */
const create = function(req, res) {
  if (
    // TODO: 어떤걸 null 허용 할지 논의
    !req.body ||
    !req.body.User_id ||
    !req.body.Email ||
    // !req.body.Gender||
    !req.body.Password ||
    // !req.body.Create_Date||
    !req.body.NickName ||
    !req.body.Username ||
    // !req.body.Is_delete||
    // !req.body.Account_id||
    // !req.body.Payment_id||
    // !req.body.Birth||
    !req.body.Auth
  ) {
    console.log(res.body);
    return res.status(400).end();
  }
  let User_id = parseInt(req.body.User_id);
  let Email = req.body.Email;
  let Password = req.body.Password;
  let NickName = req.body.NickName;
  let Username = req.body.Username;
  let Account_id = parseInt(req.body.Account_id) || 1;
  let Payment_id = parseInt(req.body.Payment_id) || 1;
  let Gender = req.body.Gender || 1;
  let Create_Date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  let Is_delete = req.body.Is_delete || 0;
  let Auth = parseInt(req.body.Auth);
  let Birth = req.body.Birth || null;
  let user = {
    User_id: User_id,
    Email: Email,
    Password: Password,
    NickName: NickName,
    Username: Username,
    Account_id: Account_id,
    Payment_id: Payment_id,
    Auth: Auth,
    Create_Date: Create_Date,
    Is_delete: Is_delete,
    Gender: Gender,
    Birth: Birth
  };
  database.connect.query("SELECT * FROM user WHERE Email=?", [Email], function(
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
      res.status(400).end();
    }
    if (rows.length) {
      return console.log("this Email already used");
      res.status(400).end();
    } else {
      database.connect.query(
        "INSERT INTO user (User_id,Email,Password,NickName,Username,Account_id,Payment_id,Auth,Create_Date,Is_delete,Gender,Birth) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          User_id,
          Email,
          Password,
          NickName,
          Username,
          Account_id,
          Payment_id,
          Auth,
          Create_Date,
          Is_delete,
          Gender,
          Birth
        ],
        function(err, rows) {
          if (err) {
            return console.log(err);
            res.status(400).end();
          } else {
            console.log(user);
            res.status(201).json(user);
          }
        }
      );
    }
  });
};

module.exports = {
  users: users,
  select: select,
  destory: destory,
  update: update,
  create: create
};
