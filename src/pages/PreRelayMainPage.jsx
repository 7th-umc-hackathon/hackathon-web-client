//미션 선택 전의 메인 페이지입니다.
import React from 'react';
import styled from 'styled-components';
import RewardSection from '../components/PreRelayMainPage/RewardSection';
import MissionSection from '../components/PreRelayMainPage/MissionSection';
const PreRelayMainPage = () => {
    return (
        <Container>
            <RewardSection name="길동" points="5" countryRank="2" personalRank="17" />
            <MissionSection></MissionSection>
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
    padding: 18px;
`;

// const MissionSection = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     max-width: 360px;
//     margin-top: 20px;
//     gap: 12px;
// `;

// const MissionCard = styled.div`
//     display: flex;
//     flex-direction: column;
// `;

// const MissionIcon = styled.img`
//     &:hover {
//         transform: scale(1.05);
//     }
// `;
