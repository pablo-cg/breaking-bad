export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const Gender = {
  Female: 'Female',
  Male: 'Male',
  Unknown: 'unknown'
} as const;

export type Gender = keyof typeof Gender;

export interface Location {
  name: string;
  url: string;
}

const Species = {
  Alien: 'Alien',
  Human: 'Human'
} as const;

export type Species = keyof typeof Species;

const Status = {
  Alive: 'Alive',
  Dead: 'Dead',
  Unknown: 'unknown'
} as const;

export type Status = keyof typeof Status;
