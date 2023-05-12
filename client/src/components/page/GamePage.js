import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

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

const Content = styled.div`
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
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
  const [species, setSpecies] = useState('개');
  const [food, setFood] = useState('');

  useEffect(() => {
    Axios.get('/api/randomfood').then((response) => {
      setFood(response.data.rows[0].food_name);
    });
  }, []);

  useEffect(() => {
    const userId = { id: localStorage.getItem('id') };
    if (userId.id) {
      // 로그인된 유저가 존재하면 그 유저가 등록한 애완동물 정보를 받아옴
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

  //select 박스에서 반려동물 종를 선택하고 species에 저장
  const handleSelectChange = (e) => {
    setSpecies(e.target.value);
  };

  const onClickChoice_O = (e) => {
    submitAnswer('o');
  };
  const onClickChoice_Tri = () => {
    submitAnswer('△');
  };
  const onClickChoice_X = () => {
    submitAnswer('x');
  };

  const submitAnswer = (answer) => {
    const answerData = {
      foodName: food,
      species: species,
      answer: answer,
    };
    Axios.post('/api/answercheck', answerData).then((response) => {
      if (response.data.success && response.data.correct) {
        alert('정답입니다!');
      }
      else {
        alert(`오답입니다!\n정답은 '${response.data.answer}' 입니다`);
      }
    })
    .then(loadNextQuestion);
  };

  const loadNextQuestion = () => {
    Axios.get('/api/randomfood').then((response) => {
      if (response.data.success) {
        const nextFood = response.data.rows[0];
        if (nextFood.food_name === food) {
          loadNextQuestion(); // 값이 이전 문제의 값과 똑같다면 다시 함수 호출
        } else {
          setFood(nextFood.food_name);
        }
      } else {
        alert('문제를 가져오는 데 실패했습니다.');
      }
    });
  };

  return (
    <Page>
      <TitleWrap>
        <img src='/image/quizbanner.png' alt='배너' />
      </TitleWrap>
      <ChoiceSpeice>
        {' '}
        반려동물 종 선택 : &nbsp;
        <select onChange={handleSelectChange}>
          <option>개</option>
          <option>고양이</option>
        </select>
      </ChoiceSpeice>
      <Content>{food}</Content>
      <FoodName>
        <span>'{food}'</span> 섭취 가능 여부
      </FoodName>
      <Answer>
        <button value='O' onClick={onClickChoice_O} >O</button>
        <button value='△' onClick={onClickChoice_Tri}>
          <span>△</span>
        </button>
        <button value='X' onClick={onClickChoice_X}>X</button>
      </Answer>
    </Page>
  );
}

export default GamePage;
