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
      result => {
        console.log(result);
        let users: any = result;
        for (let i = 0; i < users.length; i++) {
          let user = new UserListing(users[i]);
          this.users.push(user);
          this.auth.getPicture(user.email).subscribe(
            (result) => {
              let picture: any = result;
              if (picture) {
                user.picture = picture;
              }
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );



  }

  update(user: User) {
    
  }

  openDelete(user: User): void {
    let dialogRef = this.dialog.open(UserDeleteComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openInvite(): void {
    let dialogRef = this.dialog.open(UserInviteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
