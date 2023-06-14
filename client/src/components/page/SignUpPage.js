import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// 페이지 전체를 감싸는 스타일드 컴포넌트
const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

// 페이지 제목을 표시하는 스타일드 컴포넌트
const Title = styled.div`
  margin-top: 50px;
  font-size: 26px;
  font-weight: 700;
  color: navy;
  text-align: center;
`;

// 컨텐츠를 감싸는 스타일드 컴포넌트
const Content = styled.div`
  flex: 1;
  margin: 0 30px;
`;

// 입력 필드 제목을 표시하는 스타일드 컴포넌트
const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  color: navy;
`;

// 필드 입력을 감싸는 스타일드 컴포넌트
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

// 입력 필드 스타일을 지정하는 스타일드 컴포넌트
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

// 오류 메시지를 표시하는 스타일드 컴포넌트
const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
`;

// 확인 버튼 스타일을 지정하는 스타일드 컴포넌트
const BottomButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: #9e30f4;
  border-radius: 64px;
  color: white;
  margin-top: 40px;
  margin-bottom: 100px;
  cursor: pointer;
  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;

function SignUpPage() {
  // 상태 변수 선언 및 초기화
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');

  // 입력값의 유효성 검사를 위한 상태 변수 선언 및 초기화
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(false);
  const [breedValid, setBreedValid] = useState(true);

  // 아이디 입력 핸들러
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[a-zA-Z0-9]{8,}$/;
    setIdValid(regex.test(e.target.value));
  };

  // 비밀번호 입력 핸들러
  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  // 애완동물명 입력 핸들러
  const handlePetName = (e) => {
    setPetName(e.target.value);
  };

  // 품종 입력 핸들러
  const handleBreed = (e) => {
    setBreed(e.target.value);
  };

  // 아이디와 비밀번호의 유효성 상태 변화 감지
  useEffect(() => {
    setNotAllow(!(idValid && pwValid));
  }, [idValid, pwValid]);

  const navigate = useNavigate();

  // 확인 버튼 클릭 핸들러
  const onClickConfirmButton = () => {
    const userInfo = {
      id: id,
      password: pw,
      petName: petName,
      breed: breed,
    };

    // 품종 유효성 검사를 위해 서버로 요청
    Axios.post('/api/breed', userInfo).then((response) => {
      if (response.data.success) {
        setBreedValid(true);

        // 회원가입 요청
        Axios.post('/api/register', userInfo).then((response) => {
          if (response.data.success) {
            alert('회원가입에 성공하였습니다.');
            navigate('/login');
          }
        });
      } else {
        setBreedValid(false);
      }
    });
  };

  // 엔터 키 입력 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !notAllow) {
      onClickConfirmButton();
    }
  };

  return (
    <Page>
      <Title>회원가입</Title>
      <Content>
        <InputTitle>
          아이디 <Explain>(필수)</Explain>
        </InputTitle>
        <InputWrap>
          <Input
            type="text"
            placeholder="영문, 숫자 포함 8자 이상 입력해주세요"
            value={id}
            onChange={handleId}
            onKeyDown={handleKeyDown}
          />
        </InputWrap>
        <ErrorMessage>
          {!idValid && id.length > 0 && (
            <div>8자 이상의 올바른 아이디를 입력해주세요</div>
          )}
        </ErrorMessage>

        <InputTitle>
          비밀번호 <Explain>(필수)</Explain>
        </InputTitle>
        <InputWrap>
          <Input
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요"
            value={pw}
            onChange={handlePassword}
            onKeyDown={handleKeyDown}
          />
        </InputWrap>
        <ErrorMessage>
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
          )}
        </ErrorMessage>

        <InputTitle>애완동물명</InputTitle>
        <InputWrap>
          <Input onChange={handlePetName} onKeyDown={handleKeyDown} />
        </InputWrap>

        <InputTitle>품종</InputTitle>
        <InputWrap>
          <Input
            placeholder="노르웨이고양이"
            onChange={handleBreed}
            onKeyDown={handleKeyDown}
          />
        </InputWrap>
        <ErrorMessage>
          {!breedValid && breed.length > 0 && (
            <div>존재하지 않는 품종입니다</div>
          )}
        </ErrorMessage>

        <div>
          <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
            확인
          </BottomButton>
        </div>
      </Content>
    </Page>
  );
}

export default SignUpPage;
