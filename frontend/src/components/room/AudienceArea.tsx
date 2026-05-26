import type { Option, PlayerState } from './types';

interface AudienceAreaProps {
  profile: { name: string; emoji: string };
  bots: Omit<PlayerState, 'vote'>[];
  bannedUsers: string[];
  votesInRound: { [username: string]: Option | null };
}

export function AudienceArea({
  profile,
  bots,
  bannedUsers,
  votesInRound
}: AudienceAreaProps) {
  const userVote = votesInRound[profile.name];

  return (
    <div className="mmo-panel p-1 shadow-[6px_6px_0_rgba(0,0,0,0.8)]">
      <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-900/50 p-2">
        <span className="text-indigo-400 font-bold text-xs tracking-wider">
          🎭 ASSENTOS DA PLATEIA (POLTRONAS DO TEATRO)
        </span>
      </div>

      <div className="mmo-inset p-4 bg-[#08090d] my-1 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-end relative overflow-visible">
        
        {/* YOU (USER SEAT) */}
        <div className="flex flex-col items-center justify-center relative group">
          
          {/* Speech balloon popup on top */}
          {userVote && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold px-3 py-1.5 border-2 border-black rounded-md shadow-[4px_4px_0_rgba(0,0,0,0.45)] z-30 flex items-center gap-1.5 whitespace-nowrap animate-bounce max-w-[140px] overflow-hidden">
              <span className="text-md">{userVote.emoji}</span>
              <span className="truncate">{userVote.text}!</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-0 h-0 -mt-[1.5px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white" />
            </div>
          )}

          {/* Seat container representation */}
          <div className="w-16 h-16 rounded-md bg-slate-900 border-2 border-yellow-500 flex items-center justify-center text-4xl shadow-inner relative z-10 hover:scale-105 transition-transform duration-200">
            {profile.emoji}
          </div>

          {/* Theater chair backrest design */}
          <div className="w-20 h-3 bg-red-700 border-x-2 border-t-2 border-black rounded-b -mt-1 shadow-md" />
          
          <div className="text-center mt-2">
            <span className="text-xs font-extrabold text-yellow-400 block tracking-wide truncate max-w-[124px]">
              {profile.name}
            </span>
            <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider block">
              ✓ Vociferador (Você)
            </span>
          </div>
        </div>

        {/* SIMULATED BOT ATTENDEES */}
        {[
          { name: 'Angel', emoji: '🦊', defaultRole: 'Votador Rápido' },
          { name: 'Mari', emoji: '🦉', defaultRole: 'Anunciante Isenta' },
          { name: 'Pedro', emoji: '🐸', defaultRole: 'Sempre Vota' },
        ].map((bot, index) => {
          const isBanned = bannedUsers.includes(bot.name);
          const botVote = votesInRound[bot.name];

          return (
            <div 
              key={index}
              className={`flex flex-col items-center justify-center relative transition-all ${
                isBanned ? 'opacity-20 translate-y-2 grayscale pointer-events-none' : ''
              }`}
            >
              {/* Bot speech bubble popup */}
              {botVote && !isBanned && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold px-3 py-1.5 border-2 border-black rounded-md shadow-[4px_4px_0_rgba(0,0,0,0.45)] z-20 flex items-center gap-1.5 whitespace-nowrap animate-bounce max-w-[140px] overflow-hidden">
                  <span className="text-md">{botVote.emoji}</span>
                  <span className="truncate">{botVote.text}!</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-0 h-0 -mt-[1.5px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white" />
                </div>
              )}

              {/* Bot Avatar Shield */}
              <div className="w-16 h-16 rounded-md bg-slate-950 border-2 border-gray-700 flex items-center justify-center text-4xl shadow-inner relative z-10 hover:border-indigo-400 transition-colors">
                {isBanned ? '💀' : bot.emoji}
              </div>

              {/* Red velvet movie seat visual */}
              <div className="w-20 h-3 bg-red-800 border-x-2 border-t-2 border-black rounded-b -mt-1 shadow-md" />

              <div className="text-center mt-2">
                <span className="text-xs font-bold text-gray-300 block truncate max-w-[124px]">{bot.name}</span>
                <span className="text-[9px] text-gray-400 uppercase font-mono tracking-wider">
                  {isBanned ? 'EXPULSO' : bot.defaultRole}
                </span>
              </div>

              {isBanned && (
                <span className="absolute text-[10px] text-red-500 font-extrabold rotate-12 bg-black/80 border border-red-500/50 px-1 border-dotted tracking-widest z-20">
                  BANIDO
                </span>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
