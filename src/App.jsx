import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import MyProfilePage from './pages/MyProfilePage';
import CapturePage from './pages/CameraPage/CapturePage';
import JoinRelay from './pages/JoinRelay';
import RunningRelay from './pages/RunningRelay';
import InformationPage from './pages/MyInformationPage';
import SignupSuccessPage from './pages/SignupSuccessPage';
import RankingPage from './pages/RankingPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/capture" element={<CapturePage />} />
                <Route path="/myinformation" element={<InformationPage />} />
                <Route path="/joinrelay" element={<JoinRelay />} />
                <Route path="/runningrelay" element={<RunningRelay />} />
                <Route path="/myprofile" element={<MyProfilePage />} />
                <Route path="/signup-success" element={<SignupSuccessPage />} />
                <Route path="/ranking" element={<RankingPage />} />
            </Routes>
        </div>
    );
}

export default App;
