import React from 'react';
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
function TodoInsert(props) {
  return (
    <TodoInsertWapper>
      <StyledInput type='text' placeholder='할 일을 입력하세요.'/>
      <StyledButton type='submit'>
        <MdAdd />
      </StyledButton>
    </TodoInsertWapper>
  );
}

export default TodoInsert;