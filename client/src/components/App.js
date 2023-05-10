import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import MainPage from './page/MainPage';
import LogInPage from './page/LogInPage';
import SignUpPage from './page/SignUpPage';
import MyPage from './page/MyPage';
import GamePage from './page/GamePage';

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background-color: #f0f0f0;
  padding: 0 20px;
`;

const Logo = styled.div`
  height: 100%;
  width: 33.3%;
  @media screen and (max-width: 1000px) {
    width: 30%;
  }
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
  width: 33.3%;
  @media screen and (max-width: 1000px) {
    flex: none;
    width: 40%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  width: 33.3%;

  @media screen and (max-width: 1000px) {
    display: none;
  }
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

const MediaHeader = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: center;
    background-color: #f0f0f0;
    border-top: 2px solid #b4b4b4;
    border-bottom: 2px solid #b4b4b4;
  }
`;

const MediaLink = styled(Link)`
  @media screen and (max-width: 1000px) {
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
    color: navy;
    margin: 0 20px;
    &:hover {
      font-weight: 1000;
    }
  }
`;

function App(props) {

  const handleLogout = () => {
    // 로그아웃을 하면 localStorage에서 id를 삭제하고 페이지를 새로고침하여
    // 컴포넌트를 리렌더링
    localStorage.removeItem('id');
    window.location.reload();
  };

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
          {!localStorage.getItem('id') ? (
            <NavLink to="/login">로그인</NavLink>
          ) : (
            <NavLink to="/" onClick={handleLogout}>
              로그아웃
            </NavLink>
          )}
          <NavLink to="/signup">회원가입</NavLink>
          <LastNavLink to="/mypage">마이페이지</LastNavLink>
        </NavLinks>
      </MainHeader>

      <MediaHeader>
        {!localStorage.getItem('id') ? (
          <MediaLink to="/login">로그인</MediaLink>
        ) : (
          <MediaLink to="/" onClick={handleLogout}>
            로그아웃
          </MediaLink>
        )}
        <MediaLink to="/signup">회원가입</MediaLink>
        <MediaLink to="/mypage">마이페이지</MediaLink>
      </MediaHeader>

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