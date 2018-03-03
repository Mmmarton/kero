import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatOptionModule,
  MatInputModule, MatCheckboxModule, MatDividerModule, MatChipsModule, MatSelectModule
} from '@angular/material';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { CookieModule } from 'ngx-cookie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';

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
import { EventEditComponent } from './event/event-edit.component';
import { EventDeleteComponent } from './event/event-delete.component';
import { ImagePreviewService } from './image/image-preview.service';
import { ImageViewComponent } from './image/image-view.component';
import { ImageUploadComponent } from './image/image-upload.component';
import { ImageDeleteComponent } from './image/image-delete.component';
import { UserListComponent } from './user/user-list.component';
import { UserDeleteComponent } from './user/user-delete.component';
import { UserInviteComponent } from './user/user-invite.component';
import { AdminGuard } from './services/guards/admin.guard';
import { MemberGuard } from './services/guards/member.guard';
import { LoadImagePipe } from './pipes/load.image.pipe';


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
    EventViewComponent,
    EventEditComponent,
    EventDeleteComponent,
    ImageViewComponent,
    ImageUploadComponent,
    ImageDeleteComponent,
    UserListComponent,
    UserDeleteComponent,
    UserInviteComponent,
    LoadImagePipe
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
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    Angular2FontawesomeModule,
    CookieModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    MemberGuard,
    EventService,
    ImagePreviewService,
    HttpClient
  ],
  entryComponents: [
    LoginComponent,
    EventCreateComponent,
    EventEditComponent,
    EventDeleteComponent,
    ImageDeleteComponent,
    UserDeleteComponent,
    UserInviteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
