const express = require('express'); // node.js 프레임워크인 express 사용
const app = express();
const PORT = 5000; // 5000번 포트로 서버를 열 것임
const { connect } = require('./connect');

app.use(express.json()); // body-parser라는 것인데 josn형태의 데이터를 받으면 request.body로 접근가능
app.use(express.urlencoded({ extended: true })); // 데이터의 형태가 url-encoded면 request.body로 접근가능

app.post('/api/register', (req, res) => {
  // 유저 정보를 DB에 저장
  const userInfo = `insert into user values ('${req.body.id}','${req.body.password}');`;
  connect.query(userInfo, (err, rows, fields) => {
    if (err) res.json({ success: false });
  });

  // 애완동물 정보를 DB에 저장
  const petInfo = `insert into pet values ('${req.body.id}','${req.body.breed}','${req.body.petName}');`;
  connect.query(petInfo, (err, rows, fields) => {
    if (err) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.post('/api/breed', (req, res) => {
  // 품종명 존재 확인
  const animals = `select * from specie where breed = '${req.body.breed}';`;
  connect.query(animals, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.get('/api/login', (req, res) => {
  // 아이디와 비밀번호가 일치하는지 확인
  const userInfo = `select * from user where user_id = '${req.body.id}' and password = '${req.body.password}';`;
  connect.query(userInfo, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`${PORT} listening!`));
