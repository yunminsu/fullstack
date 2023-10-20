import { useState } from "react";

const styles = {
  button: {
    height: 40,
    width: 200,
  },
  warning: {
    backgroundColor: 'red',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    fontSize: '14pt',
    color: 'white',
  }
};

function WarringBanner(props) {
  // if(!props.warn) { // 구조 분해 할당 전
  //   return null;
  // }
  const { warn } = props; // 구조 분해 할당 후
  if (!warn) {
    return null;
  }

  return (
    <div style={styles.warning}>Warring!</div>
  );
}

function DangerBanner() {
  return (
    <div style={styles.warning}>Danger!</div>
  );
}

function MainPage() {
  const [showWarring, setShowWarring ] = useState(false);
  
  const handleToggle = () => {
    // setShowWarring(!showWarring);
    setShowWarring(prevState => !prevState); // {함수형 사용, prevState(showWarring = false) 값을 !prevState(showWarring = true)로 변경 }
  }

  return (
    <>
      <WarringBanner warn={showWarring}/>

      {/* 보통의 경우 아래와 같이 조건부 렌더링으로 처리하는 것도 가능 */}
      {showWarring && <DangerBanner/>}

      <button style={styles.button} onClick={handleToggle}>
        {showWarring? '감추기' : '보이기'}
      </button>
    </>
  );
}

export default MainPage;