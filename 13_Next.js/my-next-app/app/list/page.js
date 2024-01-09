'use client'

import Image from "next/image";
import fruitsImg from "@/public/fruits0.png" // { @를 안 붙혀도 사용 가능하지만 붙혀주는게 next.js의 사용 방식임 }
import { useState } from "react";

export default function List() { // { 함수 이름은 아무렇게나 작명 가능, 헷갈리지 않게 폴더명과 일치 시켜준거임 }
  // DB에서 가져온 데이터라고 가정
  const products = ['Apple', 'Orange', 'Grape']

  // 주문 수량
  // state는 client 컴포넌트에서만 사용 가능
  const [orederCount, setOrderCount] = useState([0, 10, 3]);

  return (
    <>
      <h4 className="title">상품 목록</h4>
      {/* <div className="fruits">
        <h4>{products[0]}</h4>
      </div>
      <div className="fruits">
        <h4>{products[1]}</h4>
      </div>
      <div className="fruits">
        <h4>{products[2]}</h4>
      </div> */}

      {/* Quiz: 상품 목록 반복 렌더링 */}
      {products.map((product, index) => { 
        return (
          <div key={index} className="fruits">
            {/* 이미지 넣기(1) - img 태그 */}
            {/* img 태그에 그냥 절대 경로로 적어주면 public 폴더에서 찾음 */}
            <img src={`/fruits${index}.png`} alt="fruits" className="fruits-img" />

            {/* 이미지 넣기(2) - Image 컴포넌트 */}
            {/* 
              이미지는 일반적으로 웹 페이지의 무게의 큰 부분을 차지함(즉, 성능에 영향을 미침)
              성능과 속도가 중요하다면 Image 컴포넌트를 통한 이미지 최적화 사용
              1) 사이즈 최적화: 디바이스에 맞는 크기의 이미지를 자동으로 제공
              2) layout shift 방지: 이미지 로딩이 늦어 레이아웃이 밀려나는 현상 방지
              3) 빠른 페이지 로드:
                lazy loading을 사용하여 실제 이미지들이 실제로 화면에 보여질 필요가 있을 때
                (뷰포트에 들어갈 때만) 로딩
                웹 페이지 내에서 바로 로딩을 하지 않고 로딩 시점을 뒤로 미루는 것 

              참고 자료: https://nextjs.org/docs/app/building-your-application/optimizing/images
            */}

            {/* 1) 로컬(local) 이미지의 경우 */}
            {/* import로 이미지 가져오기 
              Next.js가 가져온 이미지로부터 자동으로 width, height를 결정
              이 값은 이미지가 로딩될 때 layout shift를 방지
            */}
            {/* <Image src={fruitsImg} alt="fruits" className="fruits-img" /> */}

            {/* 2) 원격(remote) 이미지의 경우 */}
            {/* next.config.js에 원격 도메인 설정 필요 
              width, height를 직접 제공해야 됨 */}
            {/* <Image
              src="https://msborad.s3.ap-northeast-2.amazonaws.com/1701761298858_1%C3%AA%C2%B8%C2%89-16.jpg"
              alt="apple"
              width={160}
              height={160}
            /> */}

            <h4>{product}</h4>

            {/* 주문 수량 만들기 */}
            {/* onClick 이벤트 리스너와 이벤트 핸들러 함수를 쓰려면 
              => client 컴포넌트로 변경 */}
            <button 
              // Quiz: 수량 변경 기능 만들기
              // 배열/객체의 state를 변경려면
              // 복사본은 만들고 복사본에 변화를 주고
              // 마지막으로 set함수에 복사본을 넣어주면 끝

              // 내가 푼거
              // onClick={() => {setOrderCount(count => ({...count, [index]: count[index]-1 }))}}
              // 선생님 풀이
              type="button" onClick={() => {
                const copyArray = [...orederCount];
                copyArray[index]--;
                setOrderCount(copyArray);
                }} 
              disabled={orederCount[index]===0}
            >
              -
            </button>
            <span>{orederCount[index]}</span>
            <button 
              // 내가 푼거
              // onClick={() => {setOrderCount(count => ({...count, [index]: count[index]+1 }))}}
              // 선생님 풀이
              type="button" onClick={() => {
                const copyArray = [...orederCount];
                copyArray[index]++;
                setOrderCount(copyArray);
                }} 

            >
              +
            </button>
          </div> 
        );
      })}
    </>
  );
}