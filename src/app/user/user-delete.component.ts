import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  nickname: string;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nickname = data.user.nickname;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  delete() {
    this.userService.delete(this.data.user);
    this.dialogRef.close();
  }

}
