import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventService } from './event.service';
import { Event } from './event.model';
import { AuthService } from '../services/auth/auth.service';
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
        this.eventService.addEvent({ title: this.title, date: this.date });
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }
}
