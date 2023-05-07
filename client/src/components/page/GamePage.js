import React from 'react'
import styled from 'styled-components';

const Page = styled.div`
  position: absolute;
  top: 100px; //배너때문에 100px부터 시작
  width: 100%;
  max-width: 500px;
  padding: 0 20px;

  left: 50%;
  transform: translate(-50%, 0);
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

const Content = styled.div`
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
`;

const Answer = styled.div`
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
  display: flex;
  justify-content: center;
  
  div {
    font-size: 40px;
    font-weight: 600;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div:not(:last-child) {
    margin-right: 10px;
  }
`;

// 강아지인지 고양이인지 선ㄴ택...
function GamePage() {
  return (
    <Page>
      <TitleWrap>반려동물 음식 OX 퀴즈</TitleWrap>
      <Content>사진?</Content>
      <Answer>
        <div>O</div>
        <div>△</div>
        <div>X</div>
      </Answer>
    </Page>
  )
}

export default GamePage