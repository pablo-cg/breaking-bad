import type { Character } from './character';

export interface RickMortyAPIResponse {
  info: PageInfo;
  results: Character[];
}

export interface PageInfo {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}
