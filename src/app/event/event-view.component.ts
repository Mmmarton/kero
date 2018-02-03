import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from './event.model';
import { EventService } from './event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  private imagePreviews = ['/assets/img/place1.jpg', '/assets/img/place2.jpg', '/assets/img/place3.jpg'];
  images = [];
  event: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(this.route.snapshot.params.id);
    if (!this.event) {
      this.router.navigate(['/galery']);
    }
    for (let i = 0; i < Math.floor(Math.random() * 10 + 10); i++) {
      this.images.push(this.imagePreviews[Math.floor(Math.random() * 3)]);
    }
  }

  getPreview(imageId: number) {
    return this.images[imageId];
  }

  count(size: number) {
    return new Array(size);
  }

}
