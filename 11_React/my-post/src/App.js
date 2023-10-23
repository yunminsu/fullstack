import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import PostDetail from './components/PostDetail';

// POST앱 CRUD 만들기
// C: Create(등록)
// R: Read(목록, 상세보기)
// U: Update(수정)
// D: Delete(삭제)
function App() {
  // 서버에서 가져온 데이터라고 가정
  const [ posts, setPosts ] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', '스타일링']);
  const [ showPostDetail, setShowPostDetail ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ likeCount, setLikeCount ] = useState([0, 0, 0]);
  const [ createPosts, setCreatePosts ] =useState('');

  // const onClickDetail = () => { // 클릭 이벤트(켜졌다 꺼지기) 함수로 작성
  //   setShowPostDetail(!showPostDetail);
  // }

  const handleCreateInput = (e) => {
    setCreatePosts(e.target.value);
  }

  // {포스트 등록 방법1 사용 시 134번 newPosts 주석 풀기}
  // const newPosts = () => {
  //   setPosts(prevPosts => {return [createPosts, ...prevPosts]});
  // }

  return (
    <>
      {/* 상단 헤더 만들기 */}
      <header className='hader--dark'>
        <h4>Ming</h4>
        <nav>
          <ul>
            <li>트렌딩</li>
            <li>최신</li>
          </ul>
        </nav>
      </header> 

      <div className='inner'>
      {/* 포스트 목록  */}
        {/* <div className='list'>
          <h4>{posts[0]}</h4>
          <p>2023년 1월 20일</p>
          <p>by minsu.yun</p>
        </div>
        <div className='list'>
          <h4>{posts[1]}</h4>
          <p>2023년 1월 20일</p>
          <p>by minsu.yun</p>
        </div>
        <div className='list'>
          <h4>{posts[2]}</h4>
          <p>2023년 1월 20일</p>
          <p>by minsu.yun</p>
        </div> */}

      {/* Quiz: map()을 이용하여 posts 배열 반복 출력하기 */}
        {posts.map((post, index) => {
          return (
            <div key={index} className='list' onClick={() => {
              setShowPostDetail(true);
              setCurrentIndex(index);
            }}>
              <h4>{post}</h4>
              <p>2023년 1월 20일</p>
              <p>by minsu.yun</p>

              <hr />

              <div className='toolbar'>
                {/* 좋아요 기능 */}
                <span onClick={(e) => {
                  // (버그 수정)
                  // 현재는 좋아요 버튼을 누를 때 글 상세보기까지 같이 클릭됨!!
                  // 부모-자식 관계에 있을 때 이벤트 버블링이 일어남
                  e.stopPropagation(); // 상위 요소로 퍼지는 이벤트 버블링을 막음

                  const copyLikeCount = [...likeCount]; // 배열의 복사본 만들기(새로운 배열)
                  copyLikeCount[index]++;
                  setLikeCount(copyLikeCount);
                }}>
                  💏 {likeCount[index]}
                </span>

                  {/* 포스트 삭제 하기 */}
                  <span style={{ fontSize: 27}} onClick={(e) => {
                    e.stopPropagation() // 상위 요소로 퍼지는 이벤트 버블링을 막음
                    
                    // Quiz: 삭제 기능 만들기
                    // div 하나를 직접 제거 하는것 x 
                    // posts state에서 제거하면 알아서 자동으로 렌더링 O

                    // {삭제 기능 방법1 splice 사용}
                    // const copyPosts = [...posts];
                    // copyPosts.splice(index, 1);
                    // setPosts(copyPosts);

                    // {삭제 기능 방법2} 또는 배열의 filter() 함수 사용
                    const filteredPosts = posts.filter((value, idx) => { // 변수명이 55번 index랑 겹치므로 idx로 지정
                      return index !== idx;
                    });
                    setPosts(filteredPosts);

                    // (버그 수정) 삭제 시 해당 포스트의 좋아요 카운트도 같이 삭제
                    const copyLikeCount = [...likeCount];
                    copyLikeCount.splice(index, 1);
                    setLikeCount(copyLikeCount);
                  }}>
                    🗑
                  </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 포스트 상세보기 */}
      {/* Quiz: input에 제목 입력 후 등록 버튼 누르면 맨 앞에 새로운 포스트 추가 
      
      1) input을 제어 컴포넌트로 만들어서 사용자가 입력한 값을 state로 저장해서 관리
      2) 등록 버튼 클릭 시 posts 상태에 맨 앞에 새로운 데이터 추가
      */}
      <input 
        type='text' 
        value={createPosts}
        onChange={handleCreateInput}
      />
      <button type='button' onClick={() => { {/*newPosts*/}
        // div 하나를 새로 생성 X
        // posts state에 요소 하나 추가하면 자동으로 렌더링

        // {포스트 등록 방법2}
        const copyPosts = [createPosts, ...posts];
        setPosts(copyPosts);
        setCreatePosts('');

        // (버그 수정) 포스트 하나 추가 시 좋아요 카운트도 같이 추가{(likeCount)}
        const copyLikeCount = [0, ...likeCount];
        setLikeCount(copyLikeCount);
      }}>포스트 등록</button>
        
      {/* Quiz: 조건부 렌더링 */}
        <div className='detail'>
         {showPostDetail && <PostDetail posts={posts} currentIndex={currentIndex} setPosts={setPosts} />} 
        </div>
    </>
  );
}

export default App;

// 배열이나 객체 형태의 state 변경할때 주의!
// 1. state 변경 함수의 특징 기존 state가 신규 state랑 같은 경우, 변경 안함
// 2. 배열/객체의 특징 변수 주소(참조)값이 저장됨

// (참고) 왜 새로고침하면 다 없어질까?
// 새로고침 시 HTML/CSS/JS 파일을 다시 읽어와서 그럼
// 데이터를 유지하려면 서버에 보내서 DB에 영구 저장하고
// 새로고침 발생 시 DB에서 다시 읽어오면 됨


// <추가 개선 과제>
// 1. PostListItem 컴포넌트 추출

// 2. 날짜 및 작성자, 좋아요 수 등 데이터를 문자열이 아닌 객체 형태로 처리해보기
// state에 글 제목만 저장되어 있는게 아니라 날짜같은 것도 저장해두고 보여주는 식이면 굿
// => 글 등록 시 현재 날짜까지 같이 저장되도록 하면 나이스

// 3. input에 아무것도 입력안하고 등록 버튼 누르는거 막기
// 유저의 의도치않은 행동을 막는 코드도 많이 짜야 안전한 사이트가 됨
// 1) 미입력시 비활성화 -> 입력이 생기면 버튼 활성화
// 2) 등록 버튼 누를 시 유효성 검사

// 4. 포스트 수정할 때 input으로 입력받은 내용으로 수정해보기

// 5. 글 오름차순 정렬

// 6. 그 외 개선 및 구현할 것 많으니 자유롭게 연습해보기