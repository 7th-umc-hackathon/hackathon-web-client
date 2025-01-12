import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RewardSectionWithSettings from '../components/MyProfilePage/RewardSectionMypage';

const MyProfilePage = () => {
    const [relayHistories, setRelayHistories] = useState([]);
    const [disabledRewards, setDisabledRewards] = useState({});

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('http://test2.shop:42021/relays/history/user', {
                    headers: {
                        Authorization: `${accessToken}`
                    }
                });
                if (Array.isArray(response.data.success)) {
                    setRelayHistories(response.data.success);
                } else {
                    setRelayHistories([]);
                    console.error('Unexpected data structure:', response.data.success);
                }
            } catch (error) {
                console.error('이력 데이터 가져오기 오류:', error);
                setRelayHistories([]);
            }
        };

        fetchHistoryData();
    }, []);

    const handleClaimReward = (relayUserId) => {
        setDisabledRewards((prev) => ({ ...prev, [relayUserId]: true }));
    };

    return (
        <Container>
            <RewardSectionWithSettings />

            <h2>내 이어달리기 이력</h2>
            <ScrollList>
                {relayHistories.length > 0 ? (
                    relayHistories.map((history, index) => (
                        <ItemContainer key={index}>
                            <StatusBadge status={history.status}>
                                {history.status === 'waiting' && '진행 중'}
                                {history.status === 'success' && '성공'}
                                {history.status === 'fail' && '실패'}
                            </StatusBadge>

                            <Content>
                                {history.status === 'waiting' && (
                                    <p>앞으로 {history.reward_relay_count}명이 성공 시 리워드 지급</p>
                                )}
                                {history.status === 'success' && (
                                    <>
                                        <p>{new Date(history.updated_at).toLocaleDateString('ko-KR')}</p>
                                        <StatusButton
                                            disabled={disabledRewards[history.relay_user_id]}
                                            onClick={() => handleClaimReward(history.relay_user_id)}
                                        >
                                            리워드 받기
                                        </StatusButton>
                                    </>
                                )}
                                {history.status === 'fail' && <p>미션 실패</p>}
                            </Content>
                        </ItemContainer>
                    ))
                ) : (
                    <p>이력 정보가 없습니다.</p>
                )}
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

const StatusBadge = styled.div`
    padding: 5px 10px;
    border-radius: 4px;
    width: 80px;
    text-align: center;
    background-color: ${({ status }) =>
        status === 'waiting' ? 'gray' : status === 'success' ? 'green' : 'red'};
    color: white;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const StatusButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#3ee187')};
    color: white;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
