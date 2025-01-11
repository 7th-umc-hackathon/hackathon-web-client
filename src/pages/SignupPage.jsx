import { useState } from 'react';
import styled from 'styled-components';
import SignupModal from '../components/Signup/signupmodal';

const SignupPage = () => {
    const [nickname, setNickname] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFormValid = nickname && username && password && email && isUsernameValid;

    const handleDuplicateCheck = async () => {
        // 아이디 중복 확인 로직
        try {
            // 예: 백엔드 API 호출 (여기서는 모의 호출)
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ isDuplicate: username === 'duplicate' }), 1000)
            );

            if (response.isDuplicate) {
                setIsUsernameValid(false);
            } else {
                setIsUsernameValid(true);
            }
        } catch (error) {
            console.error('Error during duplicate check', error);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('회원가입 시도:', { nickname, username, password, email });
            setIsModalOpen(true);
            // 회원가입 로직
        } else {
            alert('모든 필드를 채워주세요.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Form onSubmit={handleSignup}>
                <Title>Hello, Mate!</Title>
                <Input
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <IdWrapper>
                    <IdInput
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUsernameValid(null); // 입력이 바뀌면 초기화
                        }}
                    />
                    <IdCheckButton type="button" onClick={handleDuplicateCheck}>
                        중복확인
                    </IdCheckButton>
                </IdWrapper>
                {isUsernameValid === true && <ValidationMessage success>사용 가능한 아이디입니다</ValidationMessage>}
                {isUsernameValid === false && <ValidationMessage>사용 불가한 아이디입니다</ValidationMessage>}
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <SignupButton type="submit" disabled={!isFormValid} isActive={isFormValid}>
                    회원가입
                </SignupButton>
            </Form>

            <SignupModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Container>
    );
};

export default SignupPage;

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
    width: 300px;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid var(--gray1-color);
    border-radius: 4px;
    font-size: 16px;
`;

const IdWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;
const IdInput = styled.input`
    padding: 10px;
    border: 1px solid var(--gray1-color);
    border-radius: 4px;
    font-size: 16px;
    min-width: 0;
`;
const IdCheckButton = styled.button`
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: var(--gray1-color);
    color: white;
    cursor: pointer;
    flex-shrink: 0;
    &:hover {
        filter: brightness(0.5);
    }
`;

const ValidationMessage = styled.p`
    text-align: center;
    font-size: 14px;
    color: ${(props) => (props.success ? 'var(--gray1-color)' : 'red')};
    margin-bottom: 10px;
`;

const SignupButton = styled.button`
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => (props.isActive ? 'var(--main-color)' : 'var(--gray3-color)')};
    color: ${(props) => (props.isActive ? 'var(--gray1-color)' : 'var( --base-color)')};
    cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.isActive ? '#e0a800' : '#ccc')};
    }
`;
