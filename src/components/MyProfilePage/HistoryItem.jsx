import React from 'react';
import styled from 'styled-components';

const HistoryItem = ({ relay, onClaimReward }) => {
    return (
        <ItemContainer>
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
                    <RewardButton onClick={() => onClaimReward(relay.id)}>리워드 받기</RewardButton>
                )}
                {relay.status === 'completed' && relay.rewardClaimed && (
                    <RewardButton disabled>리워드 받음</RewardButton>
                )}
                {relay.status === 'failed' && <p className="info">{relay.reason}</p>}
            </Content>
        </ItemContainer>
    );
};

export default HistoryItem;

// Styled Components
const ItemContainer = styled.div`
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
