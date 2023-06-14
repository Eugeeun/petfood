const express = require('express');
const app = express();
const PORT = 5000;
const { connect } = require('./connect');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/foods', express.static('foods'));

// 회원 가입 API
app.post('/api/register', (req, res) => {
  const { id, password, breed, petName } = req.body;

  const userInfoQuery = `INSERT INTO user VALUES ('${id}', '${password}');`;
  const petInfoQuery = `INSERT INTO pet VALUES ('${id}', '${breed}', '${petName}');`;

  // 사용자 정보를 데이터베이스에 삽입합니다.
  connect.query(userInfoQuery, (err, rows, fields) => {
    if (err) return res.json({ success: false });

    // 반려동물 정보를 데이터베이스에 삽입합니다.
    connect.query(petInfoQuery, (err, rows, fields) => {
      if (err) return res.json({ success: false });

      res.json({ success: true });
    });
  });
});

// 품종 확인 API
app.post('/api/breed', (req, res) => {
  const { breed } = req.body;

  const breedQuery = `SELECT * FROM specie WHERE breed = '${breed}';`;

  // 특정 품종이 데이터베이스에 존재하는지 확인합니다.
  connect.query(breedQuery, (err, rows, fields) => {
    if (err || rows.length === 0) return res.json({ success: false });

    res.json({ success: true });
  });
});

// 로그인 API
app.post('/api/login', (req, res) => {
  const { id, password } = req.body;

  const loginQuery = `SELECT * FROM user WHERE user_id = '${id}' AND password = '${password}';`;

  // 사용자의 로그인 정보를 확인합니다.
  connect.query(loginQuery, (err, rows, fields) => {
    if (err || rows.length === 0) return res.json({ success: false });

    res.json({ success: true });
  });
});

// 애완동물 정보 조회 API
app.post('/api/petinfo', (req, res) => {
  const { id } = req.body;

  const petInfoQuery = `SELECT breed, species FROM specie WHERE breed = (SELECT breed FROM pet WHERE user_id = '${id}');`;

  // 특정 사용자의 애완동물 정보를 조회합니다.
  connect.query(petInfoQuery, (err, rows, fields) => {
    if (err || rows.length === 0) return res.json({ success: false });

    res.json({ success: true, rows });
  });
});

// 섭취 가능 여부 확인 API
app.post('/api/edibility', (req, res) => {
  const { species, foodName } = req.body;

  const edibilityQuery = `SELECT is_edibility FROM edibility WHERE species = '${species}' AND food_name = '${foodName}';`;

  // 특정 반려동물 종과 음식의 섭취 가능 여부를 확인합니다.
  connect.query(edibilityQuery, (err, rows, fields) => {
    if (err || rows.length === 0) return res.json({ success: false });

    let isEdibility = null;
    if (rows[0].is_edibility === 'o') isEdibility = '무해함';
    else if (rows[0].is_edibility === 'x') isEdibility = '유해함';
    else isEdibility = '적당량만 급여';

    res.json({ success: true, isEdibility });
  });
});

// 유저 정보 조회 API
app.post('/api/userinfo', (req, res) => {
  const { id } = req.body;

  const userInfoQuery = `SELECT breed, pet_name FROM pet WHERE user_id = '${id}';`;

  // 특정 사용자의 정보를 조회합니다.
  connect.query(userInfoQuery, (err, rows, fields) => {
    if (err || rows.length === 0) return res.json({ success: false });

    res.json({ success: true, rows });
  });
});

// 애완동물 정보 수정 API
app.post('/api/updatepetinfo', (req, res) => {
  const { id, breed, petName } = req.body;

  const updatePetInfoQuery = `UPDATE pet SET breed = '${breed}', pet_name = '${petName}' WHERE user_id = '${id}';`;

  // 특정 사용자의 애완동물 정보를 수정합니다.
  connect.query(updatePetInfoQuery, (err, rows, fields) => {
    if (err) return res.json({ success: false });

    res.json({ success: true });
  });
});

// 유저 정보 수정 API
app.post('/api/updateuserinfo', (req, res) => {
  const { id, password } = req.body;

  const updateUserInfoQuery = `UPDATE user SET password = '${password}' WHERE user_id = '${id}';`;

  // 특정 사용자의 정보를 수정합니다.
  connect.query(updateUserInfoQuery, (err, rows, fields) => {
    if (err) return res.json({ success: false });

    res.json({ success: true });
  });
});

// 랜덤 음식 조회 API
app.get('/api/randomfood', (req, res) => {
  const randomFoodQuery = `SELECT * FROM food ORDER BY RAND() LIMIT 1;`;

  // 랜덤으로 음식을 조회합니다.
  connect.query(randomFoodQuery, (err, rows, fields) => {
    if (err) return res.json({ success: false });

    res.json({ success: true, rows });
  });
});

// 정답 확인 API
app.post('/api/answercheck', (req, res) => {
  const { foodName, species, answer } = req.body;

  const answerCheckQuery = `SELECT is_edibility FROM edibility WHERE food_name = '${foodName}' AND species = '${species}';`;

  // 특정 음식과 반려동물 종에 대한 정답을 확인합니다.
  connect.query(answerCheckQuery, (err, rows, fields) => {
    if (err) return res.json({ success: false });

    if (rows[0].is_edibility !== answer) {
      return res.json({
        success: true,
        correct: false,
        answer: rows[0].is_edibility,
      });
    }

    res.json({ success: true, correct: true });
  });
});

app.listen(PORT, () => console.log(`${PORT} listening!`));
