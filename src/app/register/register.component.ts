import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User, UserRegistration } from '../user/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: UserRegistration;
  error: string;

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
    this.form.get('password2').setValidators([this.matches(this.form.get('password'))]);
    this.user.email = this.route.snapshot.params.email;
    this.user.inviteCode = this.route.snapshot.params.code;
  }

  register() {
    console.log(this.user);
    this.auth.post("user/register", this.user, 'text').subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        if (error.status == 400) {
          this.error = error.error;
          this.form.get('email').setErrors(['']);
          console.log(this.error);
        }
      });
  }

  check() {
    this.form.get('password2').updateValueAndValidity();
  }

  matches(expected: AbstractControl): ValidatorFn {
    return (control: FormControl) => {
      return control.value == expected.value ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
