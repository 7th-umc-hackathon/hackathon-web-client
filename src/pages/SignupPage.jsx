import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SignupModal from '../components/Signup/signupmodal';

const SignupPage = () => {
    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [countryId, setCountryId] = useState('');
    const [countries, setCountries] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFormValid = nickname && userId && password && email && countryId && (isUsernameValid === true || isUsernameValid === null);

    // 나라 목록 받아오기
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://test2.shop:42021/auth/countries', {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                });
                const data = await response.json();
                console.log('나라 목록 데이터:', data);
                setCountries(data.countries);
            } catch (error) {
                console.error('나라 선택 오류:', error);
            }
        };
        fetchCountries();
    }, []);

    // 아이디 중복 확인
    const handleDuplicateCheck = async () => {
        try {
            const response = await fetch('http://test2.shop:42021/auth/id/unique', {
                method: 'POST',
                headers: { 'Content-Type':'application/json;charset=utf-8'},
                body: JSON.stringify({ 
                    login_id: userId,
                }),  
            });             

            if (response.status === 200) {
                    setIsUsernameValid(true);
                } else if (response.status === 409) {
                    setIsUsernameValid(false);
                }
            } catch (error) {
                console.error('아이디 중복 확인 중 오류:', error);
            }
    };

    // 회원가입
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http:///auth/register/local', {
                method: 'POST',
                headers: { 'Content-Type':'application/json;charset=utf-8' },
                body: JSON.stringify({
                login_id: userId,
                password,
                name,
                country_id: countryId,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.access_token);
                console.log('회원가입 데이터:', response.data);
                setIsModalOpen(true);
                } else {
                    console.log('회원가입 실패: ', response.status);
                    }
            } catch (error) {
                console.error('회원가입 실패:', error);
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
                        value={userId}
                        onChange={(e) => {
                            setUserId(e.target.value);
                            setUserId(null);
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
                
                <Select
                    value={countryId}
                    onChange={(e) => setCountryId(e.target.value)}>
                    <option value="" disabled>국가를 선택해주세요</option>
                    {countries.map((country) => (
                        <option key={country.country_id} value={country.country_id}>
                            {country.common_name}
                        </option>
                    ))}
                </Select>
                
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

const Select = styled.select`
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
