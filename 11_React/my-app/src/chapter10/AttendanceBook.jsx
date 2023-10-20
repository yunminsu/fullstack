const students = [
  {
    id: '1',
    name: '김재현',
    email: 'geoblo@naver.com'
  },
  {
    id: '2',
    name: '유재석',
    email: 'you@example.com'
  },
  {
    id: '3',
    name: '이이경',
    email: '22kyung@example.com'
  },
  {
    id: '4',
    name: '이미주',
    email: 'joo@example.com'
  }
];

// 출석부 컴포넌트
function AttendanceBook() {

  return (
    <>
      <ul> 
        {/* Quiz: 배열을 반복 렌더링 해보기 */}
        {students.map((student) => {
          // console.log(student); // student에 어떤 값이 들어왔는지 확인
          // 컴포넌트(function 컴포넌트이름)로 넘어온 값이 아니면 Components에서 확인 안됨 
          return <li key={student.id}>{student.name} ({student.email})</li>;
        })}

        {/* {students.map(student => <li key={student.id}>{student.name} ({student.email})</li>)} */} {/*위 코드 줄이기*/}
      </ul>
    </>
  );
}

export default AttendanceBook;