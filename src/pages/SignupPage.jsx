import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackIcon from '../assets/icon/back-icon2.svg';
import EyeIconOff from '../assets/icon/eye-off.svg';
import EyeIconOn from '../assets/icon/eye-on.svg';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState(''); // 이름 입력 필드 추가
    const [isUsernameValid, setIsUsernameValid] = useState(null); // 중복 확인 상태
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailLocalPart, setEmailLocalPart] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [isCustomEmail, setIsCustomEmail] = useState(false);
    const [customEmailDomain, setCustomEmailDomain] = useState('');
    const [countryId, setCountryId] = useState('');
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();

    const isFormValid =
        nickname &&
        userId &&
        name && // 이름 필드 추가
        isUsernameValid === true &&
        password &&
        confirmPassword &&
        emailLocalPart &&
        (isCustomEmail ? customEmailDomain : emailDomain) &&
        countryId;

    // 나라 목록 받아오기
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://test2.shop:42021/auth/countries');
                if (!response.ok) throw new Error('Failed to fetch countries');
                const data = await response.json();

                const sortedCountries = [
                    ...data.success.filter((country) => country.common_name === 'South Korea'),
                    ...data.success.filter((country) => country.common_name !== 'South Korea'),
                ];

                setCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const handleDuplicateCheck = async () => {
        try {
            const response = await fetch('http://test2.shop:42021/auth/id/unique', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login_id: userId }),
            });

            if (response.ok) {
                setIsUsernameValid(true);
                alert('사용 가능한 아이디입니다.');
            } else {
                setIsUsernameValid(false);
                alert('이미 사용 중인 아이디입니다.');
            }
        } catch (error) {
            console.error('아이디 중복 확인 오류:', error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const email = isCustomEmail ? `${emailLocalPart}@${customEmailDomain}` : `${emailLocalPart}@${emailDomain}`;

        try {
            const response = await fetch('http://test2.shop:42021/auth/register/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login_id: userId,
                    password,
                    name,
                    nickname,
                    email,
                    country_id: countryId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                navigate('/signup-success', { state: { nickname } }); // 성공 페이지로 이동
            } else {
                const errorData = await response.json();
                alert(`회원가입 실패: ${errorData.message}`);
            }
        } catch (error) {
            console.error('회원가입 요청 오류:', error);
            alert('회원가입 요청 중 문제가 발생했습니다.');
        }
    };

    return (
        <Container>
            <TopBar>
                <BackButton src={BackIcon} alt="Back" onClick={handleBack} />
                <Title>회원가입</Title>
            </TopBar>
            <Form onSubmit={handleSignup}>
                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <IdInput
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <DuplicateCheckButton type="button" onClick={handleDuplicateCheck}>
                        중복 확인
                    </DuplicateCheckButton>
                </InputWrapper>

                <InputWrapper>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <EyeIcon
                        src={showPassword ? EyeIconOn : EyeIconOff}
                        alt="Toggle Password"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <EyeIcon
                        src={showConfirmPassword ? EyeIconOn : EyeIconOff}
                        alt="Toggle Password"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                    />
                </InputWrapper>
                <InputWrapper>
                    <EmailInput
                        type="text"
                        placeholder="이메일"
                        value={emailLocalPart}
                        onChange={(e) => setEmailLocalPart(e.target.value)}
                    />
                    <Separator>@</Separator>
                    {isCustomEmail ? (
                        <CustomEmailWrapper>
                            <EmailInput
                                type="text"
                                placeholder="직접 입력"
                                value={customEmailDomain}
                                onChange={(e) => setCustomEmailDomain(e.target.value)}
                            />
                        </CustomEmailWrapper>
                    ) : (
                        <EmailSelect
                            value={emailDomain}
                            onChange={(e) => {
                                if (e.target.value === 'custom') {
                                    setIsCustomEmail(true);
                                    setEmailDomain('');
                                } else {
                                    setIsCustomEmail(false);
                                    setEmailDomain(e.target.value);
                                }
                            }}
                        >
                            <option value="" disabled>
                                선택
                            </option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="naver.com">naver.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="custom">직접 입력</option>
                        </EmailSelect>
                    )}
                </InputWrapper>
                <InputWrapper>
                    <Select value={countryId} onChange={(e) => setCountryId(e.target.value)}>
                        <option value="" disabled>
                            국적
                        </option>
                        {countries.map((country) => (
                            <option key={country.country_id} value={country.country_id}>
                                {country.common_name}
                            </option>
                        ))}
                    </Select>
                </InputWrapper>
                <SubmitButton type="submit" isActive={isFormValid}>
                    회원가입
                </SubmitButton>
            </Form>
        </Container>
    );
};

export default SignupPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
`;

const BackButton = styled.img`
    cursor: pointer;
`;

const Title = styled.h1`
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-left: -10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 360px;
    margin-top: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
    padding: 11px 0;
    margin-bottom: 30px;
`;

const Input = styled.input`
    flex: 1;
    border: none;
    font-size: 14px;
    outline: none;
`;
const CustomEmailWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    margin: 0;

    input {
        width: 100%;
        border: none;
        font-size: 14px;
        outline: none;
    }
`;
const IdInput = styled(Input)``;

const DuplicateCheckButton = styled.button`
    background: #4f4f4f;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background: #3e3e3e;
    }
`;

const EyeIcon = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const EmailInput = styled(Input)``;

const Separator = styled.span`
    margin: 0 10px;
    font-size: 14px;
    color: #999;
`;

const EmailSelect = styled.select`
    flex: 1;
    border: none;
    font-size: 14px;
    outline: none;
`;

const Select = styled.select`
    width: 100%;
    border: none;
    font-size: 14px;
    outline: none;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    margin-top: 120px;
    margin-bottom: 15px;
    max-width: 360px;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: ${(props) => (props.isActive ? 'var(--Main-Color2, #3EE187)' : '#e0e0e0')};
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};

    &:hover {
        background: ${(props) => (props.isActive ? '#32d17c' : '#d6d6d6')};
    }
`;