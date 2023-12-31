import { useState } from "react";

function ListKey() {
  const [list, setList] = useState(['과제하기', '복습하기']);
  const [value, setValue] = useState('');

  const addTolist = () => {
    // 잘못된 코드
    // list.push(value); // 직접 변경하면 재렌더링이 안일어남
    // console.log(list);
    // setList(list) // 근데 set함수를 쓴다고 하더라도 기존 배열을 넣어주면 값의 변경을 감지하지 못함

    // 올바른 코드 - 기존 배열을 복사하여 새로운 배열(새로운 주소값)을 만들어야함
    // setList([value, ...list]); // 값만 넘는 형태
    setList((prevList) => { return [value, ...prevList]}); // 함수형 업데이트 사용
    // setList(prevList => [value, ...prevList]); // {위코드 단축}
    // 함수형 업데이트 사용

    // input에 입력한 이전값 초기화
    // setValue('');
  };

  // (실습1, 2, 3 공통으로 확인해 볼 것!)
  // 리스트 아이템을 추가할 때마다 DOM에 무슨일이 일어나는지 개발자 도구로 확인햅기
  // 키 값이 없으면 추가된 아이템뿐만 아니라 전체가 다 DOM에 업데이트 됨(비효율적)
  // 각 아이템에 키를 추가하지 않았기 때문에 리액트는 어떤 항목이 업데이트 됐는지 알지 못함
  // 결국에는 모든 항목을 전부 업데이트 시킴


  return (
    <>
      <input type="text" value={value} onChange={(e) => { setValue(e.target.value); }} /> {/* 사용자가 입력한 값을 state(value)에 입력한다 */}
      <button onClick={addTolist}>추가</button>
      <ul>
        {list.map((item, index) => {
          // return <li>{item}</li> // 실습1
          // return <li key={item}>{item}</li> // 실습2 {임시로 item값을 줬을때 값이 중복되면 중복된 쪽으로 추가됨}
          return <li key={index}>{item}</li> // 실습3: index를 키 값으로 사용하면 고유하지 않고 바뀔수도 있음
        })}
      </ul>
    </>
  );
}

export default ListKey;