import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../services/auth.service';

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
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nickname = data.user.nickname;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  delete() {
    this.auth.delete("user/" + this.data.user.id, 'text').subscribe(
      response => {
        this.dialogRef.close(this.data.user);
      },
      error => {
        this.auth.logoutIfNeeded(error);
        this.dialogRef.close();
      }
    );
  }

}
