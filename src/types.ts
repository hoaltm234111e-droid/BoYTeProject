export type CategoryType = 'all' | 'single' | 'series';

export interface Artwork {
  id: string;
  code: string;
  title: string;
  author: string;
  category: 'single' | 'series';
  categoryLabel: string;
  imageUrl: string;
  additionalImages?: string[];
  votes: number;
  location: string;
  takenDate: string;
  description: string;
}

export interface PrizeItem {
  id: string;
  title: string;
  category: string;
  quantity: number;
  cashValue: string;
  description: string;
  bonus?: string;
  isSpecial?: boolean;
}

export interface TimelineStep {
  id: number;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
}
