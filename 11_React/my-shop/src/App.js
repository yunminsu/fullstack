import styled, { createGlobalStyle } from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS 추가
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

const GlobalStyle = createGlobalStyle`
  /* 글로벌(공통) 스타일 */
  body {
    box-sizing: border-box;
  }

  #root {
    text-align: center; // 디자인 편하게 하려고 꼼수
  }

  * {
    box-sizing: inherit;
  }

  .cusor-pointer {
    cursor: pointer;
  }
`;

// { 컴포넌트에 커스텀(CSS) 하기 } - 안됨
// const StyledButton = styled(Button)`
// `;


function App() {
  return (
    <>
      <GlobalStyle />
      {/* 부트스트랩 연습 */}
      {/* <Button variant="success">Success</Button>
      <button type="button" class="btn btn-warning">Warning</button> */}


      {/* Quiz: Layout 컴포넌트로 추출 및 Outlet을 활용하여 라우팅 구성해보기 */}
      {/* src/pages/Layout.js */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          {/* <Route path="cart" element={undefined} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

// Bootstrap
// 레이아웃을 복사 붙여넣기 식으로 편하게 개발 가능한 css, js 라이브러리
// 리액트 용이 따로 있는데 나는 기존 것이 더 익숙하다 싶으면 기존 부트스트랩을 써도 무관
// 리액트용 - https://react-bootstrap.netlify.app/
// 기존용 - https://getbootstrap.com/

// 패키지 설치 및 StrictMode 제거
// npm install react-bootstrap bootstrap styled-components react-router-dom @reduxjs/toolkit react-redux axios