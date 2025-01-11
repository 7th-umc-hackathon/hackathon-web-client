import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyles.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; // ThemeProvider 추가
import theme from './styles/theme';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <GlobalStyle />
            <App />
        </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
