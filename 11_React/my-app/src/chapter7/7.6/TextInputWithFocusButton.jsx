import { useRef } from "react";

// {리액트에서 button 클릭 시 input태그에 포커스되게 하는 방법 useRef로 DOM을 선택해야만 가능}
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  console.log(inputEl); // 래퍼런스 객체라 부르는 자바스크립트 일반 객체를 반환함

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