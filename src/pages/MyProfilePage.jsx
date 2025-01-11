import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const MyProfilePage = () => {
    const navigate = useNavigate();

    const userInfo = {
        nickname: 'Runner123',
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    // 이전 이력 출력하는 함수 추가
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
    ]);

    const handleClaimReward = (id) => {
        setRelayHistory((prev) =>
            prev.map((relay) => (relay.id === id ? { ...relay, rewardClaimed: true } : relay))
        );
    };

    return (
        <Container>
            <ProfileSection>
                <Nickname>{userInfo.nickname}</Nickname>
                <SettingsButton onClick={() => handleNavigation('/myinformation')}>설정</SettingsButton>
            </ProfileSection>

            <h2>내 이어달리기 이력</h2>
            <HistoryList>
                {relayHistory.map((relay) => (
                    <HistoryItem key={relay.id}>
                        <StatusBadge status={relay.status}>
                            {relay.status === 'inProgress' && '진행중'}
                            {relay.status === 'completed' && '완주'}
                            {relay.status === 'failed' && '실패'}
                        </StatusBadge>
                        <Content>
                            {relay.status === 'completed' && <CompletionDate>{relay.date}</CompletionDate>}
                            {relay.status === 'inProgress' && (
                                <p className="info">내 이후 {relay.remaining}명이 성공 시 리워드 지급</p>
                            )}
                            {relay.status === 'completed' && !relay.rewardClaimed && (
                                <RewardButton onClick={() => handleClaimReward(relay.id)}>리워드 받기</RewardButton>
                            )}
                            {relay.status === 'completed' && relay.rewardClaimed && (
                                <RewardButton disabled>리워드 받음</RewardButton>
                            )}
                            {relay.status === 'failed' && <p className="info">{relay.reason}</p>}
                        </Content>
                    </HistoryItem>
                ))}
            </HistoryList>
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

const ProfileSection = styled.div`
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
`;

const Nickname = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const SettingsButton = styled.button`
    padding: 8px 15px;
    border: none;
    background-color: var(--gray3-color);
    cursor: pointer;

    &:hover {
        filter: brightness(0.5);
    }
`;

const HistoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HistoryItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
`;

const StatusBadge = styled.div`
    padding: 5px 10px;
    border-radius: 4px;
    width: 80px;
    text-align: center;
    background-color: ${({ status }) =>
        status === 'inProgress' ? 'var(--gray3-color)' : status === 'completed' ? 'var(--main-color)' : 'red'};
    align-self: flex-start;
`;

const Content = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const CompletionDate = styled.p`
    margin-left: 30px;
    text-align: center;
`;

const RewardButton = styled.button`
    padding: 10px 8px;
    font-size: 10px;
    border: none;
    border-radius: 4px;
    background-color: var(--main-color);
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:enabled {
        filter: brightness(0.5);
    }
`;
