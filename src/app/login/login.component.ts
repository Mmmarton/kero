import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
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
  }

  login() {
    if (this.auth.logIn(this.username, this.password, this.stayIn)) {
      this.router.navigate(['/dashboard']);
    }
    this.dialogRef.close();
  }

  openRegister() {
    let dialogRef = this.dialog.open(RegisterComponent);
    this.dialogRef.close();
  }

}
