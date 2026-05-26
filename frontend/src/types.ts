export interface Participant {
  id: string;
  name: string;
  emoji: string;
  role: string; // e.g., 'Guerreiro do Chat', 'Mago das Enquetes', 'Bárbaro Democrático' etc.
  points: number;
  lastVotedOption?: 'A' | 'B';
}

export interface Poll {
  id: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  creator?: string; // name of who proposed it
}

export interface ChatMessage {
  id: string;
  senderName?: string;
  senderEmoji?: string;
  senderRole?: string;
  isMe?: boolean;
  text: string;
  timestamp: string; // e.g., '23:56:02'
  isSystem?: boolean;
  systemType?: 'join' | 'leave' | 'vote' | 'poll_end' | 'poll_start';
  targetOption?: 'A' | 'B';
}

export interface Room {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  password?: string;
  creator: string;
  participantsCount: number;
}
