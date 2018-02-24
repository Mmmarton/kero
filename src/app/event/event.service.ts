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

  addEvent(event: any) {
    this.events.unshift(new Event().new(event.title, event.date));
  }

  private setEvents(events: any[]) {
    this.events = [];
    for (let i = 0; i < events.length; i++) {
      this.events.unshift(new Event().load(
        events[i].id,
        events[i].authorId,
        events[i].title,
        new Date(events[i].date),
        events[i].description ? events[i].description : "",
        events[i].previews || ["/assets/img/preview.jpg"])
      );
    }
  }
}
