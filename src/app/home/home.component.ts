import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string;
  password: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(new User(this.username, this.password));
  }

}
