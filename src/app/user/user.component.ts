import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserUpdateModel } from './user.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-match.validator';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: UserUpdateModel;
  form: FormGroup;
  error: string;
  picture: any;
  imageFile: any;
  password2: string;
  loading: boolean;

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.loading = false;
    let user = this.auth.getUser();
    this.user = new UserUpdateModel().fromUser(user);
    this.form = new FormGroup({
      email: new FormControl('', []),
      nickname: new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
      firstName: new FormControl('', [Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.minLength(3), Validators.maxLength(30)]),
      oldPassword: new FormControl('', []),
      password: new FormControl('', []),
      password2: new FormControl('', [])
    });
    this.form.get('oldPassword').setValidators([Validators.minLength(12), Validators.maxLength(30),
    PasswordValidator.notEmpty(this.form.get('password'))]);
    this.form.get('password').setValidators([Validators.minLength(12), Validators.maxLength(30),
    PasswordValidator.notEmpty(this.form.get('oldPassword'))]);
    this.form.get('password2').setValidators([PasswordValidator.matches(this.form.get('password'))]);
  }

  getPicture() {
    return this.auth.getUser().getPicture();
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.picture = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];
    }
  }

  check() {
    this.form.get('password2').updateValueAndValidity();
  }

  update() {
    this.loading = true;
    let successes = 0;
    this.auth.put("user/", this.user, 'text').subscribe(
      response => {
        successes = this.checkIfSuccess(successes);
      },
      error => {
        this.loading = false;
        if (error.status == 406) {
          this.error = error.error;
          this.form.get('oldPassword').setErrors(['']);
        }
        else {
          this.auth.logoutIfNeeded(error);
        }
      });
    if (this.picture) {
      let formData: FormData = new FormData();
      formData.append('picture', this.imageFile);
      this.auth.put("user/picture", formData, 'text').subscribe(
        response => {
          this.user.picture = response;
          successes = this.checkIfSuccess(successes);
        },
        error => {
          this.loading = false;
          this.snackbarService.showMessage("Profile picture update failed.", "error");
          this.auth.logoutIfNeeded(error);
        });
    }
    else {
      successes = this.checkIfSuccess(successes);
    }
  }

  private checkIfSuccess(successes) {
    successes++;
    if (successes == 2) {
      this.auth.updateUser(this.user);
      this.snackbarService.showMessage("User profile updated", "success");
      this.loading = false;
    }
    return successes;
  }

}
