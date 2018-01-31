import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Event } from './event.model';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {

  @Input()
  event: Event;
  private previewIndex = 0;
  private alive: boolean;

  constructor() {
    this.alive = true;
  }

  ngOnInit() {
    IntervalObservable.create(10000 + Math.random() * 20000)
      .takeWhile(() => this.alive) // only fires when component is alive
      .subscribe(() => {
        this.previewIndex = (this.previewIndex + 1) % this.event.previews.length;
      });
  }

  getPreview() {
    return this.event.previews[this.previewIndex];
  }

  ngOnDestroy() {
    this.alive = false; // switches your IntervalObservable off
  }
}
