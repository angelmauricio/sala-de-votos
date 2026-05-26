import type { Option } from './types';

interface VotingStageProps {
  activeQuestion: string;
  options: { text: string; emoji: string; votes: number }[];
  userVoted: boolean;
  votedOptionIndex: number | null;
  timerSeconds: number | null;
  totalVotesCount: number;
  onCastVote: (index: number) => void;
}

export function VotingStage({
  activeQuestion,
  options,
  userVoted,
  votedOptionIndex,
  timerSeconds,
  totalVotesCount,
  onCastVote
}: VotingStageProps) {
  return (
    <div className="mmo-panel p-1 flex-1 flex flex-col shadow-[6px_6px_0_rgba(0,0,0,0.8)] relative">
      <div className="bg-gradient-to-r from-yellow-700/60 to-amber-900/60 border border-yellow-950 p-2 flex justify-between items-center">
        <span className="text-yellow-400 font-bold text-xs tracking-wider">
          🗳️ CONTROLE DE VOTAÇÃO CORRENTE
        </span>
        <div className="flex items-center gap-3">
          {timerSeconds !== null && (
            <span className="text-xs text-red-400 font-bold font-mono animate-pulse">
              Próximo sorteio em: {timerSeconds}s
            </span>
          )}
          <span className="text-xs text-amber-200/80 font-mono">
            Votos Totais: {totalVotesCount}
          </span>
        </div>
      </div>

      {/* Stage screen display */}
      <div className="mmo-inset p-4 bg-slate-950/90 my-1 flex-1 flex flex-col justify-center items-center text-center gap-4">
        <div className="w-full max-w-xl">
          <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block mb-1">
            Tema da Votação
          </span>
          <h2 className="text-lg text-white font-extrabold lg:text-xl drop-shadow-md mb-4 bg-slate-900/50 py-2 border-y border-dashed border-amber-500/30">
            {activeQuestion}
          </h2>

          {/* Always exactly two options side-by-side or styled stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, idx) => {
              const percentage = totalVotesCount > 0 
                ? Math.round((option.votes / totalVotesCount) * 100) 
                : 0;
              
              const isWinner = totalVotesCount > 0 && options[idx].votes === Math.max(...options.map(o => o.votes));
              const isSelected = votedOptionIndex === idx;

              return (
                <div 
                  key={idx} 
                  className={`mmo-inset p-3 bg-[#0a0c10] border-2 flex flex-col gap-2 transition-all ${
                    isSelected ? 'border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'border-gray-800'
                  }`}
                >
                  {/* Option Details */}
                  <div className="flex items-center justify-between text-xs font-bold text-left">
                    <span className="text-white flex items-center gap-1">
                      <span className="text-lg">{option.emoji}</span> {option.text}
                    </span>
                    <span className="text-yellow-500 font-mono">
                      {option.votes} {option.votes === 1 ? 'Voto' : 'Votos'} ({percentage}%)
                    </span>
                  </div>

                  {/* Gold progress meter */}
                  <div className="h-3 bg-black border border-gray-800 p-[1px] w-full">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Interactive vote button */}
                  <button
                    type="button"
                    onClick={() => onCastVote(idx)}
                    disabled={userVoted}
                    className={`mmo-btn py-1 text-xs font-bold font-mono uppercase ${
                      userVoted 
                        ? (isSelected ? 'text-green-400 border-green-700' : 'opacity-40') 
                        : 'text-amber-400 hover:text-white border-amber-900 hover:border-amber-400'
                    }`}
                  >
                    {isSelected ? '🛡️ Confirmado' : userVoted ? 'Concluído' : 'Escolher Opção'}
                  </button>

                  {isWinner && totalVotesCount > 0 && (
                    <div className="text-[9px] text-green-400 text-center font-mono tracking-widest animate-pulse mt-0.5">
                      ★ VENCEDOR PARCIAL
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {userVoted && (
            <p className="text-[10px] text-amber-500 font-mono tracking-wide mt-4">
              ✓ Seu selo foi computado na urna. Aguarde a finalização dos companheiros ou inicie outra rodada à direita!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
