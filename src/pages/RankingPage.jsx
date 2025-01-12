import styled from "styled-components";
import theme from "../styles/theme";
import BackIcon2 from "../assets/icon/back-icon2.svg";
import ProfileList from "../assets/icon/profile-list.svg";
import { useState, useEffect } from "react";
import apiClient from "../services/api";
import { useNavigate } from "react-router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 필요한 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RankingPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [userRank, setUserRank] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await apiClient.get("/users/profile");
        setNickname(profileResponse.data.success.user.nickname);

        const rankResponse = await apiClient.get("/users/rank");
        setUserRank(rankResponse.data.success.rank);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["미국", "대한민국", "일본", "호주", "싱가폴", "프랑스", "중국"],
    datasets: [
      {
        data: [90, 80, 70, 60, 55, 50, 40],
        backgroundColor: [
          "rgba(72, 239, 128, 1)",
          "rgba(72, 239, 128, 0.9)",
          "rgba(72, 239, 128, 0.7)",
          "rgba(72, 239, 128, 0.6)",
          "rgba(72, 239, 128, 0.4)",
          "rgba(72, 239, 128, 0.2)",
          "rgba(72, 239, 128, 0.1)",
        ],
        borderRadius: 4,
        barThickness: 28,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>
          <BackIconImg src={BackIcon2} alt="Back Icon" />
          <TopTitle>통계</TopTitle>
        </BackButton>
      </TopBar>

      <ContentContainer>
        <ContryRankingBox>
          <SubTitle>국가 순위</SubTitle>
          <MainTitle>
            <span className="highlight">대한민국</span>은 전 세계에서 2등
            입니다.
          </MainTitle>

          <StyledBarContainer>
            <Bar data={data} options={options} />
          </StyledBarContainer>
        </ContryRankingBox>

        <MyRankingBox>
          <SubTitle>개인 순위</SubTitle>
          <MainTitle>
            <span className="highlight">{nickname}</span>님은 전 세계에서{" "}
            {userRank}등 입니다.
          </MainTitle>
          <RankerContainer>
            <ProfileImg src={ProfileList} alt="Profile List" />{" "}
          </RankerContainer>
        </MyRankingBox>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const TopBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  flex-direction: row;
  height: 60px;
  padding: 1rem;
  gap: 1rem;
  color: black;
  width: 360px;
  padding: 0px 104px 0px 20px;
`;

const TopTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 120px;
  cursor: pointer;
`;

export const BackIconImg = styled.img`
  margin-top: 2px;
`;

const ContentContainer = styled.div`
  gap: 36px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-left: 20px;
`;

const ContryRankingBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.div`
  font-size: 10px;
  color: ${theme.colors.gray2};
`;

const MainTitle = styled.div`
  font-size: 14px;
  color: ${theme.colors.gray2};
  padding-bottom: 18px;
  position: relative;
  font-weight: 400;

  &::after {
    content: "";
    display: block;
    height: 1px; /* 선의 높이 */
    width: 100%;
    background: linear-gradient(
      to right,
      ${theme.colors.main},
      rgba(0, 0, 0, 0)
    ); /* 왼쪽에서 오른쪽으로 흐려짐 */
    position: absolute;
    bottom: 0;
    left: 0;
  }

  span {
    font-weight: bold;
    color: ${theme.colors.gray1};
  }
`;

const StyledBarContainer = styled.div`
  width: 340px;
  height: 210px;
  display: flex;
  align-items: center;
`;

const MyRankingBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const RankerContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: auto;
`;

export default RankingPage;
