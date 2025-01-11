import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <FooterContainer>
            <NavItem onClick={() => handleNavigation('/')}>
                <NavText>Home</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/makereplay')}>
                <NavText>Make Relay</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/myprofile')}>
                <NavText>My Profile</NavText>
            </NavItem>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 360px;
    height: 50px;
    background-color: var(--gray6-color);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:hover svg {
        fill: var(--main-color); /* 아이콘 색상 변경 */
    }
    &:hover span {
        color: var(--main-color); /* 텍스트 색상 변경 */
    }
`;

const NavText = styled.span`
    margin-top: 4px;
    font-size: 0.9rem;
    color: #cccccc; /* 기본 텍스트 색상 */
`;