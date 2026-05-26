import { useState } from 'react';

interface CreateRoomModalProps {
  onClose: () => void;
}

export function CreateRoomModal({ onClose }: CreateRoomModalProps) {
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomCapacity, setNewRoomCapacity] = useState(8);
    const [isPrivate, setIsPrivate] = useState(false);
    const [roomPassword, setRoomPassword] = useState('');

    const handleCreateRoom = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: emit socket event to create room
        console.log('Creating room:', { newRoomName, newRoomCapacity, isPrivate, roomPassword });

        // Reset modal states
        setNewRoomName('');
        setIsPrivate(false);
        setRoomPassword('');
    };

    return <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="mmo-panel w-[350px] p-1 shadow-[8px_8px_0_rgba(0,0,0,0.8)]">

            <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
                <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                    Create New Room
                </span>
                <button
                    className="mmo-btn px-2 py-0 text-xs text-gray-300"
                    onClick={onClose}
                >
                    X
                </button>
            </div>

            <form onSubmit={handleCreateRoom}>
                <div className="mmo-inset p-4 mb-4 bg-[#0a0a0a] flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400">Room Name</label>
                        <input
                            type="text"
                            required
                            maxLength={25}
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="mmo-input p-1 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400">Capacity</label>
                        <select
                            value={newRoomCapacity}
                            onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
                            className="mmo-input p-1 text-sm"
                        >
                            <option value={4}>4 Players</option>
                            <option value={8}>8 Players</option>
                            <option value={16}>16 Players</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            id="isPrivate"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="cursor-pointer"
                        />
                        <label htmlFor="isPrivate" className="text-xs text-gray-400 cursor-pointer">
                            Private Room
                        </label>
                    </div>

                    {isPrivate && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400">Password</label>
                            <input
                                type="password"
                                required={isPrivate}
                                maxLength={16}
                                value={roomPassword}
                                onChange={(e) => setRoomPassword(e.target.value)}
                                className="mmo-input p-1 text-sm"
                            />
                        </div>
                    )}
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
                        Confirm
                    </button>
                </div>
            </form>

        </div>
    </div>
}