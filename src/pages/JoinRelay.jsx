import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import theme from '../styles/theme';
import CheckedIcon from '../assets/icon/checked-icon.svg';
import UncheckedIcon from '../assets/icon/unchecked-icon.svg';
import apiClient from '../services/api';

function JoinRelay() {
    const navigate = useNavigate();

    const [isCreated, setIsCreated] = useState(false); // 버튼 상태 관리
    const [missionText, setMissionText] = useState(''); // 전달받은 미션
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedCountryCount, setSelectedCountryCount] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [isMakeRelayActive, setIsMakeRelayActive] = useState(false);

    useEffect(() => {
        setIsMakeRelayActive(isConfirmed && isChecked);
    }, [isConfirmed, isChecked]);

    const handleButtonClick = async () => {
        if (!isCreated) {
            try {
                const response = await apiClient.get('/relays/mission');
                setMissionText(response.data.success.result); // 서버에서 받은 mission 값 설정
                setIsCreated(true); // 버튼 상태를 '재 생성'으로 변경
            } catch (error) {
                console.error('Error fetching mission:', error);
            }
        }
    };

    const handleConfirmButtonClick = () => {
        setIsConfirmed(true); // 미션 확정 버튼
    };

    const handleCheckboxClick = () => {
        setIsChecked((prev) => !prev);
    };

    const handleCountrySelect = (e) => {
        setSelectedCountryCount(Number(e.target.value));
    };

    const handleMakeRelayClick = async () => {
        if (isMakeRelayActive && missionText && selectedCountryCount) {
            try {
                const payload = {
                    mission: missionText,
                    reward: 1,
                    unique_country_count: selectedCountryCount,
                };

                const response = await apiClient.post('/relays/create', payload);
                console.log('Relay created:', response.data);

                navigate('/main');
            } catch (error) {
                console.error('Error creating relay:', error);
            }
        }
    };

    return (
        <Container>
            <ContentContainer>
                <FirstStepContainer>
                    <p id="first-step-msg">Step 1.</p>
                    <p>모든 참가자가 공통으로 수행할 미션을 생성해주세요.</p>

                    <CreateMission>
                        <div id="mission-box">
                            <MissionBox>{missionText}</MissionBox>
                        </div>
                        {!isConfirmed && (
                            <CreateBtn isCreated={isCreated} onClick={handleButtonClick}>
                                {isCreated ? '재 생성' : '생성'}
                            </CreateBtn>
                        )}
                    </CreateMission>
                    {isCreated &&
                        !isConfirmed && ( // '미션 확정' 버튼 표시
                            <ConfirmMissionBtn onClick={handleConfirmButtonClick}>미션 확정</ConfirmMissionBtn>
                        )}
                </FirstStepContainer>
                <SecondStepContainer>
                    <p id="second-step-msg">Step 2.</p>
                    <p>내가 리워드를 받을 조건을 설정해주세요.</p>

                    <ContryNumber>
                        {/* <div className="contry-count"> */}
                        <MissionSelect onChange={handleCountrySelect}>
                            <option value="" disabled selected></option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </MissionSelect>

                        {/* </div> */}
                        <span className="reward-msg">
                            개 국가의 유저가
                            <br />
                            참가해서 성공하면 리워드를 받을게요.
                        </span>
                    </ContryNumber>
                </SecondStepContainer>
                <AgreeContainer>
                    <p className="question">Q. 이어달리기는 언제 종료되나요?</p>
                    <p>
                        • 참가자가 참가 중 <span className="highlight">미션에 실패</span>
                        하는 경우
                        <br />• 다음 참가자가 <span className="highlight">결정되지 않는 경우</span>
                    </p>
                    <p>위 조건에 해당되는 경우 자동 종료됩니다.</p>

                    <CheckboxContainer onClick={handleCheckboxClick}>
                        <p>이해했어요</p>
                        <Checkbox src={isChecked ? CheckedIcon : UncheckedIcon} alt="Checkbox Icon" />
                    </CheckboxContainer>
                </AgreeContainer>
            </ContentContainer>
            <MakeRelay active={isMakeRelayActive} onClick={handleMakeRelayClick}>
                이어달리기 개설하기
            </MakeRelay>
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
    justify-content: space-between;
    padding: 20px;
    background-color: white;
`;

const ContentContainer = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: 96px;
`;
const FirstStepContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    justify-content: space-between;
    margin-top: 16px;

    #mission-box {
        width: 240px;
        height: 33px;
        border-bottom: 1px solid ${theme.colors.main};
    }
`;

const CreateBtn = styled.button`
    display: flex;
    width: ${({ isCreated }) => (isCreated ? '68px' : '55px')};
    height: 33px;
    display: flex;
    padding: 5px 13px;
    justify-content: center;
    align-items: center;
    border: ${({ isCreated }) => (isCreated ? `1px solid ${theme.colors.main}` : 'none')};
    cursor: pointer;
    border-radius: 4px;
    background-color: ${({ isCreated }) => (isCreated ? 'white' : theme.colors.main)};
    color: ${({ isCreated }) => (isCreated ? theme.colors.main : 'white')};
    font-size: 12px;
    font-weight: bold;
`;

const SecondStepContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

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
    width: 320px;
    height: 70px;
    padding: 16px 20px;
    box-sizing: border-box;
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
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
        color: ${theme.colors.gray1};
    }
`;

const MissionSelect = styled.select`
    width: 60px;
    height: 24px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    border: 1px solid ${theme.colors.main};
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    font-weight: 500;
    color: #4f4f4f;
    text-align: center;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%234f4f4f' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;

    &:hover {
        border-color: #35c87d;
    }

    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px 0px rgba(62, 225, 135, 0.5);
    }

    option {
        font-weight: normal;
        font-size: 14px;
        color: #4f4f4f;
        padding-left: -2px;
    }
`;

const AgreeContainer = styled.div`
    width: 320px;
    height: 123px;
    border-radius: 12px;
    box-sizing: border-box;
    background: #fafafa;
    color: ${theme.colors.gray3};
    font-size: 10px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    .question {
        font-weight: bold;
        font-size: 12px;
    }

    .highlight {
        color: red;
    }
`;

const CheckboxContainer = styled.div`
    display: flex;
    width: 129px;
    height: 20px;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
    gap: 4px;
    cursor: pointer;

    p {
        font-size: 10px;
        color: #bdbdbd;
    }
`;

const Checkbox = styled.img`
    width: 16px;
    height: 16px;
`;

const MakeRelay = styled.div`
    width: 320px;
    height: 47px;
    border-radius: 12px;
    background-color: ${({ active }) => (active ? theme.colors.main : theme.colors.gray5)};
    color: white;
    margin-bottom: 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 8px 0px rgba(117, 117, 117, 0.15);
`;

const MissionBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 5px;
    font-size: 16px;
    color: ${theme.colors.gray1};
    font-weight: 700;
`;

const ConfirmMissionBtn = styled.button`
    margin-top: 20px;
    width: 320px;
    height: 33px;
    background-color: ${theme.colors.main};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
`;

export default JoinRelay;
