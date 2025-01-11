import styled from 'styled-components';
import BackIcon from '../assets/BackIcon.svg';
import ProfileSettingIcon from '../assets/ProfileSettingIcon.svg';
import { useNavigate } from 'react-router';

// 프로필 받아오는거 다시
import ProfileImage from '../assets/react.svg';

const InformationPage = () => {
    // 유저 정보 받아오는 로직으로 추가 + 프로필 이미지 추가
    const userInfo = {
        id: 'user123',
        nickname: 'Runner123',
        nationality: 'South Korea',
        email: 'runner123@example.com',
    };

    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleEditProfile = () => {
        console.log("Edit profile clicked!");
    };

    return (
        <Container>
            <Header>
                <BackIconStyle onClick={() => handleNavigation('/myprofile')} src={BackIcon} />
                <HeaderText>사용자 정보</HeaderText>
            </Header>
            <ProfileSection>
                <ProfileWrapper>
                    <ProfileImageStyle src={ProfileImage} />
                    <EditProfileIcon src={ProfileSettingIcon} alt="Edit Profile" onClick={handleEditProfile} />
                </ProfileWrapper>
            </ProfileSection>
            <UserInfoSection>
                <InfoRow>
                    <Label>아이디</Label>
                    <Value>{userInfo.id}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>닉네임</Label>
                    <Value>{userInfo.nickname}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>국적</Label>
                    <Value>{userInfo.nationality}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>이메일</Label>
                    <Value>{userInfo.email}</Value>
                </InfoRow>
            </UserInfoSection>
        </Container>
    );
};

export default InformationPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const BackIconStyle = styled.img`
    width: 4rem;
    cursor: pointer;
`;
const HeaderText = styled.h2`
    font-size: 2rem;
    font-weight: bold;
`;

const ProfileSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

const ProfileWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
`;
const ProfileImageStyle = styled.img`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
`;
const EditProfileIcon = styled.img`
    position: absolute;
    bottom: -1rem;
    right: -1rem;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
`;

const UserInfoSection = styled.div`
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Label = styled.span`
    font-size: 16px;
    font-weight: bold;
    flex: 1;
`;

const Value = styled.span`
    font-size: 16px;
    flex: 2;
    text-align: left;
`;
