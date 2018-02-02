import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event-preview.model';
import { MatDialog } from '@angular/material';
import { EventCreateComponent } from '../event/event-create.component';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  events: Event[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    let eventCount: number = Math.random() * 5 + 3;
    for (let i = 0; i < eventCount; i++) {
      this.createEvent(this.getRandomString(25));
    }
  }

  createEvent(title: string) {
    this.events.push(new Event(
      title,
      new Date(),
      this.getRandomString(120),
      ["/assets/img/place1.jpg", "/assets/img/place2.jpg", "/assets/img/place3.jpg"])
    );
  }

  private getRandomString(length: number) {
    let result: string = Math.random().toString(36).substring(7);
    for (let i = 1; i < length / 7 - Math.random(); i++) {
      result += Math.random().toString(36).substring(7) + "\n";
    }
    return result;
  }

  count(size: number) {
    return new Array(size);
  }

  openCreate(): void {
    let dialogRef = this.dialog.open(EventCreateComponent, {
      data: { createEvent: (title: string) => { this.createEvent(title); } }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
