import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    let username = this.route.snapshot.params.name;
    if (username) {
      //we have a valid username, we should get it from the server
      this.user = new User("Margit");
    }
    else {
      let user = this.auth.getUser();
      this.user = new User().update(user);
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.user.picture = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  update() {
    this.auth.updateUser(this.user);
  }

}
