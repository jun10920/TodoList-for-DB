const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');

const db = require('./database.js');
const cors = require('cors');
const fs = require('fs');
const conn = db.init();
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

let logined_userid;

app.set('port', process.env.PORT || 3000); // 포트 설정
app.set('host', process.env.HOST || '0.0.0.0'); // 아이피 설정

// 회원가입
app.post('/api/todos/register', async (req, res) => {
  console.log('회원가입 라우터 호출됨');
  let paramId = req.body.userid;
  let paramPw = req.body.userpw;
  let paramNickname = req.body.nickname;
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
  if (pw.length < 3) {
    return '비밀번호를 4자 이상 입력하세요.';
  } else if (id.length < 3) {
    return '아이디를 3자 이상 입력하세요.';
  } else if (nickName.length < 2) {
    return '이름을 2자 이상 입력하세요.';
  }

  return 1;
};

// 로그인
app.post('/api/todos/login', async (req, res) => {
  console.log('로그인 라우터 호출됨');
  if (req.session.user) {
    console.log('세션 유저데이터 있음 - todo 이동/login 라우터');
    res.send({
      message: '세션 유저데이터 있음 - todo 이동',
    });
  } else {
    let paramId = req.body.userid;
    let paramPw = req.body.userpw;
    try {
      const [row] = await conn
        .promise()
        .query('SELECT * FROM `user` WHERE `userid`=? and `userpw`=?;', [
          paramId,
          paramPw,
        ]);
      if (row[0]) {
        req.session.user = {
          id: paramId,
          authorized: true,
        };
        logined_userid = paramId;
        const todos = await getTodos(conn, logined_userid);
        const [row] = await conn
          .promise()
          .query('SELECT nickname FROM user Where userid = ?', [
            logined_userid,
          ]);
        res.send({ row, todos, message: '로그인 되었습니다.' });
        return true;
      } else {
        console.log('로그인 정보 없음');
        res.send({
          message: '로그인에 실패했습니다.',
        });
        return true;
      }
    } catch (err) {
      console.dir(err);
    }
  }
});

// todo 분류 함수
async function getTodos(conn, userId) {
  const [rows] = await conn
    .promise()
    .query(
      'SELECT * FROM `todos` WHERE `userid` = ? ORDER BY `rank` ASC, `id` ASC;',
      [userId]
    );
  var rows_todo = [],
    rows_doing = [],
    rows_done = [];
  var todo_sign = 0,
    doing_sign = 0,
    done_sign = 0;

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].status == 1) {
      rows_todo[todo_sign] = rows[i];
      todo_sign++;
    } else if (rows[i].status == 2) {
      rows_doing[doing_sign] = rows[i];
      doing_sign++;
    } else if (rows[i].status == 3) {
      rows_done[done_sign] = rows[i];
      done_sign++;
    }
  }
  console.log('데이터 성공적 분류함');
  return {
    todoList: rows_todo,
    doingList: rows_doing,
    doneList: rows_done,
  };
}
// todo 등록 함수
const addTodo = function (content, rank) {
  console.log('todo 등록 함수 호출됨');
  let data = {
    userid: logined_userid,
    content: content,
    rank: rank,
  };
  try {
    const row = conn.query('insert into todos set ?', data);
    console.log('실행 대상 SQL: ' + row.sql);
    return;
  } catch (err) {
    console.log('SQL 실행 오류 발생');
    console.dir(err);
    throw err;
  }
};

// todo 화면 새로고침 때 todo, 닉네임 등록
app.get('/api/todos', async (req, res) => {
  if (req.session.user) {
    try {
      const todos = await getTodos(conn, logined_userid);
      const [row] = await conn
        .promise()
        .query('SELECT nickname FROM user Where userid = ?', [logined_userid]);
      res.send({ row, todos, message: '로그인정보 있음' });
    } catch (err) {
      console.log('query is not executed: ' + err);
    }
  } else {
    console.log('로그인정보 없음');
    res.send({
      message: '로그인정보 없음',
    });
    return true;
  }
});

// todo 추가
app.post('/api/todos/addTodo', async (req, res) => {
  console.log('todo 추가 라우터 호출됨');
  let paramContent = req.body.content;
  let paramRank = req.body.rank;
  try {
    await addTodo(paramContent, paramRank);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
  } catch (err) {
    console.error('추가 중 오류: ' + err.stack);
    res.end();
    return;
  }
});
// todo 상태(1 > 2) 변경
app.get('/api/todos/passTodo1/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await conn
      .promise()
      .query('update todos set status = 2 where id = ? and userid = ?', [
        id,
        logined_userid,
      ]);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
    console.log('status 변경 완료');
  } catch (err) {
    console.log('status 변경 실패');
    console.log('query is not excuted: ' + err);
  }
});

// todo 상태(2 > 3) 변경
app.get('/api/todos/passTodo2/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await conn
      .promise()
      .query('update todos set status = 3 where id = ? and userid = ?', [
        id,
        logined_userid,
      ]);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
    console.log('status 변경 완료');
  } catch (err) {
    console.log('status 변경 실패');
    console.log('query is not excuted: ' + err);
  }
});

// todo 삭제
app.get('/api/todos/delete/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await conn
      .promise()
      .query('delete from todos where id = ? and status = 3 and userid = ?', [
        id,
        logined_userid,
      ]);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
    console.log('삭제 완료');
  } catch (err) {
    console.log('삭제 실패');
    console.log('query is not excuted: ' + err);
  }
});

// todo 리셋
app.get('/api/todos/reset/', async (req, res) => {
  try {
    await conn
      .promise()
      .query('delete from todos where userid = ?', [logined_userid]);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
    console.log('리셋 완료');
  } catch (err) {
    console.log('리셋 실패');
    console.log('query is not excuted: ' + err);
  }
});

// todo 수정
app.put('/api/todos/edit/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await conn
      .promise()
      .query('UPDATE todos SET content =? WHERE id=? and userid =?;', [
        req.body.content,
        id,
        logined_userid,
      ]);
    const todos = await getTodos(conn, logined_userid);
    res.send(todos);
    console.log('TODO수정 완료');
  } catch (err) {
    console.log('TODO수정 실패');
    console.log('query is not excuted: ' + err);
  }
});

// 회원정보 수정 라우터
app.put('/api/todos/change/', async (req, res) => {
  let Pw = req.body.chagnePw;
  let Nickname = req.body.chagneNickname;
  try {
    if (Pw !== '' && Nickname !== '') {
      await conn
        .promise()
        .query('UPDATE user SET userpw = ?, nickname = ? WHERE userid = ?', [
          Pw,
          Nickname,
          logined_userid,
        ]);
      const [row] = await conn
        .promise()
        .query('SELECT nickname FROM user Where userid = ?', [logined_userid]);
      res.send({
        row,
        message: '회원정보 수정 완료',
      });
      console.log('회원정보 수정 완료');
    } else if (Pw === '' && Nickname !== '') {
      await conn
        .promise()
        .query('UPDATE user SET nickname =? WHERE userid =?', [
          Nickname,
          logined_userid,
        ]);
      const [row] = await conn
        .promise()
        .query('SELECT nickname FROM user Where userid = ?', [logined_userid]);
      res.send({ row, message: '닉네임 수정 완료' });
      console.log('닉네임 수정 완료');
    } else if (Pw !== '' && Nickname === '') {
      await conn
        .promise()
        .query('UPDATE user SET userpw =? WHERE userid =?', [
          Pw,
          logined_userid,
        ]);
      res.send({
        message: '비밀번호 수정 완료',
      });
      console.log('비밀번호 수정 완료');
    }
  } catch (err) {
    console.log('INFO수정 실패');
    console.log('query is not excuted: ' + err);
  }
});

app.get('/api/todos', async (req, res) => {
  if (req.session.user) {
    try {
      const todos = await getTodos(conn, logined_userid);
      res.send({ todos, message: '로그인정보 있음' });
    } catch (err) {
      console.log('query is not executed: ' + err);
    }
  } else {
    console.log('로그인정보 없음');
    res.send({
      message: '로그인정보 없음',
    });
    return true;
  }
});
//로그아웃 라우터
app.get('/api/todos/logout', async (req, res) => {
  console.log('/process/logout 호출됨');
  try {
    console.log('로그아웃함');
    req.session.destroy(function (err) {
      if (err) throw err;
      logined_userid = null;
      console.log('세션 삭제하고 로그아웃됨');
      res.send({ message: '로그아웃' });
      return true;
    });
  } catch (err) {
    console.log(err);
  }
});

// 서버 동작중인 표시
app.listen(app.get('port'), app.get('host'), () =>
  console.log(
    'Server is running on : ' + app.get('host') + ':' + app.get('port')
  )
);
