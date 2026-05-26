import { useState } from 'react';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../../utils/profile';
import { VotingProfile } from './VotingProfile';

const mockPlayers: Profile[] = [
    { id: '1', name: 'Angel', emoji: '🦊' },
    { id: '2', name: 'PlayerTwo', emoji: '🐸' },
    { id: '3', name: 'NoobMaster', emoji: '🦉' }
];


export function AudienceWindow() {
    const navigate = useNavigate();
    const {profile} = useProfileStore();

    const [players, setPlayers] = useState<Profile[]>([profile, ...mockPlayers]);

    return (
        <div className="mmo-panel flex-1 p-1 shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex flex-col min-h-0">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
                <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                    Audience ({players.length}/8)
                </span>
                <button onClick={() => navigate('/')} className="mmo-btn px-4 py-0 text-xs text-red-400 hover:text-red-300">
                    Leave Room
                </button>
            </div>

            <div className="mmo-inset p-6 bg-[#0a0a0a] flex-1 overflow-y-auto flex flex-wrap content-start justify-center gap-8">
                {players.map((player) => (
                    <VotingProfile key={player.id} {...player} />
                ))}
            </div>
        </div>
    );
};;
