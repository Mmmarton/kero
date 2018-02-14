import { Injectable } from '@angular/core';
import { ImagePreview } from './image-preview.model';
import { Image } from './image.model';

@Injectable()
export class ImageService {

  private imagePreviewsSet: ImagePreview[] = [];
  private currentImage: Image;
  private currentImageIndex: number;
  private imagePreviews;

  constructor() {
    this.imagePreviewsSet.push(new ImagePreview('qwesdea', 'http://yuuma7.com/wp-content/uploads/2014/08/Place-de-la-Concorde-1000x644.jpg'));
    this.imagePreviewsSet.push(new ImagePreview('regaerg', 'http://www.comrie.org.uk/wp-content/uploads/2012/07/Carleton-Place-Town-Hall.jpg'));
    this.imagePreviewsSet.push(new ImagePreview('ytjreae', 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Festival_place_Basingstoke.jpg'));
  }

  getImagePreviews(eventId: string) {
    this.imagePreviews = [];
    for (let i = 0; i < Math.floor(Math.random() * 10 + 10); i++) {
      this.imagePreviews.push(this.imagePreviewsSet[Math.floor(Math.random() * 3)]);
    }
    return this.imagePreviews;
  }

  getImagePreview(id: string) {
    return this.imagePreviews.find(preview => preview.id === id).image;
  }

  setCurrentImage(id: string) {
    this.currentImageIndex = this.imagePreviews.findIndex(preview => preview.id === id);
    let src = this.imagePreviews[this.currentImageIndex].image;
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
    let src = this.imagePreviews[this.currentImageIndex].image;
    this.currentImage = new Image(src);
  }

  previousCurrentImage() {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.imagePreviews.length - 1;
    }
    let src = this.imagePreviews[this.currentImageIndex].image;
    this.currentImage = new Image(src);
  }

  closeCurrentImage() {
    this.currentImage = null;
  }
}
