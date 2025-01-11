import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import HomeIconOn from '../../assets/HomeIcon-on.svg';
import HomeIconOff from '../../assets/HomeIcon-off.svg';
import RelayIconOn from '../../assets/MakeRelayIcon-on.svg';
import RelayIconOff from '../../assets/MakeRelayIcon-off.svg';
import ProfileIconOn from '../../assets/MyProfileIcon-on.svg';
import ProfileIconOff from '../../assets/MyProfileIcon-off.svg';


export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <FooterContainer>
            <NavItem onClick={() => handleNavigation('/')}>
                <NavIcon src={isActive('/') ? HomeIconOn : HomeIconOff} alt="Home" />
                <NavText active={location.pathname === '/'}>Home</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/makereplay')}>
            <NavIcon src={isActive('/makereplay') ? RelayIconOn : RelayIconOff} alt="Make Relay" />
                <NavText active={location.pathname === '/makereplay'}>Make Relay</NavText>
            </NavItem>
            <NavItem onClick={() => handleNavigation('/myprofile')}>
            <NavIcon src={isActive('/myprofile') ? ProfileIconOn : ProfileIconOff} alt="My Profile" />
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

const NavIcon = styled.img`
    width: 24px;
    height: 24px;
`;