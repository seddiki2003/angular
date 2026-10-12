import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./body/body').then((module) => module.Body)
  },
  {
    path: 'conferences',
    loadComponent: () =>
      import('./conference-list/conference-list').then((module) => module.ConferenceList)
  },
  {
    path: 'conference-detail',
    loadComponent: () =>
      import('./conference-detail/conference-detail').then((module) => module.ConferenceDetail)
  }
];