import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const nickname = location.state?.nickname || '회원'; // 전달된 닉네임, 없으면 '회원'

    const handleGoToLogin = () => {
        navigate('/');
    };

    return (
        <Container>
            <CloseButton onClick={handleGoToLogin}>×</CloseButton>
            <ContentWrapper>
                <Message>
                    <Nickname>{nickname}</Nickname> 님
                    <br />
                    회원가입을 축하드려요!
                </Message>
            </ContentWrapper>
            <ButtonWrapper>
                <LoginButton onClick={handleGoToLogin}>로그인 화면으로</LoginButton>
            </ButtonWrapper>
        </Container>
    );
};

export default SignupSuccessPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* 공간을 위아래로 배분 */
    height: 100vh;
    padding: 20px; /* 페이지 내부 여백 */
    background-color: #ffffff;
`;

const CloseButton = styled.button`
    margin-right: 320px;
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    width: 100%;
    text-align: left;
    padding-left: 20px; /* 왼쪽 여백 추가 */
`;

const Message = styled.div`
    margin-top: -260px;
    font-size: 20px;
    text-align: start;
    color: #333;
`;

const Nickname = styled.span`
    font-weight: bold;
    color: #000;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px; /* 버튼을 아래로 배치 */
`;

const LoginButton = styled.button`
    width: 80%;
    max-width: 300px;
    padding: 12px;
    background-color: var(--Main-Color2, #3ee187);
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #32d17c;
    }
`;
