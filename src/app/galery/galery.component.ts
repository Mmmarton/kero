import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.model';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  events: Event[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < Math.random() * 20 + 5; i++) {
      this.events.push(new Event(
        this.getRandomString(20), 
        new Date(), 
        this.getRandomString(120),
        ["/assets/img/place1.jpg", "/assets/img/place2.jpg", "/assets/img/place3.jpg"]));
    }
  }

  private getRandomString(length: number) {
    let result: string = Math.random().toString(36).substring(7);
    for (let i = 1; i < length / 7 - Math.random(); i++) {
      result += Math.random().toString(36).substring(7) + "\n";
    }
    return result;
  }

}
