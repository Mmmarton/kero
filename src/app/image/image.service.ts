import { Injectable } from '@angular/core';
import { ImagePreview } from './image-preview.model';
import { Image } from './image.model';

@Injectable()
export class ImageService {

  private imagePreviewsSet: ImagePreview[] = [];
  private currentImage: Image;

  constructor() {
    this.imagePreviewsSet.push(new ImagePreview('qwesdea', 'http://yuuma7.com/wp-content/uploads/2014/08/Place-de-la-Concorde-1000x644.jpg'));
    this.imagePreviewsSet.push(new ImagePreview('regaerg', 'http://www.comrie.org.uk/wp-content/uploads/2012/07/Carleton-Place-Town-Hall.jpg'));
    this.imagePreviewsSet.push(new ImagePreview('ytjreae', 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Festival_place_Basingstoke.jpg'));
  }

  getImagePreviews(eventId: string) {
    let imagePreviews = [];
    for (let i = 0; i < Math.floor(Math.random() * 10 + 10); i++) {
      imagePreviews.push(this.imagePreviewsSet[Math.floor(Math.random() * 3)]);
    }
    return imagePreviews;
  }

  getImagePreview(id: string) {
    return this.imagePreviewsSet.find(preview => preview.id === id).image;
  }

  setCurrentImage(id: string) {
    let image = this.imagePreviewsSet.find(preview => preview.id === id).image;
    this.currentImage = new Image(image);
  }

  getCurrentImage() {
    return this.currentImage;
  }

  closeCurrentImage() {
    this.currentImage = null;
  }
}
