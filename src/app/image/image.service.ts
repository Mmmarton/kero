import { Injectable } from '@angular/core';
import { ImagePreview } from './image-preview.model';
import { Image } from './image.model';

@Injectable()
export class ImageService {

  private currentImage: Image;
  private currentImageIndex: number;
  private imagePreviews;

  constructor() {
  }

  random() {
    return 200 + Math.round(Math.random() * 800);
  }

  getImagePreviews(eventId: string) {
    this.imagePreviews = [];
    for (let i = 0; i < Math.floor(Math.random() * 10 + 10); i++) {
      let imagePreview = new ImagePreview(Math.random().toString(36).substring(7), 'https://lorempixel.com/' + this.random() + '/' + this.random() + '/');
      this.imagePreviews.push(imagePreview);
    }
    return this.imagePreviews;
  }

  getImagePreview(id: string) {
    return this.imagePreviews.find(preview => preview.id === id).src;
  }

  setCurrentImage(id: string) {
    this.currentImageIndex = this.imagePreviews.findIndex(preview => preview.id === id);
    let src = this.imagePreviews[this.currentImageIndex].src;
    this.currentImage = new Image(src);
  }

  getCurrentImage() {
    return this.currentImage;
  }

  advanceCurrentImage() {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.imagePreviews.length) {
      this.currentImageIndex = 0;
    }
    let src = this.imagePreviews[this.currentImageIndex].src;
    this.currentImage = new Image(src);
  }

  previousCurrentImage() {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imagePreviews.length - 1;
    }
    let src = this.imagePreviews[this.currentImageIndex].src;
    this.currentImage = new Image(src);
  }

  closeCurrentImage() {
    this.currentImage = null;
  }
}
