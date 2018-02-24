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

  private events: Event[] = [];

  constructor(
    public dialog: MatDialog,
    private eventService: EventService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.get("event/").subscribe(
      result => {
        this.setEvents(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  count(size: number) {
    return new Array(size);
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

  private setEvents(events: any[]) {
    for (let i = 0; i < events.length; i++) {
      this.events.unshift(new Event(
        events[i].id,
        events[i].authorId,
        events[i].title,
        events[i].date,
        events[i].description ? events[i].description : "",
        ["/assets/img/place1.jpg", "/assets/img/place2.jpg", "/assets/img/place3.jpg"])
      );
    }
  }

}
