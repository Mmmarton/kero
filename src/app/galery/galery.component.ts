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
    for (let i = 0; i < Math.random() * 10 + 3; i++) {
      this.events.push(new Event("Panyik", new Date()));
    }
  }

}
