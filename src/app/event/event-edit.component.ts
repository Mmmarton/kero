import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from './event.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  event: Event;
  form: FormGroup;
  error: string;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EventEditComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.event = this.data.event.getCopy();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]),
      date: new FormControl('', [])
    });
  }

  save() {
    let event = {
      id: this.event.id,
      title: this.event.title,
      date: this.event.date.getTime(),
      description: this.event.description
    };
    this.auth.put("event/", event, 'text').subscribe(
      response => {
        this.data.event.update(this.event);
        this.dialogRef.close();
      },
      error => {
        this.auth.logoutIfNeeded(error);
        if (error.status == 400) {
          error = JSON.parse(error.error);
          if (error.error == "DUPLICATE") {
            this.error = error.error;
            this.form.get('title').setErrors(['']);
          }
        }
        else {
          this.dialogRef.close();
        }
      }
    );
  }

}
