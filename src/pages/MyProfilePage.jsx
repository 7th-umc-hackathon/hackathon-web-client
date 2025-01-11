import { useState } from 'react';
import styled from 'styled-components';

const MyProfilePage = () => {
    const rewards = 100;
    const countryRank = 5;
    const personalRank = 10;

    const userInfo = {
        id: 'user123',
        nickname: 'Runner123',
        nationality: 'South Korea',
        email: 'runner123@example.com',
    };

    const handleLogout = () => {
        alert('로그아웃 되었습니다.');
    };

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
        setRelayHistory((prev) => prev.map((relay) => (relay.id === id ? { ...relay, rewardClaimed: true } : relay)));
    };

    return (
        <Container>
            {/* <RewardsSection>
        <RewardItem>현재 내 리워드는 {rewards}점</RewardItem>
        <RewardItem>국가 순위 {countryRank}위</RewardItem>
        <RewardItem>개인 순위 {personalRank}위</RewardItem>
      </RewardsSection> */}

            <UserInfoSection>
                <InfoRow>
                    <Label>아이디</Label>
                    <Value>{userInfo.id}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>닉네임</Label>
                    <Value>{userInfo.nickname}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>국적</Label>
                    <Value>{userInfo.nationality}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>이메일</Label>
                    <Value>{userInfo.email}</Value>
                </InfoRow>
            </UserInfoSection>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>

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

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    min-height: 100vh;
`;

const RewardsSection = styled.div`
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
`;

const RewardItem = styled.p`
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
`;

const UserInfoSection = styled.div`
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative; /* 로그아웃 버튼과 위치 조정을 위해 */
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Label = styled.span`
    font-size: 16px;
    font-weight: bold;
    flex: 1;
    text-align: left;
`;

const Value = styled.span`
    font-size: 16px;
    flex: 2;
    text-align: center;
`;

const LogoutButton = styled.button`
    margin-top: -12px;
    align-self: flex-end;
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
