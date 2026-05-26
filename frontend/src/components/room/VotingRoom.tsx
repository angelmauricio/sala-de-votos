import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../store/profileStore';
import { soundEffects } from '../../utils/audio';
import EmojiPicker from 'emoji-picker-react';

import type { Option, OptionPair, ChatMessage, PlayerState } from './types';
import { VotingStage } from './VotingStage';
import { AudienceArea } from './AudienceArea';
import { ChatArea } from './ChatArea';
import { UrnaConfigArea } from './UrnaConfigArea';

const DEFAULT_CLOSED_PAIRS: OptionPair[] = [
  { id: '1', a: { text: "Gato", emoji: "🐱" }, b: { text: "Cachorro", emoji: "🐶" } },
  { id: '2', a: { text: "Calor", emoji: "☀️" }, b: { text: "Frio", emoji: "❄️" } },
  { id: '3', a: { text: "Biscoito", emoji: "🍪" }, b: { text: "Bolacha", emoji: "🥯" } },
  { id: '4', a: { text: "Pizza", emoji: "🍕" }, b: { text: "Hambúrguer", emoji: "🍔" } },
  { id: '5', a: { text: "Sorvete", emoji: "🍦" }, b: { text: "Açaí", emoji: "🍇" } },
];

const DEFAULT_SINGLE_ITEMS: Option[] = [
  { text: "Gato", emoji: "🐱" },
  { text: "Cachorro", emoji: "🐶" },
  { text: "Pássaro", emoji: "🐦" },
  { text: "Peixe", emoji: "🐟" },
  { text: "Pizza", emoji: "🍕" },
  { text: "Sorvete", emoji: "🍦" },
  { text: "Café", emoji: "☕" },
  { text: "Chá", emoji: "🍵" },
  { text: "Livro", emoji: "📚" },
  { text: "Videogame", emoji: "🎮" },
  { text: "Leão", emoji: "🦁" },
  { text: "Urso", emoji: "🐻" },
];

const BOT_RESPONSES = [
  "gostei dessa!",
  "concordo plenamente kkkk",
  "estou em dúvida...",
  "gato sempre!",
  "isso é muito óbvio né",
  "pensei que seria mais equilibrado",
  "quem votaria no outro lado?? 😂",
  "vamos ver o que a maioria escolhe",
  "LAG aqui no chat ou impressão minha?",
  "boba essa votação kkk",
  "fui no primeiro, f**ase",
];

export function VotingRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { profile, crtEnabled, updateEmoji, updateName } = useProfileStore();

  // Active voting mode state
  const [isClosedMode, setIsClosedMode] = useState(true); // true = Opções Fechadas, false = Votação Aberta
  const [autoVoteCycle, setAutoVoteCycle] = useState(true); // automatic loop active

  // Pool management states
  const [closedPairs, setClosedPairs] = useState<OptionPair[]>(DEFAULT_CLOSED_PAIRS);
  const [singleItems, setSingleItems] = useState<Option[]>(DEFAULT_SINGLE_ITEMS);

  // New Items Creators input state
  const [newPairA_Text, setNewPairA_Text] = useState('');
  const [newPairA_Emoji, setNewPairA_Emoji] = useState('🍎');
  const [newPairB_Text, setNewPairB_Text] = useState('');
  const [newPairB_Emoji, setNewPairB_Emoji] = useState('🍊');

  const [newItemText, setNewItemText] = useState('');
  const [newItemEmoji, setNewItemEmoji] = useState('🍉');

  // Interactive Emoji Picker state target
  const [emojiPickerTarget, setEmojiPickerTarget] = useState<'profile' | 'pairA' | 'pairB' | 'singleItem' | null>(null);

  // Active Poll State (Always 2 options, with emojis!)
  const [activeQuestion, setActiveQuestion] = useState<string>("Melhor escolha de mascote?");
  const [options, setOptions] = useState<{ text: string; emoji: string; votes: number }[]>([
    { text: "Gato", emoji: "🐱", votes: 0 },
    { text: "Cachorro", emoji: "🐶", votes: 0 }
  ]);
  const [userVoted, setUserVoted] = useState(false);
  const [votedOptionIndex, setVotedOptionIndex] = useState<number | null>(null);

  // Auto Timer / Countdown for next vote
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);

  // Chat Log State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'Sistema',
      emoji: '📺',
      text: `Sessão Iniciada no Teatro [${roomId || 'Principal'}]. Escolhas saudáveis e democráticas te aguardam!`,
      timestamp: '00:00',
      isSystem: true
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // List of banned companion names
  const [bannedUsers, setBannedUsers] = useState<string[]>(['SpamMaster', 'TrollSafado']);
  const [banInputName, setBanInputName] = useState('');

  // Sidebar Controls Active Tab
  const [activeBottomTab, setActiveBottomTab] = useState<string>('profile');

  // Theater Attendees (Bots)
  const bots = [
    { id: 'bot-1', name: 'Angel', emoji: '🦊', role: 'Debatedor Ativo' },
    { id: 'bot-2', name: 'Mari', emoji: '🦉', role: 'Crítica Geral' },
    { id: 'bot-3', name: 'Pedro', emoji: '🐸', role: 'Votador Silencioso' }
  ];

  // Votes corresponding to this round (Speech bubbles text)
  const [votesInRound, setVotesInRound] = useState<{ [username: string]: Option | null }>({});

  // Handle auto countdown for the next round
  useEffect(() => {
    if (timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setTimerSeconds(null);
      triggerNewRandomPoll();
      return;
    }

    const timer = setTimeout(() => {
      setTimerSeconds(timerSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerSeconds]);

  // Periodic simulated Bot chat/vibe
  useEffect(() => {
    const chatInterval = setInterval(() => {
      if (Math.random() > 0.65) {
        // Pick an active bot in theater
        const activeBots = bots.filter(b => !bannedUsers.includes(b.name));
        if (activeBots.length === 0) return;

        const randomBot = activeBots[Math.floor(Math.random() * activeBots.length)];
        const botResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];

        soundEffects.playSelect();

        setChatMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: randomBot.name,
            emoji: randomBot.emoji,
            text: botResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }
        ]);
      }
    }, 6000);

    return () => clearInterval(chatInterval);
  }, [bannedUsers]);

  // Limit chat messages to latest 25 to prevent infinite stretching
  useEffect(() => {
    if (chatMessages.length > 25) {
      setChatMessages(chatMessages.slice(-25));
    }
  }, [chatMessages.length]);

  // Trigger bot voting cascade once a new poll arrives
  const startBotVotingCascade = (opt1: Option, opt2: Option) => {
    // Clear bubbles
    setVotesInRound({});
    setUserVoted(false);
    setVotedOptionIndex(null);

    // Active bots
    const activeBots = bots.filter(b => !bannedUsers.includes(b.name));
    
    activeBots.forEach((bot, index) => {
      const delay = (index + 1) * 2000 + Math.random() * 1000;
      setTimeout(() => {
        setVotesInRound(prev => {
          // If already in next cycle or deleted, skip
          const chosenIndex = Math.random() > 0.5 ? 0 : 1;
          const chosenOption = chosenIndex === 0 ? opt1 : opt2;

          // Increment actual state votes
          setOptions(o => o.map((v, i) => i === chosenIndex ? { ...v, votes: v.votes + 1 } : v));

          // Post bot vote in chat
          setChatMessages(c => [
            ...c,
            {
              id: Math.random().toString(),
              sender: bot.name,
              emoji: bot.emoji,
              text: `Escolheu "${chosenOption.emoji} ${chosenOption.text}"!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);

          soundEffects.playTick();

          return {
            ...prev,
            [bot.name]: chosenOption
          };
        });
      }, delay);
    });
  };

  // Helper to start a new poll of exactly 2 options with emojis
  const triggerNewRandomPoll = () => {
    soundEffects.playLevelUp || soundEffects.playCoin();
    
    let opt1: Option;
    let opt2: Option;
    let question = "Qual prefere?";

    if (isClosedMode) {
      if (closedPairs.length === 0) {
        opt1 = { text: "Sim", emoji: "👍" };
        opt2 = { text: "Não", emoji: "👎" };
      } else {
        const randomPair = closedPairs[Math.floor(Math.random() * closedPairs.length)];
        opt1 = randomPair.a;
        opt2 = randomPair.b;
        question = `Votação Fechada: Escolha entre ${opt1.text} ou ${opt2.text}!`;
      }
    } else {
      if (singleItems.length < 2) {
        opt1 = { text: "Opção A", emoji: "🅰️" };
        opt2 = { text: "Opção B", emoji: "🅱️" };
      } else {
        const idx1 = Math.floor(Math.random() * singleItems.length);
        let idx2 = Math.floor(Math.random() * singleItems.length);
        while (idx2 === idx1) {
          idx2 = Math.floor(Math.random() * singleItems.length);
        }
        opt1 = singleItems[idx1];
        opt2 = singleItems[idx2];
        question = `Guerra de Opções: ${opt1.emoji} ${opt1.text} VS ${opt2.emoji} ${opt2.text}?`;
      }
    }

    setActiveQuestion(question);
    setOptions([
      { text: opt1.text, emoji: opt1.emoji, votes: 0 },
      { text: opt2.text, emoji: opt2.emoji, votes: 0 }
    ]);

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Sistema',
        emoji: '🗳️',
        text: `RODADA ATIVA NO TEATRO: "${question}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);

    startBotVotingCascade(opt1, opt2);
  };

  // Run initial vote on load
  useEffect(() => {
    triggerNewRandomPoll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCastUserVote = (index: number) => {
    if (userVoted) return;
    soundEffects.playCoin();

    const clickedOpt = options[index];
    setVotesInRound(prev => ({
      ...prev,
      [profile.name]: { text: clickedOpt.text, emoji: clickedOpt.emoji }
    }));

    setOptions(o => o.map((v, i) => i === index ? { ...v, votes: v.votes + 1 } : v));
    setUserVoted(true);
    setVotedOptionIndex(index);

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: profile.name,
        emoji: profile.emoji,
        text: `Votou em "${clickedOpt.emoji} ${clickedOpt.text}"! 🗳️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    if (autoVoteCycle) {
      setTimerSeconds(10);
    }
  };

  const handleSendLiveChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    soundEffects.playClick || soundEffects.playTick();

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: profile.name,
        emoji: profile.emoji,
        text: chatInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }
    ]);

    const lowercaseText = chatInput.toLowerCase();
    if (lowercaseText.includes('voto 1') || lowercaseText.includes('voto a') || lowercaseText.includes(options[0].text.toLowerCase())) {
      handleCastUserVote(0);
    } else if (lowercaseText.includes('voto 2') || lowercaseText.includes('voto b') || lowercaseText.includes(options[1].text.toLowerCase())) {
      handleCastUserVote(1);
    }

    setChatInput('');
  };

  // BAN management
  const handleBanUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = banInputName.trim();
    if (!target) return;

    if (bannedUsers.includes(target)) {
      setBanInputName('');
      return;
    }

    soundEffects.playBeep();
    setBannedUsers(prev => [...prev, target]);
    
    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Teatro',
        emoji: '🚫',
        text: `🚨 AVISO DE EXPULSÃO: O usuário "${target}" violou as regras e foi banido da plateia!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true,
        isRedAlert: true
      }
    ]);

    setBanInputName('');
  };

  const handleUnbanUser = (name: string) => {
    soundEffects.playClick || soundEffects.playTick();
    setBannedUsers(prev => prev.filter(u => u !== name));

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Teatro',
        emoji: '💚',
        text: `O banimento de "${name}" foi revogado. Ele pode voltar à plateia na próxima sessão.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
  };

  // Import / Export Urna
  const handleExportUrna = () => {
    soundEffects.playLevelUp();
    const config = {
      isClosedMode,
      autoVoteCycle,
      closedPairs,
      singleItems,
      activeQuestion,
      options
    };
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urna-votacao-${roomId || 'sala'}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Urna',
        emoji: '📤',
        text: 'Configurações da urna exportadas com sucesso!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
  };

  const handleImportUrna = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          soundEffects.playCoin();

          if (Array.isArray(parsed.closedPairs)) {
            setClosedPairs(parsed.closedPairs);
          }
          if (Array.isArray(parsed.singleItems)) {
            setSingleItems(parsed.singleItems);
          }
          if (typeof parsed.isClosedMode === 'boolean') {
            setIsClosedMode(parsed.isClosedMode);
          }
          if (typeof parsed.autoVoteCycle === 'boolean') {
            setAutoVoteCycle(parsed.autoVoteCycle);
          }
          if (typeof parsed.activeQuestion === 'string') {
            setActiveQuestion(parsed.activeQuestion);
          }
          if (Array.isArray(parsed.options) && parsed.options.length === 2) {
            setOptions(parsed.options);
          }

          setChatMessages(prev => [
            ...prev,
            {
              id: Math.random().toString(),
              sender: 'Urna',
              emoji: '📥',
              text: `Urna de votação importada com sucesso (${parsed.closedPairs?.length || 0} pares, ${parsed.singleItems?.length || 0} itens livremente disponíveis)!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSystem: true
            }
          ]);
        } else {
          throw new Error('Formato inválido');
        }
      } catch (err) {
        soundEffects.playBeep();
        alert('Erro ao importar arquivo JSON: Certifique-se de que é um arquivo de configuração válido da urna.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Adding Custom Options
  const handleAddClosedPair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPairA_Text.trim() || !newPairB_Text.trim()) return;

    soundEffects.playLevelUp();
    const newPair: OptionPair = {
      id: Math.random().toString(),
      a: { text: newPairA_Text.trim(), emoji: newPairA_Emoji },
      b: { text: newPairB_Text.trim(), emoji: newPairB_Emoji }
    };

    setClosedPairs(prev => [...prev, newPair]);
    setNewPairA_Text('');
    setNewPairB_Text('');

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Urna',
        emoji: '⚙️',
        text: `Novo debate cadastrado: "${newPair.a.emoji} ${newPair.a.text}" x "${newPair.b.emoji} ${newPair.b.text}"!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
  };

  const handleAddSingleItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    soundEffects.playLevelUp();
    const newItem: Option = {
      text: newItemText.trim(),
      emoji: newItemEmoji
    };

    setSingleItems(prev => [...prev, newItem]);
    setNewItemText('');

    setChatMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'Urna',
        emoji: '⚙️',
        text: `Adicionado "${newItem.emoji} ${newItem.text}" à piscina de opções livres!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: true
      }
    ]);
  };

  const handleDeleteClosedPair = (id: string) => {
    soundEffects.playBeep();
    setClosedPairs(prev => prev.filter(p => p.id !== id));
  };

  const handleDeleteSingleItem = (index: number) => {
    soundEffects.playBeep();
    setSingleItems(prev => prev.filter((_, i) => i !== index));
  };

  const totalVotesCount = options.reduce((sum, current) => sum + current.votes, 0);

  return (
    <div className={`min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black p-4 text-gray-200 font-sans selection:bg-amber-500 selection:text-black flex flex-col items-center justify-center ${crtEnabled ? 'crt-screen' : ''}`}>
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUNA ESQUERDA: PALCO DO TEATRO DE VOTAÇÃO COMPONENTIZADO (8 colunas) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* HEADER DA SALA */}
          <div className="mmo-panel p-3 flex justify-between items-center shadow-[4px_4px_0_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <div>
                <h1 className="text-amber-400 font-bold text-sm tracking-widest font-mono uppercase">
                  TEATRO DE DECISÕES: {roomId || 'SALA_VOTACAO'}
                </h1>
                <p className="text-[10px] text-gray-400 uppercase leading-none mt-1">
                  Sessão ativa • Modo {isClosedMode ? 'Opções Fechadas' : 'Votação Aberta'} • {autoVoteCycle ? 'Loop Automático Ativado' : 'Gatilho Manual'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playSelect();
                  triggerNewRandomPoll();
                }}
                className="mmo-btn px-4 py-1 text-xs text-yellow-400 border-yellow-800 hover:text-white"
              >
                ⚡ Sortear Próxima Urna
              </button>
              <button 
                type="button" 
                onClick={() => {
                  soundEffects.playBeep();
                  navigate('/');
                }} 
                className="mmo-btn px-4 py-1 text-xs text-red-400 border-red-950 hover:bg-red-950/20"
              >
                Sair do Teatro
              </button>
            </div>
          </div>

          {/* PARTE SUPERIOR DO PALCO (VOTING STAGE MODULE) */}
          <VotingStage
            activeQuestion={activeQuestion}
            options={options}
            userVoted={userVoted}
            votedOptionIndex={votedOptionIndex}
            timerSeconds={timerSeconds}
            totalVotesCount={totalVotesCount}
            onCastVote={handleCastUserVote}
          />

          {/* PARTE INFERIOR DO PALCO (AUDIENCE AREA MODULE) */}
          <AudienceArea
            profile={profile}
            bots={bots}
            bannedUsers={bannedUsers}
            votesInRound={votesInRound}
          />
        </div>

        {/* COLUNA DIREITA: CONSOLE DE CHAT E TENDAS AUXILIARES COMPONENTIZADO (4 colunas) */}
        <div className="lg:col-span-4 flex flex-col gap-6 items-stretch">
          
          {/* CONSOLE DE CHAT MODULE */}
          <ChatArea
            chatMessages={chatMessages}
            chatInput={chatInput}
            onInputChange={setChatInput}
            onSubmitMessage={handleSendLiveChat}
          />

          {/* PAINEL TÁTICO INFERIOR DETALHADO (CONFIG PANEL MODULE) */}
          <UrnaConfigArea
            profile={profile}
            activeBottomTab={activeBottomTab}
            setActiveBottomTab={setActiveBottomTab}
            updateName={updateName}
            updateEmoji={updateEmoji}
            setEmojiPickerTarget={setEmojiPickerTarget}
            
            bannedUsers={bannedUsers}
            banInputName={banInputName}
            setBanInputName={setBanInputName}
            handleAddBannedUser={handleBanUserSubmit}
            handleRemoveBannedUser={handleUnbanUser}
            
            isClosedMode={isClosedMode}
            setIsClosedMode={setIsClosedMode}
            autoVoteCycle={autoVoteCycle}
            setAutoVoteCycle={setAutoVoteCycle}
            closedPairs={closedPairs}
            singleItems={singleItems}
            handleExportUrna={handleExportUrna}
            handleImportUrna={handleImportUrna}
            
            newPairA_Text={newPairA_Text}
            setNewPairA_Text={setNewPairA_Text}
            newPairA_Emoji={newPairA_Emoji}
            setNewPairA_Emoji={setNewPairA_Emoji}
            newPairB_Text={newPairB_Text}
            setNewPairB_Text={setNewPairB_Text}
            newPairB_Emoji={newPairB_Emoji}
            setNewPairB_Emoji={setNewPairB_Emoji}
            handleAddClosedPair={handleAddClosedPair}
            handleDeleteClosedPair={handleDeleteClosedPair}
            
            newItemText={newItemText}
            setNewItemText={setNewItemText}
            newItemEmoji={newItemEmoji}
            setNewItemEmoji={setNewItemEmoji}
            handleAddSingleItem={handleAddSingleItem}
            handleDeleteSingleItem={handleDeleteSingleItem}
          />

        </div>

      </div>

      {/* Deluxe Universal Emoji Picker overlay modal */}
      {emojiPickerTarget && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="mmo-panel p-1 w-full max-w-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)] border-amber-600/50">
            <div className="bg-gradient-to-r from-amber-950 to-amber-900 border border-amber-900/50 p-2.5 flex justify-between items-center">
              <span className="text-white font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-1.5">
                😊 SELECIONAR EMOJI COMPLETO
              </span>
              <button
                type="button"
                className="mmo-btn px-2 py-0.5 text-xs font-bold text-gray-300 hover:text-white"
                onClick={() => {
                  soundEffects.playBeep();
                  setEmojiPickerTarget(null);
                }}
              >
                X
              </button>
            </div>
            
            <div className="mmo-inset bg-[#040508] p-3 flex flex-col items-center justify-center gap-3">
              <div className="w-full h-[330px] overflow-hidden rounded relative">
                <EmojiPicker
                  key={emojiPickerTarget}
                  theme="dark"
                  lazyLoadEmojis={true}
                  skinTonesDisabled={true}
                  width="100%"
                  height="330px"
                  onEmojiClick={(emojiData) => {
                    soundEffects.playCoin();
                    const chosenEmoji = emojiData.emoji;
                    if (emojiPickerTarget === 'profile') {
                      updateEmoji(chosenEmoji);
                    } else if (emojiPickerTarget === 'pairA') {
                      setNewPairA_Emoji(chosenEmoji);
                    } else if (emojiPickerTarget === 'pairB') {
                      setNewPairB_Emoji(chosenEmoji);
                    } else if (emojiPickerTarget === 'singleItem') {
                      setNewItemEmoji(chosenEmoji);
                    }
                    setEmojiPickerTarget(null);
                  }}
                />
              </div>
              <p className="text-[8px] text-gray-500 text-center uppercase font-mono leading-tight">
                Cole ou selecione qualquer emoji • Clique no 'X' para cancelar
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
