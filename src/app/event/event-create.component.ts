import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventService } from './event.service';

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
    private eventService: EventService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.date = new Date();
  }

  create() {
    this.eventService.addEvent(this.title, this.date);
    this.dialogRef.close();
  }
}
