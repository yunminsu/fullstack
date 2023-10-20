import { useState } from "react";

function FlavorForm() {
  const [value, setValue] = useState('coconut');

  const handleChange = (e) => { // 이벤트 핸들러
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    alert('가장 좋아하는 맛: ' + value);
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        좋아하는 맛 선택:
        {/* <select value={'lime'}>  */} {/* {방법1 React에서 selected 하기} <- 이렇게 하면 값이 변경이 안됨, lime에 고정 */}
        <select value={value} onChange={handleChange}> {/* {방법2 React에서 selected 하기 useState()에 selected할 value값 작성} */}
          <option value="grapefruit">자몽</option>
          <option value="lime">라임</option>
          <option value="coconut">코코넛</option>
          <option value="mango">망고</option>
        </select>
        {/* HTML DOM 요소에서는 option 태그에 selected 속성을 사용했지만 React에서는 select 태그에 value 속성을 사용 */}

        {/* (참고) 여러 개의 옵션 선택 가능 */}
        {/* 위 방법2로 진행 시 useState()를 배열로 => useState([]) */}
        <select value={['lime', 'mango']} multiple={true} onChange={handleChange}>
          <option value="grapefruit">자몽</option>
          <option value="lime">라임</option>
          <option value="coconut">코코넛</option>
          <option value="mango">망고</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>  
  );
}

export default FlavorForm;