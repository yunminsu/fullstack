import { createGlobalStyle } from "styled-components";
import reset, { Reset } from "styled-reset";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { useEffect, useRef, useState } from "react";
import TodoListItem from "./components/TodoListItem";
import { v4 as uuidv4 } from "uuid";
// { v4 as 다음은 별칭(uuidv4) }

// { createGlobalStyle <- 글로벌 스타일 적용하는 함수 }


// 패키지 설치
// npm install styled-components styled-reset react-icons

// 패키지 설명
// 1) styled-reset: reset css
// 2) react-icons: 리액트에서 다양한 아이콘을 쓸 수 있는 라이브러리
// SVG 형태의 아이콘을 리액트 컴포넌트처럼 쉽게 사용
// props 또는 CSS 스타일로 커스텀 가능
// 아이콘 리스트와 사용법은 공식 문서 참고: https://react-icons.github.io/react-icons

// 글로벌(공통) 스타일 적용과 reset css 적용
// 글로벌(공통) 스타일 작성은 index.css에서 해도 무방하지만
// styled-components를 사용해서 적용을 하고 싶다면
// createGlobalStyle을 이용하여 컴포넌트를 만들고 가장 첫번째로 렌더링하면 됨
const GlobalStyle = createGlobalStyle`
  /* reset css { 적용 방법2 } */
  ${reset}
  
  
  /* 글로벌(공통) 스타일 */
  body {
    background: #e9ecef;
  }
  `;

// console.log(reset); // { reset에 뭐가 들어있는지 확인 }

function App() {
  // todos 배열 안에 객체 형태로 데이터가 존재
  // id, 내용, 완료 여부
  // TodoList에 props로 전달
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '수업 교안 작성하기',
      checked: true
    },
    {
      id: 2,
      text: '시험 채점하기',
      checked: true
    },
    {
      id: 3,
      text: '단계별 실습 예제 만들기',
      checked: false
    }
  ]);

  // 로컬 스토리지에서 가져오기
  useEffect(() => {
    const dbTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(dbTodos);
  }, [])

  // 로컬 스토리지에 저장(주의: DB가 아님, DB처럼 쓰면 안됨!!)
  // 추가, 수정, 삭제 각 함수에 넣어도 되지만, useEffect()를 활용하면 한번에 처리 가능!
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // todos가 변경될 때마다 실행해라

  
  // todos 배열에 새 객체를 추가하기 위한 함수 정의
  // 새 객체를 만들 때마다 id값에 1씩 더해줘야 하는데 useRef()를 사용하여 변수 생성
  // id값은 렌더링되는 정보가 아님(화면에 보이지도 않고, 이 값이 바뀐다고 해서 컴포넌트가 렌더링 될 필요도 없음)
  const nextId = useRef(4);

  
  const handleInsert = (text) => {
    console.log(uuidv4());
    const todo = {
      // id: nextId.current,
      id: uuidv4(),
      // text: text, // { (ES6차) 키값과 변수명이 동일하면 아래와 같이 생략가능 }
      text,
      checked: false
    };

    // 방법1
    // const copyTodo = [...todos];
    // copyTodo.push(todo);
    // setTodos(copyTodo); // 새로운 배열을 만들어 넣어줌
    
    // (편법)
    // setTodos([...todos, todo]);

    // 방법2 - 배열의 메소드 이용
    // 불변성을 지키면서 배열의 요소를 추가해야할 때 concat() 활용
    setTodos(todos.concat(todo));

    nextId.current += 1; // nextId에 1씩 더하기
  };

  // todos 배열에서 id값을 항목을 지우기 위한 함수 정의
  const handleRemove = (id) => { // id: 클릭한 id값
    // 방법1
    // const copyTodos = [...todos];
    // const targetIndex = todos.findIndex(todo => todo.id === id); // todo.id: 배열의 id값 
    // copyTodos.splice(targetIndex, 1);
    // setTodos(copyTodos);

    // 방법2 - 배열의 메소드 이용
    // 불변성을 지키면서 배열의 요소를 추가해야할 때 filter() 활용
    // const newTodos = todos.filter((todo) => {
    //   return todo.id !== id;
    // });
    // setTodos(newTodos);
    // 위 코드 줄이기
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // todos 배열의 특정 요소를 수정하기 위한 함수 정의
  const handleToggle = (id) => {
    // 방법1
    // const copyTodos = [...todos];
    // const target = todos.find(todo => todo.id === id);
    // console.log(target);
    // target.checked = !target.checked;
    // const targetIndex = todos.findIndex(todo => todo.id === id); // { 인덱스값 불러오기(findIndex) }
    // copyTodos[targetIndex] = target;
    // console.log(copyTodos);
    // setTodos(copyTodos);

    // 불변성을 지키면서 배열의 특정 요소를 업데이트 해야할 때 map() 활용
    setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo));
  };

  return (
    <>
      {/* { rest css 적용 방법1, Reset이 html에서 css넣을때 처럼 제일 위로 올라와야 함 }*/}
      {/* <Reset /> */}
      <GlobalStyle />
      <TodoTemplate>
        <TodoInsert onInsert={handleInsert} />
        <TodoList todos={todos} onRemove={handleRemove} onToggle={handleToggle} />
      </TodoTemplate>
    </>
  );
}

export default App;

// HTML 웹 스토리지란?
// 브라우저에서 제공하는 데이터 저장소
// 사용자의 브라우저 내에 로컬로 데이터를 저장할 수 있음
// key-value 형태로 저장
// 최대 5MB까지 문자만 저장가능
// 콘솔 창에서 연습해보기

// 웹 스토리지는 origin(도메인 및 프로토콜)당입니다. 
// 같은 출처의 모든 페이지는 동일한 데이터를 저장하고 액세스할 수 있습니다.

// HTML 웹 스토리지 객체
// HTML 웹 스토리지는 클라이언트에 데이터를 저장하기 위한 두 가지 객체를 제공합니다.
// window.localStorage - 만료 날짜 없이 데이터를 저장
// window.sessionStorage - 한 세션에 대한 데이터 저장(브라우저 탭을 닫으면 데이터가 손실됨)