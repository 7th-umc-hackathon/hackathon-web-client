import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import France from '../../assets/icon/france-flag.svg';
import Canada from '../../assets/icon/canada-flag.svg';
import Japan from '../../assets/icon/japan-flag.svg';
import Korea from '../../assets/icon/south-korea.svg';

const MissionProgressComponent = ({ missionTitle }) => {
    const [remainingTime, setRemainingTime] = useState(null);
    const navigate = useNavigate(); // useNavigate 초기화

    // 임시 데이터
    const countryData = [
        { flag: France, name: '프랑스' },
        { flag: Canada, name: '캐나다' },
        { flag: Japan, name: '일본' },
        { flag: Korea, name: '대한민국' },
    ];

    useEffect(() => {
        const calculateRemainingTime = () => {
            const now = new Date();
            const deadline = new Date();
            deadline.setHours(24, 0, 0, 0); // 자정까지 남은 시간 계산
            const diff = deadline - now;

            if (diff <= 0) {
                setRemainingTime('00:00');
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setRemainingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
            }
        };

        const timer = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = () => {
        navigate('/capture', { state: { missionTitle } }); // missionTitle 전달
    };

    return (
        <Container>
            <MissionHeader>이 미션을 진행중이에요</MissionHeader>
            <HeaderRow>
                <MissionTitle>{missionTitle}</MissionTitle>
                <ParticipantsInfo>
                    <CurrentParticipants>1</CurrentParticipants>
                    <Separator>/</Separator>
                    <TotalParticipants>3</TotalParticipants>
                </ParticipantsInfo>
            </HeaderRow>
            <MissionInfo>
                <span>남은 시간</span>
                <Time>{remainingTime}</Time>
            </MissionInfo>
            <CountryProgress>
                {countryData.map((country, index) => (
                    <React.Fragment key={index}>
                        <Country>
                            <CountryFlag src={country.flag} alt={`${country.name} Flag`} />
                            <CountryName>{country.name}</CountryName>
                        </Country>
                        {index < countryData.length - 1 && <ProgressLine />}
                    </React.Fragment>
                ))}
            </CountryProgress>
            <SubmitButton onClick={handleSubmit}>미션 제출</SubmitButton>
        </Container>
    );
};

export default MissionProgressComponent;

const Container = styled.div`
    display: flex;
    width: 320px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid var(--Main-Color2, #3ee187);
    background: #fafafa;

    /* 기본2 */
    box-shadow: 0px 0px 8px 0px rgba(62, 225, 135, 0.15);
    margin-top: 20px;
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ParticipantsInfo = styled.div`
    display: flex;
    align-items: center;
`;

const CurrentParticipants = styled.span`
    color: var(--Main-Color2, #3ee187);
    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.012px;
`;

const Separator = styled.span`
    color: var(--Gray-2, #4f4f4f);
    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.012px;
    margin: 0 2px;
`;

const TotalParticipants = styled.span`
    color: var(--Gray-2, #4f4f4f);
    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.012px;
`;

const MissionHeader = styled.div`
    color: var(--Gray-2, #4f4f4f);
    font-family: 'Noto Sans KR';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.01px;
`;

const MissionTitle = styled.div`
    color: var(--Gray-1, #333);
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.02px;
`;

const MissionInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* 부모 컨테이너 전체 너비 사용 */
    color: var(--Gray-2, #4f4f4f);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.016px;
`;

const Time = styled.span`
    color: var(--Gray-1, #333);
    font-family: 'Noto Sans KR';
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.028px;
`;

const CountryProgress = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 10px 0;
`;

const Country = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CountryFlag = styled.img`
    width: 100%;
`;

const CountryName = styled.div`
    color: var(--Gray-2, #4f4f4f);
    font-family: 'Noto Sans KR';
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.008px;
`;

const ProgressLine = styled.div`
    width: 50px;
    height: 2px;
    background: linear-gradient(
        to right,
        rgba(62, 225, 135, 0) 0%,
        rgba(62, 225, 135, 0.5) 50%,
        rgba(62, 225, 135, 1) 80%
    );
    position: relative;
    top: -4px; /* 국기의 정중앙에 배치 */
`;

const SubmitButton = styled.button`
    display: flex;
    margin-top: 5px;
    width: 280px;
    padding: 8px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--Main-Color2, #3ee187);
    color: #fff;
    font-family: 'Noto Sans KR';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.014px;
    /* 기본1 */
    box-shadow: 0px 0px 8px 0px rgba(117, 117, 117, 0.15);
    &:hover {
        background-color: #35c87d;
    }
`;
