import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

// 스타일드 컴포넌트를 사용하여 UI 요소를 스타일링합니다.
const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

const TitleWrap = styled.div`
  margin-top: 50px;
  weight: 500px;
  border-radius: 10px;
  background-color: #f0f0f0;
  margin: 20px 20px 5px 20px;
  img {
    width: 100%;
  }
`;

const ChoiceSpeice = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  align-items: center;
  font-size: 17px;

  select {
    width: 100px;
    height: 30px;
  }
`;

const FoodImg = styled.div`
  display: flex;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const FoodName = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: navy;
  text-align: center;

  span {
    color: red;
  }
`;

const Answer = styled.div`
  height: 80px;
  margin: 20px 20px 100px 20px;
  display: flex;

  button {
    font-size: 40px;
    font-weight: 500;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 800;
    }
  }
`;

function GamePage() {
  const [species, setSpecies] = useState('개'); // 반려동물 종 상태 변수
  const [food, setFood] = useState(''); // 음식 상태 변수
  const [category, setCategory] = useState(''); // 카테고리 상태 변수

  useEffect(() => {
    // 컴포넌트가 마운트될 때 랜덤한 음식을 가져와 상태를 설정합니다.
    Axios.get('/api/randomfood').then((response) => {
      setFood(response.data.rows[0].food_name);
      setCategory(response.data.rows[0].category);
    });
  }, []);

  useEffect(() => {
    const userId = { id: localStorage.getItem('id') };
    if (userId.id) {
      // 로그인된 유저가 존재하면 그 유저가 등록한 애완동물 정보를 가져옵니다.
      Axios.post('/api/petinfo', userId).then((response) => {
        if (response.data.success) {
          const petData = response.data.rows[0];
          setSpecies(petData.species);
        }
      });
    }

    const select = document.querySelector('select');
    const options = select.options;
    for (let i = 0; i < options.length; ++i) {
      if (options[i].value === species) {
        select.selectedIndex = i;
      }
    }
  }, [species]);

  const handleSelectChange = (event) => {
    // 반려동물 종을 선택할 때 호출되는 이벤트 핸들러입니다.
    setSpecies(event.target.value);
  };

  const onClickChoice = (answer) => {
    // 버튼을 클릭했을 때 호출되는 이벤트 핸들러입니다.
    submitAnswer(answer);
  };

  const submitAnswer = (answer) => {
    // 정답을 서버에 제출합니다.
    const answerData = {
      foodName: food,
      species: species,
      answer: answer,
    };

    Axios.post('/api/answercheck', answerData)
      .then((response) => {
        if (response.data.success && response.data.correct) {
          alert('정답입니다!');
        } else {
          alert(`오답입니다!\n정답은 '${response.data.answer}' 입니다.`);
        }
      })
      .then(loadNextQuestion);
  };

  const loadNextQuestion = () => {
    // 다음 문제를 가져옵니다.
    Axios.get('/api/randomfood').then((response) => {
      if (response.data.success) {
        const nextFood = response.data.rows[0];
        if (nextFood.food_name === food) {
          loadNextQuestion();
        } else {
          setFood(nextFood.food_name);
          setCategory(nextFood.category);
        }
      } else {
        alert('문제를 가져오는 데 실패했습니다.');
      }
    });
  };

  return (
    <Page>
      <TitleWrap>
        <img src="/image/quizbanner.png" alt="배너" />
      </TitleWrap>
      <ChoiceSpeice>
        반려동물 종 선택: &nbsp;
        <select value={species} onChange={handleSelectChange}>
          <option>개</option>
          <option>고양이</option>
        </select>
      </ChoiceSpeice>
      <FoodImg>
        <img
          src={`http://localhost:5000/foods/${category}/${food}.jpg`}
          alt="음식 이미지"
        />
      </FoodImg>
      <FoodName>
        <span>'{food}'</span> 섭취 가능 여부
      </FoodName>
      <Answer>
        <button value="O" onClick={() => onClickChoice('O')}>
          O
        </button>
        <button value="△" onClick={() => onClickChoice('△')}>
          <span>△</span>
        </button>
        <button value="X" onClick={() => onClickChoice('X')}>
          X
        </button>
      </Answer>
    </Page>
  );
}

export default GamePage;
