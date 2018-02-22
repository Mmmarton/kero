import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { Credentials } from '../user/credentials.model';
import { User } from '../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  stayIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.credentials = new Credentials();
  }

  login() {
    this.auth.post("auth/login", this.credentials).subscribe(
      response => {
        let user = new User();
        user.update(response);
        this.auth.logIn(user);
        this.dialogRef.close();
      },
      error => {
        if (error.status == 401) {
          console.log(error.error);
          this.credentials.empty();
        }
      });
  }

  openRegister() {
    let dialogRef = this.dialog.open(RegisterComponent);
    this.dialogRef.close();
  }

}
