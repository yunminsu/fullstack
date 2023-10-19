import { useState } from "react";
import Greeting from "../9.1/Greeting";

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>Logout</button>
  );
}

function LoginControlRefactoring() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  // {9.2 LoginControl 컴포넌트의 JS에서 if문을 JSX내에서 삼항연산자로 변경}
  // {변경 이유는 JSX내에서 if문이 사용 불가하기 때문에, 아래 방법을 더 많이 사용함}
  return (
    <>
      {/* Greeting 컴포넌트의 재사용 */}
      <Greeting isLoggedIn={isLoggedIn} />
      {isLoggedIn 
        ? <LogoutButton onClick={handleLogoutClick} />
        : <LoginButton onClick={handleLoginClick} />
      }
    </>
  );
}

export default LoginControlRefactoring;