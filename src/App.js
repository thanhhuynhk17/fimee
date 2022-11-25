import { Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/:id" element={<UserProfile />} />
        </Routes>
    );
}

export default App;
