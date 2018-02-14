import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from './image.service';
import { Image } from './image.model';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "ArrowRight") {
      this.right();
    } else if (event.key == "ArrowLeft") {
      this.left();
    } else if (event.key == "Escape") {
      this.close();
    }
  }

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  close() {
    this.imageService.closeCurrentImage();
  }

  isImageShown() {
    return this.imageService.getCurrentImage() != null;
  }

  getImage() {
    return this.imageService.getCurrentImage().src;
  }

  right() {
    this.imageService.advanceCurrentImage();
  }

  left() {
    this.imageService.previousCurrentImage();
  }

  handleKey(event) {
    console.log(event, event.keyCode, event.keyIdentifier);
  }
}
