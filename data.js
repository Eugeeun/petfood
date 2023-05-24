const fs = require('fs');
const csv = require('csv-parser');
const iconv = require('iconv-lite');
const mysql = require('mysql2');

// CSV 파일 경로
const foodPath = './음식들.csv';
const foodTablePath = './음식섭취가능여부 테이블.csv';
const petsPath = './동물들.csv';

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1801116',
  database: 'petsfood',
});

const processFoodFile = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(foodPath)
      .pipe(iconv.decodeStream('euc-kr'))
      .pipe(csv())
      .on('data', (row) => {
        const query = `INSERT INTO food VALUES ('${row.음식명}', '${row.종류}')`;
        connection.query(query, (error, results) => {
          if (error) {
            console.error('데이터 삽입 중 오류가 발생했습니다:', error);
            reject(error);
          } else {
            console.log('음식 데이터 삽입 성공');
          }
        });
      })
      .on('end', () => {
        resolve();
      });
  });
};

const processFoodTableFile = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(foodTablePath)
      .pipe(iconv.decodeStream('euc-kr'))
      .pipe(csv())
      .on('data', (row) => {
        const query = `INSERT INTO edibility VALUES ('${row.음식명}', '${row.종}', '${row.섭취가능여부}')`;
        connection.query(query, (error, results) => {
          if (error) {
            console.error('데이터 삽입 중 오류가 발생했습니다:', error);
            reject(error);
          } else {
            console.log('음식섭취가능여부 데이터 삽입 성공');
          }
        });
      })
      .on('end', () => {
        resolve();
      });
  });
};

const processPetsFile = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(petsPath)
      .pipe(iconv.decodeStream('euc-kr'))
      .pipe(csv())
      .on('data', (row) => {
        const query = `INSERT INTO specie VALUES ('${row.품종}', '${row.종명}')`;
        connection.query(query, (error, results) => {
          if (error) {
            console.error('데이터 삽입 중 오류가 발생했습니다:', error);
            reject(error);
          } else {
            console.log('동물 데이터 삽입 성공');
          }
        });
      })
      .on('end', () => {
        resolve();
      });
  });
};

// 파일 처리 함수들을 순차적으로 실행
processFoodFile()
  .then(() => processFoodTableFile())
  .then(() => processPetsFile())
  .then(() => {
    console.log('작업이 완료되었습니다.');
    connection.end(); // MySQL 연결 종료
  })
  .catch((error) => {
    console.error('작업 중 오류가 발생했습니다:', error);
    connection.end(); // MySQL 연결 종료
  });
