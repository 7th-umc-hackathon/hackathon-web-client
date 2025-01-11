import React from 'react';
import styled from 'styled-components';

const PreRelayMainPage = () => {
    return (
        <Container>
            <RewardSection>
                <RewardText>
                    현재 내 리워드는 <strong>5점</strong>
                </RewardText>
                <RankText>
                    <div>국가 순위 2위</div>
                    <div>개인 순위 17위</div>
                </RankText>
                <UserCountry>유저 국적: 대한민국</UserCountry>
            </RewardSection>

            <TrackAssignmentSection>
                <AssignmentButton>이어달리기 트랙 배정받기</AssignmentButton>
            </TrackAssignmentSection>

            <MissionSection>
                <MissionTitle>이어달리기 3</MissionTitle>
                <MissionDescription>페트병 5개 줍기</MissionDescription>
                <RetryButton>다시 배정받기</RetryButton>
            </MissionSection>
        </Container>
    );
};

export default PreRelayMainPage;

// Styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.base};
    padding: 20px;
`;

const RewardSection = styled.div`
    width: 100%;
    max-width: 360px;
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const RewardText = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray1};
    margin-bottom: 8px;

    strong {
        color: ${({ theme }) => theme.colors.main};
    }
`;

const RankText = styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray2};
    margin-bottom: 12px;

    div {
        margin-top: 4px;
    }
`;

const UserCountry = styled.div`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray3};
`;

const TrackAssignmentSection = styled.div`
    width: 100%;
    max-width: 360px;
    margin-bottom: 20px;
`;

const AssignmentButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: ${({ theme }) => theme.colors.main};
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

const MissionSection = styled.div`
    width: 100%;
    max-width: 360px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    color: white;
`;

const MissionTitle = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 8px;
`;

const MissionDescription = styled.div`
    font-size: 1.6rem;
    margin-bottom: 12px;
`;

const RetryButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray1};
    background-color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray6};
    }
`;
