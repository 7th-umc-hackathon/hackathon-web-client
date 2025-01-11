import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LadingPage';
import PreMain from './pages/PreRelayMainPage';
import PostMain from './pages/PostRelayMainPage';
import Footer from './components/Layout/footer';
import SignupPage from './pages/SignupPage';
import MyProfilePage from './pages/MyProfilePage';

import CapturePage from './pages/CapturePage';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/premain" element={<PreMain />} />
                <Route path="/postmain" element={<PostMain />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/myprofile" element={<MyProfilePage />} />
                <Route path="/capture" element={<CapturePage />} />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
