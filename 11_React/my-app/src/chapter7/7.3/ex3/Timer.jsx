import React from 'react';
import { useEffect } from 'react';

// { useEffect 활용 예: 현재 상품을 보고있는 사람 수, useEffect에 컴포넌트를 클릭했을 때 count를 올리고 return으로 count 감소 시킴}

function Timer(props) {
  // 화면에 처음 렌더링 됐을 때 한번만 타이머 작동시킴
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 실행중..');
    }, 1000);

    // 화면에서 사라질 때 만든 타이머 정리하기
    // useEffect()에서 리턴하는 함수
    // => 뒷정리 함수, clean-up 함수
    // componentWillUnmount와 같은 방식으로 동작(컴포넌트가 언마운트 될 때 호출됨)
    return () => {
      clearInterval(timer);
      console.log(`ID ${timer}번 타이머 종료!`);
    };
  }, []);

  return (
    <div>
      <span>⏱타이머가 시작 됐습니다!</span>
    </div>
  );
}

export default Timer;