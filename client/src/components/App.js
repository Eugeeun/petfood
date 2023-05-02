import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
// 로고 이미지 경로
import logoImg from './image/logo.png';
// Pages
import MainPage from './page/MainPage';
import LogInPage from './page/LogInPage';
import SignUpPage from "./page/SignUpPage";



const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: #f0f0f0;
  padding: 0 20px;
`;

const Logo = styled.div`
  height: 150%;
`;

const LogoImg = styled.img`
  height: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: navy;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
`;

const NavLink = styled(Link)`
  border-right: 1px solid #969696;
  padding-right: 20px;
  margin-right: 20px;
  font-size: 15px;
  text-decoration: none;
  color: #787878;
  &:hover {
    color: #000000;
  }
`;

const NavLink_last = styled(Link)`
  margin-right: 20px;
  font-size: 15px;
  text-decoration: none;
  color: #787878;
  &:hover {
    color: #000000;
  }
`;

function App(props) { 
  return (
    <BrowserRouter>
      <MainHeader>
        <Logo>
          <Link to="/">
              <LogoImg src={logoImg} alt="로고" />
          </Link>
        </Logo>
        <Title>Pet Food</Title>
        <NavLinks>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
          <NavLink_last to="/signup">마이페이지</NavLink_last>
        </NavLinks>
      
      </MainHeader>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;