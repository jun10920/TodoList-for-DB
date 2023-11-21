var mysql = require('mysql2');

var db_info = {
  host: 'localhost', // 데이터베이스 주소
  port: '3300', // 데이터베이스 포트
  user: 'root', // 로그인 계정
  password: 'hyoung12!@', // 비밀번호
  database: 'memo', // 엑세스할 데이터베이스
};

module.exports = {
  init: function () {
    return mysql.createConnection(db_info);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error('mysql connection error : ' + err);
      else console.log('mysql is connected successfully!');
    });
  },
};
