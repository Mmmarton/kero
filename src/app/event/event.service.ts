import { Injectable, OnInit } from '@angular/core';
import { Event } from './event.model';

@Injectable()
export class EventService {

  events: Event[] = [];
  currentEvent: Event;

  constructor() {
  }

  getEvent(id: string) {
    return this.events.find(event => event.id === id);
  }

  setCurrentEvent(currentEvent: Event) {
    this.currentEvent = currentEvent;
  }

  getCurrentEvent(): Event {
    return this.currentEvent;
  }

  addEvent(event: any) {
    this.events.unshift(new Event().new(event.id, event.title, event.date));
  }

  setEvents(events: any[]) {
    this.events = [];
    for (let i = 0; i < events.length; i++) {
      this.events.unshift(new Event().load(
        events[i].id,
        events[i].authorId,
        events[i].title,
        new Date(events[i].date),
        events[i].description ? events[i].description : "",
        events[i].previews.length ? events[i].previews : [Event.defaultPicture])
      );
    }
  }
}
