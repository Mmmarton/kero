import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {

  user: User;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserInviteComponent>,
    private userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = new User();
  }

  create() {
    this.userService.invite(this.user);
    this.dialogRef.close();
  }
}
