import { Injectable, OnInit } from '@angular/core';
import { Event } from './event.model';

@Injectable()
export class EventService {

  events: Event[] = [];

  constructor() {
  }

  getEvent(id: string) {
    return this.events.find(event => event.id === id);
  }

  private setEvents(events: any[]) {
    this.events = [];
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
