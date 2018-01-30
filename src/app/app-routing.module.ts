import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { GaleryComponent } from './galery/galery.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'galery',
    canActivate: [AuthGuard],
    component: GaleryComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':name',
        component: UserComponent
      },
      {
        path: '',
        component: UserComponent
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'galery',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'error',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
