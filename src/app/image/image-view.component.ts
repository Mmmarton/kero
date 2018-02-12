import { Component, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { Image } from './image.model';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  close() {
    this.imageService.closeCurrentImage();
  }

  showImage() {
    return this.imageService.getCurrentImage() != null;
  }

  getImage() {
    return this.imageService.getCurrentImage().src;
  }

}
