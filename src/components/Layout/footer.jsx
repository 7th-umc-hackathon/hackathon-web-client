import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <FooterContainer>
            <NavItem onClick={() => handleNavigation('/')}>
                <NavText active={location.pathname === '/'}>Home</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/makereplay')}>
                <NavText active={location.pathname === '/makereplay'}>Make Relay</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/myprofile')}>
                <NavText active={location.pathname === '/myprofile'}>My Profile</NavText>
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
`;

const NavText = styled.span`
    margin-top: 4px;
    font-size: 0.9rem;
    color: ${(props) => (props.active ? 'var(--main-color)' : '#cccccc')};
`;