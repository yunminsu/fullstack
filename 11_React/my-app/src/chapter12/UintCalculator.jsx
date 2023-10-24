import React, { useState } from 'react';
import UintCounter from './UintCounter';
import UnitInput from './UnitInput';

function UintCalculator() {
  // 2. Shared State 실습
  const [length, setLength] = useState(1);

  const handleChange = (e) => {
    setLength(Number(e.target.value)); // number input이어도 문자로 입력되므로 숫자로 바꿔줘야 함
  }

  return (
    <>
      <p>단위 변환 계산기</p>
      <label>
        <input type="number" value={length} onChange={handleChange} min={0} />
        미터(m)
      </label>

      <br />
      <UintCounter length={length} onLengthChange={setLength} />  
      <br />
      <UnitInput unit="mm" length={length}/>
      <br />
      <UnitInput unit="cm" length={length}/>
      <br />
      <UnitInput unit="m" length={length}/>
      <br />
      <UnitInput unit="km" length={length}/>
      <br />
      <UnitInput unit="inch" length={length}/>
      <br />
      <UintCounter length={length} onLengthChange={setLength} />  
    </>
  );
}

export default UintCalculator;