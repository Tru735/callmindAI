export interface WaitlistData {
  email: string;
  useCase: string | null;
  willingnessToPay: number | null; // 1-5 scale
  source: string;
}

export type UseCaseOption = {
  id: string;
  label: string;
  icon: string;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ChatMessage = {
  id: number;
  sender: 'caller' | 'ai' | 'system';
  text: string;
  translation?: string;
  action?: string;
};
