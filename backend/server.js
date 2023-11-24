const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./database.js');
const cors = require('cors');
const fs = require('fs');
const conn = db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('port', process.env.PORT || 3000); // 포트 설정
app.set('host', process.env.HOST || '0.0.0.0'); // 아이피 설정
// 회원가입
app.post('/api/todos', async (req, res) => {
  console.log('회원가입 라우터 호출됨');
  let paramId = req.body.userid;
  let paramPw = req.body.userpw;
  let paramNickname = req.body.nickname;
  // let sql = `INSERT INTO todos (content) VALUES ('${req.body.content}')`;
  try {
    //회원가입 검증함수 실행
    var result = checkReg(paramId, paramPw, paramNickname);
    if (result === 1) {
      //아이디 중복 검사
      const [rows] = await conn
        .promise()
        .query(`SELECT userid FROM user WHERE userid = '${paramId}'`);
      if (rows.length > 0) {
        res.send({
          message: '중복된 아이디입니다.',
          userpw: paramPw,
          userid: paramId,
          nickName: paramNickname,
        });
      }
      console.log('회원가입 시작');
      //SQL 회원가입 시작
      let regData = {
        userid: paramId,
        userpw: paramPw,
        nickname: paramNickname,
      };
      const [row] = await conn
        .promise()
        .query('INSERT INTO `user` set ?', regData);
      if (rows) {
        res.send({
          message: '회원가입 되었습니다.',
          userpw: paramPw,
          userid: paramId,
          nickName: paramNickname,
        });
        return true;
      } else {
        res.send({
          message: '회원가입에 실패했습니다.',
          userpw: paramPw,
          userid: paramId,
          nickName: paramNickname,
        });
        res.end();
        return false;
      }
    } else {
      res.send({
        message: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//회원가입 검증 함수 for 라우터
const checkReg = function (id, pw, nickName) {
  if (pw.length < 4) {
    return '비밀번호를 4자 이상 입력하세요.';
  } else if (id.length < 4) {
    return '아이디를 4자 이상 입력하세요.';
  } else if (nickName.length < 2) {
    return '이름을 2자 이상 입력하세요.';
  }

  return 1;
};

// 실행 시 db 데이터 들고오기
// app.get('/api/todos', async (req, res) => {
//   var sql =
//     'SELECT * FROM `todo` WHERE `userid` = ? ORDER BY `rank` ASC, `id` ASC;';
//   try {
//     await conn.promise().query(sql);
//     var rows_todo = [],
//       rows_doing = [],
//       rows_done = [];
//     var todo_sign = 0,
//       doing_sign = 0,
//       done_sign = 0;
//     for (var i = 0; i < rows.length; i++) {
//       if (rows[i].status == 1) {
//         rows_todo[todo_sign] = rows[i];
//         todo_sign++;
//       } else if (rows[i].status == 2) {
//         rows_doing[doing_sign] = rows[i];
//         doing_sign++;
//       } else if (rows[i].status == 3) {
//         rows_done[done_sign] = rows[i];
//         done_sign++;
//       }
//     }
//     console.log('데이터 성공적 분류함');
//     res.send(data, {
//       todoList: rows_todo,
//       doingList: rows_doing,
//       doneList: rows_done,
//     });
//     return true;
//   } catch (err) {
//     console.log('query is not executed: ' + err);
//   }
// });
// todo 추가
app.post('/api/todos', async (req, res) => {
  var sql = `INSERT INTO todos (content) VALUES ('${req.body.content}')`;
  try {
    await conn.promise().query(sql);
    const [rows] = await conn.promise().query('SELECT * FROM todos');
    res.send(rows);
  } catch (err) {
    console.log('query is not excuted: ' + err);
  }
});
// todo 수정
app.put('/api/todos/:modalData', async (req, res) => {
  var sql = `UPDATE todos SET content = '${req.body.content}' WHERE id= ${req.params.modalData}`;
  try {
    await conn.promise().query(sql);
    const [rows] = await conn.promise().query('SELECT * FROM todos');
    res.send(rows);
  } catch (err) {
    console.log('query is not excuted: ' + err);
  }
});
// todo 삭제
app.get('/api/todos/delete/:modalData', async (req, res) => {
  var sql = 'delete from todos where id=' + req.params.modalData;
  try {
    await conn.promise().query(sql);
    const [rows] = await conn.promise().query('SELECT * FROM todos');
    res.send(rows);
  } catch (err) {
    console.log('query is not executed: ' + err);
  }
});

// 서버 동작중인 표시
app.listen(app.get('port'), app.get('host'), () =>
  console.log(
    'Server is running on : ' + app.get('host') + ':' + app.get('port')
  )
);
