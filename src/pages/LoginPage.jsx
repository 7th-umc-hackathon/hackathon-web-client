import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const isLoggedIn = () => {
  return document.cookie.split("; ").some((cookie) => cookie.startsWith("authToken="));
};
// authToken 쿠키가 있/없유무

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/premain");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 추가
    console.log("로그인 성공: ", { email, password });
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Run With Me</Title>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SignUp>
          아직 계정이 없다면
          <SignupButton onClick={handleSignup}>회원가입</SignupButton>
        </SignUp>
        <LoginButton type="submit">Login</LoginButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--gray1-color);
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: var(--secondary-color);
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  color: var(--gray1-color);
  cursor: pointer;
  
`;

const SignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
`;
const SignupButton = styled(Button)`
  padding: 5px;
  width: 90px;
  font-size: 14px;
  background-color: var(--secondary-color);
    &:hover {
    filter: brightness(0.85);
     }
`;

const LoginButton = styled(Button)`
    padding: 10px;
    font-size: 16px;
    
    background-color: var(--main-color);
  &:hover {
    filter: brightness(0.85);
  }
`;
