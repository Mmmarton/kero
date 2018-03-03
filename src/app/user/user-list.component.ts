import { Component, OnInit } from '@angular/core';
import { User, UserListing } from './user.model';
import { UserDeleteComponent } from './user-delete.component';
import { MatDialog } from '@angular/material';
import { UserInviteComponent } from './user-invite.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserListing[] = [];
  roles = ["ROLE_GUEST", "ROLE_MEMBER"];

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.auth.get("user/list").subscribe(
      response => {
        for (let i = 0; i < response.length; i++) {
          let user = new UserListing(response[i]);
          if (response[i].hasPicture) {
            user.picture = this.auth.getPictureLink(user.email);
          }
          this.users.push(user);
        }
      },
      error => {
        this.auth.logoutIfNeeded(error);
      }
    );
  }

  update(user: UserListing) {
    this.auth.put("user/role", { email: user.email, role: user.role }, 'text').subscribe(
      response => {
      },
      error => {
        this.auth.logoutIfNeeded(error);
      });
  }

  openDelete(user: UserListing): void {
    let dialogRef = this.dialog.open(UserDeleteComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.users.splice(this.users.indexOf(response), 1);
      }
    });
  }

  openInvite(): void {
    let dialogRef = this.dialog.open(UserInviteComponent);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.users.push(new UserListing(response));
      }
    });
  }

}
