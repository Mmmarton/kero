import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ErrorComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
