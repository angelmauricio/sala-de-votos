import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Profile } from '../../utils/profile';
import { useProfileStore } from '../../store/profileStore';
import { AudienceWindow } from './AudienceWindow';
import { ChatWindow } from './ChatWindow';

export function VotingRoom() {
  const navigate = useNavigate();
  const {profile} = useProfileStore()

  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [currentVote, setCurrentVote] = useState<string | null>(null);

  // handle vote submission
  const handleVote = (option: string) => {
    setCurrentVote(option);
    // emit vote
  };


  return (
    <div className="h-screen w-full bg-[url('/bg-pattern.png')] bg-[#111] p-4 flex gap-4 no-select overflow-hidden">
      
      {/* Left Column: Game Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        
        {/* Voting Panel */}
        <div className="mmo-panel flex-none p-1 shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
            <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
              Current Poll
            </span>
            <span className="text-yellow-400 font-bold text-sm bg-black/50 px-2 border border-gray-700">
              {timeLeft.toString().padStart(2, '0')}s
            </span>
          </div>
          
          <div className="mmo-inset p-6 bg-[#0a0a0a] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl text-white font-bold mb-8 drop-shadow-md">
              Anime or Cartoon?
            </h2>
            
            <div className="flex gap-6 items-center">
              <button 
                className={`mmo-btn px-8 py-4 text-lg font-bold transition-colors ${
                  currentVote === 'anime' ? 'text-yellow-400 border-yellow-600' : 'text-blue-400'
                }`}
                onClick={() => handleVote('anime')}
              >
                Anime
              </button>
              
              <span className="text-gray-600 font-black text-xl">VS</span>
              
              <button 
                className={`mmo-btn px-8 py-4 text-lg font-bold transition-colors ${
                  currentVote === 'cartoon' ? 'text-yellow-400 border-yellow-600' : 'text-red-400'
                }`}
                onClick={() => handleVote('cartoon')}
              >
                Cartoon
              </button>
            </div>
          </div>
        </div>

        {/* Audience Panel */}
        <AudienceWindow />

      </div>

      {/* Right Column: Chat Window */}
      <ChatWindow />

    </div>
  );
}