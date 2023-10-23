import { useState } from "react";

function ReservationRefactoring() {
  // 여러 개의 입력 제어하기 => 여러 개의 state 선언
  // const [breakfast, setBreakfast] = useState(false);
  // const [numberOfGuests, setNumberOfGuests] = useState(2);
  // const [roomType, setRoomType] = useState('SINGLE');

  // 만약 여러 개의 state가 서로 관련이 있는 데이터라면 객체 형태로 묶어서 관리 가능
  // input에 name 속성을 설정하고 이벤트가 발생했을 때 이 값을 참조하여 객체에 접근
  // 물론 관련이 없는 데이터라면 여러 개의 state로 선언해서 사용
  const [inputs, setInputs] = useState({
    breakfast: false,
    numberOfGuests: 2,
    roomType: 'SINGLE'
  });
  const { breakfast, numberOfGuests, roomType } = inputs; // 구조 분해 할당을 통해 값 추출

  const handleInputChange = (e) => {
    // console.log(e.target); // 현재 이벤트가 발생한 대상 객체
    const { type, name, checked, value } = e.target;
    // console.log(type, name, checked, value);
    const inputValue = type === 'checkbox' ? checked : value;
    console.log(name, inputValue);

    // 중요!!
    // 리액트 상태에서 객체를 수정해야 할 때에는,
    // {객체는 메모리 어딘가에 저장 됨}
    // 아래와 같이 기존 상태를 직접 수정해서 set함수에 넣으면 안됨
    // (ipnuts가 가리키는 객체의 내부 데이터만 바뀐것이지 주소값(참조값)은 변하지 않기 때문)
    // inputs[name] = inputValue;
    // setInputs(copyInput); // set함수를 써도 재렌더링이 발생 안함(리액트가 데이터가 바뀐것을 감지하지 못함)

    // 그 대신에 새로운 객체를 만들어서 새로운 객체에 변화를 주고 이를 상태로 사용해야 함
    // 이러한 작업을 "불변성을 지킨다" 라고 부름(기존 객체를 변경하지 X)
    // 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지할 수 있고 이에 따라 재렌더링이 진행됨
    // 방법1
    // const copyInput = {
    //   ...inputs
    // };
    // copyInput[name] = inputValue;
    // setInputs(copyInput);     
    
    
    // 방법2-1 코드 단축
    // setInputs ({
    //   ...inputs,
    //   [name]: inputValue
    // });
    
    // 방법2-2: 코드 단축(+함수형 업데이트)
    setInputs(prevInputs => ({
        ...prevInputs,
        [name]: inputValue
      }));
    // <ES6차 수업 예제 참고>
    // 2_arrow_function - 객체를 암시적 반환하기
    // 9_spread_rest - 객체의 복사, 결합
    // 10_object_literal - 객체의 속성을 동적으로 정의하기

      
    // 결론: 리액트에서 객체를 업데이트 할 때에는 기존 객체를 직접 수정하면 안되고
    // 새로운 객체(기존 객체의 복사본)를 만들어서 그 객체에 변화를 주고 마지막으로 set함수에 넣어줘야 함
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // {멘트 바꿔보기}
    // let msg = '먹을게요';
    // if (!breakfast) {
    //   msg = '안먹어요';
    // }
    // alert(`조식 여부: ${msg} 투숙객 수: ${numberOfGuests}` );

    // alert(`조식 여부: ${breakfast} 투숙객 수: ${numberOfGuests}` );

    alert(`조식 여부: ${breakfast} 투숙객 수: ${numberOfGuests} 룸 타입: ${roomType}`);
  };

  // 여러 input 엘리먼트를 제어해야 할 때, 각 엘리먼트에 name 속성을 추가하고 event.target.name 값을 통해 어떤 입력 양식인지 구분할 수 있게 해줌
  // 그리고 useState에서는 기본 타입의 값이 아니라 객체 형태의 상태를 관리
  return (
    <form onSubmit={handleSubmit}>
      <label>
        조식 여부:
        <input 
          type="checkbox"
          // checked 속성은 checkbox랑 radio 타입에 존재하고 boolean 타입의 값 
          name="breakfast" // name 속성 추가
          checked={breakfast}
          onChange={handleInputChange}  
        />
      </label>
      <br />
      <label>
        투숙객 수:
        <input 
          type="number" 
          name="numberOfGuests" // name 속성 추가
          value={numberOfGuests}
          onChange={handleInputChange}  
        />
      </label>
      <br />
        룸 타입:
      <label>
        <input 
          type="radio"
          name="roomType" // {기본적으로 name 속성을 사용하면 추가하지 않아도 됨}
          value='SINGLE'
          checked={roomType === 'SINGLE'}
          onChange={handleInputChange}
        />
        싱글
      </label>
      <label>
        <input 
          type="radio"
          name="roomType"
          value='DOUBLE'
          checked={roomType === 'DOUBLE'}
          onChange={handleInputChange}
        />
        더블
      </label>
      <label>
        <input 
          type="radio"
          name="roomType"
          value='TWIN'
          checked={roomType === 'TWIN'}
          onChange={handleInputChange}
        />
        트윈
      </label>

      <button type="submit">제출</button>
    </form>
    
  );
}

export default ReservationRefactoring;