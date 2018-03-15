import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User, UserRegistration } from '../user/user.model';
import { PasswordValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: UserRegistration;
  errorEmail: string;
  errorEmailNone: string;
  errorDuplicate: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = new UserRegistration();
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(30)]),
      password2: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]),
    });
    this.form.get('password2').setValidators([PasswordValidator.matches(this.form.get('password'))]);
    this.user.email = this.route.snapshot.params.email;
    this.user.inviteCode = this.route.snapshot.params.code;
  }

  register() {
    this.auth.post("user/register", this.user, 'text').subscribe(
      response => {
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status == 400) {
          error = JSON.parse(error.error);
          if (error.message == "NO_INVITATION") {
            this.errorEmailNone = "error";
            this.form.get('email').setErrors(['']);
          }
          else if (error.message == "INVALID_INVITATION") {
            this.errorEmail = "error";
            this.form.get('email').setErrors(['']);
          }
          else if (error.error == "DUPLICATE") {
            this.errorDuplicate = "error";
            this.form.get('username').setErrors(['']);
          }
        }
        else {
          this.auth.logoutIfNeeded(error);
        }
      });
  }

  check() {
    this.form.get('password2').updateValueAndValidity();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
