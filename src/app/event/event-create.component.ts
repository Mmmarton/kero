import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventService } from './event.service';
import { Event } from './event.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  title: string;
  date: Date;

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
  }

  create() {
    this.auth.post("event/", { title: this.title, date: this.date.getTime() }, 'text').subscribe(
      result => {
        console.log(result);
        this.eventService.addEvent({ title: this.title, date: this.date });
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }
}
