import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRoomModal } from './CreateRoomModal';
import { JoinPasswordModal } from './JoinPasswordModal';
import { PlayerProfile } from '../PlayerProfile';

interface Room {
  id: string;
  name: string;
  currentUsers: number;
  maxUsers: number;
  isPrivate: boolean;
}

const mockRooms: Room[] = [
  { id: '1', name: 'Sala 1231214123', currentUsers: 1, maxUsers: 8, isPrivate: true },
  { id: '2', name: 'Brasileiros', currentUsers: 4, maxUsers: 8, isPrivate: false },
  { id: '3', name: 'Illuminatis', currentUsers: 3, maxUsers: 16, isPrivate: true },
];

export function Lobby() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [roomToJoin, setRoomToJoin] = useState<Room | null>(null);

  const handleJoinClick = () => {
    if (!selectedRoomId) return;

    const room = rooms.find(r => r.id === selectedRoomId);
    if (!room) return;

    if (room.isPrivate) {
      setRoomToJoin(room);
    } else {
      navigate(`/room/${room.id}`);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (!roomToJoin) return;

    navigate(`/room/${roomToJoin.id}`);

    setRoomToJoin(null);
  };

  return (
    <div className="min-h-screen w-full bg-[url('/bg-pattern.png')] bg-[#111] flex items-center justify-center p-4 no-select relative">

      <div className="mmo-panel w-[600px] p-1 shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
          <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
            Server Selection
          </span>
          <button className="mmo-btn px-2 py-0 text-xs text-gray-300">X</button>
        </div>

        {/* Room List */}
        <div className="mmo-inset p-2 h-80 overflow-y-auto mb-4 bg-[#0a0a0a]">
          <div className="flex flex-row text-xs text-gray-400 border-b border-gray-700 pb-1 mb-2 px-2">
            <div className="w-10 text-center">Lock</div>
            <div className="flex-1">Room Name</div>
            <div className="w-24 text-right">Capacity</div>
          </div>

          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {rooms.map((room) => {
              const isSelected = selectedRoomId === room.id;

              return (
                <li
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`flex flex-row items-center p-2 cursor-pointer border ${isSelected
                      ? 'bg-blue-900/50 border-blue-500'
                      : 'bg-transparent border-transparent hover:bg-gray-800'
                    }`}
                >
                  <div className="w-10 text-center text-sm">
                    {room.isPrivate ? '🔒' : ''}
                  </div>
                  <div className={`flex-1 text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {room.name}
                  </div>
                  <div className="w-24 text-right text-xs text-gray-400">
                    {room.currentUsers} / {room.maxUsers}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-2 pb-2">
          <button
            className="mmo-btn px-6 py-1 text-sm"
            onClick={() => setShowCreateModal(true)}
          >
            Create Room
          </button>
          <button
            className="mmo-btn px-6 py-1 text-sm"
            onClick={() => setShowUserModal(true)}
          >
            User
          </button>

          <div className="flex gap-2">
            <button className="mmo-btn px-6 py-1 text-sm text-gray-400 active:text-gray-400">
              Refresh
            </button>
            <button
              className={`mmo-btn px-8 py-1 text-sm font-bold ${!selectedRoomId ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleJoinClick}
              disabled={!selectedRoomId}
            >
              Connect
            </button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateRoomModal onClose={() => setShowCreateModal(false)} />
      )}

      {showUserModal && (
        <PlayerProfile onClose={() => setShowUserModal(false)} />
      )}

      {roomToJoin && (
        <JoinPasswordModal
          roomName={roomToJoin.name}
          onClose={() => setRoomToJoin(null)}
          onJoin={handlePasswordSubmit}
        />
      )}

    </div>
  );
}