import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { UserlistComponent } from './components/Users/userlist/userlist.component';
import { NewUserComponent } from './components/Users/new-user/new-user.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./components/Users/userlist/userlist.component').then(
  //       (m) => m.UserlistComponent
  //     ),
  // },
  {
    path: 'user-list',
    loadComponent: () =>
      import('./components/Users/userlist/userlist.component').then(
        (m) => m.UserlistComponent
      ),
  },
  {
    path: 'new-user',
    loadComponent: () =>
      import('./components/Users/new-user/new-user.component').then(
        (m) => m.NewUserComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'user-list', component: UserlistComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    ],
  },
];
