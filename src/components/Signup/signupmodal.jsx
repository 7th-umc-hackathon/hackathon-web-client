import { useNavigate } from "react-router";
import styled from "styled-components";

const SignupModal = (props) => {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose();
    navigate("/");
  }

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>회원가입이 완료되었습니다!<br />로그인 후 서비스를 이용해주세요.</ModalMessage>
        <ModalButton onClick={handleLoginRedirect}>로그인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SignupModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--main-color);
  cursor: pointer;

  &:hover {
    filter: brightness(0.85);
  }
`;
