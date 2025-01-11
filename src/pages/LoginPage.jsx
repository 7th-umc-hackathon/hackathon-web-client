import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import eyeOpenIcon from '../assets/eye-open.svg';
import eyeCloseIcon from '../assets/eye-close.svg';
import Logo from '../assets/icon/logo.svg';
import apiClient from '../services/api';

const isLoggedIn = () => {
    return document.cookie.split('; ').some((cookie) => cookie.startsWith('authToken='));
};

const LoginPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const isFormValid = userId.trim() !== '' && password.trim() !== ''; // 입력 유효성 검사

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/premain');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            try {
                const response = await apiClient.post('/auth/login/local', {
                    login_id: userId,
                    password,
                });

                if (response.data.resultType === 'SUCCESS') {
                    const accessToken = response.data.success.access_token;
                    localStorage.setItem('accessToken', accessToken); // localStorage에 토큰 저장
                    alert('로그인 성공!');
                    navigate('/premain');
                } else {
                    alert(`로그인 실패: ${response.data.error || '알 수 없는 오류'}`);
                }
            } catch (error) {
                console.error('로그인 요청 오류:', error);
                alert('로그인 요청 중 문제가 발생했습니다.');
            }
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container>
            <Form onSubmit={handleLogin}>
                <LogoImage src={Logo} alt="Run With Me Logo" />
                <Input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <PasswordWrapper>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <PasswordIcon
                        src={showPassword ? eyeOpenIcon : eyeCloseIcon}
                        alt="password visibility"
                        onClick={toggleShowPassword}
                    />
                </PasswordWrapper>
                <LoginButton type="submit" disabled={!isFormValid}>
                    로그인
                </LoginButton>
                <EtcContainer>
                    <EtcText onClick={handleSignup}>회원가입</EtcText>
                    <EtcText>아이디 찾기</EtcText>
                    <EtcText>비밀번호 찾기</EtcText>
                </EtcContainer>
            </Form>
        </Container>
    );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 320px;
    padding: 20px;
    margin-top: 100px;
`;

const LogoImage = styled.img`
    width: 150px;
    height: auto;
    margin: 0 auto 40px;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 14px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--gray4-color);

    &:focus {
        border-bottom: 1px solid var(--main-color);
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 4px;
    color: var(--gray4-color);
    cursor: pointer;
`;

const PasswordWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const PasswordIcon = styled.img`
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
`;

const EtcContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const EtcText = styled.div`
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const LoginButton = styled(Button)`
    padding: 10px;
    font-size: 16px;
    background-color: ${(props) => (props.disabled ? 'var(--gray5-color)' : 'var(--main-color)')};
    color: #ffffff;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        filter: ${(props) => (props.disabled ? 'none' : 'brightness(0.85)')};
    }
`;
