import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RewardSection from '../components/MainPage/RewardSection';
import MissionSection from '../components/MainPage/MissionSection';
import MissionProgressComponent from '../components/MainPage/MissionProgressComponent';

const MainPage = () => {
    const [relayStatus, setRelayStatus] = useState(null);
    const [missionTitle, setMissionTitle] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchRelayStatus = async () => {
            try {
                const response = await axios.get('https://hack.umc.skyofseoul.synology.me/users/profile', {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                });
                const userRelay = response.data.success.user.relay_users.find(
                    (relay) => relay.status === 'waiting' || relay.status === 'in_progress'
                );

                if (userRelay) {
                    setRelayStatus(userRelay.status);
                    setMissionTitle('진행 중인 미션');
                    console.log('Current relay status:', userRelay.status);
                } else {
                    setRelayStatus('none');
                    console.log('No relay in progress');
                }
            } catch (error) {
                console.error('Relay 상태 가져오기 오류:', error);
            }
        };

        fetchRelayStatus();
    }, []);

    useEffect(() => {
        console.log('Updated Relay Status:', relayStatus);
    }, [relayStatus]);

    if (relayStatus === null) {
        return <Loading>로딩 중...</Loading>;
    }

    return (
        <Container>
            <RewardSection />
            {relayStatus === 'waiting' || relayStatus === 'in_progress' ? (
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
