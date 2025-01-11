import styled from 'styled-components';
import SouthKoreaFlag from '../../assets/icon/south-korea.svg'; // 국기 이미지 경로
import ProfileIcon from '../../assets/icon/profile-icon.svg'; // 프로필 아이콘 경로
import { useNavigate } from 'react-router-dom'; // React Router로 페이지 이동

const Navbar = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 Hook

    return (
        <NavbarContainer>
            <FlagWrapper>
                <FlagContainer>
                    <Flag src={SouthKoreaFlag} alt="South Korea Flag" />
                    <FlagText>KR</FlagText>
                </FlagContainer>
            </FlagWrapper>
            <Logo>로고</Logo>
            <ProfileWrapper onClick={() => navigate('/myprofile')}>
                <Profile src={ProfileIcon} alt="Profile Icon" />
            </ProfileWrapper>
        </NavbarContainer>
    );
};

export default Navbar;

// Styled-components
const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* 중앙 배치 */
    background-color: #fff; /* 흰색 배경 */
    padding: 8px 16px;
    width: 100%;
    height: 60px; /* Navbar 높이 */
    position: relative; /* 절대 배치 기준 */
`;

const FlagWrapper = styled.div`
    position: absolute; /* 로고와 겹치지 않게 절대 배치 */
    left: 16px; /* 왼쪽 여백 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FlagContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Flag = styled.img`
    width: 34px;
    height: 26px;
`;

const FlagText = styled.div`
    color: #4f4f4f;
    font-family: 'Noto Sans KR';
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.008px;
`;

const Logo = styled.div`
    font-size: 1.6rem;
    color: var(--gray1-color); /* 텍스트 색상 */
    background-color: var(--gray6-color); /* 로고 배경색 */
    padding: 4px 12px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
`;

const ProfileWrapper = styled.div`
    position: absolute;
    right: 16px; /* 오른쪽 여백 */
    cursor: pointer; /* 클릭 가능 */
`;

const Profile = styled.img`
    width: 24px;
    height: 24px;
`;
