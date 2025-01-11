import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PostMain from './pages/PostRelayMainPage';
// import Footer from './components/Layout/footer';
import SignupPage from './pages/SignupPage';
import MyProfilePage from './pages/MyProfilePage';
import CapturePage from './pages/CameraPage/CapturePage';
import JoinRelay from './pages/JoinRelay';
import RunningRelay from './pages/RunningRelay';
import SignupSuccessPage from './pages/SignupSuccessPage';
import InformationPage from './pages/MyInformationPage';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/myprofile" element={<MyProfilePage />} />
                <Route path="/capture" element={<CapturePage />} />
                <Route path="/myinformation" element={<InformationPage />} />
                <Route path="/joinrelay" element={<JoinRelay />} />
                <Route path="/runningrelay" element={<RunningRelay />} />
                <Route path="/signup-success" element={<SignupSuccessPage />} />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
