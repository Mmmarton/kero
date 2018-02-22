import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './services/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { EventListComponent } from './event/event-list.component';
import { EventViewComponent } from './event/event-view.component';
import { ImageUploadComponent } from './image/image-upload.component';
import { UserListComponent } from './user/user-list.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './services/guards/admin.guard';
import { MemberGuard } from './services/guards/member.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register/:email/:code',
    component: RegisterComponent
  },
  {
    path: 'galery',
    canActivate: [AuthGuard],
    component: EventListComponent
  },
  {
    path: 'event/:id',
    canActivate: [AuthGuard],
    component: EventViewComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: UserListComponent,
        canActivate: [AdminGuard]
      },
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
    path: 'upload/:id',
    canActivate: [AuthGuard, MemberGuard],
    component: ImageUploadComponent
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
