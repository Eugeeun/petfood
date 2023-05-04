import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; 

//라우트 코드 경로로 이동하기 위해 라이브러리 추가

//임시 더미 데이터
const User = {
  id : 'qwer1234',
  pw : 'qwer1234!'
}

const Page = styled.div`
  position: absolute;
  top: 100px; //배너때문에 100px부터 시작
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  

  left: 50%;
  transform: translate(-50%, 0);

  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  margin-top: 50px;
  font-size: 26px;
  font-weight: 700;
  color: navy;
  text-align: center;
`;
const ContentWrap = styled.div`
  flex: 1;
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

const ErrorMessageWrap = styled.div`
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
  margin-bottom: 100px; //밑에좀 키우기
  cursor: pointer;
  &:disabled{
    background-color: #dadada;
    color: white;
  }
`;


function SignUpPage() {
  const [id, setId] = useState(''); //아이디 스테이트 생성 및 초기화
  const [pw, setPw] = useState('');

  //스테이트값 반환
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(false);

  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[a-zA-Z0-9]{8,}$/; // 8자 이상의 유효한 패턴으로 정규표현식 생성
    if (regex.test(e.target.value)) { // 입력된 값이 패턴에 맞는지 검사
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,}$/;
    if (regex.test(e.target.value)) { // 입력된 값이 패턴에 맞는지 검사
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }

  //id와 비밀번호의 스테이트의 값이 패턴에 맞는지 검사한 결과값이 true여야 버튼 활성화
  useEffect(()=>{
    if(idValid && pwValid) {
      setNotAllow(false);
    }else {
      setNotAllow(true);
    }
  },[idValid,pwValid])

  //버튼 클릭 이벤트 + useNavigate 함수를 통한 로그인 페이지로 이동함
  const navigate = useNavigate();
  const onClickConfirmButton = () => {
    alert('회원가입에 성공하였습니다.');
    navigate('/login');
  }

  return (
    <Page>
      <TitleWrap>
        회원가입
      </TitleWrap>
      <ContentWrap>
        <InputTitle>아이디 <Explain>(필수)</Explain></InputTitle>
        <InputWrap>
          <Input 
          type='text'
          placeholder='영문, 숫자 포함 8자 이상 입력해주세요'
          value={id}
          onChange={handleId}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!idValid && id.length > 0 && (
            <div>8자 이상의 올바른 아이디를 입력해주세요</div>
          )}
        </ErrorMessageWrap>

        <InputTitle>비밀번호 <Explain>(필수)</Explain></InputTitle>
        <InputWrap>
          <Input 
          type='password'
          placeholder='영문, 숫자, 특수문자 포함 8자 이상 입력해주세요'
          value={pw}
          onChange={handlePassword}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
          )}
        </ErrorMessageWrap>
        <InputTitle>종</InputTitle>
        <InputWrap>
          <Input/>
        </InputWrap>

        <InputTitle>품종명</InputTitle>
        <InputWrap>
          <Input/>
        </InputWrap>
      </ContentWrap>


      <div>
        <BottomButton
        onClick={onClickConfirmButton} 
        disabled={notAllow}>확인</BottomButton>
      </div>
    </Page>
  );
}

export default SignUpPage;