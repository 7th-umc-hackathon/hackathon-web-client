import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import RewardSectionWithSettings from '../components/MyProfilePage/RewardSectionMypage';
import HistoryItem from '../components/MyProfilePage/HistoryItem';

const MyProfilePage = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    // 닉네임 로직 추가
    const userInfo = {
        nickname: 'Runner123',
    };

    // 이력 출력 로직 추가
    const [relayHistory, setRelayHistory] = useState([
        { id: 1, date: '2025-01-10', distance: '5km', team: 'Team Alpha', status: 'inProgress', remaining: 3 },
        { id: 2, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        {
            id: 3,
            date: '2024-12-30',
            distance: '8km',
            team: 'Team Gamma',
            status: 'failed',
            reason: '//실패 사유 알려주는 로직 추가',
        },
        { id: 4, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 5, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 6, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 7, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 8, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 9, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 10, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
        { id: 11, date: '2025-01-05', distance: '10km', team: 'Team Beta', status: 'completed', rewardClaimed: false },
    ]);

    const handleClaimReward = (id) => {
        setRelayHistory((prev) => prev.map((relay) => (relay.id === id ? { ...relay, rewardClaimed: true } : relay)));
    };

    return (
        <Container>
            <RewardSectionWithSettings
                name={userInfo.nickname}
                points={100}
                countryRank={5}
                personalRank={10}
                onClick={() => handleNavigation('/myinformation')}
            /> 

            <h2>내 이어달리기 이력</h2>
            <ScrollList>
                {relayHistory.map((relay) => (
                    <HistoryItem key={relay.id} relay={relay} onClaimReward={handleClaimReward} />
                ))}
            </ScrollList>
            
        </Container>
    );
};

export default MyProfilePage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    min-height: 100vh;
`;

const ScrollList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    max-height: 400px;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: var(--gray3-color) transparent;
    border-radius: 10px;
    `;