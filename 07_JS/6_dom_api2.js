// HTML에서 해당 요소를 검색하여 찾은 모든 요소들을 반환
const boxEls = document.querySelectorAll('.box');
  console.log(boxEls); // 요소들의 리스트가 반환됨 => 앞에서 사용한 DOM API 들을 바로 쓸 수가 없음
// (참고) 정확히는 유사 배열(Array-like): 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체

// forEach() 메소드 사용: 배열에서 각 요소에 대한 반복 처리 수행
// 인수(인자값)으로 반복을 돌면서 꺼내온 요소를 처리하는 함수 작성
// 처리 함수 작성 시 매개변수(현재 가져온 요소, 요소의 인덱스)
boxEls.forEach(function (boxEl, index) {
  console.log(index, boxEl);

  boxEl.classList.add(`order-${index + 1}`);
  // console.log(index, boxEl);
});

// 요소의 내용 확인 및 수정
 const boxEl = document.querySelector('.box');
 console.log(boxEl.textContent); // 요소의 내용 출력

 boxEl.textContent = 'CHANGE!!';
 console.log(boxEl.textContent);
// (참고) ineerHTML, ineerText

// 혼자 해본거
// const boxElss = document.querySelectorAll('.box')
// boxElss.forEach(function (boxe, index) {

//   boxe.textContent = 'allchange!';
//   console.log(index, boxe.textContent);
// });

// const box = document.querySelectorAll('.box')
// box.forEach(function (bo, index) {
//   console.log(index, bo);
// });

