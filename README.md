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

## 22.05.08

### 회원가입 구현 완료 : id, pw, 애완동물이름, 품종명 저장완료 품종명은 DB에 존재해야하므로 확인하고 저장

참고사이트 [https://velog.io/@soshin_dev/ERRHTTPHEADERSSENT-Cannot-set-headers-after-they-are-sent-to-the-client-%EC%98%A4%EB%A5%98](https://velog.io/@soshin_dev/ERRHTTPHEADERSSENT-Cannot-set-headers-after-they-are-sent-to-the-client-%EC%98%A4%EB%A5%98)
