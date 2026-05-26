import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PlayerProfile } from '../PlayerProfile';


export interface ChatMessage {
    id: string;
    author: string;
    text: string;
    isSystem?: boolean;
}

interface ChatWindowProps {
    // chat: ChatMessage[];
    // chatInput: string;
}


const mockChat: ChatMessage[] = [
    { id: '1', author: 'System', text: 'Welcome to the room!', isSystem: true },
    { id: '2', author: 'Angel', text: 'Hello everyone' },
];

export function ChatWindow({ }: ChatWindowProps) {
    const [chat, setChat] = useState<ChatMessage[]>(mockChat);
    const [chatInput, setChatInput] = useState<string>('');
    const [showUserModal, setShowUserModal] = useState(false);

    // handle chat submission
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        // emit chat message
        setChatInput('');
    };

    return (
        <>
            <div className="w-80 h-full mmo-panel p-1 shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex flex-col flex-none">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-950 p-2 mb-2 flex justify-between items-center">
                    <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                        Room Chat
                    </span>
                    <button onClick={() => setShowUserModal(true)} className="mmo-btn px-4 py-0 text-xs text-red-400 hover:text-red-300">
                        Profile
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="mmo-inset p-2 bg-[#0a0a0a] flex-1 overflow-y-auto mb-2 flex flex-col gap-1">
                    {chat.map((msg) => (
                        <div key={msg.id} className="text-sm leading-tight break-words">
                            {msg.isSystem ? (
                                <span className="text-yellow-500 font-bold">[{msg.author}] {msg.text}</span>
                            ) : (
                                <>
                                    <span className="text-blue-400 font-bold">{msg.author}: </span>
                                    <span className="text-gray-300">{msg.text}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        maxLength={100}
                        placeholder="Say something..."
                        className="mmo-input p-2 text-sm flex-1"
                    />
                    <button type="submit" className="mmo-btn px-4 text-sm font-bold text-gray-300">
                        Send
                    </button>
                </form>
            </div>

            {showUserModal && (
                <PlayerProfile onClose={() => setShowUserModal(false)} />
            )}
        </>
    );
}