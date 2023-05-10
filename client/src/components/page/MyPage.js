import React, { useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 50px;
  color: navy;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 5px;
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

  //임시 코드
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
          비밀번호:
          <Input type="password" value={pw} onChange={handlePwChange} />
        </Label>
        <Label>
          동물 이름:
          <Input type="text" value={petName} onChange={handlePetNameChange} />
        </Label>
        <Label>
          품종:
          <Input type="text" value={breed} onChange={handleBreedChange} />
        </Label>
        <Button type="submit">정보 업데이트</Button>
      </Form>
    </Page>
  );
}

export default MyPage;