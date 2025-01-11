import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../services/api';
import { useNavigate } from 'react-router';

const RewardSectionWithSettings = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const [userData, setUserData] = useState(null);
    const [personalRank, setPersonalRank] = useState(null);
    const [countryRank, setCountryRank] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 이름 데이터 요청
                const profileResponse = await getRequest('/users/profile');
                const user = profileResponse.data.success.user;

                // 개인 순위 요청
                const personalRankResponse = await getRequest('/users/rank/user');
                const personalRank = personalRankResponse.data.success.rank;

                // 국가 순위 요청
                const countryRankResponse = await getRequest('/users/rank/user/country');
                const countryRank = countryRankResponse.data.success.rank;

                setUserData(user);
                setPersonalRank(personalRank);
                setCountryRank(countryRank);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchData();
    }, []);

    if (!userData || personalRank === null || countryRank === null) {
        return <div>로딩 중...</div>; // 데이터 로딩 중 표시
    }

    const { nickname, point } = userData;
    return (
        <Container>
            <TopSection>
                <ProfileContainer>
                    <ProfileImage src={''} alt={`${nickname}의 프로필`} />
                    <UserName>{nickname}</UserName>
                </ProfileContainer>
                <SettingsButton onClick={() => handleNavigation('/myinformation')}>⚙️</SettingsButton>
            </TopSection>

            <HorizontalDivider />

            <Ranks>
                <RankContainer>
                    <Rank>
                        리워드 <RewardValue>{point}</RewardValue>P
                    </Rank>
                </RankContainer>
                <VerticalDivider />
                <RankContainer>
                    <Rank>
                        국가 순위 <RankValue>{countryRank}</RankValue>위
                    </Rank>
                </RankContainer>
                <VerticalDivider />
                <RankContainer>
                    <Rank>
                        개인 순위 <RankValue>{personalRank}</RankValue>위
                    </Rank>
                </RankContainer>
            </Ranks>
        </Container>
    );
};

export default RewardSectionWithSettings;

// Styled Components
const Container = styled.div`
    width: 96%;
    max-width: 360px;
    background-color: #fff;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0px 0px 8px rgba(117, 117, 117, 0.15);
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const TopSection = styled.div`
    padding-top: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;
const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ddd;
`;

const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #4f4f4f;
`;

const SettingsButton = styled.button`
    padding: 0 14px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(224, 224, 224, 0) 0%, #e0e0e0 49.5%, rgba(224, 224, 224, 0) 100%);
    align-self: center;
`;

const Ranks = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    color: #4f4f4f;
`;

const RankContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Rank = styled.span`
    font-family: 'Noto Sans KR';
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
`;
const RewardValue = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: var(--main-color);
`;
const RankValue = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: var(--secondary-color);
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 28px;
    background: #e0e0e0;
`;
