import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { User } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.user.dispose();
  }

  constructor(private auth: AuthService, public dialog: MatDialog, private router: Router) {
    this.user = auth.getUser();
  }

  isLoggedIn() {
    this.user = this.auth.getUser();
    return this.auth.isLoggedIn();
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  openLogin(): void {
    let dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(response => {
    });
  }

  logOut() {
    this.auth.logOut();
  }

}
