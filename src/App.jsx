import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PreMain from './pages/PreRelayMainPage';
import PostMain from './pages/PostRelayMainPage';
import CapturePage from './pages/CapturePage';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/premain" element={<PreMain />} />
                <Route path="/postmain" element={<PostMain />} />
                <Route path="/capture" element={<CapturePage />} />
            </Routes>
        </div>
    );
}

export default App;
