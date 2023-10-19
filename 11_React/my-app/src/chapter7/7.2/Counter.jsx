import { useState } from "react";

// count state를 만들고 버튼을 누를때마다 1씩 증가하고 그 결과가 화면 에 출력됨
function Counter() {
  // state를 사용해서 값이 바뀔때마다 재렌더링 되도록 해야함
  let [count, setCount] = useState(0); // 초기값 0, {state 이름(변수)이 count면 그 다음 변경될 함수명은 set을 붙히고 camelCase를 이용해서 생성하는게 관례}

  // Quiz
  // 글자색 바꾸기
  const [color, setColor] = useState('blue');
  // 버튼 내용 바꾸기
  // const [button, setButton] = useState('구독'); // 방법1
  const [button, setButton] = useState(false); // 방법2


  // console.log(useState(0));
  // userState(){(함수)}의 결과로 배열이 반환됨 -> [초기값, set함수]
  // 배열의 구조 분해 할당을 사용하여 변수 선언 및 할당

  // (참고) ESS
  // const arr = useState(0);
  // const count = arr[0];
  // const setCount = arr[1];
  // console.log(arr); 

  // 만약 state 미사용 시
  // 이런 식으로 쓰면 카운트 값을 증가시킬 수는 있지만, 재렌더링이 일어나지 않음
  // 다른 이유로 재렌더링 발생 시, 값이 초기화됨
  // {재렌더링 시 코드가 맨위에서 부터 다시 실행되므로 wrongCount값이 0으로 초기화됨}
  let wrongCount = 0;

  return ( // {리턴문안에 코드가 리액트 엘리먼트}
    <>
      {/* 1. state 사용 */}
      <p>총 {count}번 클릭했습니다.</p>
      <button onClick={() => { setCount(count + 1); }}>클릭</button>
      
      <br />

       {/* 2. state를 직접 수정  */}
       {/* 직접 count state를 증가시키면 값은 증가되지만 재렌더링이 일어나지 않음 */}
       <button onClick={() => { 
        count++; 
        console.log(count);
        }}>클릭(잘못된 방법 - 값은 변경됨)</button>

      {/* 3. state 미사용시 */}
      <p>총 {wrongCount}번 클릭했습니다.</p>
      <button onClick={() => { 
        wrongCount++;
        console.log(wrongCount);
      }}>
        클릭(잘못된 방법)
      </button>

      {/* Quiz: 글자색 바꾸기, 버튼 내용 바꾸기 */}
      <p style={{ color: color }}>현재 글자색: {color}</p>
      <button onClick={() => { setColor('black'); }}>글자색 변경</button>

      <p>버튼 내용 바꾸기(힌트: 삼항 연산자 사용)</p>
      <button onClick={() => {
        // setButton('구독 완료'); // 방법1
      // }}>
        setButton(true); // 방법2 삼항 연산자 사용 
        }}>
        {button ? '구독 완료' : '구독'}
        {/* {button} 방법1 */}
      </button>
    </>
  );
}

export default Counter;