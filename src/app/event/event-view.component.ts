import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  images = [];
  private imagePreviews = ['/assets/img/place1.jpg', '/assets/img/place2.jpg', '/assets/img/place3.jpg'];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < Math.floor(Math.random() * 10 + 3); i++) {
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
