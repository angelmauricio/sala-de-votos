import { useState } from 'react';
import { soundEffects } from '../../utils/audio';

interface CreateRoomModalProps {
  onClose: () => void;
  onCreate?: (name: string, maxUsers: number, isPrivate: boolean) => void;
}

export function CreateRoomModal({ onClose, onCreate }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playCoin();
    
    const finalRoomName = roomName.trim() || `Sala de Votação #${Math.floor(Math.random() * 900 + 100)}`;
    
    if (onCreate) {
      onCreate(finalRoomName, maxCapacity, isPrivate);
    } else {
      onClose();
    }
  };

  const selectCapacity = (cap: number) => {
    soundEffects.playTick();
    setMaxCapacity(cap);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="mmo-panel w-full max-w-[400px] p-1 shadow-[12px_12px_0_rgba(0,0,0,0.6)]">
        {/* Title Belt */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
          <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
            Criar Sala de Votação
          </span>
          <button 
            type="button" 
            onClick={() => {
              soundEffects.playBeep();
              onClose();
            }} 
            className="mmo-btn px-2 py-0 text-xs text-gray-300"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mmo-inset p-4 bg-[#0a0a0d] flex flex-col gap-4">
          {/* Room Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-amber-500 font-bold tracking-wider">NOME DA SALA</label>
            <input
              type="text"
              className="mmo-input p-2 text-sm text-white"
              placeholder="Ex: Debate Sobre Animais"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              maxLength={24}
              required
            />
          </div>

          {/* Max Capacity Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-amber-500 font-bold tracking-wider">PARTICIPANTES MÁXIMOS</label>
            <div className="grid grid-cols-3 gap-2">
              {[8, 12, 16].map((cap) => (
                <button
                  key={cap}
                  type="button"
                  onClick={() => selectCapacity(cap)}
                  className={`mmo-btn p-2 text-xs font-bold ${
                    maxCapacity === cap ? 'border-amber-400 bg-amber-950/20 text-white' : ''
                  }`}
                >
                  {cap} Vagas
                </button>
              ))}
            </div>
          </div>

          {/* Private Room Checkbox */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="isPrivateCheckbox"
              className="accent-amber-500 h-4 w-4 bg-black border border-gray-700"
              checked={isPrivate}
              onChange={(e) => {
                soundEffects.playSelect();
                setIsPrivate(e.target.checked);
              }}
            />
            <label htmlFor="isPrivateCheckbox" className="text-xs text-gray-300 font-bold select-none cursor-pointer">
              Trancar Sala com Senha
            </label>
          </div>

          {/* Password Input Conditional */}
          {isPrivate && (
            <div className="flex flex-col gap-1 mt-1 transition-all duration-200">
              <label className="text-xs text-amber-500 font-bold tracking-wider">SENHA DE ACESSO</label>
              <input
                type="password"
                className="mmo-input p-2 text-sm text-yellow-500 font-mono tracking-widest text-center"
                placeholder="****"
                maxLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isPrivate}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                soundEffects.playBeep();
                onClose();
              }}
              className="mmo-btn flex-1 py-1.5 text-xs font-bold text-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="mmo-btn flex-1 py-1.5 text-xs font-bold border-amber-500 text-amber-400 hover:text-white"
            >
              Criar!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
