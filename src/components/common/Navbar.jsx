import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router로 페이지 이동
import { getRequest } from '../../services/api'; // API 요청 함수
import ProfileIcon from '../../assets/icon/profile-icon.svg'; // 프로필 아이콘 경로
import LogoImage from '../../assets/icon/logo.svg'; // 로고 이미지 경로

const Navbar = () => {
    const [countryData, setCountryData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await getRequest('/users/profile');
                const { country } = response.data.success.user;
                setCountryData(country);
            } catch (error) {
                console.error('프로필 데이터 가져오기 실패:', error);
            }
        };

        fetchCountryData();
    }, []);

    if (!countryData) {
        return <div>로딩 중...</div>; // 로딩 중 표시
    }

    return (
        <NavbarContainer>
            <FlagWrapper>
                <FlagContainer>
                    <Flag src={countryData.national_flag_url} alt={`${countryData.common_name} Flag`} />
                    <FlagText>{countryData.cca3}</FlagText>
                </FlagContainer>
            </FlagWrapper>
            <Logo src={LogoImage} alt="Logo" />
            <ProfileWrapper onClick={() => navigate('/mypage')}>
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
    justify-content: center;
    background-color: #fff;
    padding: 8px 16px;
    width: 100%;
    height: 60px;
    position: relative;
`;

const FlagWrapper = styled.div`
    position: absolute;
    left: 16px;
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
    height: 22px;
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

const Logo = styled.img`
    width: 100px;
    height: auto;
`;

const ProfileWrapper = styled.div`
    position: absolute;
    right: 16px;
    cursor: pointer;
`;

const Profile = styled.img`
    width: 24px;
    height: 24px;
`;
