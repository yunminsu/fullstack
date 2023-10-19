import { useState } from "react";

function ConfirmButton() {
  const [isCofirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(!isCofirmed) // true
    // setIsConfirmed(isCofirmed => !isCofirmed); // 이렇게 작성해도 됨! State의 변수 isCofirmed의 값을 가져옴
  } 

  return (
    <button onClick={handleConfirm} disabled={isCofirmed}>{isCofirmed ? '확인됨' : '확인하기'}</button>
  );
}

export default ConfirmButton;

// Quiz: 사용자에게 확인을 요구하는 버튼 컴포넌트
// 버튼을 누르면 '확인하기'가 '확인됨'으로 변경되면서 버튼 비활성화 처리 해보기
// 무엇을 해야할까?
// 1) isConfirmed라는 state 만들기
// 2) 버튼을 클릭하면 isCofirmed 상태를 바꾸는 handleConfirm() 이벤트 핸들러 만들기
// 3) 삼항 연산자를 사용하여 버튼의 내용을 '확인하기' -> '확인됨'으로 바꾸기
// 4) 버튼 비활성화 처리