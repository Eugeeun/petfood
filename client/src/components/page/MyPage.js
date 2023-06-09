import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
`;

function MyPage() {
  const [pw, setPw] = useState(''); // 비밀번호 상태 관리
  const [pwValid, setPwValid] = useState(false); // 비밀번호 유효성 상태 관리
  const [notAllow, setNotAllow] = useState(false); // 제출 버튼 활성화 상태 관리
  const [petName, setPetName] = useState(''); // 반려동물 이름 상태 관리
  const [breed, setBreed] = useState(''); // 품종 상태 관리
  const [breedValid, setBreedValid] = useState(true); // 품종 유효성 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 유저 정보 가져오기
    const userId = { id: localStorage.getItem('id') };
    if (userId.id) {
      Axios.post('/api/userinfo', userId).then((response) => {
        if (response.data.success) {
          const UserData = response.data.rows[0];
          setPetName(UserData.pet_name);
          setBreed(UserData.breed);
        }
      });
    }
  }, []);

  useEffect(() => {
    // 비밀번호 유효성 확인 후 제출 버튼 활성화 여부 설정
    setNotAllow(!pwValid);
  }, [pwValid]);

  const handlePwChange = (event) => {
    // 비밀번호 입력 값 변경 시 상태 업데이트 및 유효성 검사
    setPw(event.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,}$/;
    setPwValid(regex.test(event.target.value));
  };

  const handlePetNameChange = (event) => {
    // 동물 이름 변경 시 상태 업데이트
    setPetName(event.target.value);
  };

  const handleBreedChange = (event) => {
    // 품종 변경 시 상태 업데이트
    setBreed(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userInfo = {
      id: localStorage.getItem('id'),
      password: pw,
      petName: petName,
      breed: breed,
    };

    Axios.post('/api/breed', userInfo).then((response) => {
      if (response.data.success) {
        Axios.post('/api/updateuserinfo', userInfo);
        Axios.post('/api/updatepetinfo', userInfo);
        alert('정보가 업데이트되었습니다.');
        navigate('/');
      } else {
        setBreedValid(false);
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
            <Input
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
              value={pw}
              onChange={handlePwChange}
            />
          </InputWrap>
          <ErrorMessage>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
            )}
          </ErrorMessage>
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
          <ErrorMessage>
            {!breedValid && breed.length > 0 && (
              <div>존재하지 않는 품종입니다</div>
            )}
          </ErrorMessage>
        </Label>
        <BottomButton type="submit" disabled={notAllow}>
          정보 업데이트
        </BottomButton>
      </Form>
    </Page>
  );
}

export default MyPage;
