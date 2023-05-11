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

app.post('/api/login', (req, res) => {
  // 아이디와 비밀번호가 일치하는지 확인
  const userInfo = `select * from user where user_id = '${req.body.id}' and password = '${req.body.password}';`;
  connect.query(userInfo, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.post('/api/petinfo', (req, res) => {
  // 하위 질의문을 통해서 id를 가지고 애완동물의 품종을 찾고 그 품종의 종을 찾아서 반환
  const userId = `select breed, species from specie where breed = (select breed from pet where user_id = '${req.body.id}');`;
  connect.query(userId, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else res.json({ success: true, rows });
  });
});

app.post('/api/edibility', (req, res) => {
  // 품종과 음식명이 같으면 섭취가능여부를 반환
  const edibility = `select is_edibility from edibility where species = '${req.body.species}' and food_name = '${req.body.foodName}';`;
  connect.query(edibility, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else {
      // 섭취여부를 판단하여 변수 설정
      let isEdibility = null;
      if (rows[0].is_edibility === 'o') isEdibility = '무해함';
      else if (rows[0].is_edibility === 'x') isEdibility = '유해함';
      else isEdibility = '적당량만 급여';

      res.json({ success: true, isEdibility: isEdibility });
    }
  });
});

app.post('/api/userinfo', (req, res) => {
  // id를 가지고 애완동물의 이름과 품종명을 가져옴
  const userInfo = `select breed, pet_name from pet where user_id = '${req.body.id}';`;
  connect.query(userInfo, (err, rows, fields) => {
    if (err || rows.length === 0) res.json({ success: false });
    else res.json({ success: true, rows });
  });
});

app.post('/api/updatepetinfo', (req, res) => {
  // 펫 정보를 클라이언트에서 준 정보대로 수정
  const petInfo = `update pet set breed = '${req.body.breed}' , pet_name = '${req.body.petName}' where user_id = '${req.body.id}';`;
  connect.query(petInfo, (err, rows, fields) => {
    if (err) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.post('/api/updateuserinfo', (req, res) => {
  // 유저 정보를 클라이언트에서 준 정보대로 수정
  const userInfo = `update user set password = '${req.body.password}' where user_id = '${req.body.id}'`;
  connect.query(userInfo, (err, rows, fields) => {
    if (err) res.json({ success: false });
    else res.json({ success: true });
  });
});

app.get('/api/randomfood', (req, res) => {
  // DB에서 음식의 종류 중 하나를 가져옴
  const randomFood = `select * from food order by rand() limit 1;`;
  connect.query(randomFood, (err, rows, fields) => {
    if (err) res.json({ success: false });
    else res.json({ success: true, rows });
  });
});

app.post('/api/answercheck', (req, res) => {
  // 종과 음식과 정답이 맞는지 확인
  const edibility = `select is_edibility from edibility where food_name = '${req.body.foodName}' and species = '${req.body.species}';`;
  connect.query(edibility, (err, rows, fields) => {
    if (err) res.json({ success: false });
    else if (rows[0].is_edibility !== req.body.answer)
      res.json({
        success: true,
        correct: false,
        answer: rows[0].is_edibility,
      });
    else res.json({ success: true, correct: true });
  });
});

app.listen(PORT, () => console.log(`${PORT} listening!`));
