export class ImagePreview {
  id: string;
  image: string;
  loaded: boolean;
  enabled: boolean;

  constructor() {
    this.loaded = false;
    this.enabled = false;
  }

  setImage(image: string) {
    this.image = image;
    this.loaded = true;
  }
}
