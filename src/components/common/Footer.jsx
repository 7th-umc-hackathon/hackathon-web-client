import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%; /* 부모 컨테이너에 종속 */
    max-width: 360px; /* 모바일 크기 제한 */
    height: 50px; /* 고정 높이 */
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    font-size: 1.4rem;
`;

export default function Footer() {
    return <FooterContainer>Footer</FooterContainer>;
}
