import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDividerModule } from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EventListComponent } from './event/event-list.component';
import { EventPreviewComponent } from './event/event-preview.component';
import { LimitPipe } from './pipes/limit.pipe';
import { EventCreateComponent } from './event/event-create.component';
import { EventViewComponent } from './event/event-view.component';
import { EventService } from './event/event.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    EventListComponent,
    EventPreviewComponent,
    LimitPipe,
    EventCreateComponent,
    EventViewComponent
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
    MatDividerModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    EventService
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    EventCreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
