
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
  role: 'user' | 'assistant';
  content: string;
}

export type AppTab = "home" | "exercise" | "diet" | "tea";
