import { Component, OnInit } from '@angular/core';
import { UserInvitation } from './user.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {

  user: UserInvitation;
  form: FormGroup;
  error: string;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserInviteComponent>,
    private auth: AuthService,
    private snackbarService: SnackbarService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.user = new UserInvitation();
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]),
    });
  }

  invite() {
    this.auth.post("user/invite", this.user, 'text').subscribe(
      response => {
        this.user.id = response;
        this.dialogRef.close(this.user);
      },
      error => {
        if (error.status == 400) {
          error = JSON.parse(error.error);
          if (error.error == "DUPLICATE") {
            this.error = error.error;
            this.form.get('email').setErrors(['']);
          }
          else if (error.message == "INVALID_INVITATION") {
            this.dialogRef.close();
            this.snackbarService.showMessage("Your First Name is not set.", "error");
          }
        }
        else {
          this.auth.logoutIfNeeded(error);
          this.dialogRef.close();
        }
      });
  }
}
