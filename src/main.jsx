import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyles.jsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; // ThemeProvider 추가
import theme from './styles/theme';
import Navbar from './components/common/Navbar.jsx';

const Main = () => {
    const location = useLocation();
    const isNavbarHidden = ['/capture', '/'].includes(location.pathname); // Navbar를 숨길 경로 확인

    return (
        <>
            <GlobalStyle />
            {!isNavbarHidden && <Navbar />} {/* 특정 경로가 아니라면 Navbar 렌더링 */}
            <App />
        </>
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
