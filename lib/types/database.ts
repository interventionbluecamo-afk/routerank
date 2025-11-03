export type Company = 'Amazon' | 'FedEx' | 'UPS' | 'DHL' | 'USPS' | 'Other';

export type Weather = 'Sunny' | 'Rainy' | 'Snowy' | 'Stormy';

export interface User {
  id: string;
  email: string;
  name: string | null;
  company: Company | null;
  avatar_url: string | null;
  total_routes: number;
  total_packages: number;
  total_miles: number;
  total_stops: number;
  current_streak: number;
  longest_streak: number;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  user_id: string;
  packages: number;
  stops: number;
  miles: number;
  duration_minutes: number;
  weather: Weather;
  proof_image_url: string;
  verified: boolean;
  efficiency_score: number;
  date: string; // Date of route completion
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}


