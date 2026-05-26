import { useState } from 'react';
import { soundEffects } from '../../utils/audio';

interface JoinPasswordModalProps {
  roomName: string;
  onClose: () => void;
  onJoin: (password: string) => void;
}

export function JoinPasswordModal({ roomName, onClose, onJoin }: JoinPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      soundEffects.playBeep();
      setError(true);
      return;
    }
    soundEffects.playLevelUp();
    onJoin(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
      <div className="mmo-panel w-full max-w-[340px] p-1 shadow-[12px_12px_0_rgba(0,0,0,0.7)] animate-[pulseBorder_2s_infinite]">
        
        {/* Title Belt */}
        <div className="bg-gradient-to-r from-red-950 to-red-900 border border-red-950 p-2 mb-2 flex justify-between items-center">
          <span className="text-red-400 font-bold text-sm tracking-widest drop-shadow-md font-sans">
            🔐 SECURED ACCESS
          </span>
          <button 
            type="button" 
            onClick={() => {
              soundEffects.playBeep();
              onClose();
            }} 
            className="mmo-btn px-2 py-0 text-xs text-red-300"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mmo-inset p-4 bg-[#0a0606] flex flex-col gap-4 text-center">
          <div className="text-xs text-gray-400">
            You must enter the <span className="text-amber-500 font-bold font-sans">Secret Code</span> to enter
            <div className="text-white font-bold mt-1 max-w-full text-ellipsis overflow-hidden text-sm">
              "{roomName}"
            </div>
          </div>

          <div className="flex flex-col gap-1 my-2">
            <input
              type="password"
              className={`mmo-input p-2 text-md text-center tracking-widest font-mono text-red-500 ${
                error ? 'border-red-600 animate-[shakeGrid_0.2s_infinite]' : ''
              }`}
              placeholder="••••••••"
              maxLength={16}
              value={password}
              onChange={handleInputChange}
              required
              autoFocus
            />
            {error && (
              <span className="text-[10px] text-red-500 font-bold mt-1">SIGIL INCORRECT! TRY AGAIN</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                soundEffects.playBeep();
                onClose();
              }}
              className="mmo-btn flex-1 py-1.5 text-xs font-bold text-gray-400"
            >
              Flee
            </button>
            <button
              type="submit"
              className="mmo-btn flex-1 py-1.5 text-xs font-bold border-red-700 hover:border-red-500 text-red-400 hover:text-white"
            >
              Verify Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
