import { useEffect } from "react";
import { useRef } from "react";

// {리액트에서 button 클릭 시 input태그에 포커스되게 하는 방법 useRef로 DOM을 선택해야만 가능}
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  console.log(inputEl); // 래퍼런스 객체라 부르는 자바스크립트 일반 객체를 반환함


  // { 7-3 useEffect 사용해보기 }
  useEffect(() => {
    // 마운트 됐을때(렌더링 이후에) 실행되므로 iunput 엘리먼트가 나옴
    console.log(inputEl);

    // 활용 예: 로그인이나 회원강비 화면이 처음 보여졌을때
    // 굳이 클릭하지 않아도 자동으로 포커스가 되어있게 하려면
    // useEffect + useRef 사용
    inputEl.current.focus();
  }, [])


  const onButtonClick = () => {
    // 여기서 inputEl.current는 text input 객체를 담고 있음
    inputEl.current.focus(); // 실제 input에 접근하여 강제 포커스
  };

  return (
    <>
      {/* ref 속성에 inputEl을 넣어주기만 하면 해당 DOM에 접근 가능 */}
      {/* 마치 document.querySelector()와 같음 */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

export default TextInputWithFocusButton;