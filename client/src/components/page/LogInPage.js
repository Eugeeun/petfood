import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

// 페이지 전체를 감싸는 컨테이너
const Page = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

// 로그인 페이지의 제목
const Title = styled.div`
  margin-top: 50px;
  font-size: 26px;
  font-weight: 700;
  color: navy;
  text-align: center;
`;

// 로그인 컨텐츠를 감싸는 컨테이너
const Content = styled.div`
  flex: 1;
  margin: 0 30px;
`;

// 입력 필드 제목
const InputTitle = styled.div`
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  color: navy;
`;

// 입력 필드를 감싸는 컨테이너
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

// 입력 필드 스타일
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

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
`;

// 하단 버튼 스타일
const BottomButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: #9e30f4;
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

// 회원가입 페이지로 이동하는 링크 스타일
const GoToSignUp = styled.div`
  text-align: center;
  margin-bottom: 100px;
`;

// 링크 스타일
const NavLink = styled(Link)`
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    font-weight: 700;
    color: navy;
  }
`;

function LogInPage() {
  // 입력된 아이디와 비밀번호를 상태로 관리
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // 아이디와 비밀번호의 유효성을 검사하는 상태
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  // 로그인 버튼 활성/비활성 상태를 관리
  const [notAllow, setNotAllow] = useState(false);

  // React Router의 navigate 함수를 사용하여 페이지 이동
  const navigate = useNavigate();

  // 아이디 입력 필드의 변경 이벤트 핸들러
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^[a-zA-Z0-9]{8,}$/;
    setIdValid(regex.test(e.target.value));
  };

  // 비밀번호 입력 필드의 변경 이벤트 핸들러
  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,}$/;
    setPwValid(regex.test(e.target.value));
  };

  // 아이디와 비밀번호의 유효성이 변경될 때마다 실행
  useEffect(() => {
    setNotAllow(!(idValid && pwValid));
  }, [idValid, pwValid]);

  // 키보드 입력 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !notAllow) {
      onClickConfirmButton();
    }
  };

  // 확인 버튼 클릭 이벤트 핸들러
  const onClickConfirmButton = () => {
    const loginInfo = {
      id: id,
      password: pw,
    };

    Axios.post('/api/login', loginInfo).then((response) => {
      if (!response.data.success) {
        alert('로그인 실패');
        return;
      }

      localStorage.setItem('id', id);
      navigate('/');
      window.location.reload();
    });
  };

  return (
    <Page>
      <Title>로그인</Title>
      <Content>
        <InputTitle>아이디</InputTitle>
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

        <InputTitle>비밀번호</InputTitle>
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

        <div>
          <BottomButton onClick={onClickConfirmButton} disabled={notAllow}>
            확인
          </BottomButton>
        </div>

        <GoToSignUp>
          <NavLink to="/signup">회원가입 하러 가기</NavLink>
        </GoToSignUp>
      </Content>
    </Page>
  );
}

export default LogInPage;
