// MainPage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RewardSection from '../components/PreRelayMainPage/RewardSection';
import MissionSection from '../components/PreRelayMainPage/MissionSection';
import MissionProgressComponent from '../components/PreRelayMainPage/MissionProgressComponent';
import { getRequest } from '../services/api';

const MainPage = () => {
    const [relayStatus, setRelayStatus] = useState(null);
    const [missionTitle, setMissionTitle] = useState('');

    useEffect(() => {
        const fetchRelayStatus = async () => {
            try {
                const response = await getRequest('/users/profile');
                const userRelay = response.data.success.user.relay_users.find(
                    (relay) => relay.status === 'in_progress'
                );

                if (userRelay) {
                    setRelayStatus('in_progress');
                    setMissionTitle('진행 중인 미션'); // Replace with actual title if available
                } else {
                    setRelayStatus('none');
                }
            } catch (error) {
                console.error('Relay 상태 가져오기 오류:', error);
            }
        };

        fetchRelayStatus();
    }, []);

    if (relayStatus === null) {
        return <Loading>로딩 중...</Loading>; // 데이터 로딩 중 표시
    }

    return (
        <Container>
            <RewardSection />
            {relayStatus === 'in_progress' ? (
                <MissionProgressComponent missionTitle={missionTitle} />
            ) : (
                <MissionSection />
            )}
        </Container>
    );
};

export default MainPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.base};
    padding: 18px;
    height: 100vh;
`;

const Loading = styled.div`
    font-size: 16px;
    color: #333;
    margin-top: 20px;
`;
