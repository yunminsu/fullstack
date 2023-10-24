import React, { useState } from 'react';
import Card from './Card';

function ProfileCard(props) {
  const [backGroudColor, setBackGroudColor] = useState('');

  const handleChange = (e) => {
    setBackGroudColor(e.target.value);
  };


  return (
    <Card 
      title="Minsu Yun"
      backgroundColor={backGroudColor}
    >

      <p>안녕하세요~</p>
      <p>리액트 공부중~</p>
      <p>배경색 바꾸기~</p>
      <select value={backGroudColor} onChange={handleChange}>
        <option value="">선택 안함</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="yellow">yellow</option>
      </select>
    </Card>
  );
}

export default ProfileCard;