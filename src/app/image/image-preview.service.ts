import { Injectable } from '@angular/core';
import { ImagePreview } from './image-preview.model';

@Injectable()
export class ImagePreviewService {

  private currentImageIndex: number;
  imagePreviews: ImagePreview[] = [];

  constructor() {
  }

  random() {
    return 200 + Math.round(Math.random() * 800);
  }

  getImagePreviews(eventId: string) {
    this.imagePreviews = [];
    for (let i = 0; i < Math.floor(Math.random() * 10 + 10); i++) {
      let imagePreview = new ImagePreview();
      this.imagePreviews.push(imagePreview);
    }
    return this.imagePreviews;
  }

  getImagePreview(index: number): ImagePreview {
    return this.imagePreviews[index];
  }

  setCurrentImage(currentImageIndex: number) {
    this.currentImageIndex = currentImageIndex;
  }

  getCurrentImage(): ImagePreview {
    return this.currentImageIndex >= 0 ? this.imagePreviews[this.currentImageIndex] : null;
  }

  advanceCurrentImage() {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.imagePreviews.length) {
      this.currentImageIndex = 0;
    }
  }

  previousCurrentImage() {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imagePreviews.length - 1;
    }
  }

  deleteCurrentImage(): boolean {
    this.imagePreviews.splice(this.currentImageIndex, 1);
    if (this.currentImageIndex >= this.imagePreviews.length) {
      this.currentImageIndex = 0;
    }
    if (this.imagePreviews.length < 1) {
      return false;
    }
    return true;
  }

  closeCurrentImage() {
    this.currentImageIndex = -1;
  }
}
