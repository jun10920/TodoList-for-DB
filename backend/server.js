const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./database.js');
const cors = require('cors');
const fs = require('fs');
const conn = db.init();

const memos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('port', process.env.PORT || 3000); // 포트 설정
app.set('host', process.env.HOST || '0.0.0.0'); // 아이피 설정

app.get('/api/memos', async (req, res) => {
  var sql = 'SELECT * FROM memos';
  try {
    const [rows, fields] = await conn.promise().query(sql);
    res.send(rows);
  } catch (err) {
    console.log('query is not executed: ' + err);
  }
});

app.post('/api/memos', async (req, res) => {
  var sql = `INSERT INTO memos (content) VALUES ('${req.body.content}')`;
  try {
    await conn.promise().query(sql);
    const [rows] = await conn.promise().query('SELECT * FROM memos');
    res.send(rows);
  } catch (err) {
    console.log('query is not excuted: ' + err);
  }
});

app.put('/api/memos/:modalData', async (req, res) => {
  var sql = `UPDATE memos SET content = '${req.body.content}' WHERE id= '${req.params.modalData}'`;
  try {
    await conn.promise().query(sql);
    const [rows] = await conn.promise().query('SELECT * FROM memos');
    res.send(rows);
  } catch (err) {
    console.log('query is not excuted: ' + err);
  }
});

// 서버 동작중인 표시
app.listen(app.get('port'), app.get('host'), () =>
  console.log(
    'Server is running on : ' + app.get('host') + ':' + app.get('port')
  )
);
