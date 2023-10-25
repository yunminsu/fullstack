import React from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto; // { TodoListItem이 513까지 늘어나다 스크롤 생성 }
`;

// todos 배열을 props로 받아와서 map() 함수를 사용해 여러 개의 TodoListItem 컴포넌트로 변환해 보여줌
function TodoList(props) {
  const { todos, onRemove, onToggle } = props;

  return (
    <TodoListWrapper> 
      {/* <TodoListItem />
      <TodoListItem />
      <TodoListItem /> */}

      {/* Quiz: map() 함수를 이용하여 TodoListItem으로 이루어진 배열로 변환하여 반복 렌더링 */}
      {todos.map((todo) => {
        return <TodoListItem key={todo.id} id={todo.id} text={todo.text} checked={todo.checked} onRemove={onRemove} onToggle={onToggle}/>
      })}

    </TodoListWrapper>
  );
}

export default TodoList;