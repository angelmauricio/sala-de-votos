export interface Option {
  text: string;
  emoji: string;
}

export interface OptionPair {
  id: string;
  a: Option;
  b: Option;
}

export interface ChatMessage {
  id: string;
  sender: string;
  emoji: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  isRedAlert?: boolean;
}

export interface PlayerState {
  id: string;
  name: string;
  emoji: string;
  role: string;
  vote: Option | null;
}
