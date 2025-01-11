import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

function JoinRelay() {
  const [isCreated, setIsCreated] = useState(false); // 버튼 상태 관리

  const handleButtonClick = () => {
    if (!isCreated) {
      setIsCreated(true);
    }
  };
  return (
    <Container>
      <MainMsg>이어달리기를 개설합니다.</MainMsg>
      <FirstStepContainer>
        <p id="first-step-msg">Step 1.</p>
        <p>모든 참가자가 공통으로 수행할 미션을 생성해주세요.</p>

        <CreateMission>
          <div id="mission-box"></div>
          <CreateBtn isCreated={isCreated} onClick={handleButtonClick}>
            {isCreated ? "재 생성" : "생성"}
          </CreateBtn>
        </CreateMission>
      </FirstStepContainer>
      <SecondStepContainer>
        <p id="second-step-msg">Step 2.</p>
        <p>내가 리워드를 받을 조건을 설정해주세요.</p>

        <ContryNumber>
          <div className="contry-count"></div>
          <span className="reward-msg">
            개 국가의 유저가
            <br />
            참가해서 성공하면 리워드를 받을게요.
          </span>
        </ContryNumber>
      </SecondStepContainer>
      <AgreeContainer>
        <p className="question">Q. 이어달리기는 언제 종료되나요?</p>
        <br />
        <p>
          • 참가자가 참가 중 미션에 실패하는 경우
          <br />• 다음 참가자가 결정되지 않는 경우
        </p>
        <br />
        <p>위 조건에 해당되는 경우 자동 종료됩니다.</p>

        <div className="checkbox-container">
          <p>이해했어요</p>
          <div className="checkbox"></div>
        </div>
      </AgreeContainer>
      <MakeRelay>이어달리기 개설하기</MakeRelay>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background-color: white;
`;

const MainMsg = styled.div`
  position: absolute;
  top: 50px;
  width: 177px;
  height: 31px;
  justify-content: center;
  color: ${theme.colors.gray1};
  text-align: center;
  font-size: 15px;
`;

const FirstStepContainer = styled.div`
  position: absolute;
  top: 97px;
  width: 320px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 12px;
  }
  #first-step-msg {
    font-size: 10px;
    color: ${theme.colors.main};
    font-weight: bold;
  }
`;

const CreateMission = styled.div`
  display: flex;
  width: 320px;
  flex-direction: row;
  align-items: flex-start;
  gap: 28px;
  margin-top: 16px;

  #mission-box {
    width: 242px;
    height: 33px;
    border-bottom: 1px solid ${theme.colors.main};
  }
`;

const CreateBtn = styled.button`
  display: flex;
  width: ${({ isCreated }) => (isCreated ? "68px" : "55px")};
  height: 33px;
  display: flex;
  padding: 5px 13px;
  justify-content: center;
  align-items: center;
  border: ${({ isCreated }) =>
    isCreated ? `1px solid ${theme.colors.main}` : "none"};
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ isCreated }) =>
    isCreated ? "white" : theme.colors.main};
  color: ${({ isCreated }) => (isCreated ? theme.colors.main : "white")};
  font-size: 12px;
  font-weight: bold;
`;

const SecondStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 208px;

  p {
    font-size: 12px;
  }

  #second-step-msg {
    font-size: 10px;
    color: ${theme.colors.main};
    font-weight: bold;
  }
`;

const ContryNumber = styled.div`
  display: flex;
  margin-top: 16px;
  width: 320px;
  height: 70px;
  padding: 16px 20px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 12px;
  background-color: #fafafa;

  .contry-count {
    width: 60px;
    height: 24px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    border: 1px solid ${theme.colors.main};
  }

  .reward-msg {
    display: flex;
    /* position: absolute;
    top: 91px;
    left: 71px;
    width: 226px;
    height: 28px; */
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    color: ${theme.colors.gray1};
  }
`;

const AgreeContainer = styled.div`
  position: absolute;
  top: 357px;
  width: 320px;
  height: 123px;
  border-radius: 12px;
  background: #fafafa;
  color: ${theme.colors.gray3};
  font-size: 10px;
  padding: 16px 20px;

  .question {
    font-weight: bold;
    font-size: 12px;
  }

  .checkbox-container {
    width: 134px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    position: absolute;
    top: 136px;
    left: 240px;
  }

  .checkbox {
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: 3px solid #ccc;
    background: rgba(217, 217, 217, 0.02);
  }

  .checkbox p {
    font-size: 10px;
    color: #bdbdbd;
  }
`;

const MakeRelay = styled.div`
  width: 320px;
  height: 47px;
  border-radius: 12px;
  background-color: ${theme.colors.gray5};
  color: white;
  position: absolute;
  top: 617px;
  left: 26px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px 0px rgba(117, 117, 117, 0.15);
`;

export default JoinRelay;
