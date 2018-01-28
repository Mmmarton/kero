import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  loveMe: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<RegisterComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  register() {
    this.dialogRef.close();
  }

}
