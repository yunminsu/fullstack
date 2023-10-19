function Profile(props) { // function Profile(viewCount, name, introduction) { // 구조 분해 할당 방법1
  console.log(props); // props는 객체이다.
  // const { viewCount, name, introduction } = props; // 구조 분해 할당 방법2
  // props.name = '캉캉' // props는 읽기 전용이다.(변경 불가)

  return (
    <>
      <h1>사용자 프로필(조회수: {props.viewCount})</h1>
      <h2>이름: {props.name}</h2>
      <h2>자기소개: {props.introduction}</h2>
    </>
  );
}

export default Profile;