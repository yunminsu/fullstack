import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd } from "react-icons/md";
// incon 다른것도 더 쓰고 싶으면 MdAdd, ..., ... 반점으로 추가하고 컴포넌트 형태로 사용하면 됨


const TodoInsertWapper = styled.form`
  display: flex;
  background: #495057;
`;

const StyledInput = styled.input`
  /* 기본 스타일 초기화 */
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  flex: 1; // 버튼을 제외한 영역을 모두 차지하기

  &::placeholder {
    color: #dee2e6;
  }
`;

const StyledButton = styled.button`
  border: none;
  background: #868e96;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s background;

  &:hover {
    background: #adb5bd;
  }
`;

// 새로운 항목을 입력하고 추가할 수 있는 컴포넌트
// state를 통해 input의 상태를 관리
function TodoInsert({ onInsert }) { // App.js 받아온 props값을 바로 구조 분해 할당
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 추가
    if (!value) { // '', null, undefined
      alert('무엇을 할 지 내용을 입력하세요!')
      return; // { 여기서 함수를 종료, 종료하지 않으면 밑에 코드가 실행되면서 빈값이 입력됨 } 
    } 
    
    onInsert(value); 
    setValue(''); // value값 초기화 { input에 남아 있는 텍스트 지우기 }
  }

  return (
    // form 태그 사용시 input에서 엔터키를 눌렀 때도 submit 이벤트가 발생
    // (참고) 일반적으로 keyup 이벤트를 통해 엔터키를 감지하는 로직을 작성
    <TodoInsertWapper onSubmit={handleSubmit}>
      <StyledInput 
        type='text' 
        placeholder='할 일을 입력하세요.' 
        value={value}
        onChange={handleChange}

        // { onKeyup 사용시 }
        // onKeyUp={(e) => {
        //   console.log(e.key);
        //   if (e.key === 'Enter') {
        //     alert('니가 누른 키는: Enter');
        //   }
        // }}
      />
      <StyledButton 
        type='submit'
      >
        <MdAdd />
      </StyledButton>
    </TodoInsertWapper>
  );
}

export default TodoInsert;