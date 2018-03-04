import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Event } from './event.model';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
})
export class EventPreviewComponent implements OnInit, OnDestroy {

  @Input()
  event: Event;
  private previewIndex = 0;
  private alive: boolean;
  loaded = false;

  constructor() {
    this.alive = true;
  }

  ngOnInit() {
    if (this.event.previews.length > 1) {
      IntervalObservable.create(5000 + Math.random() * 50000)
        .takeWhile(() => this.alive)
        .subscribe(() => {
          this.previewIndex = (this.previewIndex + 1) % this.event.previews.length;
        });
    }
  }

  getPreview() {
    let preview = this.event.previews[this.previewIndex];
    if (preview != Event.defaultPicture) {
      preview = "image/preview/" + preview;
    }
    return preview;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
