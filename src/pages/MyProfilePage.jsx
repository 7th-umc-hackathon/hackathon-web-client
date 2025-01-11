import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import RewardSectionWithSettings from '../components/MyProfilePage/RewardSectionMypage';
import HistoryItem from '../components/MyProfilePage/HistoryItem';
import { getRequest } from '../services/api';

const MyProfilePage = () => {
    const [relayHistories, setRelayHistories] = useState([]);

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const response = await getRequest('/relays/history/user');
                const historyList = response.data.success.relay_user_history_list || [];
                setRelayHistories(historyList);
            } catch (error) {
                console.error('이력 데이터 가져오기 오류:', error);
            }
        };

        fetchHistoryData();
    }, []);

    return (
        <Container>
            <RewardSectionWithSettings />

            <h2>내 이어달리기 이력</h2>
            <ScrollList>
                {relayHistories.length > 0 ? (
                    relayHistories.map((history, index) => <HistoryItem key={index} data={history} />)
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
