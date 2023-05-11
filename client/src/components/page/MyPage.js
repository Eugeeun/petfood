import React, { useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
  color: navy;
  font-size: 26px;
  font-weight: 700;
`;

const Form = styled.form`
  margin: 0 30px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  color: navy;
`;

const InputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 20px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within {
    border: 1px solid #9e30f4;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 17px;
  font-size: 14px;
  font-weight: 400;
  &::placeholder {
    color: #dadada;
  }
`;

const BottomButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: navy;
  border-radius: 64px;
  color: white;
  margin-top: 40px;
  margin-bottom: 20px;
  cursor: pointer;
`;

function MyPage() {
  const [pw, setPw] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');

  const userId = { id: localStorage.getItem('id') };
  if (userId.id) {
    // 로그인된 유저가 존재하면 그 유저가 등록한 정보를 불러옴
    Axios.post('/api/petinfo', userId).then((response) => {
      if (response.data.success) {
        const UserDate = response.data.rows[0];
        setPw(UserDate.pw);
        setPetName(UserDate.petName);
        setBreed(UserDate.breed);
      }
    });
  }

  const handlePwChange = (event) => {
    setPw(event.target.value);
  };

  const handlePetNameChange = (event) => {
    setPetName(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 정보 업데이트 API 호출 
    Axios.post('/api/updatepetinfo', {
      id: userId.id,
      pw,
      petName,
      breed,
    }).then((response) => {
      if (response.data.success) {
        alert('정보가 업데이트되었습니다.');
      }
    });
  };

  return (
    <Page>
      <Title>마이페이지</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          <InputTitle>비밀번호</InputTitle>
          <InputWrap>
            <Input type="password" value={pw} onChange={handlePwChange} />
          </InputWrap>
        </Label>
        <Label>
        <InputTitle>동물 이름</InputTitle>
          <InputWrap>
            <Input type="text" value={petName} onChange={handlePetNameChange} />
          </InputWrap>
        </Label>
        <Label>
        <InputTitle>품종</InputTitle>
          <InputWrap>
            <Input type="text" value={breed} onChange={handleBreedChange} />
          </InputWrap>
        </Label>
        <BottomButton type="submit">정보 업데이트</BottomButton>
      </Form>
    </Page>
  );
}

export default MyPage;