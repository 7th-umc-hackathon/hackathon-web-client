import styled from "styled-components";
import theme from "../../styles/theme";

function RunningRelay() {
  return (
    <Container>
      <RunningMsg>
        이어달리기에 참가중일때는
        <br />
        새로운 이어달리기를 개설하실 수 없습니다!
      </RunningMsg>
      <MissionContainer>
        <MissionTitle>{`<페트병 5개 줍기>`}</MissionTitle>
        <MissionTime>남은 시간: 19:45</MissionTime>
        {/* 누르면 카메라페이지 연결 */}
        <SubmitMissionBtn>미션 제출</SubmitMissionBtn>
      </MissionContainer>
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
  background-color: ${theme.colors.base};
  gap: 20px;
`;

const RunningMsg = styled.div`
  position: absolute;
  top: 108px;
  background-color: ${theme.colors.base};
  width: 296px;
  height: 81px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray1};
  text-align: center;
  font-size: 15px;
  line-height: 1.5;
`;

const MissionContainer = styled.div`
  position: absolute;
  top: 428px;
  width: 320px;
  height: 205px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(117, 117, 117, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const MissionTitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.gray1};
  text-align: center;
`;

const MissionTime = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${theme.colors.gray1};
  text-align: center;
`;

const SubmitMissionBtn = styled.button`
  width: 100%;
  height: 54px;
  font-size: 24px;
  color: white;
  background-color: ${theme.colors.gray4};
  color: ${theme.colors.gray1};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default RunningRelay;
