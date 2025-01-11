import styled from 'styled-components';

const RewardSectionWithSettings = ({ name, points, countryRank, personalRank, profileImage, onClick  }) => {
    return (
        <Container>

            <TopSection>
                <ProfileContainer>
                    <ProfileImage src={''} alt={`${name}의 프로필`} />
                    <UserName>{name}</UserName>
                </ProfileContainer>
                <SettingsButton onClick={onClick}>⚙️</SettingsButton>
            </TopSection>

            <HorizontalDivider />

            <Ranks>
                <RankContainer>
                    <Rank>
                        리워드 <RewardValue>{points}</RewardValue>P
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
