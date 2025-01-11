import styled from 'styled-components';

const InformationPage = () => {
    const userInfo = {
        id: 'user123',
        nickname: 'Runner123',
        nationality: 'South Korea',
        email: 'runner123@example.com',
    };

    return (
        <Container>
            <h2>사용자 정보</h2>
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

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
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
