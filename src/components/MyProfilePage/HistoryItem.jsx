import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HistoryItem = () => {
    const [relayData, setRelayData] = useState([]);
    const accessToken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoi67CV6rK97Jq0Iiwibmlja25hbWUiOiLtlZjripgiLCJpYXQiOjE3MzY2MzU0MTcsImV4cCI6MTczNjY3MTQxN30.zHl-O30C4xDdisyy8a2D7ODG1n5-9EfhOmX6DqwAH4g';

    useEffect(() => {
        const fetchRelayData = async () => {
            try {
                const response = await fetch('http://test2.shop:42021/relays/history/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.resultType === 'SUCCESS') {
                    const formattedData = data.success.relay_user_.map((item) => ({
                        status: item.status,
                        updatedAt: item.updated_at,
                        remaining: item.remaining || '3',
                        reason: item.reason || '시간 내 미제출',
                    }));
                    setRelayData(formattedData);
                } else {
                    console.error('데이터 가져오기 실패:', data.error);
                }
            } catch (error) {
                console.error('데이터 요청 중 오류 발생:', error);
            }
        };

        fetchRelayData();
    }, []);

    if (!relayData.length) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            {relayData.map((data, index) => (
                <ItemContainer key={index}>
                    <StatusBadge status={data.status}>
                        {data.status === 'in_progress' && '진행중'}
                        {data.status === 'success' && '완주'}
                        {data.status === 'failed' && '실패'}
                    </StatusBadge>

                    <Content>
                        {data.status === 'in_progress' && <p>내 이후 {data.remaining}명이 성공 시 리워드 지급</p>}
                        {data.status === 'success' && (
                            <>
                                <CompletionDateStyle>
                                    {new Date(data.updatedAt).toLocaleDateString('ko-KR')}
                                </CompletionDateStyle>
                                <RewardButton>리워드 받기</RewardButton>
                            </>
                        )}
                        {data.status === 'failed' && <p>{data.reason}</p>}
                    </Content>
                </ItemContainer>
            ))}
        </>
    );
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
    background-color: ${({ status }) => (status === 'in_progress' ? 'gray' : status === 'success' ? 'green' : 'red')};
    color: white;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const CompletionDateStyle = styled.p`
    margin: 0;
`;

const RewardButton = styled.button`
    padding: 10px 8px;
    font-size: 10px;
    border: none;
    border-radius: 4px;
    background-color: green;
    color: white;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
