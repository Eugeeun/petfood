import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import MainPage from './page/MainPage';
import LogInPage from './page/LogInPage';
import SignUpPage from "./page/SignUpPage";
import MyPage from "./page/MyPage";
import GamePage from "./page/GamePage";

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: #f0f0f0;
  padding: 0 20px;
`;

const Logo = styled.div`
  height: 100%;
  width: 33.3%
`;

const LogoImg = styled.img`
  height: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: navy;
  flex: 1;
  text-align: center;
  width: 33.3%
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  width: 33.3%
`;

const NavLink = styled(Link)`
  border-right: 1px solid #969696;
  padding-right: 15px;
  margin-right: 15px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  color: #787878;
  &:hover {
    color: navy;
    font-weight: 1000;
  }
`;

const LastNavLink = styled(Link)`
  margin-right: 15px;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  color: #787878;
  &:hover {
    color: navy;
    font-weight: 1000;
  }
`;

//로그인 상태면 로그아웃으로 로그아웃 / 마이페이지로 되게끔 코드 추가해야함 

function App(props) { 
  return (
    <BrowserRouter>
      <MainHeader>
        <Logo>
          <Link to="/">
              <LogoImg src="/image/logo.png" alt="로고" />
          </Link>
        </Logo>
        <Title>Pet Food</Title>
        <NavLinks>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
          <LastNavLink to="/mypage">마이페이지</LastNavLink>
        </NavLinks>
      </MainHeader>

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="gamepage" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;