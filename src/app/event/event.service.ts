import { Injectable, OnInit } from '@angular/core';
import { Event } from './event.model';

@Injectable()
export class EventService {

  private events: Event[] = [];

  constructor() {
    let eventCount: number = Math.random() * 5 + 3;
    for (let i = 0; i < eventCount; i++) {
      this.addEvent(this.getRandomString(25), new Date());
    }
  }

  private getRandomString(length: number) {
    let result: string = Math.random().toString(36).substring(7);
    for (let i = 1; i < length / 7 - Math.random(); i++) {
      result += Math.random().toString(36).substring(7) + "\n";
    }
    return result;
  }

  addEvent(title: string, date: Date) {
    this.events.unshift(new Event(
      title,
      date,
      "",
      ["/assets/img/place1.jpg", "/assets/img/place2.jpg", "/assets/img/place3.jpg"])
    );
  }

  getEvents() {
    return this.events;
  }

  getEvent(id: string) {
    return this.events.find(event => event.id === id);
  }

}
