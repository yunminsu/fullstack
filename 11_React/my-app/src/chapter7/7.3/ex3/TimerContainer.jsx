import React from 'react';
import Timer from './Timer';
import { useState } from 'react';

function TimerContainer(props) {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <>
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>
        On/Off 토글
      </button>
    </>
  );
}

export default TimerContainer;