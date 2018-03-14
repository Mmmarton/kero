import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { Credentials } from '../user/credentials.model';
import { User } from '../user/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  stayIn: boolean;
  error: string;
  form: FormGroup;

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
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(30)])
    });
  }

  login() {
    this.auth.post("auth/login", this.credentials).subscribe(
      response => {
        let user = new User();
        user.update(response);
        this.auth.logIn(user);
        this.router.navigate(['/galery']);
        this.dialogRef.close();
      },
      error => {
        if (error.status == 401) {
          this.error = error.error;
          this.credentials.empty();
          this.form.markAsPristine();
        }
        else {
          this.auth.logoutIfNeeded(error);
        }
      });
  }
}
