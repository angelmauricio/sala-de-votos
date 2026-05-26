import { useRef, useState, useEffect } from 'react';
import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react';
import { useProfileStore } from '../store/profileStore';

interface PlayerProfileProps {
    onClose: () => void;
}

export function PlayerProfile({ onClose }: PlayerProfileProps) {
    const { profile, updateEmoji, updateName } = useProfileStore();
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        updateName(val);
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        updateEmoji(emojiData.emoji);
        setShowPicker(false);
    };

    return (
        <div className="mmo-panel w-full lg:w-[250px] p-1 shadow-[8px_8px_0_rgba(0,0,0,0.5)] h-fit relative">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
                <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                    Character Info
                </span>
                <button type="button" className="mmo-btn px-2 py-0 text-xs text-gray-300" onClick={onClose}>
                    X
                </button>
            </div>

            <div className="mmo-inset p-4 bg-[#0a0a0a] flex flex-col items-center gap-4">
                <div className="relative" ref={pickerRef}>
                    <button
                        type="button"
                        onClick={() => setShowPicker(!showPicker)}
                        className="w-16 h-16 bg-[#1a1a1a] border-2 border-[#333] flex items-center justify-center text-4xl shadow-inner cursor-pointer hover:border-blue-500 transition-colors"
                    >
                        {profile.emoji}
                    </button>

                    {showPicker && (
                        <div className="absolute top-full left-0 z-50 mt-2">
                            <EmojiPicker
                                onEmojiClick={handleEmojiClick}
                                theme={Theme.DARK}
                                lazyLoadEmojis={true}
                                searchDisabled={true}
                                skinTonesDisabled={true}
                            />
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-xs text-gray-400">Nickname</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={handleNameChange}
                        maxLength={16}
                        className="mmo-input p-1 text-sm w-full text-center font-bold text-yellow-400"
                    />
                </div>
            </div>
        </div>
    );
}