import { Component, OnInit, Input } from '@angular/core';
import { Event } from './event.model';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input()
  event: Event;
  private previewIndex = 0;
  imageInterval: any;

  constructor(private timer: TimerService) {
  }

  ngOnInit() {
    this.timer.repeat(this, () => {
      console.log(this.event.location)
    }, 1000);
  }

  getPreview() {
    return this.event.previews[this.previewIndex];
  }
}
