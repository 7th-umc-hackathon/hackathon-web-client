import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getRequest } from "../../services/api";
const RewardSection = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [personalRank, setPersonalRank] = useState(null);
  const [countryRank, setCountryRank] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 프로필 데이터 요청
        const profileResponse = await getRequest("/users/profile");
        const user = profileResponse.data.success.user;

        // 개인 순위 요청
        const personalRankResponse = await getRequest("/users/rank/user");
        const personalRank = personalRankResponse.data.success.rank;

        // 국가 순위 요청
        const countryRankResponse = await getRequest(
          "/users/rank/user/country"
        );
        const countryRank = countryRankResponse.data.success.rank;

        setUserData(user);
        setPersonalRank(personalRank);
        setCountryRank(countryRank);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData || personalRank === null || countryRank === null) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 표시
  }

  const { nickname, point } = userData;

  return (
    <Container onClick={() => navigate("/ranking")}>
      <RewardText>
        현재 <strong>{nickname}님</strong>의 리워드는 <Point>{point}</Point> 점
      </RewardText>
      <HorizontalDivider />
      <Ranks>
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

export default RewardSection;

// Styled-components
const Container = styled.div`
  cursor: pointer;
  width: 96%;
  max-width: 360px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 0px 8px rgba(117, 117, 117, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RewardText = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: -20px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.gray1};

  strong {
    font-weight: bold;
  }
`;

const Point = styled.span`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--Main-Color2, #3ee187);
  margin-left: 65px;
`;

const HorizontalDivider = styled.div`
  width: 272px;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(224, 224, 224, 0) 0%,
    #e0e0e0 49.5%,
    rgba(224, 224, 224, 0) 100%
  );
  align-self: center;
`;

const Ranks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const RankContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Rank = styled.div`
  display: flex;
  color: var(--Gray-2, #4f4f4f);
  font-family: "Noto Sans KR";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RankValue = styled.div`
  color: var(--Secondary-Color, #6dbbff);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  margin-left: 3px;
  margin-top: -1px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 37px;
  margin-top: -16px;
  background: linear-gradient(
    90deg,
    #e0e0e0 49.5%,
    rgba(224, 224, 224, 0) 100%
  );
`;
