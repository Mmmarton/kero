import { Injectable } from '@angular/core';
import { ImagePreview } from './image-preview.model';

@Injectable()
export class ImagePreviewService {

  private currentImageIndex: number;
  imagePreviews: ImagePreview[] = [];

  constructor() {
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
