import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PreMain from './pages/PreRelayMainPage';
import PostMain from './pages/PostRelayMainPage';
import Footer from './components/Layout/footer';
import SignupPage from './pages/SignupPage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/premain" element={<PreMain />} />
                <Route path="/postmain" element={<PostMain />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/myprofile" element={<MyProfilePage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;