import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// 페이지 전체 스타일
const Page = styled.div`
  max-width: 1000px;
  margin: 50px auto;
`;

// 컨텐츠1 스타일
const Content1 = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 12px;
`;

// 입력 타이틀 스타일
const InputTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
  color: navy;
`;

// 입력 폼 그룹 스타일
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
      outline: none;
      border: 2px solid #646eff;
    }
  }

  // 모바일 환경 또는 가로폭이 1000px 이하로 줄어들면 적용되는 스타일
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30px;
    margin-bottom: 40px;

    input {
      outline: none;
      border-radius: 8px;
      border: 1px solid #bebebe;
      width: 100%;
      height: 40px;
      font-size: 14px;
      font-weight: 400;
      &::placeholder {
        color: #dadada;
      }
      &:focus {
        outline: none;
        border: 2px solid #646eff;
      }
    }
  }
`;

// 설명 스타일
const Explain = styled.span`
  font-size: 13px;
  color: red;
`;

// 제출 버튼 스타일
const SubmitButton = styled.button`
  height: 35px;
  width: 120px;
  background-color: #646eff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #dadada;
    color: #ffffff;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    height: 40px;
  }
`;

// 컨텐츠2 스타일
const Content2 = styled.div`
  max-width: 1000px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px 12px;
`;

// 배너 이미지 스타일
const BannerImg = styled.img`
  width: 100%;
`;

function MainPage() {
  const [species, setSpecies] = useState(''); // 반려동물 종 상태 관리
  const [breed, setBreed] = useState(''); // 품종 상태 관리
  const [foodName, setFoodName] = useState(''); // 음식명 상태 관리
  const [notAllow, setNotAllow] = useState(true); // 제출 버튼 활성화 상태 관리
  const [result, setResult] = useState(''); // 검색 결과 상태 관리

  // 종 변경 핸들러
  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
  };

  // 품종명 변경 핸들러
  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  // 음식명 변경 핸들러
  const handleFoodNameChange = (event) => {
    setFoodName(event.target.value);
  };

  useEffect(() => {
    // 종과 음식명이 비어있으면 제출 버튼 비활성화
    setNotAllow(!(species.length > 0 && foodName.length > 0));

    const userId = localStorage.getItem('id');
    if (userId) {
      // 서버에 사용자의 반려동물 정보 요청
      Axios.post('/api/petinfo', { id: userId }).then((response) => {
        if (response.data.success) {
          const petData = response.data.rows[0];
          setBreed(petData.breed);
          setSpecies(petData.species);
        }
      });
    }
  }, [species, foodName]);

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();

    const searchData = {
      species: species,
      foodName: foodName,
    };

    // 서버에 음식 유해도 검색 요청
    Axios.post('/api/edibility', searchData).then((response) => {
      if (!response.data.success) {
        setResult('알 수 없는 음식 또는 존재하지 않는 품종');
        return;
      }
      setResult(response.data.isEdibility);
    });
  };

  return (
    <Page>
      <Content1>
        <form onSubmit={handleSubmit}>
          <InputTitle>반려동물 음식 유해도 검색</InputTitle>
          <FormGroup>
            <label>
              종<Explain>(필수)</Explain>
            </label>
            <input
              type="text"
              placeholder=" 개"
              value={species}
              onChange={handleSpeciesChange}
            />
          </FormGroup>
          <FormGroup>
            <label>품종명</label>
            <input
              type="text"
              placeholder=" 웰시코기"
              value={breed}
              onChange={handleBreedChange}
            />
          </FormGroup>
          <FormGroup>
            <label>
              음식명<Explain>(필수)</Explain>
            </label>
            <input
              type="text"
              placeholder=" 땅콩"
              value={foodName}
              onChange={handleFoodNameChange}
            />
          </FormGroup>

          <FormGroup>
            <label></label>
            <SubmitButton type="submit" disabled={notAllow}>
              제출
            </SubmitButton>
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
