import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserUpdateModel } from './user.model';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from './user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password-match.validator';

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

  constructor(private route: ActivatedRoute, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
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
    if (this.picture) {
      return this.picture;
    }
    return this.auth.getUser().picture;
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
    this.auth.put("user/", this.user, 'text').subscribe(
      response => {
      },
      error => {
        if (error.status == 406) {
          this.error = error.error;
          this.form.get('oldPassword').setErrors(['']);
        }
      });
    if (this.picture) {
      this.auth.setPicture(this.picture);
      this.picture = null;
      let formData: FormData = new FormData();
      formData.append('picture', this.imageFile);
      this.auth.put("user/picture", formData, 'text').subscribe(
        response => {
        },
        error => {
        });
    }
  }

}
