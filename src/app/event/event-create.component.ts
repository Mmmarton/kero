import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventService } from './event.service';
import { Event } from './event.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  title: string;
  date: Date;
  form: FormGroup;
  error: string;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EventCreateComponent>,
    private eventService: EventService,
    private auth: AuthService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.date = new Date();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      date: new FormControl('', [])
    });
  }

  create() {
    this.auth.post("event/", { title: this.title, date: this.date.getTime() }, 'text').subscribe(
      response => {
        this.eventService.addEvent({ id: response, title: this.title, date: this.date, authorId: this.auth.getUser().id });
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
