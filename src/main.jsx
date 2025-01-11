import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyles.jsx';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalStyle />
            <App />
            <Footer />
        </BrowserRouter>
    </StrictMode>
);
