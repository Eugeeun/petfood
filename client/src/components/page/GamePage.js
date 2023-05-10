import React, { useState } from 'react';
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

  select{
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
    align-items:center;
    
    span{
      font-weight: 800;
    }

  }
`;

function GamePage() {

  const [species, setSpecies] = useState('개');
  
  //select 박스에서 반려동물 종를 선택하고 species에 저장
  const handleSelectChange = (e) => {
    setSpecies(e.target.value);
  }

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

  const onClickChoice_O = (e) => {
    alert('정답입니다'); //임시
  }
  const onClickChoice_Tri = () => {
    alert('정답입니다'); //임시
  }
  const onClickChoice_X = () => {
    alert('정답입니다'); //임시
  }

  return (
    <Page>
      <TitleWrap><img src="/image/quizbanner.png" alt="배너" /></TitleWrap>
      <ChoiceSpeice> 반려동물 종 선택 : &nbsp;
        <select onChange={handleSelectChange}>
          <option>개</option>
          <option>고양이</option>
        </select>
      </ChoiceSpeice>
      <Content>사진</Content>
      <FoodName><span>'음식명'</span> 섭취 가능 여부</FoodName>
      <Answer>
        <button onClick={onClickChoice_O}>O</button>
        <button onClick={onClickChoice_Tri}><span>△</span></button>
        <button onClick={onClickChoice_X}>X</button>
      </Answer>
    </Page>
  )
}

export default GamePage