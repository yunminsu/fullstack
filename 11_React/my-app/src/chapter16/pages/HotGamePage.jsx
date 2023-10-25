import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function HotGamePage(props) {
  return (
    <div>
      <h1>인기 게임 리스트</h1>
      <ul>
        <li><Link to="/games/hot/one">인기1</Link></li> {/* { 인기1 클릭 시 열고 닫기 테스트로 Link 컴포넌트 사용 } */}
        <Outlet />
        <li>인기2</li>
        <li>인기3</li>
        <li>인기4</li>
      </ul>
    </div>
  );
}

export default HotGamePage;