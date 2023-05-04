# 사용법

### connect.js를 추가해야 함

const mysql = require('mysql');

const conn = {
host: 'localhost',
port: '3306',
user: 'root',
password: '',
database: 'petsfood',
};

let connect = mysql.createConnection(conn);
connect.connect();

module.exports = { connect };
위의 코드에서 password를 채워서 사용하면 됨!

## 22.05.04

### 테이블 수정 : user 테이블에 password 컬럼을 추가

alter table user add password varchar(30) not null;
