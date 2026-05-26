import { useState } from 'react';

interface JoinPasswordModalProps {
  roomName: string;
  onClose: () => void;
  onJoin: (password: string) => void;
}

export function JoinPasswordModal({ roomName, onClose, onJoin }: JoinPasswordModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoin(password);
  };

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="mmo-panel w-[300px] p-1 shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
        
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
          <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
            Restricted Area
          </span>
          <button 
            type="button"
            className="mmo-btn px-2 py-0 text-xs text-gray-300"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mmo-inset p-4 mb-4 bg-[#0a0a0a] flex flex-col gap-4 text-center">
            
            <p className="text-xs text-gray-400">
              Enter password for: <br/>
              <span className="font-bold text-white text-sm">{roomName}</span>
            </p>

            <input 
              type="password" 
              required
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mmo-input p-1 text-sm text-center"
              autoFocus
            />
            
          </div>

          <div className="flex justify-between items-center px-2 pb-2">
            <button 
              type="button"
              className="mmo-btn px-6 py-1 text-sm text-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="mmo-btn px-8 py-1 text-sm font-bold text-yellow-500"
            >
              Enter
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}