import React from 'react';
import type { Option, OptionPair } from './types';
import { soundEffects } from '../../utils/audio';

const BOTTOM_TABS = {
  PERFIL: 'profile',
  BANIDOS: 'banned',
  URNA: 'urna'
};

interface UrnaConfigAreaProps {
  profile: { name: string; emoji: string };
  activeBottomTab: string;
  setActiveBottomTab: (tab: string) => void;
  updateName: (name: string) => void;
  updateEmoji: (emoji: string) => void;
  setEmojiPickerTarget: (target: 'profile' | 'pairA' | 'pairB' | 'singleItem' | null) => void;
  
  bannedUsers: string[];
  banInputName: string;
  setBanInputName: (val: string) => void;
  handleAddBannedUser: (e: React.FormEvent) => void;
  handleRemoveBannedUser: (name: string) => void;
  
  isClosedMode: boolean;
  setIsClosedMode: (val: boolean) => void;
  autoVoteCycle: boolean;
  setAutoVoteCycle: (val: boolean) => void;
  closedPairs: OptionPair[];
  singleItems: Option[];
  handleExportUrna: () => void;
  handleImportUrna: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  newPairA_Text: string;
  setNewPairA_Text: (val: string) => void;
  newPairA_Emoji: string;
  setNewPairA_Emoji: (val: string) => void;
  newPairB_Text: string;
  setNewPairB_Text: (val: string) => void;
  newPairB_Emoji: string;
  setNewPairB_Emoji: (val: string) => void;
  handleAddClosedPair: (e: React.FormEvent) => void;
  handleDeleteClosedPair: (id: string) => void;
  
  newItemText: string;
  setNewItemText: (val: string) => void;
  newItemEmoji: string;
  setNewItemEmoji: (val: string) => void;
  handleAddSingleItem: (e: React.FormEvent) => void;
  handleDeleteSingleItem: (index: number) => void;
}

export function UrnaConfigArea({
  profile,
  activeBottomTab,
  setActiveBottomTab,
  updateName,
  updateEmoji,
  setEmojiPickerTarget,
  
  bannedUsers,
  banInputName,
  setBanInputName,
  handleAddBannedUser,
  handleRemoveBannedUser,
  
  isClosedMode,
  setIsClosedMode,
  autoVoteCycle,
  setAutoVoteCycle,
  closedPairs,
  singleItems,
  handleExportUrna,
  handleImportUrna,
  
  newPairA_Text,
  setNewPairA_Text,
  newPairA_Emoji,
  setNewPairA_Emoji,
  newPairB_Text,
  setNewPairB_Text,
  newPairB_Emoji,
  setNewPairB_Emoji,
  handleAddClosedPair,
  handleDeleteClosedPair,
  
  newItemText,
  setNewItemText,
  newItemEmoji,
  setNewItemEmoji,
  handleAddSingleItem,
  handleDeleteSingleItem
}: UrnaConfigAreaProps) {
  return (
    <div className="flex flex-col border border-slate-900 bg-[#0d0f14] rounded overflow-hidden select-none">
      
      {/* Tab select headers */}
      <div className="flex border-b border-slate-900 bg-[#040508]">
        <button
          type="button"
          onClick={() => {
            soundEffects.playSelect();
            setActiveBottomTab(BOTTOM_TABS.PERFIL);
          }}
          className={`flex-1 py-2 text-[10px] font-extrabold uppercase font-mono tracking-wider transition-colors ${
            activeBottomTab === BOTTOM_TABS.PERFIL 
              ? 'bg-[#0d0f14] text-yellow-400 border-b-2 border-yellow-500' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          👤 Meu Rank
        </button>
        <button
          type="button"
          onClick={() => {
            soundEffects.playSelect();
            setActiveBottomTab(BOTTOM_TABS.BANIDOS);
          }}
          className={`flex-1 py-2 text-[10px] font-extrabold uppercase font-mono tracking-wider transition-colors ${
            activeBottomTab === BOTTOM_TABS.BANIDOS 
              ? 'bg-[#0d0f14] text-red-400 border-b-2 border-red-500' 
              : 'text-gray-500 hover:text-red-950/40'
          }`}
        >
          🛡️ Moderar ({bannedUsers.length})
        </button>
        <button
          type="button"
          onClick={() => {
            soundEffects.playSelect();
            setActiveBottomTab(BOTTOM_TABS.URNA);
          }}
          className={`flex-1 py-2 text-[10px] font-extrabold uppercase font-mono tracking-wider transition-colors ${
            activeBottomTab === BOTTOM_TABS.URNA 
              ? 'bg-[#0d0f14] text-amber-500 border-b-2 border-amber-600' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          ⚙️ Ajustar Urna
        </button>
      </div>

      {/* Tab views content */}
      <div className="p-3 text-xs text-gray-300 min-h-[360px] flex flex-col justify-between">
        
        {/* VIEW 1: PROFILE SETUP */}
        {activeBottomTab === BOTTOM_TABS.PERFIL && (
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-1.5 bg-black/30 p-2.5 rounded border border-slate-900">
              <span className="text-[9px] text-yellow-400 font-extrabold tracking-wider font-mono">
                ✓ SINALIZAÇÃO DO ORADOR NO COMBATE
              </span>
              
              <div className="flex gap-3 items-center mt-1">
                <span className="text-4xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pb-1">
                  {profile.emoji}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Identidade Atual:</span>
                  <span className="text-sm text-white font-extrabold tracking-wide uppercase">
                    {profile.name}
                  </span>
                </div>
              </div>

              {/* Nickname update input */}
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-[10px] text-gray-400 font-bold font-mono text-amber-500">
                  SEU NICKNAME:
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={profile.name}
                  onChange={(e) => updateName(e.target.value)}
                  className="mmo-input p-1.5 text-xs text-center tracking-wide"
                  placeholder="NICKNAME"
                />
              </div>

              {/* Custom emoji panel */}
              <div className="flex flex-col gap-1 mt-2 p-1.5 bg-black/50 border border-slate-900 rounded">
                <label className="text-[10px] text-gray-400 font-bold font-mono text-amber-400">
                  EMOJI PERSONALIZADO:
                </label>
                <div className="flex gap-2 items-center mt-1">
                  <input
                    type="text"
                    className="mmo-input p-1.5 text-center text-xl w-14 font-mono font-bold"
                    value={profile.emoji}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val) {
                        updateEmoji(val);
                      }
                    }}
                    maxLength={8}
                    placeholder="🐱"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playSelect();
                      setEmojiPickerTarget('profile');
                    }}
                    className="mmo-btn flex-1 py-1.5 text-xs font-bold text-yellow-400 hover:text-white border-yellow-800"
                  >
                    😊 Abrir Seletor Completo
                  </button>
                </div>
                <span className="text-[8px] text-gray-500 mt-1 uppercase font-mono leading-tight">
                  * DICA: VOCÊ PODE COLOCAR QUALQUER CARACTERE OU EMOJI DESCONHECIDO!
                </span>
              </div>
            </div>

            <div className="bg-amber-950/10 border border-amber-900/30 p-2 rounded text-[10px] text-amber-500 font-mono">
              ★ SEU RANKING DE ORADOR: <span className="text-yellow-400 font-extrabold text-xs">Voz Ativa do Povo</span>
              <p className="text-[9px] text-gray-400 mt-1 leading-normal font-sans">
                Suas propostas são enviadas diretamente ao chat democrático. Quanto mais rodadas você participa, maior o engajamento dos bots em acolher sua posição na urna!
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: MODERATION / BANISHED */}
        {activeBottomTab === BOTTOM_TABS.BANIDOS && (
          <div className="flex flex-col gap-3.5 flex-1">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-red-400 font-extrabold font-mono tracking-wider">
                🛡️ DESTITUIR E BANIR COMPANHEIROS
              </span>
              <p className="text-[8px] text-gray-400 leading-tight">
                Se algum debatedor ou robô simular pensamentos inapropriados, expulse-os para silenciá-los e impedi-los de registrar votos na mesa diretora!
              </p>
            </div>

            {/* Ban trigger input */}
            <form onSubmit={handleAddBannedUser} className="flex gap-1.5 items-center">
              <input
                type="text"
                required
                placeholder="Ex Nome: Angel"
                className="mmo-input p-1.5 text-xs flex-1 tracking-wider"
                value={banInputName}
                onChange={(e) => setBanInputName(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-950 hover:bg-red-800 text-red-200 border border-red-800 font-semibold px-3 py-1.5 text-xs font-mono rounded"
              >
                + Banir
              </button>
            </form>

            <div className="flex flex-col gap-1 flex-1">
              <span className="text-[9px] text-gray-400 font-mono">LISTA NEGRA VIGENTE ({bannedUsers.length}):</span>
              {bannedUsers.length === 0 ? (
                <div className="text-[10px] text-center text-gray-600 bg-black/10 p-4 border border-slate-900 border-dashed rounded font-mono uppercase">
                  Ninguém Banido Nesta Sessão
                </div>
              ) : (
                <div className="max-h-[140px] overflow-y-auto flex flex-col gap-1 bg-black/30 p-1 rounded border border-slate-900">
                  {bannedUsers.map((bUser) => (
                    <div key={bUser} className="flex justify-between items-center bg-black/40 border border-[#1f1010] p-1.5 rounded text-[11px]">
                      <span className="text-red-400 font-mono font-bold uppercase truncate max-w-[170px]">
                        💀 {bUser}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBannedUser(bUser)}
                        className="text-[9px] font-mono text-gray-400 hover:text-green-400 font-bold px-1"
                        title="Reabilitar voz política"
                      >
                        Perdoar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: URNA CONFIGURATIONS */}
        {activeBottomTab === BOTTOM_TABS.URNA && (
          <div className="flex flex-col gap-3 flex-1 overflow-x-hidden">
            
            {/* Modes selectors */}
            <div className="flex flex-col gap-2 p-2 bg-black/30 border border-slate-900 rounded">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-amber-500 font-extrabold uppercase font-mono">Modo de Votação:</span>
                <span className="text-[9px] text-gray-400 font-mono">Configuração Ativa</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playSelect();
                    setIsClosedMode(true);
                  }}
                  className={`py-1.5 text-[10px] font-bold tracking-wider rounded ${
                    isClosedMode 
                      ? 'bg-amber-950/20 border-2 border-amber-600 text-yellow-400' 
                      : 'bg-[#08090d] border border-slate-800 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  🔒 Pares Fechados
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playSelect();
                    setIsClosedMode(false);
                  }}
                  className={`py-1.5 text-[10px] font-bold tracking-wider rounded ${
                    !isClosedMode 
                      ? 'bg-amber-950/20 border-2 border-amber-600 text-yellow-400' 
                      : 'bg-[#08090d] border border-slate-800 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  🌐 Piscina Livre (Guerra)
                </button>
              </div>

              {/* Automatic poll transition toggle */}
              <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-slate-900/60">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white font-bold uppercase font-mono">Ciclo Contínuo de Rodadas:</span>
                  <span className="text-[8px] text-gray-500 leading-tight">Dispara novas disputas após segundos</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playLevelUp();
                    setAutoVoteCycle(!autoVoteCycle);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                    autoVoteCycle ? 'bg-green-950/20 border border-green-800 text-green-400' : 'bg-red-950/20 border border-red-800 text-red-400'
                  }`}
                >
                  {autoVoteCycle ? '✓ HABILITADO' : '✗ DESLIGADO'}
                </button>
              </div>
            </div>

            {/* EXPORT / IMPORT CONFIGURATIONS PANEL */}
            <div className="flex flex-col gap-1 p-2 bg-[#0d1017] border border-slate-900 rounded">
              <span className="text-[9px] text-indigo-400 font-extrabold tracking-wider font-mono">📂 CONFIGURAÇÕES DA URNA (.JSON)</span>
              <p className="text-[8px] text-gray-400 leading-tight">
                Baixe e suba configurações inteiras de debatores (ex: Pokémons, Futebol, etc.) para compartilhar ou usar depois.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={handleExportUrna}
                  className="mmo-btn py-1 text-[10px] font-bold text-teal-400 border-teal-900 hover:text-white hover:border-teal-500"
                >
                  📤 Exportar Urna
                </button>
                <label className="mmo-btn py-1 text-[10px] font-bold text-amber-400 border-amber-900 hover:text-white hover:border-amber-500 text-center cursor-pointer block">
                  📥 Importar Urna
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportUrna}
                  />
                </label>
              </div>
            </div>

            {/* Dynamic pool forms */}
            {isClosedMode ? (
              <div className="flex flex-col gap-2 mt-1 border-t border-slate-900 pt-2">
                <span className="text-[9px] text-amber-500 font-bold uppercase font-mono">1. Cadastrar Novo Par</span>
                
                <form onSubmit={handleAddClosedPair} className="flex flex-col gap-2 bg-black/40 p-2 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Option A info */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] text-gray-400 uppercase font-bold">Texto A</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Gato" 
                        className="mmo-input p-1 text-[10px]"
                        value={newPairA_Text}
                        onChange={(e) => setNewPairA_Text(e.target.value)}
                      />
                      <div className="flex items-center gap-1.5 mt-1">
                        <input
                          type="text"
                          className="mmo-input p-1 text-center w-8 text-xs font-mono font-bold"
                          value={newPairA_Emoji}
                          onChange={(e) => setNewPairA_Emoji(e.target.value)}
                          maxLength={4}
                          title="Escreva ou cole o emoji A"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playSelect();
                            setEmojiPickerTarget('pairA');
                          }}
                          className="mmo-btn text-[9px] font-bold p-1 text-yellow-500 hover:text-white flex-1 text-center"
                        >
                          😊 Choose
                        </button>
                      </div>
                    </div>

                    {/* Option B info */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[8px] text-gray-400 uppercase font-bold">Texto B</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Cão" 
                        className="mmo-input p-1 text-[10px]"
                        value={newPairB_Text}
                        onChange={(e) => setNewPairB_Text(e.target.value)}
                      />
                      <div className="flex items-center gap-1.5 mt-1">
                        <input
                          type="text"
                          className="mmo-input p-1 text-center w-8 text-xs font-mono font-bold"
                          value={newPairB_Emoji}
                          onChange={(e) => setNewPairB_Emoji(e.target.value)}
                          maxLength={4}
                          title="Escreva ou cole o emoji B"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            soundEffects.playSelect();
                            setEmojiPickerTarget('pairB');
                          }}
                          className="mmo-btn text-[9px] font-bold p-1 text-yellow-500 hover:text-white flex-1 text-center"
                        >
                          😊 Choose
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mmo-btn py-1 mt-1 text-[10px] font-bold border-indigo-900 text-indigo-400 hover:text-white"
                  >
                    + Salvar Novo Par Cadastrado
                  </button>
                </form>

                {/* Lists of closed pairs with removal buttons */}
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[9px] text-gray-400">Pares Cadastrados ({closedPairs.length}):</span>
                  {closedPairs.length === 0 ? (
                    <div className="text-[10px] text-center text-gray-600 bg-black/10 py-3 rounded font-mono border border-dashed border-slate-900">
                      Nenhum Par Cadastrado
                    </div>
                  ) : (
                    <div className="max-h-[140px] overflow-y-auto flex flex-col gap-1">
                      {closedPairs.map((p) => (
                        <div key={p.id} className="flex justify-between items-center bg-black/20 p-1.5 border border-slate-900 rounded text-[11px]">
                          <span className="truncate max-w-[180px]">
                            {p.a.emoji} {p.a.text} x {p.b.emoji} {p.b.text}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteClosedPair(p.id)}
                            className="text-red-500 hover:text-red-400 font-bold px-1 text-[10px]"
                            title="Deletar este par permanente"
                          >
                            Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-1 border-t border-slate-900 pt-2">
                <span className="text-[9px] text-amber-500 font-bold uppercase font-mono">1. Adicionar Item Livre</span>
                
                {/* Add free item */}
                <form onSubmit={handleAddSingleItem} className="flex gap-2 bg-black/40 p-2 rounded items-center justify-between">
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: Pássaro" 
                    className="mmo-input p-1 flex-1 text-[10px]"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="mmo-input p-1 text-center w-8 text-xs font-mono font-bold"
                    value={newItemEmoji}
                    onChange={(e) => setNewItemEmoji(e.target.value)}
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playSelect();
                      setEmojiPickerTarget('singleItem');
                    }}
                    className="mmo-btn text-[9px] font-bold p-1 text-yellow-500 hover:text-white"
                  >
                    😊 Pick
                  </button>
                  <button
                    type="submit"
                    className="mmo-btn px-2.5 py-1 text-[10px] font-bold border-indigo-950 text-indigo-400 hover:text-white"
                  >
                    Salvar
                  </button>
                </form>

                {/* Lists of single items */}
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[9px] text-gray-400 font-mono">Opções da Piscina ({singleItems.length}):</span>
                  {singleItems.length === 0 ? (
                    <div className="text-[10px] text-center text-gray-600 bg-black/10 py-3 rounded font-mono border border-dashed border-slate-900">
                      Nenhum Item Disponível
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto w-full">
                      {singleItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-black/20 p-1 border border-slate-900 rounded text-[10px]">
                          <span className="truncate">
                            {item.emoji} {item.text}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteSingleItem(idx)}
                            className="text-red-500 text-[9px] font-bold hover:text-red-400 px-1"
                          >
                            Excluir
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
