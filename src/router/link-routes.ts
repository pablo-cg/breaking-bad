export interface RouteLink {
  name: string;
  path: string;
  title: string;
}

export const linkRoutes: RouteLink[] = [
  { path: '/', name: 'home', title: 'Inicio' },
  { path: '/about', name: 'about', title: 'Acerca de' },
  { path: '/characters', name: 'characters', title: 'Personajes' }
];
