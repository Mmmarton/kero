export class ImagePreview {
  id: string;
  image: string;
  loaded: boolean;

  constructor() {
    this.loaded = false;
  }

  setImage(image: string) {
    this.image = image;
    this.loaded = true;
  }
}
