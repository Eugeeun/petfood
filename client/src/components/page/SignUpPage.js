import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

const Title = styled.div`
  margin-top: 50px;
  font-size: 26px;
  font-weight: 700;
  color: navy;
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
  margin: 0 30px;
`;

const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  color: navy;
`;

const Explain = styled.span`
  color: red;
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

const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
`;

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
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(false);
  const [breedValid, setBreedValid] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[a-zA-Z0-9]{8,}$/;
    setIdValid(regex.test(e.target.value));
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  const handlePetName = (e) => {
    setPetName(e.target.value);
  };

  const handleBreed = (e) => {
    setBreed(e.target.value);
  };

  useEffect(() => {
    setNotAllow(!(idValid && pwValid));
  }, [idValid, pwValid]);

  const navigate = useNavigate();
  const onClickConfirmButton = () => {
    const userInfo = {
      id: id,
      password: pw,
      petName: petName,
      breed: breed,
    };

    Axios.post('/api/breed', userInfo).then((response) => {
      if (response.data.success) {
        setBreedValid(true);
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
