import React, { useState } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../services/api'; // API 요청 함수
import MissionProgressComponent from './MissionProgressComponent';
import { useNavigate } from 'react-router-dom';
import Bulb from '../../assets/icon/bulb-icon.svg';
import Plus from '../../assets/icon/plus-icon.svg';

const MissionSection = () => {
    const [isMissionSelected, setIsMissionSelected] = useState(false);
    const [selectedPeople, setSelectedPeople] = useState('');
    const [missionData, setMissionData] = useState(null);
    const [isMissionConfirmed, setIsMissionConfirmed] = useState(false);
    const navigate = useNavigate();
    const fetchNewMission = async () => {
        try {
            const response = await getRequest('/relays');
            console.log('API 응답:', response); // 전체 응답 확인
            if (response.data.resultType === 'SUCCESS') {
                setMissionData(response.data); // 성공 시 데이터 저장
                setIsMissionSelected(true);
            } else if (response.data.resultType === 'FAIL') {
                console.warn('미션 실패 이유:', response.data.error.reason); // 실패 사유 로그 출력
            }
        } catch (error) {
            console.error('미션 가져오기 실패:', error);
        }
    };

    const handleRetryClick = () => {
        fetchNewMission();
    };

    const handleConfirmClick = () => {
        setIsMissionConfirmed(true);
    };

    const handleMakeMissionClick = () => {
        navigate('/joinrelay');
    };

    if (isMissionConfirmed && missionData) {
        return <MissionProgressComponent missionTitle={missionData.mission} />;
    }

    return (
        <Container>
            {isMissionSelected && missionData ? (
                <MissionDetail>
                    <MissionHeader>이 미션은 어떤가요?</MissionHeader>
                    <MissionTitle>{missionData.mission}</MissionTitle>
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
                    <MissionCard1 onClick={fetchNewMission}>
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

// Styled-components
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
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.016px;
`;

const ButtonText2 = styled.div`
    color: var(--Main-Color2, #3ee187);
    font-family: 'Noto Sans KR';
    font-size: 16px;
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
    font-weight: 400;
`;

const MissionTitle = styled.div`
    color: var(--Gray-1, #333);
    font-size: 20px;
    font-weight: 700;
`;

const MissionInfo = styled.div`
    color: var(--Gray-1, #333);
    font-size: 12px;
    font-weight: 500;
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
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'%3E%3Cpath fill='%234f4f4f' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
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
    color: var(--Main-Color2, #3ee187);
    font-family: 'Noto Sans KR';
    font-size: 14px;
    font-weight: 700;
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
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 14px;
    font-weight: 700;
    &:hover {
        background-color: #35c87d;
    }
`;
