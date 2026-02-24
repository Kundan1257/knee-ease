
export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  reps?: string;
  intensity: 'Low' | 'Medium' | 'High';
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type AppTab = 'theory' | 'home' | 'exercises' | 'chat';
