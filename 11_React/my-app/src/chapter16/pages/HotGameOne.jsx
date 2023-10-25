import React from 'react';
import { Link } from 'react-router-dom';

// { 인기게임 상세페이지 열고 닫기 테스트 }

function HotGameOne(props) {
  return (
    <div>
      <h2>인기 게임1은 ~</h2>
      <p><Link to="/games/hot">닫기</Link></p>
    </div>
  );
}

export default HotGameOne;