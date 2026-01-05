import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  {
    path: 'home',
    loadComponent: () => import('./comment/comment/comment').then(m => m.Comment),
    canActivate: [AuthGuard]
  },

  {
    path: 'teams',
    loadComponent: () => import('./Pages/teams/teams').then(m => m.Teams)
  },

  {
    path: 'driver',
    loadComponent: () => import('./Pages/driver/driver').then(m => m.Driver),
    canActivate: [AuthGuard]
  },

  {
    path: 'race',
    loadComponent: () => import('./Pages/race/race').then(m => m.Race)
  },

  {
    path: 'about',
    loadComponent: () => import('./Pages/about/about').then(m => m.About)
  },

  {
    path: 'login',
    loadComponent: () => import('./Pages/login/login').then(m => m.Login)
  },

];
