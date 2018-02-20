import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserDeleteComponent } from './user-delete.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  roles;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.users = this.userService.users;
    this.roles = this.userService.roles;
  }

  update(user: User) {
    this.userService.update(user);
  }

  openDelete(user: User): void {
    let dialogRef = this.dialog.open(UserDeleteComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
