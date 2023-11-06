import React from 'react';
import styled from 'styled-components';

const TodoTemplateWarpper = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;

  /* 아래처럼(const AppTitle) 컴포넌트로 따로 만들어도 되고 아니면 내부에 class로 만들어도 됨 */
  /* { 선생님은 레이아웃은 컴포넌트로, 글자 폰트 색상등은 클래스로 만들었다고 함 } */
  /* 아래와 같이 작성하면 자손을 의미 { 클래스명 앞에 & + 띄어쓰기 한 칸이 빠진것 } */
  .app-title {
    background: #22b8cf;
    color: white;
    height: 4rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background: white;
  }
`;

// const AppTitle = styled.div`
//   background: #22b8cf;
//   color: white;
//   height: 4rem;
//   font-size: 1.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// 화면을 가운데 정렬하고, 앱 타이틀을 보여주는 컴포넌트
// children으로 내부 자식 엘리먼트들을 props로 받아와서 랜더링
function TodoTemplate(props) {
  const { children } = props;
  console.log(children);

  return (
    <TodoTemplateWarpper>
      {/* <AppTitle>일정 관리</AppTitle> */}
      <div className='app-title'>일정 관리</div>
      <div className='content'>{children}</div>
    </TodoTemplateWarpper>
  );
}



export default TodoTemplate;