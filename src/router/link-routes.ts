export interface RouteLink {
  name: string;
  path: string;
  title: string;
}

export const linkRoutes: RouteLink[] = [
  { path: '/', name: 'home', title: 'Home' },
  { path: '/about', name: 'about', title: 'About' },
  { path: '/characters', name: 'characters', title: 'Characters' }
];
