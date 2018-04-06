import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserListing } from './user.model';
import { UserDeleteComponent } from './user-delete.component';
import { MatDialog } from '@angular/material';
import { UserInviteComponent } from './user-invite.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserListing[];
  roles = ["ROLE_GUEST", "ROLE_MEMBER"];
  waiting = false;

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.users = [];
    this.auth.get("user/list").subscribe(
      response => {
        for (let i = 0; i < response.length; i++) {
          let user = new UserListing(response[i]);
          this.users.push(user);
        }
      },
      error => {
        this.auth.logoutIfNeeded(error);
      }
    );
  }

  ngOnDestroy() {
    this.users.forEach(user => { user.dispose(); });
    this.users = null;
  }

  update(user: UserListing) {
    this.waiting = true;
    this.auth.put("user/role", { id: user.id, role: user.role }, 'text').subscribe(
      response => {
        this.waiting = false;
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
        user.deleted = true;
        Observable.timer(200).subscribe(() => {
          let user = this.users.splice(this.users.indexOf(response), 1);
          user[0].dispose();
        });
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
