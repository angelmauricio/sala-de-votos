import { Poll, Room } from '../types';

export const RETRO_EMOJIS = [
  '👾', '🧙‍♂️', '🧝‍♀️', '🐉', '⚔️', '🛡️', '🕹️', '💾', '📼', '🍕', 
  '🐱', '🐶', '🦊', '🦁', '🐸', '🐼', '🎩', '👑', '☠️', '🔥', 
  '💎', '⭐️', '🌶️', '🚀', '🎸', '🍩', '🍔', '👽', '🤖', '👻',
  '🧛‍♂️', '🦄', '🍿', '🧊', '🎨', '🧩', '🎸', '🍟', '🥤', '🍦'
];

export const RETRO_ROLES = [
  'Guerreiro do Chat',
  'Mago das Enquetes',
  'Bárbaro Democrático',
  'Ladino do F5',
  'Elfo do Chat',
  'Necromante de Treta',
  'Paladino do Contra',
  'Monge do Voto Impresso',
  'Druida do Doritos',
  'Arqueiro do CapsLock'
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'templo-principal',
    name: '🕌 Templo Principal do Voto',
    description: 'A sala mais movimentada! Discussões gerais e enquetes nostálgicas aleatórias.',
    isPrivate: false,
    creator: 'Admin_Retro',
    participantsCount: 14
  },
  {
    id: 'arena-gamer',
    name: '🎮 Arena Gamer de 2000',
    description: 'Consoles clássicos, Tibia x Ragnarok, CS 1.6 e debates nerds pesados.',
    isPrivate: false,
    creator: 'Gamer_Nostalgico',
    participantsCount: 9
  },
  {
    id: 'taberna-comida',
    name: '🍕 Taberna da Larica Suprema',
    description: 'Lanches de rua, salgadinhos da infância e debates culinários perigosos.',
    isPrivate: false,
    creator: 'GlutaoDoBairro',
    participantsCount: 11
  },
  {
    id: 'masmorra-misteriosa',
    name: '🔒 Masmorra Secreta (Senha: 123)',
    description: 'Quem descobria a senha entrava. Um clássico das salas de bate-papo antigas.',
    isPrivate: true,
    password: '123',
    creator: 'Misterio_Retro',
    participantsCount: 4
  }
];

export const DEFAULT_POLLS: Omit<Poll, 'votesA' | 'votesB'>[] = [
  { id: 'p1', optionA: 'Doritos Elma Chips', optionB: 'Fandangos Presunto' },
  { id: 'p2', optionA: 'Cachorro', optionB: 'Gato' },
  { id: 'p3', optionA: 'Tibia', optionB: 'Ragnarok Online' },
  { id: 'p4', optionA: 'CS 1.6', optionB: 'Mu Online' },
  { id: 'p5', optionA: 'PlayStation 2', optionB: 'Super Nintendo' },
  { id: 'p6', optionA: 'Naruto', optionB: 'One Piece' },
  { id: 'p7', optionA: 'Chocolate ao Leite', optionB: 'Chocolate Branco' },
  { id: 'p8', optionA: 'Coca-Cola', optionB: 'Guaraná Antarctica' },
  { id: 'p9', optionA: 'Frio extremo (Inverno)', optionB: 'Calor extremo (Verão)' },
  { id: 'p10', optionA: 'Pizza de Calabresa', optionB: 'Hambúrguer com Cheddar' },
  { id: 'p11', optionA: 'Batman', optionB: 'Homem-Aranha' },
  { id: 'p12', optionA: 'Harry Potter', optionB: 'O Senhor dos Anéis' },
  { id: 'p13', optionA: 'Estudar de Manhã', optionB: 'Estudar de Tarde' },
  { id: 'p14', optionA: 'WhatsApp / Discord', optionB: 'MSN Messenger / ICQ' },
  { id: 'p15', optionA: 'Chaves (El Chavo)', optionB: 'Todo Mundo Odeia o Chris' },
  { id: 'p16', optionA: 'Andar de Bicicleta', optionB: 'Jogar Videogame' },
  { id: 'p17', optionA: 'Miojo de Galinha Caipira', optionB: 'Miojo de Carne' },
  { id: 'p18', optionA: 'Internet Discada à meia-noite', optionB: 'Wi-Fi lento do vizinho' },
  { id: 'p19', optionA: 'Estalar os dedos', optionB: 'Coçar as costas' },
  { id: 'p20', optionA: 'Desenho 2D feito à mão', optionB: 'Animação 3D moderna' }
];

export const BOT_IDENTITIES = [
  { name: 'Votador_Mutante', emoji: '👾', role: 'Ladino do F5' },
  { name: 'Gamer_Anciao', emoji: '🧙‍♂️', role: 'Mago das Enquetes' },
  { name: 'Guria_Misteriosa', emoji: '🧝‍♀️', role: 'Elfo do Chat' },
  { name: 'Dragao_Democrata', emoji: '🐉', role: 'Bárbaro Democrático' },
  { name: 'Xandao_Zika', emoji: '⚔️', role: 'Guerreiro do Chat' },
  { name: 'Nostalgico_90', emoji: '📼', role: 'Necromante de Treta' },
  { name: 'Cebolinha_Hack', emoji: '🕹️', role: 'Arqueiro do CapsLock' },
  { name: 'Xuxa_Do_Meteoro', emoji: '👽', role: 'Paladino do Contra' },
  { name: 'SalsichaGamer', emoji: '🐶', role: 'Druida do Doritos' },
  { name: 'MestreDosMagos', emoji: '🎩', role: 'Monge do Voto Impresso' },
  { name: 'AlvoDumbledore', emoji: '🧙‍♂️', role: 'Mago das Enquetes' },
  { name: 'KratosDeOsasco', emoji: '☠️', role: 'Bárbaro Democrático' },
  { name: 'Juliana_Gatinha', emoji: '🐱', role: 'Elfo do Chat' },
  { name: 'Darth_Vader_BR', emoji: '🤖', role: 'Paladino do Contra' }
];

export const BOT_CHATS_A = [
  "Nossa, A com certeza absoluta!!!",
  "Votado em A, sem dúvidas!",
  "A disparado, quem vota no outro é louco kkkk",
  "A é lendário demais!",
  "Lembro disso em 2005, A sempre foi superior",
  "Voto com orgulho no A!",
  "A é clássico de verdade",
  "Imagina preferir o B... misericórdia"
];

export const BOT_CHATS_B = [
  "B é muito superior, parem de bobeira",
  "Votei em B e saí correndo!",
  "B faz parte da minha história!",
  "Quem vota no A não tem bom gosto kkk",
  "B ganha fácil!",
  "B sempre foi e sempre será melhor",
  "A galera tá se deixando levar, B é infinitamente melhor",
  "B toda vida!"
];

export const BOT_CHATS_GENERIC = [
  "Alguém aí jogava Tibia no server 7.4?",
  "Meu PC da Positivo tá travando um pouco kkk",
  "Eita, essa votação tá acirrada demais!",
  "O próximo voto define tudo!",
  "kkkkkkkkkk rindo muito aqui",
  "Alguém coloca uma enquete de Pokémon depois?",
  "Opa, acabei de chegar, qual que tá ganhando?",
  "Nostalgia pura esse chat kkkk ADORO",
  "Quem é o admin dessa sala?",
  "Meu MSN caiu três vezes hoje já",
  "Massa demais essa ideia! Fazia tempo que não via algo assim"
];
