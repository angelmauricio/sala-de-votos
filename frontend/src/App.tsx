import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Lobby } from './components/lobby/Lobby';
import { VotingRoom } from './components/room/VotingRoom';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<VotingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;