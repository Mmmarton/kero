import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { MatDialog } from '@angular/material';
import { EventCreateComponent } from './event-create.component';
import { EventService } from './event.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.get("event/").subscribe(
      result => {
        console.log("setting events");
        this.eventService.setEvents(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  count(size: number) {
    return new Array(size);
  }

  getEvents() {
    return this.eventService.events;
  }

  isMember() {
    return this.auth.isMember();
  }

  openCreate(): void {
    let dialogRef = this.dialog.open(EventCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
