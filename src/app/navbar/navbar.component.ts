import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { User } from '../user/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  ngOnInit() {
  }

  constructor(private auth: AuthService, public dialog: MatDialog) {
    this.user = auth.getUser();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logOut() {
    this.auth.logOut();
  }

}
