import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HistoryItem = () => {
    const [relayData, setRelayData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/relays/history/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success || !data.success.relay_user_ || data.success.relay_user_.length === 0) {
                    throw new Error('Relay history not found');
                }

                const formattedData = data.success.relay_user_.map((item) => ({
                    status: item.status,
                    updatedAt: item.updated_at,
                    remaining: item.remaining || '3',
                    reason: item.reason || '시간 내 미제출',
                }));

                setRelayData(formattedData);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData();
    }, []);

    if (relayData.length === 0) {
        return <div>로딩 중...</div>;
    }

    return relayData.map(({ status, updatedAt, remaining, reason }, index) => (
        <ItemContainer key={index}>
            <StatusBadge status={status}>
                {status === 'in_progress' && '진행중'}
                {status === 'success' && '완주'}
                {status === 'failed' && '실패'}
            </StatusBadge>

            <Content>
                {status === 'in_progress' && <p className="info">내 이후 {remaining}명이 성공 시 리워드 지급</p>}
                {status === 'success' && updatedAt && (
                    <CompletionDateStyle>{new Date(updatedAt).toLocaleDateString('ko-KR')}</CompletionDateStyle>
                )}
                {status === 'success' && <RewardButton>리워드 받기</RewardButton>}
                {status === 'success' && <RewardButton disabled>리워드 받음</RewardButton>}
                {status === 'failed' && <p className="info">{reason}</p>}
            </Content>
        </ItemContainer>
    ));
};

export default HistoryItem;

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
        status === 'in_progress' ? 'var(--gray3-color)' : status === 'success' ? 'var(--main-color)' : 'red'};
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

const CompletionDateStyle = styled.p`
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
