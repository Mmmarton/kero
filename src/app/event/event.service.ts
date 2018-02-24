import { Injectable, OnInit } from '@angular/core';
import { Event } from './event.model';

@Injectable()
export class EventService {

  private events: Event[] = [];

  constructor() {
  }

  getEvents() {
    return this.events;
  }

  getEvent(id: string) {
    return this.events.find(event => event.id === id);
  }

  deleteEvent(event: Event) {
    this.events.splice(this.events.indexOf(event), 1);
  }

}
