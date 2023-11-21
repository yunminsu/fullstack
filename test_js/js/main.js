new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  autoplay: true,
});

const arr = [
  {
    id: 1,
    name: '홍길동'
  },
  {
    id: 2,
    name: '김길동'
  },
  {
    id: 3,
    name: '박길동'
  }
]

// 배열에 속성/값 추가하기
arr[0].job = '백수'

console.log(arr);
