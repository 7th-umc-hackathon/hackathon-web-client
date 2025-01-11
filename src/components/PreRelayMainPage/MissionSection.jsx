//미션 받기, 미션 만들기 컨테이너. 미션 받기 버튼을 눌렀을 때, 미션 추천 컨테이너로 변경
import React, { useState } from 'react';
import styled from 'styled-components';
import MissionApplyButton from '../../assets/icon/mission-apply-button.svg';
import MakeMissionButton from '../../assets/icon/make-mission-button.svg';
import MissionProgressComponent from './MissionProgressComponent';
import { useNavigate } from 'react-router-dom';
import Bulb from '../../assets/icon/bulb-icon.svg';
import Plus from '../../assets/icon/plus-icon.svg';
const MissionSection = () => {
    const [isMissionSelected, setIsMissionSelected] = useState(false);
    const [selectedPeople, setSelectedPeople] = useState('');
    const [missionName, setMissionName] = useState('페트병 5개 줍기');
    const [isMissionConfirmed, setIsMissionConfirmed] = useState(false);
    const navigate = useNavigate();
    const fetchNewMission = async () => {
        // API 호출 예시 (미션 이름 받아오기)
        // 실제 API 요청으로 대체 필요
        const newMission = '캔 3개 줍기'; // 임시 데이터
        setMissionName(newMission);
    };

    const handleRetryClick = () => {
        fetchNewMission();
    };

    const handleConfirmClick = () => {
        setIsMissionConfirmed(true);
    };

    const handleMissionApplyClick = () => {
        setIsMissionSelected(true);
    };

    const handleMakeMissionClick = () => {
        navigate('/joinrelay');
    };
    if (isMissionConfirmed) {
        return <MissionProgressComponent missionTitle={missionName} />;
    }
    return (
        <Container>
            {isMissionSelected ? (
                <MissionDetail>
                    <MissionHeader>이 미션은 어떤가요?</MissionHeader>
                    <MissionTitle>{missionName}</MissionTitle>
                    <MissionInfo>
                        내 이후로
                        <MissionSelect value={selectedPeople} onChange={(e) => setSelectedPeople(e.target.value)}>
                            <option value="" disabled></option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </MissionSelect>
                        명이 성공하면 리워드를 받을게요
                    </MissionInfo>
                    <Buttons>
                        <RetryButton onClick={handleRetryClick}>다시 배정</RetryButton>
                        <ConfirmButton onClick={handleConfirmClick}>확정 하기</ConfirmButton>
                    </Buttons>
                </MissionDetail>
            ) : (
                <MissionCards>
                    <MissionCard1 onClick={handleMissionApplyClick}>
                        <Icon src={Bulb} alt="Bulb Icon" />
                        <ButtonText1>
                            이어달리기
                            <br /> 미션 받기
                        </ButtonText1>
                    </MissionCard1>
                    <MissionCard2 onClick={handleMakeMissionClick}>
                        <Icon src={Plus} alt="Plus Icon" />
                        <ButtonText2>이어달리기 미션 만들기</ButtonText2>
                    </MissionCard2>
                </MissionCards>
            )}
        </Container>
    );
};

export default MissionSection;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 360px;
    margin-top: 20px;
`;

const MissionCards = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const MissionCard1 = styled.div`
    display: flex;
    width: 150px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Main-Color2, #3ee187);

    box-shadow: 0px 0px 8px 0px rgba(62, 225, 135, 0.15);
    &:hover {
        transform: scale(1.05);
    }
`;
const MissionCard2 = styled.div`
    display: flex;
    width: 150px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 12px;
    border: 1px solid var(--Main-Color2, #3ee187);
    background: #fff;

    /* 기본2 */
    box-shadow: 0px 0px 8px 0px rgba(62, 225, 135, 0.15);
    &:hover {
        transform: scale(1.05);
    }
`;
const Icon = styled.img``;

const ButtonText1 = styled.div`
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.016px;
    /* 기본2 */
`;
const ButtonText2 = styled.div`
    color: var(--Main-Color2, #3ee187);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.016px;
`;
const MissionDetail = styled.div`
    width: 320px;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--Main-Color2, #3ee187);
    background: linear-gradient(0deg, rgba(65, 250, 148, 0.05) 0%, rgba(65, 250, 148, 0.05) 100%), #fff;

    box-shadow: 0px 0px 8px 0px rgba(62, 225, 135, 0.15);
`;

const MissionHeader = styled.div`
    color: var(--Gray-2, #4f4f4f);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.01px;
`;

const MissionTitle = styled.div`
    color: var(--Gray-1, #333);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
`;

const MissionInfo = styled.div`
    color: var(--Gray-1, #333);
    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.012px;
    margin-top: 15px;
`;

const MissionSelect = styled.select`
    width: 50px;
    height: 25px;
    margin: 2px;
    border: 1px solid var(--Main-Color2, #3ee187);
    border-radius: 8px;
    background: #fff;
    padding: 4px 7px;
    font-size: 14px;
    font-weight: 500;
    color: #4f4f4f;
    text-align: center;
    appearance: none; /* 기본 드롭다운 화살표 제거 */
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

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    margin-top: 22px;
`;

const RetryButton = styled.button`
    display: flex;
    padding: 7px 40px 8px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #fff;

    box-shadow: 0px 0px 8px 0px rgba(117, 117, 117, 0.15);
    color: var(--Main-Color2, #3ee187);
    font-family: 'Noto Sans KR';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.014px;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const ConfirmButton = styled.button`
    display: flex;
    padding: 7px 40px 8px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--Main-Color2, #3ee187);

    box-shadow: 0px 0px 8px 0px rgba(117, 117, 117, 0.15);
    &:hover {
        background-color: #35c87d;
    }
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.014px;
`;
