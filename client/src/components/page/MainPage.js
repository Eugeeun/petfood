import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Page = styled.div`
  max-width: 1000px;
  margin: 50px auto;
`;

const Content1 = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 12px;
`;

const InputTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
  color: navy;
`;

const FormGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  margin-bottom: 40px;

  label {
    font-size: 15px;
    font-weight: 550;
    color: navy;
    margin-bottom: 5px;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 120px;
    height: 25px;
    &::placeholder {
      color: #dadada;
    }
    &:focus {
      outline: none; /* 포커스 스타일 제거 */
      border: 2px solid #646EFF;
    }
  }
`;

const Explain = styled.span`
  font-size: 13px;
  color: red;  
`;

const SubmitButton = styled.button`
  height: 35px;
  width: 120px;
  background-color: #646EFF;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:disabled{
    background-color: #dadada;
    color: #FFFFFF;
  }
`;

const Content2 = styled.div`
  max-width: 1000px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 12px;
  `;

const BannerImg = styled.img`
  width: 100%;
`;

function MainPage() {
  
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [foodName, setFoodName] = useState('');
  //제출 버튼 입력하려면 종, 음식명 필수로 입력할 수 있게끔 스테이트값 반환
  const [notAllow, setNotAllow] = useState(false);
  const [result, setResult] = useState('');

  const handlespeciesChange = (event) => {
    setSpecies(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
  };
  
  //입력이 되어야 버튼 활성화
  useEffect(()=>{
    if(species.length > 0 && foodName.length > 0) {
      setNotAllow(false);
    }else {
      setNotAllow(true);
    }
  });

  const onClickButton = () => {
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 유해한지 무해한지 결과를 setResult 함수를 사용하여 저장합니다.
    // 이 코드는 예시로 "유해함" 혹은 "무해함" 중 무작위로 결과를 설정하는 코드입니다.
    // 유해함 적정량만 급여 무해함으로 변경ㅎㅐ야함 ...
    const randomResult = Math.random() < 0.5 ? "유해함" : "무해함";
    setResult(randomResult);
  };

  return (
    <Page>
      <Content1>
        <form onSubmit={handleSubmit}>
          <InputTitle>반려동물 음식 유해도 검색</InputTitle>
          <FormGroup>
            <label>종<Explain>(필수)</Explain></label>
            <input type="text" 
            placeholder=' 개'
            value={species} onChange={handlespeciesChange} />
          </FormGroup>
          <FormGroup>
            <label>품종명</label>
            <input type="text" 
            placeholder=' 웰시코기'
            value={breed} onChange={handleBreedChange} />
          </FormGroup>
          <FormGroup>
            <label>음식명<Explain>(필수)</Explain></label>
            <input type="text" 
            placeholder=' 땅콩'
            value={foodName} onChange={handleFoodNameChange} />
          </FormGroup>
          
          <FormGroup>
            <label></label>
            <SubmitButton 
            onClick={onClickButton} 
            type="submit" disabled={notAllow}>제출</SubmitButton>
          </FormGroup>
          <FormGroup>
            <label>결과</label>
            <input type="text" value={result} readOnly />
          </FormGroup>
        </form>
    </Content1>
      
    <Content2>
      <Link to="/gamepage">
        <BannerImg src="/image/oxbanner.png" alt="로고" />
      </Link>
    </Content2>
    </Page>
  );
}

export default MainPage;